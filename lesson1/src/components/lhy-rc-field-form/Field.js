import React, { Component,cloneElement,useState } from 'react';
import FieldContext from './FieldContext'


class Field extends Component {
  static contextType = FieldContext;
  componentDidMount() {
    const { registerField } = this.context;
    this.unregisterField = registerField(this)
  }
  componentWillUnmount() {
    if(this.unregisterField) {
      this.unregisterField();
    }
  }

  onStoreChange = () => {
    this.forceUpdate();
  }

  getControlled = (name) => {
    const { getFieldValue,setFieldsValue } = this.context;
    return {
      value: getFieldValue(name),
      onChange: (e) => {
        setFieldsValue({[name]: e.target.value})
      }
    }
  }

  render() {
    const { children, name } = this.props;
    const returnChildNode = cloneElement(children, this.getControlled(name))
    return returnChildNode
  }
}
 
export default Field;