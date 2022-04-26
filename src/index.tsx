import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./App";
import reportWebVitals from "./reportWebVitals";
import { rootReducer } from "./components/store/reducers/rootReducer";

const store = createStore(rootReducer);

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);

reportWebVitals();
