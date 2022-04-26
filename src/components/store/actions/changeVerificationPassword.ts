import { CHANGE_VERIFICATION_PASSWORD } from "../constants";

export const changeVerificationPassword = (text: string) => {
    return {
        type: CHANGE_VERIFICATION_PASSWORD,
        payload: text
    };
};
