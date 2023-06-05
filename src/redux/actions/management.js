import axios from "axios";
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
    GET_TRANSPORT_SUCCESS, GET_ZONES_FAIL, GET_ZONES_SUCCESS
} from "./types";


export const get_clients = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }, params: {...params}
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/management/clients`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_CLIENTS_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_CLIENTS_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_CLIENTS_FAIL
        });
    }
}
export const get_providers_transport = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }, params: {...params}
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/management/providers_transport`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_TRANSPORT_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_TRANSPORT_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_TRANSPORT_FAIL
        });
    }
}
export const get_suppliers_maquila = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }, params: {...params}
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/management/suppliers_maquila`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_MAQUILA_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_MAQUILA_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_MAQUILA_FAIL
        });
    }
}
export const get_providers_packing = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }, params: {...params}
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/management/providers_packing`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_PACKING_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_PACKING_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_PACKING_FAIL
        });
    }
}
export const get_location = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }, params: {...params}
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/management/locations`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_LOCATIONS_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_LOCATIONS_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_LOCATIONS_FAIL
        });
    }
}
export const get_zones = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }, params: {...params}
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/management/zones`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_ZONES_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_ZONES_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_ZONES_FAIL
        });
    }
}
