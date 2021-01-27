export default function createStore(reducer, enhancer) {
  if (enhancer) {
    return enhancer(createStore)(reducer)
  }
  let currentState
  let currentListeners = []

  const dispatch = (action) => {
    console.log(currentState, 'currentState')
    currentState = reducer(currentState, action)
    currentListeners.forEach((listen) => listen())
  }
  const subscribe = (listen) => {
    currentListeners.push(listen)
    return () => {
      currentListeners = currentListeners.filter(item => item !== listen)
    }
  }
  const getState = () => {
    return currentState
  }

  dispatch('111111-2222222')

  return {
    getState,
    subscribe,
    dispatch
  }
}