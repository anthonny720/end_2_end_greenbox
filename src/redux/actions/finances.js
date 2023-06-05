import {GET_COSTS_FAIL, GET_COSTS_SUCCESS, UPDATE_COSTS_FAIL, UPDATE_COSTS_SUCCESS} from './types'

import axios from "axios";
import {setAlert} from "./alert";


export const get_costs = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }, params: {
            ...params
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/finances/costs`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_COSTS_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_COSTS_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_COSTS_FAIL
        });

    }
}


export const update_costs = (form, params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/finances/costs/update`, form, config);
        if (res.status === 200) {
            dispatch({
                type: UPDATE_COSTS_SUCCESS,
            });
            dispatch(setAlert(res.data.message, 'success'));
            dispatch(get_costs(params))
        } else {
            dispatch({
                type: UPDATE_COSTS_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: UPDATE_COSTS_FAIL
        });
        dispatch(setAlert(err.response.data['error'], 'error'));


    }
}
