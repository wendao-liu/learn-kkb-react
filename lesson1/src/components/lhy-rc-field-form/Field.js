import React, { Component, cloneElement, useState, useContext, useReducer, useRef, useEffect, useMemo } from 'react';
import FieldContext from './FieldContext'


const Field = (props) => {
  const { registerField, getFieldValue, setFieldsValue, getFiledsPorps, getCurrent } = useContext(FieldContext);
  const [count, forceUpdate] = useReducer((num) => num + 1, 0)
  const propsRef = useRef();
  propsRef.current = props;

  console.log(propsRef.current,'----', getCurrent())
  useEffect(() => {
    const unRegisterField = registerField({
      props: propsRef,
      onStoreChange: forceUpdate
    })
    return () => {
      unRegisterField()
    }
  }, [])

  const getControlled = () => {
    const { name } = props;
    return {
      value: getFieldValue(name), //"omg", //比如说个仓库可以存储这个value，那这里直接get
      onChange: event => {
        const newValue = event.target.value;
        // 想要重新设置input value， 那执行仓库的set函数就可以了吧
        // 设置对象，name是个变量
        setFieldsValue({ [name]: newValue });
      }
    };
  };

  const renderChildren = useMemo(() => {
    const { children } = props;
    const returnChildNode = React.cloneElement(children, getControlled());
    return returnChildNode
  }, [props, count])

  return renderChildren
}

export default Field;