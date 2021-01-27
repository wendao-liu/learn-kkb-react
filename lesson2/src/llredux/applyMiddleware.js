

export default function applyMiddleware(...middlewares) {
  return (createStore) => (reducer) => {
    const store = createStore(reducer);
    let dispatch = store.dispatch;
    const { getState } = store;
    let midApi = {
      getState,
      dispatch: (action) => dispatch(action)
    }
    const middlewareChain = middlewares.map((middleware) => middleware(midApi))
    dispatch = compose(...middlewareChain)(dispatch)
    return {
      ...store,
      dispatch,
    }
  }
}

const compose = (...fns) => {
  if (fns.length === 0) {
    return args => args
  }
  if (fns.length === 1) {
    return fns[0]
  }

  return fns.reduce((a, b) => (...args) => b(a(...args)));
}