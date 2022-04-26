import React from "react";

interface IProps {
    title: string;
    onClick(): void;
    width?: number;
}

export const someFunc = () => 5;

export const SomeComp: React.FC<IProps> = (props) => {
    return (
        <div>
            {props.title}
            <button onClick={props.onClick} />
        </div>
    );
};
