import axios from "axios";
import {
    GET_RECORDS_MP_FAIL,
    GET_RECORDS_MP_SUCCESS,
    LOADING_RECORDS_MP_FAIL,
    LOADING_RECORDS_MP_SUCCESS,
    UPDATE_RECORD_MP_FAIL,
    UPDATE_RECORD_MP_SUCCESS
} from "./types";
import {setAlert} from "./alert";

export const get_records_mp = (category, params) => async dispatch => {
    dispatch({type: LOADING_RECORDS_MP_SUCCESS});

    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }, params: {...params}
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/operations/records/${category}`, config);

        if (res.status === 200) {
            dispatch({type: GET_RECORDS_MP_SUCCESS, payload: res.data});
        } else {
            dispatch({type: GET_RECORDS_MP_FAIL});
        }
    } catch (err) {
        dispatch({type: GET_RECORDS_MP_FAIL});

    } finally {
        dispatch({type: LOADING_RECORDS_MP_FAIL})
    }
}
export const update_records_mp = (id, form, category, params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/operations/records/${id}`, form, config);
        if (res.status === 200) {
            dispatch({
                type: UPDATE_RECORD_MP_SUCCESS, payload: res.data
            });
            dispatch(setAlert(res.data.message, 'success'));
            dispatch(get_records_mp(category, params));
        } else {
            dispatch({
                type: UPDATE_RECORD_MP_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: UPDATE_RECORD_MP_FAIL
        });
        dispatch(setAlert(err.response.data['error'], 'error'));

    }
}

