import { AnyAction } from "redux";
import { CHANGE_USER_EMAIL, CHANGE_PASSWORD, CHANGE_VERIFICATION_PASSWORD, SAVE_QUESTIONS, ADD_USER, CREATE_RADIO_LIST } from "../constants";

export interface IAnswers {
  id: string,
  text: string,
}

interface IUser {
  email: string,
  role: string,
  highestScore: number,
}

export interface IQuestions {
    id:string,
    text: string,
    answers: IAnswers[],
    rightAnswerId: string,
}

export interface IState {
  userEmail: string;
  password: string;
  verificationPassword:string;
  questions: IQuestions[];
  users: IUser[];
  radioList:[];
}

const initialState: IState = { userEmail: "", password: "", verificationPassword: "", questions: [], users: [], radioList: [] };

export const rootReducer = (state: IState = initialState, action: AnyAction) => {
    switch (action.type) {
    case CHANGE_USER_EMAIL:
        return {
            ...state,
            userEmail: action.payload
        };
    case CHANGE_PASSWORD:
        return {
            ...state,
            password: action.payload
        };
    case CHANGE_VERIFICATION_PASSWORD:
        return {
            ...state,
            verificationPassword: action.payload
        };
    case SAVE_QUESTIONS :
        return {
            ...state,
            questions: action.payload
        };
    case ADD_USER :
        return {
            ...state,
            users: action.payload
        };
    case CREATE_RADIO_LIST :
        return {
            ...state,
            radioList: action.payload
        };
    default:
        return state;
    }
};
