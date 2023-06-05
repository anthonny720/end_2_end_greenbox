import {
    GET_KPI_FAIL,
    GET_KPI_SUCCESS,
    GET_RECORDS_MP_FAIL,
    GET_RECORDS_MP_SUCCESS,
    LOADING_RECORDS_MP_FAIL,
    LOADING_RECORDS_MP_SUCCESS,
    UPDATE_KPI_FAIL,
    UPDATE_KPI_SUCCESS,
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
        case GET_KPI_SUCCESS:
            return {
                ...state, kpi: payload.data
            }
        case GET_KPI_FAIL:
            return {
                ...state, kpi: null
            }

        case UPDATE_RECORD_MP_SUCCESS:
        case UPDATE_SAMPLE_FAIL:
            return {
                ...state
            }
        case UPDATE_KPI_SUCCESS:
        case UPDATE_KPI_FAIL:

            return {
                ...state
            }
        default:
            return state
    }
}