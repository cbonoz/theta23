import { FETCH_BY_SEARCH, CREATE, DELETE, START_LOADING, END_LOADING } from '../constants/actionTypes';

export default (state = { isLoading: true, stocks: []}, action) => {
    switch (action.type) {
        case START_LOADING:
            return {...state, isLoading: true };
        case END_LOADING:
            return {...state, isLoading: false };
        case DELETE:
            return { ...state, stocks: state.stocks.filter((stock) => stock._id !== action.payload)};
        case FETCH_BY_SEARCH:
            return { ...state, stocks: action.payload.data };
        case CREATE:
            return { ...state, stocks: [...state.stocks, action.payload]};
        default:
            return state;
    }
}