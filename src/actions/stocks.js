import { FETCH_BY_SEARCH, CREATE, DELETE, START_LOADING, END_LOADING } from '../constants/actionTypes';
import * as api from '../api/index.js';


export const getStocksBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data: { data } } = await api.fetchStocksBySearch(searchQuery);

        dispatch({ type: FETCH_BY_SEARCH, payload: { data }});
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
};

export const createStock = (stock) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const {data} = await api.createStock(stock);
        dispatch({type: CREATE, payload: data});
    } catch (error) {
        console.log(error);
    }
};

export const deleteStock = (id) => async (dispatch) => {
    try {
        await api.deleteStock(id);

        dispatch({type: DELETE, payload: id});
    } catch (error) {
        console.log(error);
    }
};