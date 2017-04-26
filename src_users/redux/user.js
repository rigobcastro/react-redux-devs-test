// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  usersListRequest: ['page'],
  usersListSuccess: ['data'],
  usersListFailure: ['error'],

  updateUserRequest: ['data'],
  updateUserSuccess: ['data'],
  updateUserFailure: ['error'],

  createUserRequest: ['data'],
  createUserSuccess: ['data'],
  createUserFailure: ['error'],

  getUserRequest: ['id'],
  getUserSuccess: ['data'],
  getUserFailure: ['error'],

  removeUserRequest: ['id'],
  removeUserSuccess: ['data'],
  removeUserFailure: ['error'],
})

export const UserTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  loading: false,
  error: false,
  data: null
})

export const usersListRequest = (state: Object) => state.merge({ loading: true })
export const usersListSuccess = (state: Object, params: Object) => state.merge({ loading: false, ...params })
export const usersListFailure = (state: Object, { error }: Object) => state.merge({ loading: false, error })

export const getUserRequest = (state: Object) => state.merge({ loading: true })
export const getUserSuccess = (state: Object, params: Object) => state.merge({ loading: false, ...params })
export const getUserFailure = (state: Object, { error }: Object) => state.merge({ loading: false, error })

export const updateUserRequest = (state: Object) => state.merge({ loading: true })
export const updateUserSuccess = (state: Object, params: Object) => state.merge({ loading: false, ...params })
export const updateUserFailure = (state: Object, { error }: Object) => state.merge({ loading: false, error })

export const createUserRequest = (state: Object) => state.merge({ loading: true })
export const createUserSuccess = (state: Object, params: Object) => state.merge({ loading: false, ...params })
export const createUserFailure = (state: Object, { error }: Object) => state.merge({ loading: false, error })

export const removeUserRequest = (state: Object) => state.merge({ loading: true })
export const removeUserSuccess = (state: Object, params: Object) => {
  const newItem = params.data;
  let { data } = state;

  data = data.flatMap((item) => {
    if (item._id === newItem._id) return item.merge({ ...newItem })
    return item
  })

  return state.merge({ loading: false, data })
}
export const removeUserFailure = (state: Object, { error }: Object) => state.merge({ loading: false, error })

export const reducer = createReducer(INITIAL_STATE, {
  [Types.USERS_LIST_REQUEST]: usersListRequest,
  [Types.USERS_LIST_SUCCESS]: usersListSuccess,
  [Types.USERS_LIST_FAILURE]: usersListFailure,

  [Types.GET_USER_REQUEST]: getUserRequest,
  [Types.GET_USER_SUCCESS]: getUserSuccess,
  [Types.GET_USER_FAILURE]: getUserFailure,

  [Types.CREATE_USER_REQUEST]: createUserRequest,
  [Types.CREATE_USER_SUCCESS]: createUserSuccess,
  [Types.CREATE_USER_FAILURE]: createUserFailure,

  [Types.UPDATE_USER_REQUEST]: updateUserRequest,
  [Types.UPDATE_USER_SUCCESS]: updateUserSuccess,
  [Types.UPDATE_USER_FAILURE]: updateUserFailure,

  [Types.REMOVE_USER_REQUEST]: removeUserRequest,
  [Types.REMOVE_USER_SUCCESS]: removeUserSuccess,
  [Types.REMOVE_USER_FAILURE]: removeUserFailure,
})

export const ACTIVE = 'active';
export const INACTIVE = 'inactive';