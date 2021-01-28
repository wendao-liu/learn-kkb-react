// import {createStore, applyMiddleware, combineReducers} from "redux";
import { createStore, applyMiddleware } from "../lllredux/";

// import thunk from "redux-thunk";
// import logger from "redux-logger";

// import {createStore} from "../kredux/";

// 定义修改规则
function countReducer(state = 0, action) {
  switch (action.type) {
    case "ADD":
      return state + 1;
    case "MINUS":
      return state - action.payload || 1;
    default:
      return state;
  }
}

function colorReducer(state = 0, action) {
  switch (action.type) {
    case "ADD":
      return state + 1;
    case "MINUS":
      return state - action.payload || 1;
    default:
      return state;
  }
}


function combineReducers(reducers) {
  return (state = {}, action) => {
    const nextState = {};
    let hasChanged = false
    for (let key in reducers) {
      let reducer = reducers[key];
      nextState[key] = reducer(state[key], action);
      hasChanged = hasChanged || nextState[key];
    }
    hasChanged = hasChanged || Object.keys(nextState).length !== Object.keys(state).length
    return hasChanged ? nextState : state
  }
}

const store = createStore(
  combineReducers({ count: countReducer, color: colorReducer }),
  applyMiddleware(thunk, logger, promise)
);

const isPromise = (f) => {
  return Object.prototype.toString.call(f) === '[object Promise]'
}

function promise({ dispatch }) {
  // let test = Promise.resolve({
  //   test: 123
  // })
  // const testb = (action) => {
  //   console.log(action, 'action')
  // }
  // test.then(testb);
  // test.then((res) => { testb(res) });
  return next => action => {
    return isPromise(action) ? action.then(dispatch) : next(action);
  };
}

function logger({ dispatch, getState }) {
  return next => action => {
    console.log("+++++++++++++++++++++++++++++++"); //sy-log

    // prev state

    const prevState = getState();
    console.log("prev state", prevState); //sy-log

    const returnValue = next(action);
    // next state
    const nextState = getState();
    console.log("next state", nextState); //sy-log

    console.log("+++++++++++++++++++++++++++++++"); //sy-log

    return returnValue;
  };
}

// 这是处理异步的thunk中间件
function thunk({ dispatch, getState }) {
  return next => action => {
    if (typeof action === "function") {
      return action(dispatch, getState);
    }
    return next(action);
  };
}

export { countReducer }

export default store;
