import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../Controls/Button";
import "./WelcomPage.styles.css";

export const WelcomPage = () => {
    const [isSigned, setIsSigned] = useState(false);
    const navigate = useNavigate();

    const userIsSigned = () => setIsSigned(true);

    useEffect(() => {
        if (isSigned) {
            return navigate("/quiz");
        }
    }, [isSigned]);

    return (
        <div className="welcom_page">
            <div className="welcom_block">
                <div className="welcom_text">
                    Привет!<br></br> Твоему вниманию представляется небольшой квиз по JavaScript.
                    По сложности вопросы разные, так что рекомендуем как новичкам, так и ветеранам JS :)<br></br>
                    За один правильный ответ ты получаешь 1 балл.<br></br>
                    В конце ты получишь свой общий счет.<br></br>
                    Удачи!
                </div>
                <Button title="Перейти к квизу" onClick={userIsSigned} className="btn"/>
            </div>
        </div>
    );
};
