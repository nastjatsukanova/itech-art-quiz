import React from "react";
import "./Button.styles.css";

interface IProps {
    onClick(e: React.MouseEvent<HTMLButtonElement>): void;
    title: string;
    id?: string;
    className?:string;
}

export const Button: React.FC<IProps> = ({ onClick, title, id, className }) => {
    return <button onClick={onClick} id={id} className={className}>{title} </button>;
};
