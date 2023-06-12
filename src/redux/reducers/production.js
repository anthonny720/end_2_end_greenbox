import {
    GET_MOD_FAIL,
    GET_MOD_SUCCESS,
    GET_PROCESS_FAIL,
    GET_PROCESS_SUCCESS,
    UPDATE_MOD_FAIL,
    UPDATE_MOD_SUCCESS
} from "../actions/types";

const initialState = {
    process: null, mod: null
}

export default function Production(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case GET_PROCESS_SUCCESS:
            return {
                ...state, process: payload.data
            }
        case GET_PROCESS_FAIL:
            return {
                ...state, process: null
            }
        case GET_MOD_SUCCESS:
            return {
                ...state, mod: payload.data,
            }
        case GET_MOD_FAIL:
            return {
                ...state, mod: null
            }
        case UPDATE_MOD_SUCCESS:
        case UPDATE_MOD_FAIL:
            return {
                ...state
            }
        default:
            return state
    }
}