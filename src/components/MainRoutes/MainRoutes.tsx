import React from 'react';
import { Route, Routes } from "react-router-dom";
import { SignUp } from "../SignUp";
import { MainPage } from "../MainPage";
import { WelcomePage } from "../WelcomePage";
import { QuizPage } from "../QuizPage";
import { ScorePage } from "../ScorePage";
import { AdminPanel } from "../AdminPanel";
import { ROUTES } from "../../routes/routes";

export const MainRoutes = () => {
    return (
        <Routes>
                <Route path={ROUTES.MAIN_PAGE} element={<MainPage />} />
                <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
                <Route path={ROUTES.WELCOME_PAGE} element={<WelcomePage />} />
                <Route path={ROUTES.QUIZ_PAGE} element={<QuizPage />} />
                <Route path={ROUTES.SCORE_PAGE} element={<ScorePage />} />
                <Route path={ROUTES.ADMIN_PANEL} element={<AdminPanel />}/>
        </Routes>
    )
}