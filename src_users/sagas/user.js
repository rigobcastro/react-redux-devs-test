import { call, put, select } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import { toastr } from 'react-redux-toastr'
import { find, set } from 'lodash'
import UserActions from '../redux/user'

export function * getUsersList (api, { page }) {
  try {
    const response = yield call(api.getUsers, page)

    if (response.ok) {
      const { data } = response;

      yield put(UserActions.usersListSuccess(data))
    } else {
      yield put(UserActions.usersListFailure(response.error))
    }
  } catch (error) {
    yield put(UserActions.usersListFailure(error.message))
  }
}

export function * getUser (api, { id }) {
  try {
    const response = yield call(api.getUser, id)

    if (response.ok) {
      const { data } = response;

      yield put(UserActions.getUserSuccess(data))
    } else {
      yield put(UserActions.getUserFailure(response.error))
    }
  } catch (error) {
    yield put(UserActions.getUserFailure(error.message))
  }
}

export function * createUser (api, { data: { values, resolve, reject } }) {
  try {
    const response = yield call(api.createUser, values)

    if (response.ok) {
      const { data } = response;

      yield put(UserActions.createUserSuccess(data))
      yield call(toastr.success, 'User created!')
      yield put(push('/'))
      yield call(resolve, data)
    } else {
      yield put(UserActions.createUserFailure(response.error))
      yield call(reject, response.error)
    }
  } catch (error) {
    yield put(UserActions.createUserFailure(error.message))
    yield call(reject, error.message)
  }
}

export function * updateUser (api, { data: { values, resolve, reject } }) {
  try {
    const response = yield call(api.updateUser, values)

    if (response.ok) {
      const { data } = response;

      yield put(UserActions.updateUserSuccess(data))
      yield put(push('/'))
      yield call(toastr.success, 'User updated!')
      yield call(resolve, data)
    } else {
      yield put(UserActions.updateUserFailure(response.error))
      yield call(reject, response.error)
    }
  } catch (error) {
    yield put(UserActions.updateUserFailure(error.message))
    yield call(reject, error.message)
  }
}

export function * removeUser (api, { id }) {
  try {
    const response = yield call(api.removeUser, id)

    if (response.ok) {
      const { data } = response;

      yield put(UserActions.removeUserSuccess(data))

      yield call(toastr.success, 'User state changed!')
    } else {
      yield put(UserActions.removeUserFailure(response.error))
    }
  } catch (error) {
    yield put(UserActions.removeUserFailure(error.message))
  }

}