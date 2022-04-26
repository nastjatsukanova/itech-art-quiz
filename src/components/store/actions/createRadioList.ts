import { CREATE_RADIO_LIST } from "../constants";

export const createRadioList = (object: object) => {
    return {
        type: CREATE_RADIO_LIST,
        payload: object
    };
};
