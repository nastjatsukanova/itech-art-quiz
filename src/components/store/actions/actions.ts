import {
    CHANGE_USER_EMAIL,
    CHANGE_PASSWORD,
    CHANGE_VERIFICATION_PASSWORD,
    SAVE_QUESTIONS,
    ADD_USER,
    CREATE_ANSWER_LIST,
} from "../constants";

export const addUser = (object: object):object => {
    return {
        type: ADD_USER,
        payload: object,
    };
};

export const changePassword = (string: string):object => {
    return {
        type: CHANGE_PASSWORD,
        payload: string,
    };
};

export const changeUserEmail = (string: string):object => {
    return {
        type: CHANGE_USER_EMAIL,
        payload: string,
    };
};

export const changeVerificationPassword = (string: string):object => {
    return {
        type: CHANGE_VERIFICATION_PASSWORD,
        payload: string,
    };
};

export const createAnswerList = (object: object):object => {
    return {
        type: CREATE_ANSWER_LIST,
        payload: object,
    };
};

export const saveQuestions = (object: object):object => {
    return {
        type: SAVE_QUESTIONS,
        payload: object,
    };
};
