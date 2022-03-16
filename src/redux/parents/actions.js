// src/store/posts/actions.js

import {
    GET_PARENTS_SUCCESS,
    GET_PARENTS
  } from "./actionTypes";
  
  export const getParents = () => {
    return {
      type: GET_PARENTS,
    };
  };

  export const getParentsSuccess = (posts) => {
    return {
      type: GET_PARENTS_SUCCESS,
      payload: posts,
    };
  };