import { takeLatest } from 'redux-saga/effects'

import apiCreator from '../api'

import { UserTypes } from '../redux/user'
import { getUsersList, getUser, createUser, updateUser, removeUser } from './user'

const apiUrl = process.env.API_URL || 'http://localhost:8080/api/';
const api = apiCreator.create(apiUrl);

export default function * root () {
  yield [
    takeLatest(UserTypes.USERS_LIST_REQUEST, getUsersList, api),
    takeLatest(UserTypes.GET_USER_REQUEST, getUser, api),
    takeLatest(UserTypes.CREATE_USER_REQUEST, createUser, api),
    takeLatest(UserTypes.UPDATE_USER_REQUEST, updateUser, api),
    takeLatest(UserTypes.REMOVE_USER_REQUEST, removeUser, api),
  ]
}