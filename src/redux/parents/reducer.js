// src/store/posts/reducer.js

import {
    GET_PARENTS_SUCCESS
  } from "./actionTypes";
  
  const initialState = {
    parents: []
  };
  
  const ParentReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_PARENTS_SUCCESS:
        state = { ...state, parents: action.payload };
        break;
      default:
        state = { ...state };
        break;
    }
    return state;
  };
  
  export default ParentReducer;