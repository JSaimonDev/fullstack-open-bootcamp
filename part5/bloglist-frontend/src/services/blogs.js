import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async (token) => {
  console.log(token)
  const config = {
    headers: { Authorization: token },
  }
  const request = await axios.get(baseUrl, config)
  const sortedData = request.data.sort((a, b) => b.likes - a.likes)
  return sortedData
}

const postBlog = (newBlog, token) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.post(baseUrl, newBlog, config)
  return request.then(response => response.data)
}

const updateBlog = (id, newBlog, token) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.put(`${baseUrl}/${id}`, newBlog, config)
  return request.then(response => response.data)}

const deleteBlog = (id, token) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then(response => response.status)}



export { getAll, postBlog, updateBlog, deleteBlog }