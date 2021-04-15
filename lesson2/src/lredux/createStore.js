const createStore = (reducer, enhancer) => {

  let currentState;
  let currentListeners = [];

  if (enhancer) {
    // applyMiddleware(thunk, logger)(createStore)(reducer)
    return enhancer(createStore)(reducer)
  }


  const dispatch = (action) => {
    currentState = reducer(currentState, action)
    currentListeners.forEach(listener => listener())
  }

  const subscribe = (listener) => {
    currentListeners.push(listener);
    return () => {
      currentListeners = currentListeners.filter(item => item !== listener);
    }
  }

  const getState = () => {
    return currentState;
  }

  dispatch({ type: "KKKKKKKKREDUX/OOOOOOOOOO" });


  return {
    dispatch,
    subscribe,
    getState,
  }
}

export default createStore;