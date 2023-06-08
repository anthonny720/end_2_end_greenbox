import {
    GET_RECORDS_MP_FAIL,
    GET_RECORDS_MP_SUCCESS,
    LOADING_RECORDS_MP_FAIL,
    LOADING_RECORDS_MP_SUCCESS,
    UPDATE_RECORD_MP_SUCCESS,
    UPDATE_SAMPLE_FAIL,
} from "../actions/types";

const initialState = {
    lots: null, summary: null, kpi: null, loading: false

}

export default function Operations(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case LOADING_RECORDS_MP_SUCCESS:
            return {
                ...state,
                loading: true
            }
        case LOADING_RECORDS_MP_FAIL:
            return {
                ...state,
                loading: false
            }
        case GET_RECORDS_MP_SUCCESS:
            return {
                ...state, lots: payload.data, summary: payload.summary
            }
        case GET_RECORDS_MP_FAIL:
            return {
                ...state, lots: null, summary: null
            }


        case UPDATE_RECORD_MP_SUCCESS:
        case UPDATE_SAMPLE_FAIL:
            return {
                ...state
            }

        default:
            return state
    }
}