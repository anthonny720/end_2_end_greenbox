import {
    GET_CLIENTS_FAIL,
    GET_CLIENTS_SUCCESS,
    GET_LOCATIONS_FAIL,
    GET_LOCATIONS_SUCCESS,
    GET_MAQUILA_FAIL,
    GET_MAQUILA_SUCCESS,
    GET_PACKING_FAIL,
    GET_PACKING_SUCCESS,
    GET_TRANSPORT_FAIL,
    GET_TRANSPORT_SUCCESS,
    GET_ZONES_FAIL,
    GET_ZONES_SUCCESS
} from "../actions/types";

const initialState = {
    clients: null, providers_packing: null,
    suppliers_maquila: null,
    providers_transport: null,
    locations: null,
    zones: null
}

export default function Management(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case GET_CLIENTS_SUCCESS:
            return {
                ...state, clients: payload.data
            }
        case GET_CLIENTS_FAIL:
            return {
                ...state, clients: null
            }
        case GET_MAQUILA_SUCCESS:
            return {
                ...state, suppliers_maquila: payload.data
            }
        case GET_MAQUILA_FAIL:
            return {
                ...state, suppliers_maquila: null
            }
        case GET_PACKING_SUCCESS:
            return {
                ...state, providers_packing: payload.data
            }
        case GET_PACKING_FAIL:
            return {
                ...state, providers_packing: null
            }
        case GET_TRANSPORT_SUCCESS:
            return {
                ...state, providers_transport: payload.data
            }
        case GET_TRANSPORT_FAIL:
            return {
                ...state, providers_transport: null
            }
        case GET_LOCATIONS_SUCCESS:
            return {
                ...state, locations: payload.data
            }
        case GET_LOCATIONS_FAIL:
            return {
                ...state, locations: null
            }
        case GET_ZONES_SUCCESS:
            return {
                ...state, zones: payload.data
            }
        case GET_ZONES_FAIL:
            return {
                ...state, zones: null
            }

        default:
            return state
    }
}