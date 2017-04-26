import React, { Component } from 'react'
import {  reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import FormInputField from './FormInputField'
import UsersActions from '../redux/user'

const validate = values => {
  const errors = {}

  if (!values.firstName) {
    errors.firstName = 'The first name is required'
  }

  if (!values.lastName) {
    errors.lastName = 'The last name is required'
  }

  return errors
}

const formConfig = {
  form: 'userform',
  enableReinitialize: true,
  validate,
}

@reduxForm(formConfig)
@connect(mapStateToProps, mapDispatchToProps)
export default class NewUser extends Component {
  render () {
    const { handleSubmit, pristine, reset, submitting, onSubmit } = this.props

    return (
      <div>
        <h3>Create user</h3>

        <hr />

        <div className="row">
          <form className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
            <FormInputField
              name="firstName"
              label="First name"
              inputProps={{ type: 'text', component: 'input' }}
              labelProps={{ xs: 2 }}
              inputColProps={{ xs: 10 }}
            />

            <FormInputField
              name="lastName"
              label="Last name"
              inputProps={{ type: 'text', component: 'input' }}
              labelProps={{ xs: 2 }}
              inputColProps={{ xs: 10 }}
            />

            <FormInputField
              name="phone"
              label="Phone"
              inputProps={{ type: 'text', component: 'input' }}
              labelProps={{ xs: 2 }}
              inputColProps={{ xs: 10 }}
            />

            <div className="pull-right">
              <Button bsStyle="primary" type="submit" disabled={pristine || submitting}>Create</Button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  const { users } = state;

  return {
    users
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onSubmit(values){
      return new Promise((resolve, reject) => {
        dispatch(UsersActions.createUserRequest({ values, resolve, reject }))
      });
    }
  }
}