import { Input } from "../Controls/Input";
import "./QuizItem.styles.css";
import { IAnswers } from "../store/reducers/rootReducer";
import React, { useState } from "react";

interface IQuizItemProps {
    text: string,
    id: string,
    answers: Array<IAnswers>,
    editQuestionHandler?(e: React.ChangeEvent<HTMLInputElement>): void;
    type:string;
    editAnswerHandler?(e: React.ChangeEvent<HTMLInputElement>): void;
    disabled?:boolean;
}

export const QuizItem: React.FC<IQuizItemProps> = ({ text, answers, id, editQuestionHandler, type, editAnswerHandler, disabled }) => {
    const [checked, setChecked] = useState<string>("");
    const changeCheckedAnswer = (e: React.ChangeEvent<HTMLInputElement>): void => setChecked(e.target.value);

    return (
        <div className="quiz_item">
            <Input type="item_text" value={text} onChange={editQuestionHandler} id={id} disabled={disabled} className="item_text"/>
            <div className="answers" >
                {answers.map((item:IAnswers) => {
                    return (
                        <div className="answers_item" onChange={changeCheckedAnswer} key={item.id}>
                            <Input 
                                type={type} 
                                value={type === "radio" ? item.id : item.text} 
                                name={id} 
                                id={item.id} 
                                checked={checked === item.id} 
                                onChange={type === "text" ? editAnswerHandler : changeCheckedAnswer} 
                                className={type === "radio" ? "answer_radio" : "answer_text"} />
                            {type === "radio" && <label htmlFor={item.id}>{item.text}</label>}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
