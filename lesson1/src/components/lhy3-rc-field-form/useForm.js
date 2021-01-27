import { useRef } from 'react';

class FormStore {
  constructor() {
    this.store = {}
    this.fieldEntrite = []
    this.callback = {};
  }
  submit = () => {
    const { onFinish } = this.callback
    onFinish(this.store)
  }
  getFieldValue = (name) => {
    return this.store[name]
  }
  setFieldsValue = (newStore) => {
    this.store = {
      ...this.store,
      ...newStore
    }

    this.fieldEntrite.forEach((entrite) => {
      Object.keys(newStore).forEach((key) => {
        if(key === entrite.props.name) {
          entrite.onStoreChange();
        }
      })
    })
  }

  registerField = (entrite) => {
    this.fieldEntrite.push(entrite);
    return () => {
      this.fieldEntrite = this.fieldEntrite.filter(item => item !== entrite);
      delete this.store[entrite.props.name]
    }
  }

  setCallback = ({ onFinish, onFinishFailed }) => {
    this.callback = { onFinish, onFinishFailed }
  }

  getForm = () => {
    return {
      submit: this.submit,
      getFieldValue: this.getFieldValue,
      setFieldsValue: this.setFieldsValue,
      registerField: this.registerField,
      setCallback: this.setCallback
    };
  };
}


export default function useForm(form) {
  const formRef = useRef();
  if (!formRef.current) {
    if(form) {
      formRef.current = form
    }else {
      const formStore = new FormStore();
      formRef.current = formStore.getForm();
    }
  }
  return [formRef.current]
} 