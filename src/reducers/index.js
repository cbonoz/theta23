import { combineReducers } from "redux";

import posts from './posts';
import stocks from './stocks';
import shops from './shops';
import authReducer from './auth';

export default combineReducers({ posts, stocks, shops, authReducer });