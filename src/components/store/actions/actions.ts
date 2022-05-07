import { CHANGE_USER_EMAIL, CHANGE_PASSWORD, CHANGE_VERIFICATION_PASSWORD, SAVE_QUESTIONS, ADD_USER, CREATE_RADIO_LIST } from "../constants";

export const addUser = (object: object):object => {
    return {
        type: ADD_USER,
        payload: object,
    };
};

export const changePassword = (text: string):object => {
    return {
        type: CHANGE_PASSWORD,
        payload: text,
    };
};

export const changeUserEmail = (string: string):object => {
    return {
        type: CHANGE_USER_EMAIL,
        payload: string,
    };
};

export const changeVerificationPassword = (text: string):object => {
    return {
        type: CHANGE_VERIFICATION_PASSWORD,
        payload: text,
    };
};

export const createRadioList = (object: object):object => {
    return {
        type: CREATE_RADIO_LIST,
        payload: object,
    };
};

export const saveQuestions = (object: object):object => {
    return {
        type: SAVE_QUESTIONS,
        payload: object,
    };
};

