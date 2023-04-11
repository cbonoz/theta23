import { FETCH_BY_SEARCH, CREATE, DELETE, START_LOADING, END_LOADING } from '../constants/actionTypes';
import * as api from '../api/index.js';


export const getShopsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data: { data } } = await api.fetchShopsBySearch(searchQuery);

        dispatch({ type: FETCH_BY_SEARCH, payload: { data }});
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
};

export const createShop = (shop) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const {data} = await api.createShop(shop);
        dispatch({type: CREATE, payload: data});
    } catch (error) {
        console.log(error);
    }
};

export const deleteShop = (id) => async (dispatch) => {
    try {
        await api.deleteShop(id);

        dispatch({type: DELETE, payload: id});
    } catch (error) {
        console.log(error);
    }
};