import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import { get } from 'lodash'
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

@connect(mapStateToProps, mapDispatchToProps)
@reduxForm(formConfig)
export default class EditUser extends Component {
  componentDidMount () {
    const { getUser, routeParams: { id } } = this.props;

    getUser(id);
  }

  render () {
    const { handleSubmit, pristine, reset, submitting, onSubmit, users: { loading, data } } = this.props;
    const firstName = get(data, 'firstName');
    const lastName = get(data, 'lastName');

    if (loading) {
      return <div>Loading...</div>
    }

    return (
      <div>
        <h3>Edit {firstName} {lastName}</h3>

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
              <Button bsStyle="primary" type="submit" disabled={pristine || submitting}>Update</Button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  const { users } = state;
  const { data = {} } = users;

  return {
    users,
    initialValues: data
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getUser: (id) => dispatch(UsersActions.getUserRequest(id)),
    onSubmit(values){
      return new Promise((resolve, reject) => {
        dispatch(UsersActions.updateUserRequest({ values, resolve, reject }))
      });
    }
  }
}