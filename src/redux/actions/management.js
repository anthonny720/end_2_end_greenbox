import axios from "axios";
import {
    DELETE_CUSTOMER_FAIL,
    DELETE_CUSTOMER_SUCCESS,
    GET_CATEGORIES_FAIL,
    GET_CATEGORIES_SUCCESS,
    GET_CONDITIONS_FAIL,
    GET_CONDITIONS_SUCCESS,
    GET_COSTS_PRODUCTION_FAIL,
    GET_COSTS_PRODUCTION_SUCCESS,
    GET_CURRENCIES_FAIL,
    GET_CURRENCIES_SUCCESS,
    GET_CUSTOMER_FAIL,
    GET_CUSTOMER_SUCCESS,
    GET_CUSTOMERS_FAIL,
    GET_CUSTOMERS_SUCCESS,
    GET_CUTS_FAIL,
    GET_CUTS_SUCCESS,
    GET_FAMILIES_FAIL,
    GET_FAMILIES_SUCCESS,
    GET_LOCATIONS_FAIL,
    GET_LOCATIONS_SUCCESS,
    GET_OUTSOURCINGS_FAIL,
    GET_OUTSOURCINGS_SUCCESS,
    GET_PACKINGS_FAIL,
    GET_PACKINGS_SUCCESS,
    GET_STORAGE_AREAS_FAIL,
    GET_STORAGE_AREAS_SUCCESS,
    GET_SUBFAMILIES_FAIL,
    GET_SUBFAMILIES_SUCCESS,
    GET_SUPPLIERS_FAIL,
    GET_SUPPLIERS_SUCCESS,
    GET_TAXES_FAIL,
    GET_TAXES_SUCCESS,
    GET_TRANSPORTS_FAIL,
    GET_TRANSPORTS_SUCCESS,
    GET_UNITS_FAIL,
    GET_UNITS_SUCCESS,
    LOADING_MANAGEMENT_FAIL,
    LOADING_MANAGEMENT_SUCCESS,
    UPDATE_CUSTOMER_FAIL,
    UPDATE_CUSTOMER_SUCCESS
} from "./types";
import {setAlert} from "./alert";


export const get_customers = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }, params: {...params}
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/management/customers`, config);
        if (res.status === 200) {
            dispatch({type: GET_CUSTOMERS_SUCCESS, payload: res.data});
        } else {
            dispatch({type: GET_CUSTOMERS_FAIL});
        }
    } catch (err) {
        dispatch({type: GET_CUSTOMERS_FAIL});
    }
}
export const get_customer = (slug) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/management/customers/${slug}`, config);
        if (res.status === 200) {
            dispatch({type: GET_CUSTOMER_SUCCESS, payload: res.data});
        } else {
            dispatch({type: GET_CUSTOMER_FAIL});
        }
    } catch (err) {
        dispatch({type: GET_CUSTOMER_FAIL});
    }
}
export const update_customer = (slug, form) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };
    try {
        dispatch({type: LOADING_MANAGEMENT_SUCCESS});
        const res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/management/customers/${slug}`, form, config);
        if (res.status === 200) {
            dispatch({type: UPDATE_CUSTOMER_SUCCESS, payload: res.data});
            dispatch(setAlert(res.data.message, 'success'));
        } else {
            dispatch({type: UPDATE_CUSTOMER_FAIL});
        }
    } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
            dispatch(setAlert(err.response.data.message, 'error'));
        } else {
            dispatch(setAlert('Se produjo un error al actualizar el cliente', 'error'));
        }
        dispatch({type: UPDATE_CUSTOMER_FAIL});
    } finally {
        dispatch({type: LOADING_MANAGEMENT_FAIL});
    }
}
export const delete_customer = (slug, form) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/management/customers/${slug}`, form, config);
        if (res.status === 200) {
            dispatch({type: DELETE_CUSTOMER_SUCCESS, payload: res.data});
            dispatch(setAlert(res.data.message, 'success'));
            dispatch(get_customers(form));
        } else {
            dispatch({type: DELETE_CUSTOMER_FAIL});
        }
    } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
            dispatch(setAlert(err.response.data.message, 'error'));
        } else {
            dispatch(setAlert('Se produjo un error al actualizar el cliente', 'error'));
        }
        dispatch({type: DELETE_CUSTOMER_FAIL});
    }
}

