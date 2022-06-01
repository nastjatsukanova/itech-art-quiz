import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../Controls/Button";
import { ROUTES } from "../../routes/routes";
import "./WelcomePage.styles.css";
import styles from "../SignIn/SignIn.module.css";

export const WelcomePage = () => {
    const [isSigned, setIsSigned] = useState<boolean>(false);
    const navigate = useNavigate();

    const userIsSigned = ():void => setIsSigned(true);

    const turnToMainPage = ():void => navigate(ROUTES.MAIN_PAGE);

    useEffect(() => {
        if (isSigned) {
             navigate(ROUTES.QUIZ_PAGE);
        }
    }, [isSigned]);

    return (
        <div className="welcome_page">
            <div className="welcome_block">
                <div className="welcome_text">
                    Привет!<br></br> Твоему вниманию представляется небольшой квиз по JavaScript.
                    По сложности вопросы разные, так что рекомендуем как новичкам, так и ветеранам JS :)<br></br>
                    За один правильный ответ ты получаешь 1 балл.<br></br>
                    В конце ты получишь свой общий счет.<br></br>
                    Удачи!
                </div>
                <div className="btn_block">
                    <Button title="Перейти к квизу" onClick={userIsSigned} className={styles.btn}/>
                    <Button title="Выйти" onClick={turnToMainPage} className={styles.btn}/>
                </div> 
            </div>
        </div>
    );
};
