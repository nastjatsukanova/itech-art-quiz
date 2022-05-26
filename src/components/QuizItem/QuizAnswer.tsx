import React from 'react';
import { Input } from "../Controls/Input";

interface IQuizAnswerProps{
    text: string,
    id: string,
    changeCheckedAnswer?(e: React.ChangeEvent<HTMLInputElement>): void;
    type:string;
    onChange?(e: React.ChangeEvent<HTMLInputElement>): void;
    value:string,
    className: string,
    checked:boolean,
    name: string
};

export const QuizAnswer: React.FC<IQuizAnswerProps> = ({type,changeCheckedAnswer, value, id, checked, onChange, className, text,name}) => {
    return (
        <div className="answers_item" onChange={changeCheckedAnswer}>
            <Input 
                type={type} 
                value={value} 
                name={name} 
                id={id} 
                checked={checked} 
                onChange={onChange} 
                className={className} />
            {type === "radio" && <label htmlFor={id}>{text}</label>}
        </div>
    )
}