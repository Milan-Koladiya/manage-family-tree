// src/store/reducers.js

import { combineReducers } from "redux";

import ParentReducer from "./parents/reducer";

const rootReducer = combineReducers({
    ParentReducer,
});

export default rootReducer;