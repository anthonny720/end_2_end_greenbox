import {GET_COSTS_FAIL, GET_COSTS_SUCCESS, UPDATE_COSTS_FAIL, UPDATE_COSTS_SUCCESS} from '../actions/types';

const initialState = {
    costs: null,
}
export default function Finances(state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case GET_COSTS_SUCCESS:
            return {
                ...state, costs: payload.data
            }
        case GET_COSTS_FAIL:
            return {
                ...state, costs: null
            }

        case UPDATE_COSTS_SUCCESS:
        case UPDATE_COSTS_FAIL:
            return {
                ...state
            }
        default:
            return state;
    }
}