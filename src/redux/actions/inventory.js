import axios from "axios";
import {
    GET_MATERIALS_FAIL,
    GET_MATERIALS_SUCCESS,
    GET_PRODUCTS_KARDEX_FAIL,
    GET_PRODUCTS_KARDEX_SUCCESS,
    GET_SUMMARY_KARDEX_FAIL,
    GET_SUMMARY_KARDEX_SUCCESS,
    LOADING_RECORDS_MP_SUCCESS,
    REMOVE_SYNC_MATERIALS_LOADING,
    REMOVE_SYNC_PRODUCTS_KARDEX_LOADING,
    SET_SYNC_MATERIALS_LOADING,
    SET_SYNC_PRODUCTS_KARDEX_LOADING,
    SYNC_MATERIALS_FAIL,
    SYNC_PRODUCTS_KARDEX_FAIL,
    SYNC_PRODUCTS_KARDEX_SUCCESS
} from "./types";
import {setAlert} from "./alert";

export const get_materials = (params) => async dispatch => {

    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }, params: {...params}
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/inventory/materials`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_MATERIALS_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_MATERIALS_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_MATERIALS_FAIL
        });
    }
}
export const sync_materials = () => async dispatch => {
    dispatch({type: SET_SYNC_MATERIALS_LOADING})
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/inventory/sync/materials`, config);
        if (res.status === 200) {
            dispatch({
                type: LOADING_RECORDS_MP_SUCCESS
            });
            dispatch(setAlert('Sincronización exitosa', 'success'));
            dispatch(get_materials());
            dispatch({type: REMOVE_SYNC_MATERIALS_LOADING})
        } else {
            dispatch({
                type: SYNC_MATERIALS_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: SYNC_MATERIALS_FAIL
        });
        dispatch(setAlert('Error al sincronizar', 'danger'));
        dispatch({type: REMOVE_SYNC_MATERIALS_LOADING})
    }
}


export const get_products_kardex = (params) => async dispatch => {

    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }, params: {...params}
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/inventory/products`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_PRODUCTS_KARDEX_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_PRODUCTS_KARDEX_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_PRODUCTS_KARDEX_FAIL
        });
    }
}
export const sync_products_kardex = () => async dispatch => {
    dispatch({type: SET_SYNC_PRODUCTS_KARDEX_LOADING})
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/inventory/sync/products`, config);
        if (res.status === 200) {
            dispatch({
                type: SYNC_PRODUCTS_KARDEX_SUCCESS
            });
            dispatch(setAlert('Sincronización exitosa', 'success'));
            dispatch(get_products_kardex());
            dispatch({type: REMOVE_SYNC_PRODUCTS_KARDEX_LOADING})
        } else {
            dispatch({
                type: SYNC_PRODUCTS_KARDEX_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: SYNC_PRODUCTS_KARDEX_FAIL
        });
        dispatch(setAlert('Error al sincronizar', 'danger'));
        dispatch({type: REMOVE_SYNC_PRODUCTS_KARDEX_LOADING})
    }
}

export const get_summary = () => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/inventory/summary/products`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_SUMMARY_KARDEX_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_SUMMARY_KARDEX_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_SUMMARY_KARDEX_FAIL
        });
    }
}
