// @flow

import apisauce from 'apisauce'
import { omit } from 'lodash'

const create = (baseURL) => {
  const api = apisauce.create({
    baseURL,
    headers: { 'Accept': 'application/vnd.github.v3+json', 'Cache-Control': 'no-cache' },
    timeout: 10000
  })

  const getUsers = (page: Number = 1) => api.get('users', { page })
  const getUser = (id: String) => api.get(`users/${id}`)
  const createUser = (data: Object) => api.post('users', data)
  const updateUser = (data: Object) => api.put(`users/${data._id || data.id}`, omit(data, ['_id', 'id']))
  const removeUser = (id: String) => api.delete(`users/${id}`)

  return {
    getUsers,
    getUser,
    createUser,
    updateUser,
    removeUser
  }
}

export default {
  create
}