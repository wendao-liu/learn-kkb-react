import React, {useRef} from 'react';

class FormStore {
  constructor() {
    this.store = {}
    this.fieldEntite = []
    this.callbacks = {}
  }

  submit = () => {
    const {onFinish} = this.callbacks;
    onFinish(this.store)
  }

  getFieldValue = (name) => {
    return this.store[name]
  }

  setFieldsValue = (newStore) => {
    this.store = {
      ...this.store,
      ...newStore,
    }

    console.log(this.store,'this.store')

    this.fieldEntite.forEach((entite) => {
      entite.onStoreChange()
      // Object.keys(newStore).forEach((key) =>{
      //   const { name } = entite.props;
      //   if(name === key) {
      //     entite.onStoreChange()
      //   }
      // })
    })
  }

  registerField = (entite) => {
    this.fieldEntite.push(entite)
    return () => {
      this.fieldEntite = this.fieldEntite.filter(item => item!== entite)
      const { name } =entite.props;
      delete this.store[name];
    }
  }

  setCallback = ({ onFinishFailed,onFinish}) => {
    this.callbacks = {
      onFinishFailed,
      onFinish,
    }
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


const useForm = (form) => {
  const formRef = useRef()
  if(!formRef.current) {
    if(form) {
      formRef.current = form 
    }else {
      const formStore = new FormStore();
      formRef.current = formStore.getForm();
    }
  }
  return [formRef.current]
}
export default useForm;