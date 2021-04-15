import React, { createContext, useContext, useLayoutEffect, useReducer } from "react";
const Context = createContext();


const Provider = ({ children, store }) => {
  return <Context.Provider value={store}>{children}</Context.Provider>
}

const useStore = () => {
  const store = useContext(Context);
  return store;
}

const bindActionCreator = (creator, dispatch) => {
  return (...args) => {
    console.log(args, 'args'); // lhy-log
    return dispatch(creator(...args))
  }
}

const bindActionCreators = (creators, dispatch) => {
  const obj = {}
  Object.keys(creators).forEach((key) => {
    obj[key] = bindActionCreator(creators[key], dispatch)
  })
  return obj
}

const connect = (
  mapStateToProps = state => state,
  mapDispatchToProps
) => (Component) => (props) => {

  const store = useStore();
  const { getState, dispatch, subscribe } = store;
  const [ignore, forceUpdate] = useReducer(x => x + 1, 0);

  useLayoutEffect(() => {
    const unsubscribe = subscribe(() => {
      forceUpdate();
    })
    return () => unsubscribe()
  }, [])
  const stateProps = mapStateToProps(getState())
  let dispatchProps = {}
  if (typeof mapDispatchToProps === 'object') {
    dispatchProps = bindActionCreators(mapDispatchToProps, dispatch)
  } else if (typeof mapDispatchToProps === 'function') {
    dispatchProps = mapDispatchToProps(dispatch);
  }
  dispatchProps.dispatch = dispatch

  return (
    <Component
      {...props}
      {...stateProps}
      {...dispatchProps}
    />
  )
}

const useSelector = (selector) => {
  const store = useStore();
  const { getState, subscribe } = store
  const selectorState = selector(getState())
  const [ignore, forceUpdate] = useReducer(x => x + 1, 0);
  useLayoutEffect(() => {
    const unsubscribe = subscribe(() => {
      forceUpdate();
    })
    return () => unsubscribe()
  }, [])
  return selectorState
}

const useDispatch = () => {
  const store = useStore();
  const { dispatch } = store

  return dispatch
}

export {
  Provider,
  connect,
  bindActionCreators,
  useDispatch,
  useSelector,
}
