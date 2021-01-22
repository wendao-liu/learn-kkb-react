import React, { forwardRef } from 'react'
import _Form from './Form'
import Field from './Field'
import useForm from './useForm'

const Form = forwardRef(_Form);
Form.Field = Field
Form.useForm = useForm

export { Field, useForm }
export default Form