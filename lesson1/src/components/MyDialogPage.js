import React, { Component, useEffect, useState } from "react";
import { createPortal } from 'react-dom'


export default () => {
  const [node, setNode] = useState()
  useEffect(() => {
    const n = document.createElement('div');
    setNode(n)
    document.body.appendChild(n)
    return () => {
      if (n) {
        document.body.removeChild(n)
      }
    }
  }, [])

  return node ? createPortal(<div className="dialog">
    <h3>Dialog</h3>
  </div>, node) : null
}