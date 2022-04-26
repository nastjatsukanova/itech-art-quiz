import { Input } from "../Controls/Input";
import "./QuizItem.styles.css";
import { IAnswers } from "../store/reducers/rootReducer";
import React, { useState } from "react";

interface IProps {
    text: string,
    id: string,
    answers: Array<IAnswers>,
    editQuestion?(e: React.ChangeEvent<HTMLInputElement>): void;
    type:string;
    editAnswer?(e: React.ChangeEvent<HTMLInputElement>): void;
    disabled?:boolean;
}

export const QuizItem: React.FC<IProps> = ({ text, answers, id, editQuestion, type, editAnswer, disabled }) => {
    const [checked, setChecked] = useState("");
    const changeChecked = (e: React.ChangeEvent<HTMLInputElement>) => setChecked(e.target.value);

    return (
        <div className="quiz_item">
            <Input type="item_text" value={text} onChange={editQuestion} id={id} disabled={disabled} className="item_text"/>
            <div className="answers" >
                {answers.map((item:IAnswers) => {
                    return (
                        <div className="answers_item" onChange={changeChecked} key={item.id}>
                            <Input type={type} value={type === "radio" ? item.id : item.text} name={id} id={item.id} checked={checked === item.id} onChange={editAnswer} className={type === "radio" ? "answer_radio" : "answer_text"} />
                            {type === "radio" && <label htmlFor={item.id}>{item.text}</label>}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
