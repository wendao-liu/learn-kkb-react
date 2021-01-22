import React, { useRef, Component } from 'react';

class FormStore {
  constructor(props) {
    this.store = {}
    this.fieldEntities = [];
    this.callback = {}
  }

  validate = () => {
    const err = []
    this.fieldEntities.forEach((entity) => {
      const { rules, name } = entity.props;
      const { required, message } = rules[0]
      const value = this.getFieldValue(name);
      if(required && !this.store[name]) {
        err.push({
          value,
          [name]: message,
        })
      }
    })
    return err
  }


  submit = () => {
    const err = this.validate()
    return err
  }

  registerField = (entity) => { 
    this.fieldEntities.push(entity);
    return () => {
      this.fieldEntities = this.fieldEntities.filter((item) => item !== entity)
      delete this.store[entity.props.name]
    }
  }
  getFieldValue = (name) => { 
    return this.store[name]
  }

  setFieldsValue = (newStore) => {
    this.store ={
      ...this.store,
      ...newStore,
    }

    this.fieldEntities.forEach((entity) => {
      console.log(entity.onStoreChange(),'entity')
        const { name } = entity.props;
        Object.keys(newStore).forEach((key) => {
          if(key === name) {
            entity.onStoreChange();
          }
        })
    })
  }

  setCallback = ({onFinish, onFinishFailed}) => { 
    this.callback = {
      onFinish, 
      onFinishFailed,
    }
  }

  getForm = () => {
    return {
      submit: this.submit,
      getFieldValue: this.getFieldValue,
      setFieldsValue: this.setFieldsValue,
      registerField: this.registerField,
      setCallback: this.setCallback
    }
  }
}

const useForm = (form) => {
  const formRef = useRef();
  if (!formRef.current) {
    if(form) {
      formRef.current = form;
    }else {
      const formStore = new FormStore();
      formRef.current = formStore.getForm();
    }
  }
  return [formRef.current]
}

export default useForm;