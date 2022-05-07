import React, { useEffect } from "react";
import { child, get, getDatabase, ref } from "firebase/database";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { SignIn } from "../SignIn";
import { ROUTES } from "../../routes/routes";
import "./MainPage.styles.css";
import { addUser } from "../store/actions/index";

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


// "eslint": "^7.20.0",
// "eslint-config-airbnb": "^18.2.1",
// "eslint-plugin-import": "^2.22.1",
// "eslint-plugin-jsx-a11y": "^6.4.1",
// "eslint-plugin-react": "^7.22.0",
// "eslint-plugin-react-hooks": "^4.2.0"
//    "@typescript-eslint/eslint-plugin": "^4.15.1",
// "@typescript-eslint/parser": "^4.15.1"

// "semi": [2, "always"],
//     "quotes": ["error", "double"],
//     "indent": ["error", 4],
//     "linebreak-style": "off",
