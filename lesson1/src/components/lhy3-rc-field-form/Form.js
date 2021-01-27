import React, { useImperativeHandle } from 'react'
import FieldContext from './FieldContext';
import useForm from './useForm';
const Form = ({ children, onFinish, onFinishFailed }, ref) => {
  const [formInstance] = useForm();
  useImperativeHandle(ref, () => formInstance)
  formInstance.setCallback({
    onFinish,
    onFinishFailed,
  })


  console.log(formInstance)
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        formInstance.submit();
      }}
    >
      <FieldContext.Provider value={formInstance}>
        {children}
      </FieldContext.Provider>
    </form>
  )
}

export default Form