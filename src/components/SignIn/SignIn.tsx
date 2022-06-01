import { Input } from "../Controls/Input/Input";
import { Button } from "../Controls/Button";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IState } from "../store/reducers/rootReducer";
import { changeUserEmail, changePassword } from "../store/actions";
import { signIn } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/routes";
import styles from "./SignIn.module.css";
export interface ISignInProps {
    title: string;
}

export const SignIn: React.FC<ISignInProps> = ({ title }) => {
    const userEmail = useSelector((state: IState) => state.userEmail);
    const password = useSelector((state: IState) => state.password);
    const dispatch = useDispatch();
    const [isSigned, setIsSigned] = useState<boolean>(false);
    const navigate = useNavigate();

    const changeUserEmailHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        dispatch(changeUserEmail(e.target.value));
    };

    const changePasswordHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        dispatch(changePassword(e.target.value));
    };

    const signInHandler = ():void => {
        signIn(userEmail, password)
            .then(() => setIsSigned(true))
            .catch((error) => {
                alert(error.message);
            });
    };

    useEffect(() => {
        if (isSigned) {
            navigate(ROUTES.WELCOME_PAGE);
        }
    }, [isSigned]);

    return (
        <div className={styles.sign_in}>
            <Input
                placeholder="user name"
                type="text"
                onChange={changeUserEmailHandler}
                value={userEmail}
                className={styles.input}
            />
            <Input
                type="password"
                placeholder="password"
                onChange={changePasswordHandler}
                value={password}
                className={styles.input}
            />
            <Button onClick={signInHandler} title={title} className={styles.btn}/>
        </div>
    );
};
