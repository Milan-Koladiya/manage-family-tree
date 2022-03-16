import { takeLatest, put, call } from "redux-saga/effects";

import { GET_PARENTS_SUCCESS, GET_PARENTS } from "./actionTypes";

import {
  getParentsSuccess
} from "./actions";

import { getParents } from "../../api/backend_helper";

export const getPosts = () => {
  return {
    type: GET_PARENTS,
  };
};

function* onGetParents() {
  try {
    const response = yield call(getParents);
    yield put(getParentsSuccess(response));
    yield put(getParentsSuccess(response));
  } catch (error) {
    console.log("Error Occured");
  }
}

function* CartSaga() {
  yield takeLatest(GET_PARENTS, onGetParents);
}

export default CartSaga;