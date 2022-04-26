import React from "react";

interface IProps {
    email:string,
    highestScore:number;
    className:string;
}

export const User:React.FC<IProps> = ({ email, highestScore, className }) => {
    return (
        <div className={className}>
            <label>Пользователь {email}  набрал {highestScore}</label>
        </div>
    );
};
