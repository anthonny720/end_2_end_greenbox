import {
    GET_MATERIALS_FAIL,
    GET_MATERIALS_SUCCESS,
    GET_PRODUCTS_KARDEX_FAIL,
    GET_PRODUCTS_KARDEX_SUCCESS,
    GET_SUMMARY_KARDEX_FAIL,
    GET_SUMMARY_KARDEX_SUCCESS,
    REMOVE_SYNC_MATERIALS_LOADING,
    REMOVE_SYNC_PRODUCTS_KARDEX_LOADING,
    SET_SYNC_MATERIALS_LOADING,
    SET_SYNC_PRODUCTS_KARDEX_LOADING,
    SYNC_MATERIALS_FAIL,
    SYNC_MATERIALS_SUCCESS,
    SYNC_PRODUCTS_KARDEX_FAIL,
    SYNC_PRODUCTS_KARDEX_SUCCESS
} from "../actions/types";

const initialState = {
    materials: null, products: null, summary: null, fcl_summary: null, loading: false
}

export default function Inventory(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case SET_SYNC_MATERIALS_LOADING:
            return {
                ...state,
                loading: true
            }
        case REMOVE_SYNC_MATERIALS_LOADING:
            return {
                ...state,
                loading: false
            }
        case SET_SYNC_PRODUCTS_KARDEX_LOADING:
            return {
                ...state,
                loading: true
            }
        case REMOVE_SYNC_PRODUCTS_KARDEX_LOADING:
            return {
                ...state,
                loading: false
            }

        case GET_MATERIALS_SUCCESS:
            return {
                ...state, materials: payload.data
            }
        case GET_MATERIALS_FAIL:
            return {
                ...state, materials: null
            }
        case GET_PRODUCTS_KARDEX_SUCCESS:
            return {
                ...state, products: payload.data, summary: payload.summary
            }
        case GET_PRODUCTS_KARDEX_FAIL:
            return {
                ...state, products: null, summary: null
            }
        case GET_SUMMARY_KARDEX_SUCCESS:
            return {
                ...state, fcl_summary: payload.data
            }
        case GET_SUMMARY_KARDEX_FAIL:
            return {
                ...state, fcl_summary: null
            }
        case SYNC_MATERIALS_SUCCESS:
        case SYNC_MATERIALS_FAIL:
        case SYNC_PRODUCTS_KARDEX_SUCCESS:
        case SYNC_PRODUCTS_KARDEX_FAIL:
            return {
                ...state
            }
        default:
            return state
    }
}