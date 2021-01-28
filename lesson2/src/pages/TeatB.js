import React, { useReducer } from 'react'
import { countReducer } from '../store/index.js'

const TestB = () => {
  const [count, dispatch] = useReducer(countReducer, 0);
  return (
    <div>{count}</div>
  )
}

export default TestB