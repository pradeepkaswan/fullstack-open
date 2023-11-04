import axios from 'axios'
import storageService from '../services/storage'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const headers = {
  Authorization: storageService.loadUser()
    ? `Bearer ${storageService.loadUser().token}`
    : null,
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (object) => {
  const response = await axios.post(baseUrl, object, { headers })
  return response.data
}

const update = async (object) => {
  const response = await axios.put(`${baseUrl}/${object.id}`, object, {
    headers,
  })
  return response.data
}

const remove = async (id) => {
  await axios.delete(`${baseUrl}/${id}`, { headers })
}

export default { getAll, create, update, remove }
