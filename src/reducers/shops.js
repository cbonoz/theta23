import { FETCH_BY_SEARCH, CREATE, DELETE, START_LOADING, END_LOADING } from '../constants/actionTypes';

export default (state = { isLoading: true, shops: []}, action) => {
    switch (action.type) {
        case START_LOADING:
            return {...state, isLoading: true };
        case END_LOADING:
            return {...state, isLoading: false };
        case DELETE:
            return { ...state, shops: state.shops.filter((shop) => shop._id !== action.payload)};
        case FETCH_BY_SEARCH:
            return { ...state, shops: action.payload.data };
        case CREATE:
            return { ...state, shops: [...state.shops, action.payload]};
        default:
            return state;
    }
}