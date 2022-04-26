import { ADD_USER } from "../constants";

export const addUser = (object: object) => {
    return {
        type: ADD_USER,
        payload: object
    };
};
