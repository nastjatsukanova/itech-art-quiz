import { AnyAction } from "redux";
import { CHANGE_USER_EMAIL, CHANGE_PASSWORD,CHANGE_VERIFICATION_PASSWORD,SAVE_QUESTIONS,ADD_USER,CREATE_ANSWER_LIST} from "../constants";

export interface IAnswers {
  id: string,
  text: string,
}

interface IUser {
  id:string,
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
  answersList:string[];
}

// export type Action = {
//     type: string,
//     payload: {
//         users?: IUser[];
//         password?: string;
//         userEmail?: string;
//         verificationPassword?: string;
//         answersList?: Array<string>;
//         questions?: IQuestions[];
//     }
// };

const initialState: IState = { userEmail: "", password: "", verificationPassword: "", questions: [], users: [], answersList: [] };

export const rootReducer = (state: IState = initialState, action: AnyAction, ) => {
    switch (action.type) {
    case CHANGE_USER_EMAIL:
        return {
            ...state,
            userEmail: action.payload,
        };
    case CHANGE_PASSWORD:
        return {
            ...state,
            password: action.payload,
        };
    case CHANGE_VERIFICATION_PASSWORD:
        return {
            ...state,
            verificationPassword: action.payload,
        };
    case SAVE_QUESTIONS:
        return {
            ...state,
            questions: action.payload,
        };
    case ADD_USER:
        return {
            ...state,
            users: action.payload,
        };
    case CREATE_ANSWER_LIST:
        return {
            ...state,
            answersList: action.payload,
        };
    default:
        return state;
    }
};
