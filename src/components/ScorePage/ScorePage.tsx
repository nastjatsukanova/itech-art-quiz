import { child, get, getDatabase, ref, set } from "firebase/database";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/routes";
import { Button } from "../Controls/Button";
import { saveQuestions, addUser } from "../store/actions";
import { IState } from "../store/reducers/rootReducer";
import "./ScorePage.styles.css";

export const ScorePage = () => {
    const questions = useSelector((state:IState) => state.questions);
    const rightAnswers = questions.map(item => item.rightAnswerId);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const users = useSelector((state:IState) => state.users);
    const userEmail = useSelector((state: IState) => state.userEmail);
    const radioList = useSelector((state:IState) => state.radioList);
    const db = getDatabase();

    const arrayOfRadio = Array.prototype.slice.call(radioList);
    const userAnswers = arrayOfRadio.filter(item => item.checked === true).map(item => item.value);
    const score = userAnswers.filter((item, index) => item === rightAnswers[index]);

    useEffect(() => {
        const usersScore = users.map(item => {
            if (item.email === userEmail && item.highestScore < score.length) {
                return { ...item, highestScore: score.length };
            }
            return item;
        }
        );
        (set(ref(db, "users/"), [...usersScore]));
        dispatch(addUser(usersScore));
    }, []);

    const turnToQuiz = ():void => navigate(ROUTES.QUIZ_PAGE);

    const turnToMainPage = ():void => navigate(ROUTES.MAIN_PAGE);

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

    return (
        <div className="score_block">
            <label className="score_text">{`Ваш результат: ${score.length}/${questions.length}`}</label>
            {(score.length > (rightAnswers.length) / 2)
                ? <div className="result_text">Отличный результат! Для тебя нужны вопросы посложнее :)</div>
                : <div className="result_text">Неплохой результат! Можешь пройти квиз заново, чтобы повысить свой счет!</div>}
            <div className="btn_block">
                <Button title="Пройти заново" onClick={turnToQuiz} className="btn"/>
                <Button title="Выйти" onClick={turnToMainPage} className="btn"/>
            </div>
        </div>
    );
};
