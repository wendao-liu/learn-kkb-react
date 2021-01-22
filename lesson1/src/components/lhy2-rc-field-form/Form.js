import React, {cloneElement, useImperativeHandle} from 'react';
import FieldContext from './FieldContext';
import useForm from './useForm';

const Form = ({children, form,   onFinishFailed, onFinish }, ref) => {
  const [ formInstance ] = useForm(form);
  useImperativeHandle(ref, () => formInstance);
  formInstance.setCallback({
    onFinishFailed,
    onFinish,
  })
  return (
    <form
      onSubmit={(e) => {
        formInstance.submit();
        e.preventDefault();
      }}
    >
      <FieldContext.Provider value={formInstance}>
        {
          children
        }
      </FieldContext.Provider>
    </form>
  )
}


export default Form;
