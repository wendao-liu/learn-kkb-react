const createStore = (reducer, enhancer) => {

  if(enhancer) {
    return enhancer(createStore)(reducer);
  }

  let currentState;
  let currentListeners = []

  const dispatch = (action) => {
    currentState = reducer(currentState, action);
    currentListeners.forEach((listen) => listen())
  }

  const subscribe = (listen) => {
    currentListeners.push(listen);
    return () => {
      currentListeners = currentListeners.filter(item => item !== listen)
    }
  }
  const getState = () => {
    return currentState;
  }
  dispatch('kkkkkkkkkkkkkkkk./bbbbbbbbbbbbbbbb')
  return {
    dispatch,
    subscribe,
    getState,
  }
}

export default createStore;