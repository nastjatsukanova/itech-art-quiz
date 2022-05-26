import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../store/reducers/rootReducer";
import { getDatabase, ref, set, child, get } from "firebase/database";
import { Button } from "../Controls/Button";
import { Input } from "../Controls/Input";
import { generateID } from "../../utils/utils";
import { User } from "../Controls/User";
import { saveQuestions } from "../store/actions";
import { QuizItem } from "../QuizItem";
import "./AdminPanel.styles.css";
import { ROUTES } from "../../routes/routes";

export const AdminPanel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const users = useSelector((state:IState) => state.users);
    const questions = useSelector((state:IState) => state.questions);
    const userEmail = useSelector((state:IState) => state.userEmail);
    const [questionText, setQuestionText] = useState<string>("");
    const [answer1, setAnswer1] = useState<string>("");
    const [answer2, setAnswer2] = useState<string>("");
    const [answer3, setAnswer3] = useState<string>("");
    const [rightAnswerId, setRightAnswerId] = useState<string>("");
    const db = getDatabase();

    useEffect(() => {
        const dbRef = ref(getDatabase());
        get(child(dbRef, "questions"))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    dispatch(saveQuestions(Object.values(snapshot.val())));
                } else {
                    alert("No data available");
                }
            })
            .catch((error) => {
                alert(`${error}`);
            });
    }, []);

    const changeQuestionText = (e: React.ChangeEvent<HTMLInputElement>): void => setQuestionText(e.target.value);

    const changeAnswer1 = (e: React.ChangeEvent<HTMLInputElement>): void => setAnswer1(e.target.value);

    const changeAnswer2 = (e: React.ChangeEvent<HTMLInputElement>): void => setAnswer2(e.target.value);

    const changeAnswer3 = (e: React.ChangeEvent<HTMLInputElement>): void => setAnswer3(e.target.value);

    const changeRightAnswerId = (e: React.ChangeEvent<HTMLInputElement>): void => setRightAnswerId(e.target.value);

    const saveOneQuestionHandler = (): void => {
        const question = {
            id: generateID(),
            text: questionText,
            answers: [
                {
                    id: `${questions.length}1`,
                    text: answer1
                },
                {
                    id: `${questions.length}2`,
                    text: answer2
                },
                {
                    id: `${questions.length}3`,
                    text: answer3
                }
            ],
            rightAnswerId: `${questions.length}${rightAnswerId}`
        };
        if (questionText.trim() && answer1.trim() && answer2.trim() && answer3.trim() && rightAnswerId.trim()) {
            if (Number(rightAnswerId) < 4 && Number(rightAnswerId) > 0) {
            (set(ref(db, `questions/${questions.length}`), question));
            dispatch(saveQuestions([...questions, question]));
            setQuestionText("");
            setAnswer1("");
            setAnswer2("");
            setAnswer3("");
            setRightAnswerId("");
            alert("Вопрос успешно добавлен!");
        } else {
            alert ("Номер правильного ответа должен быть от 1 до 3")
        }    
        } else {
            alert("Заполните все поля");
    }
    };

    const deleteQuestionHandler = (e: React.MouseEvent<HTMLButtonElement>): void => {
        const deleted = questions.filter(item => Number(item.id) !== Number(e.currentTarget.id));
        (set(ref(db, "questions/"), [...deleted]));
        dispatch(saveQuestions(deleted));
    };

    const editQuestionHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const inputValue = e.target.value;
        const inputId = e.target.id;
        const changed = questions.map(item => {
            if (Number(item.id) === Number(inputId)) {
                return { ...item, text: inputValue };
            }
            return item;
        });
        (set(ref(db, "questions/"), [...changed]));
        dispatch(saveQuestions(changed));
    };

    const editAnswerHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const inputValue = e.target.value;
        const inputId = e.target.id;
        if (inputValue.trim()) {
            const changedAnswer = questions.map(item => {
                item.answers.map(answer => {
                    if (Number(answer.id) === Number(inputId)) {
                        return answer.text = inputValue;
                    }
                    return answer;
                });
                return item;
            });
            (set(ref(db, "questions/"), [...changedAnswer]));
            dispatch(saveQuestions(changedAnswer));
        } else {
            alert("Заполните поля");
        }
    };

    const turnToQuiz = ():void => navigate(ROUTES.QUIZ_PAGE);

    const turnToMainPage = ():void => navigate(ROUTES.MAIN_PAGE);

    // if (userEmail !== "asd@mail.ru") {
    //     return (
    //         <div className="error_massage">Not allowed!
    //             <div className="admin_buttons">
    //                 <Button title="Вернуться к квизу" onClick={turnToQuiz} className="btn"/>
    //                 <Button title="Выйти" onClick={turnToMainPage} className="btn" />
    //             </div>
    //         </div>
    //     );
    // }

    return (
        <div className="admin_block">
            <div className="add_questions">
                <div className="admin_panel">
                    <Input type="text" placeholder="Текст вопроса" onChange={changeQuestionText} value={questionText} className="admin_input"/>
                    <Input type="text" placeholder="Вариант ответа 1" onChange={changeAnswer1} value={answer1} className="admin_input"/>
                    <Input type="text" placeholder="Вариант ответа 2" onChange={changeAnswer2} value={answer2} className="admin_input"/>
                    <Input type="text" placeholder="Вариант ответа 3" onChange={changeAnswer3} value={answer3} className="admin_input"/>
                    <Input type="text" placeholder="Номер правильного варианта ответа" onChange={changeRightAnswerId} value={rightAnswerId} className="admin_input"/>
                    <Button title="Сохранить" onClick={saveOneQuestionHandler} className="btn"/>
                    <div className="users"> Список пользователей и их результаты
                        {users && users.map(item => {
                            return (
                                <User
                                    key={item.id}
                                    email={item.email}
                                    highestScore={item.highestScore}
                                    className="user"
                                />
                            );
                        })}
                    </div>
                </div>
                <div className="quiz">
                    {questions && questions.map(item => {
                        return (
                            <div className="quiz_item_admin" key={item.id}>
                                <QuizItem
                                    key={item.id}
                                    text={item.text}
                                    answers={item.answers}
                                    id={item.id}
                                    type="text"
                                    editQuestionHandler={editQuestionHandler}
                                    editAnswerHandler={editAnswerHandler}
                                />
                                <Button title="Удалить" onClick={deleteQuestionHandler} id={item.id} className="admin_delete"/>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="admin_buttons">
                <Button title="Вернуться к квизу" onClick={turnToQuiz} className="btn"/>
                <Button title="Выйти" onClick={turnToMainPage} className="btn"/>
            </div>
        </div>
    );
}
