import React from "react";

interface IButtonProps {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    title: string;
    id?: string;
    className?:string;
};

export const Button: React.FC<IButtonProps> = ({ onClick, title, id, className }) => {
    return <button onClick={onClick} id={id} className={className}>{title}</button>;
};