export const get_suppliers = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }, params: {...params}
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/management/suppliers`, config);
        if (res.status === 200) {
            dispatch({type: GET_SUPPLIERS_SUCCESS, payload: res.data});
        } else {
            dispatch({type: GET_SUPPLIERS_FAIL});
        }
    } catch (err) {
        dispatch({type: GET_SUPPLIERS_FAIL});
    }
}
export const get_transports = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }, params: {...params}
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/management/transports`, config);
        if (res.status === 200) {
            dispatch({type: GET_TRANSPORTS_SUCCESS, payload: res.data});
        } else {
            dispatch({type: GET_TRANSPORTS_FAIL});
        }
    } catch (err) {
        dispatch({type: GET_TRANSPORTS_FAIL});
    }
}
export const get_outsourcings = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }, params: {...params}
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/management/outsourcings`, config);
        if (res.status === 200) {
            dispatch({type: GET_OUTSOURCINGS_SUCCESS, payload: res.data});
        } else {
            dispatch({type: GET_OUTSOURCINGS_FAIL});
        }
    } catch (err) {
        dispatch({type: GET_OUTSOURCINGS_FAIL});
    }
}


export const get_storage_areas = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }, params: {...params}
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/management/storage-areas`, config);
        if (res.status === 200) {
            dispatch({type: GET_STORAGE_AREAS_SUCCESS, payload: res.data});
        } else {
            dispatch({type: GET_STORAGE_AREAS_FAIL});
        }
    } catch (err) {
        dispatch({type: GET_STORAGE_AREAS_FAIL});
    }
}

export const get_locations = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }, params: {...params}
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/management/locations`, config);
        if (res.status === 200) {
            dispatch({type: GET_LOCATIONS_SUCCESS, payload: res.data});
        } else {
            dispatch({type: GET_LOCATIONS_FAIL});
        }
    } catch (err) {
        dispatch({type: GET_LOCATIONS_FAIL});
    }
}
export const get_costs = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }, params: {...params}
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/management/costs`, config);
        if (res.status === 200) {
            dispatch({type: GET_COSTS_PRODUCTION_SUCCESS, payload: res.data});
        } else {
            dispatch({type: GET_COSTS_PRODUCTION_FAIL});
        }
    } catch (err) {
        dispatch({type: GET_COSTS_PRODUCTION_FAIL});
    }
}

export const get_units = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }, params: {...params}
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/management/units`, config);
        if (res.status === 200) {
            dispatch({type: GET_UNITS_SUCCESS, payload: res.data});
        } else {
            dispatch({type: GET_UNITS_FAIL});
        }
    } catch (err) {
        dispatch({type: GET_UNITS_FAIL});
    }
}
export const get_categories = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }, params: {...params}
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/management/categories`, config);
        if (res.status === 200) {
            dispatch({type: GET_CATEGORIES_SUCCESS, payload: res.data});
        } else {
            dispatch({type: GET_CATEGORIES_FAIL});
        }
    } catch (err) {
        dispatch({type: GET_CATEGORIES_FAIL});
    }
}

export const get_taxes = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }, params: {...params}
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/management/taxes`, config);
        if (res.status === 200) {
            dispatch({type: GET_TAXES_SUCCESS, payload: res.data});
        } else {
            dispatch({type: GET_TAXES_FAIL});
        }
    } catch (err) {
        dispatch({type: GET_TAXES_FAIL});
    }
}

export const get_currencies = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }, params: {...params}
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/management/currencies`, config);
        if (res.status === 200) {
            dispatch({type: GET_CURRENCIES_SUCCESS, payload: res.data});
        } else {
            dispatch({type: GET_CURRENCIES_FAIL});
        }
    } catch (err) {
        dispatch({type: GET_CURRENCIES_FAIL});
    }
}
export const get_conditions = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }, params: {...params}
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/management/conditions`, config);
        if (res.status === 200) {
            dispatch({type: GET_CONDITIONS_SUCCESS, payload: res.data});
        } else {
            dispatch({type: GET_CONDITIONS_FAIL});
        }
    } catch (err) {
        dispatch({type: GET_CONDITIONS_FAIL});
    }
}

export const get_families = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }, params: {...params}
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/management/families`, config);
        if (res.status === 200) {
            dispatch({type: GET_FAMILIES_SUCCESS, payload: res.data});
        } else {
            dispatch({type: GET_FAMILIES_FAIL});
        }
    } catch (err) {
        dispatch({type: GET_FAMILIES_FAIL});
    }
}
export const get_subfamilies = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }, params: {...params}
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/management/subfamilies`, config);
        if (res.status === 200) {
            dispatch({type: GET_SUBFAMILIES_SUCCESS, payload: res.data});
        } else {
            dispatch({type: GET_SUBFAMILIES_FAIL});
        }
    } catch (err) {
        dispatch({type: GET_SUBFAMILIES_FAIL});
    }
}
export const get_cuts = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }, params: {...params}
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/management/cuts`, config);
        if (res.status === 200) {
            dispatch({type: GET_CUTS_SUCCESS, payload: res.data});
        } else {
            dispatch({type: GET_CUTS_FAIL});
        }
    } catch (err) {
        dispatch({type: GET_CUTS_FAIL});
    }
}
export const get_packings = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }, params: {...params}
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/management/packings`, config);
        if (res.status === 200) {
            dispatch({type: GET_PACKINGS_SUCCESS, payload: res.data});
        } else {
            dispatch({type: GET_PACKINGS_FAIL});
        }
    } catch (err) {
        dispatch({type: GET_PACKINGS_FAIL});
    }
}