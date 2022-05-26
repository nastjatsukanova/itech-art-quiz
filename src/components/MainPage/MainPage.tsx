import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { child, get, getDatabase, ref } from "firebase/database";
import { SignIn } from "../SignIn/";
import { ROUTES } from "../../routes/routes";
import { addUser } from "../store/actions";
import "./MainPage.styles.css";

export const MainPage = () => {
    
const dispatch = useDispatch();

    useEffect(() => {
        const dbRef = ref(getDatabase());
            get(child(dbRef, "users"))
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        const user = Object.values(snapshot.val());
                        dispatch(addUser(user));
                    } else {
                        alert("No data available");
                    }
                })
                .catch((error) => {
                    alert(`${error}`);
                });
    }, []);

    return (
        <div className="main_page">
            <SignIn
                title="Войти"
            />
            <Link
                to={{ pathname: ROUTES.SIGN_UP }}
                className="link"
            >
                Вы еще не зарегестрированы?
            </Link>
        </div>
    );
};
