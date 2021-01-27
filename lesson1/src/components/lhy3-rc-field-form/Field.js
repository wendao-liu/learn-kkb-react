import React, { Component, cloneElement } from 'react'
import FieldContext from './FieldContext';

class Field extends Component {
  static contextType = FieldContext;

  componentDidMount() {
    const { registerField } = this.context
    this.unregisterField = registerField(this)

  }
  componentWillUnmount() {
    if (this.unregisterField) {
      this.unregisterField()
    }
  }

  getControlled = (name) => {
    const { getFieldValue, setFieldsValue } = this.context;
    return {
      value: getFieldValue(name),
      onChange: (e) => {
        setFieldsValue({ [name]: e.target.value })
      }
    }
  }

  onStoreChange = () => {
    this.forceUpdate();
  }

  render() {
    const { children, name } = this.props;
    const { getFieldValue, setFieldsValue } = this.context;

    const ReturnChildNode = React.cloneElement(children, this.getControlled());
    console.log(ReturnChildNode,'ReturnChildNode')
    return ReturnChildNode
    // const Test = children
    // console.log(Test,'Test')
    // return <Test
    //   value={getFieldValue(name)} //"omg", //比如说个仓库可以存储这个value，那这里直接get
    //   onChange={event => {
    //     const newValue = event.target.value;
    //     setFieldsValue({ [name]: newValue });
    //   }
    //   }
    // ></Test>;
  }
}

export default Field;