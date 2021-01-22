import React, {useState, useImperativeHandle} from 'react';
import FieldContext from './FieldContext';
import useForm from './useForm'

const Form = ({ children, form, onFinish, onFinishFailed }, ref) => {
  const [formInstance] = useForm(form);
  useImperativeHandle(ref,()=>formInstance)
  formInstance.setCallback({onFinish,onFinishFailed});
  return (
    <form
      onSubmit={(e) => {
        console.log(formInstance.submit(),'提交')
        e.preventDefault();
      }}
    >
      <FieldContext.Provider value={formInstance}>
        {children}
      </FieldContext.Provider>
    </form>
  )
}

export default Form;