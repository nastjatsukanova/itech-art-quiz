import React from "react";
import "./Button.styles.css";

interface IButtonProps {
    onClick?(e: React.MouseEvent<HTMLButtonElement>): void;
    title: string;
    id?: string;
    className?:string;
}

export const Button: React.FC<IButtonProps> = ({ onClick, title, id, className }) => {
    return <button onClick={onClick} id={id} className={className}>{title} </button>;
};
