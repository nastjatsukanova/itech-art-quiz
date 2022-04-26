import { SAVE_QUESTIONS } from "../constants";

export const saveQuestions = (object: object) => {
    return {
        type: SAVE_QUESTIONS,
        payload: object
    };
};
