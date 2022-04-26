import { CHANGE_PASSWORD } from "../constants";

export const changePassword = (text: string) => {
    return {
        type: CHANGE_PASSWORD,
        payload: text
    };
};
