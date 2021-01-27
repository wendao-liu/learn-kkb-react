export default (...middlewares) => {
  return (createStore) => (reducer) => {
    console.log(11)
    const store = createStore(reducer)
    const { getState } = store
    const midApi = {
      getState,
      dispatch: (action) => dispatch(action)
    }
    middlewares = middlewares.map((middleware) => middleware(midApi))
    const dispatch = compose(...middlewares)(store.dispatch)

    return {
      ...store,
      dispatch,
    }
  }
}

const compose = (...fns) => {
  if (fns.length === 0) {
    return arg => arg
  }
  if (fns.length === 1) {
    return fns[0]
  }
  return fns.reduce((a, b) => (...args) => b(a(...args)))
}


