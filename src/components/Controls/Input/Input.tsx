import React from "react";

interface IInputProps {
    placeholder?: string;
    onChange?(e: React.ChangeEvent<HTMLInputElement>): void;
    type: string;
    value?: string;
    name?: string;
    checked?: boolean;
    onClick?(e: React.ChangeEvent<HTMLInputElement>): void;
    id?:string;
    disabled?:boolean;
    className?:string
}

export const Input: React.FC<IInputProps> = ({ placeholder, type, value, onChange, name, id, disabled, className, checked }) => {
    return <input
        placeholder={placeholder}
        type={type} value={value}
        onChange={onChange}
        name={name}
        id={id}
        disabled={disabled}
        className={className}
        checked={checked}>
    </input>;
};
