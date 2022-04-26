import React from "react";
import { SignIn } from "../SignIn/SignIn";
import { Link } from "react-router-dom";
import { ROUTES } from "../../routes/routes";
import "./MainPage.styles.css";

export const MainPage = () => {
    return (
        <div className="main_page">
            <SignIn
                title="Войти"
            />
            <Link
                to={{
                    pathname: ROUTES.SIGN_UP
                }}
                className="link"
            >
                Вы еще не зарегестрированы?
            </Link>
        </div>
    );
};
