// @flow

import React, { Component } from 'react'
import { Field } from 'redux-form'
import { FormGroup, Col, ControlLabel } from 'react-bootstrap'

type FormInputFieldProps = {
  name: string,
  label: string,
  placeholder?: string,
  labelProps?: Object,
  inputColProps?: Object,
  inputProps?: Object
}

export default class FormInputField extends Component {
  props: FormInputFieldProps

  render () {
    let { name, label, placeholder, labelProps, inputColProps, inputProps } = this.props;

    placeholder = placeholder || label;

    return (
      <FormGroup controlId={name}>
        <Col componentClass={ControlLabel} {...(labelProps || {})} >
          {label}
        </Col>
        <Col {...(inputColProps || {})}>
          <Field
            className="form-control" id={name} name={name} {...(inputProps || {})}
            placeholder={placeholder}
          >
            {this.props.children}
          </Field>
        </Col>
      </FormGroup>
    );
  }
}