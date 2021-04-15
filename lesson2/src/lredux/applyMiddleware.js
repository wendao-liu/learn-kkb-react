
// applyMiddleware(thunk, logger)(createStore)(reducer)
// [thunk, logger]
export default function applyMiddleware(...middlewares) {
  return (createStore) => (reducer) => {
    const store = createStore(reducer);
    const { getState } = store;
    let dispatch = store.dispatch;
    const midApi = {
      getState,
      // dispatch: action => dispatch(action)
      dispatch: action => dispatch(action)
    }
    const middlewareChain = middlewares.map(middleware => middleware(midApi))
    dispatch = compose(...middlewareChain)(dispatch);
    return {
      ...store,
      dispatch,
    }
  }
}

// let arr = [thunk({dispatch, getState}), logger({dispatch, getState})]
// compose(arr)(dispatch)
const compose = (...funcs) => {
  // if(funcs.length === 0) {
  //   return arg => arg;
  // }

  // if(funcs.length === 1) {
  //   return funcs[0]
  // }
  //  ...args = dispatch
  // [thunk({dispatch, getState}),logger({dispatch, getState})]
  // logger({dispatch, getState})(thunk({dispatch, getState})(fn-dispatch))

  return funcs.reduce((a, b) => (...args) => {
    // a(...args)
    return a(b(...args))
  })
}
// (action) => {
//     if (typeof action === 'function') {
//       return action(dispatch, getState)
//     }
//     console.log(getState(),'thunk')
//     return next(action);
//   }

// dispatch = function logger({ dispatch, getState }) {
//   return next => action => {
//     console.log("+++++++++++++++++++++++++++++++"); //sy-log

//     // prev state

//     const prevState = getState();
//     console.log("prev state", prevState); //sy-log

//     next(action);
//     console.log(action,'logger----')
//     console.log(getState(),'logger')

//     // next state
//     const nextState = getState();
//     console.log("next state", nextState); //sy-log

//     console.log("+++++++++++++++++++++++++++++++"); //sy-log

//     return returnValue;
//   };
// }

// // 这是处理异步的thunk中间件
// function thunk({ getState, dispatch }) {
//   return (next) => (action) => {
//     if (typeof action === 'function') {
//       return action(dispatch, getState)
//     }
//     console.log(getState(),'thunk')
//     return next(action);
//   }
// }
