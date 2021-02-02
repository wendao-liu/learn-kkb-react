import { loginReducer } from "./loginReducer";
import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk'
import createSaga from 'redux-saga'
import loginSaga from "../action/loginSaga";

const saga = createSaga()
const store = createStore(
  combineReducers({ user: loginReducer }),
  applyMiddleware(saga),
)
saga.run(loginSaga)

export default store;
