import React, { useReducer, useEffect } from 'react'
import { countReducer } from '../store/index.js'

const TestA = () => {
  const [count, dispatch] = useReducer(countReducer, 0);
  useEffect(() => {

  })
  return (
    <div onClick={() => {
      dispatch({
        type: 'ADD'
      })
    }}>{count}</div>
  )
}

export default TestA