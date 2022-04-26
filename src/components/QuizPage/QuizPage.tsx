import { getDatabase, ref, get, child } from "firebase/database";
import React, { useEffect, useState } from "react";
import { Button } from "../Controls/Button";
import { IState } from "../store/reducers/rootReducer";
import { useDispatch, useSelector } from "react-redux";
import { saveQuestions } from "../store/actions";
import { QuizItem } from "../QuizItem/QuizItem";
import { useNavigate } from "react-router-dom";
import "./QuizPage.styles.css";
import { createRadioList } from "../store/actions/createRadioList";
import { ROUTES } from "../../routes/routes";

export const QuizPage = () => {
    const dispatch = useDispatch();
    const questions = useSelector((state:IState) => state.questions);
    const userEmail = useSelector((state:IState) => state.userEmail);
    const navigate = useNavigate();
    const [isAnswered, setIsAnswered] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const radioList = document.querySelectorAll("input[type=radio]");
    dispatch(createRadioList(radioList));

    useEffect(() => {
        const dbRef = ref(getDatabase());
        get(child(dbRef, "questions")).then((snapshot) => {
            if (snapshot.exists()) {
                dispatch(saveQuestions(Object.values(snapshot.val())));
            } else {
                alert("No data available");
            }
        }).catch((error) => {
            alert(`${error}`);
        });
    }, []);

    const turnToAdmin = () => {
        if (userEmail === "asd@mail.ru") {
            setIsAdmin(true);
        }
    };
    const turnToScore = () => setIsAnswered(true);

    useEffect(() => {
        if (isAdmin) {
            return navigate(ROUTES.ADMIN_PANEL);
        }
    }, [isAdmin]);

    useEffect(() => {
        if (isAnswered) {
            return navigate(ROUTES.SCORE_PAGE);
        }
    }, [isAnswered]);

    return (
        <div className="quiz_page">
            {userEmail === "asd@mail.ru" && <Button title="Админ Панель" onClick={turnToAdmin} className="btn" />}
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
            <Button onClick={turnToScore} title="Получить результат" className="btn" />
        </div>
    );
};
