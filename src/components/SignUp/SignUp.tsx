import { Input } from "../Controls/Input";
import { Button } from "../Controls/Button";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/routes";
import { useSelector, useDispatch } from "react-redux";
import { IState } from "../store/reducers/rootReducer";
import { addUser, changeUserEmail, changePassword, changeVerificationPassword } from "../store/actions";
import { signUp } from "../../utils/utils";
import { getDatabase, ref, set } from "firebase/database";
import { generateID } from "../../utils/utils";
import styles from "../SignIn/SignIn.module.css";
import "./SignUp.styles.css";

interface ISignUpProps {
    title?: string;
}

export const SignUp: React.FC<ISignUpProps> = () => {
    const userEmail = useSelector((state:IState) => state.userEmail);
    const password = useSelector((state:IState) => state.password);
    const users = useSelector((state:IState) => state.users);
    const verificationPassword = useSelector((state:IState) => state.verificationPassword);
    const db = getDatabase();
    const [isSigned, setIsSigned] = useState<boolean>(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeUserEmailHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        dispatch(changeUserEmail(e.target.value));
    };

    const changePasswordHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        dispatch(changePassword(e.target.value));
    };

    const changeVerificationPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        dispatch(changeVerificationPassword(e.target.value));
    };

    const signUpHandler = ():void => {
        if (password === verificationPassword) {
            const user = {
                id: generateID(),
                email: userEmail,
                role: "USER",
                highestScore: 0
            };
            if (userEmail === "asd@mail.ru") {
                user.role = "ADMIN";
            }
            (set(ref(db, "users/"), [...users, user]));
            dispatch(addUser([...users, user]));
            signUp(userEmail, password)
                .then(() => setIsSigned(true))
                .catch((error) => {
                    alert(error.message);
                });
        } else {
            alert("Пароли не совпадают, попробуйте еще раз");
        }
    };

    useEffect(() => {
        if (isSigned) {
            navigate(ROUTES.WELCOME_PAGE);
        }
    }, [isSigned]);

    return (
        <div className="sign_up">
            <label className="signup_label">Email</label>
            <Input type="email" onChange={changeUserEmailHandler} value={userEmail} className={styles.input}/>
            <label className="signup_label">Пароль</label>
            <Input type="password" onChange={changePasswordHandler} value={password} className={styles.input} />
            <label className="signup_label">Повторите пароль</label>
            <Input
                type="password"
                onChange={changeVerificationPasswordHandler}
                value={verificationPassword}
                className={styles.input}
            />
            <Button onClick={signUpHandler} title="Зарегестрироваться" className={styles.btn} />
            <Link
                to={{ pathname: ROUTES.MAIN_PAGE }}
                className="link"
            >
                У меня есть профиль
            </Link>
        </div>
    );
};
