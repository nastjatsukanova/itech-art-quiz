import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { child, get, getDatabase, ref } from "firebase/database";
import { Button } from "../Controls/Button";
import { IState } from "../store/reducers/rootReducer";
import { createAnswerList, saveQuestions } from "../store/actions";
import { QuizItem } from "../QuizItem/QuizItem";
import "./QuizPage.styles.css";
import { ROUTES } from "../../routes/routes";
import styles from "../SignIn/SignIn.module.css";


export const QuizPage = () => {
    const dispatch = useDispatch();
    const questions = useSelector((state:IState) => state.questions);
    const userEmail = useSelector((state:IState) => state.userEmail);
    const navigate = useNavigate();
    const [isAnswered, setIsAnswered] = useState<boolean>(false);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

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
    
    const turnToAdmin = ():void => {
        if (userEmail === "asd@mail.ru") {
            setIsAdmin(true);
        }
    };
    
    const turnToScore = ():void => {
        const answers = Array.from(document.querySelectorAll('input[type=radio]')) as HTMLInputElement[];
        const answersId = answers.filter((item) => item.checked).map(item => item.id);
        dispatch(createAnswerList(answersId))
        setIsAnswered(true)
    };

    useEffect(() => {
        if (isAdmin) {
             navigate(ROUTES.ADMIN_PANEL);
        }
    }, [isAdmin]);

    useEffect(() => {
        if (isAnswered) {
            navigate(ROUTES.SCORE_PAGE);  
        }
    }, [isAnswered]);

    const turnToMainPage = ():void => navigate(ROUTES.MAIN_PAGE);

    return (
        <div className="quiz_page">
            <div className="admin_buttons">
                {userEmail === "asd@mail.ru" && <Button title="Админ Панель" onClick={turnToAdmin} className={styles.btn} />}
                <Button title="Выйти" onClick={turnToMainPage} className={styles.btn}/>
            </div>
            <div className="quiz">
                {questions && questions.map(item => {
                    return (
                        <QuizItem
                            key={item.id}
                            text={item.text}
                            answers={item.answers}
                            id={item.id}
                            type="radio"
                            disabled={true}
                        />
                    );
                })}
            </div>
            <Button onClick={turnToScore} title="Получить результат" className={styles.btn} />
        </div>
    );
};
