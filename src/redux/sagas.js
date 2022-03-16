// src/store/sagas.js

import { all, fork } from "redux-saga/effects";

import ParentSaga from "./parents/saga";

export default function* rootSaga() {
  yield all([fork(ParentSaga)]);
}