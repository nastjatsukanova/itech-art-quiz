import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { SignUp } from "./components/SignUp/SignUp";
import { MainPage } from "./components/MainPage/MainPage";
import { WelcomPage } from "./components/WelcomPage/WelcomPage";
import { QuizPage } from "./components/QuizPage/QuizPage";
import { ScorePage } from "./components/ScorePage/ScorePage";
import { AdminPanel } from "./components/AdminPanel/AdminPanel";

export const App = () => {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/welcom" element={<WelcomPage />} />
                <Route path="/quiz" element={<QuizPage />} />
                <Route path="/score" element={<ScorePage />} />
                <Route path="/admin" element={<AdminPanel />}/>
            </Routes>
        </div>
    );
};
