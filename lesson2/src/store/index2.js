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

const store = createStore(
  // countReducer,
  combineReducers({count: countReducer}),
  applyMiddleware(thunk,logger)
);

// function logger({ dispatch, getState }) {
//   return next => action => {
//     debugger
//     console.log("+++++++++++++++++++++++++++++++"); //sy-log

//     // prev state

//     const prevState = getState();
//     console.log("prev state", prevState); //sy-log

//     next(action);
//     console.log(action, 'logger----')
//     console.log(getState(), 'logger')

//     // next state
//     const nextState = getState();
//     console.log("next state", nextState); //sy-log

//     console.log("+++++++++++++++++++++++++++++++"); //sy-log
//     console.log(next, action, 'next,action-logger')
//     // return returnValue;
//   };
// }

// // 这是处理异步的thunk中间件
// function thunk({ getState, dispatch }) {
//   return (next) => (action) => {
//     debugger
//     if (typeof action === 'function') {
//       return action(dispatch, getState)
//     }
//     console.log(getState(), 'thunk111')
//     next(action);
//     console.log(next, action, 'next,action-thunk')
//     // return c;
//   }
// }

export default store;
