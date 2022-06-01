import React from "react";

interface IUserProps {
    email:string,
    highestScore:number;
    className:string;
}

export const User:React.FC<IUserProps> = ({ email, highestScore, className }) => {
    return (
        <div className={className}>
            <label>Пользователь {email}  набрал {highestScore}</label>
        </div>
    );
};
