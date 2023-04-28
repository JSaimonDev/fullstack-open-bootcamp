import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = () => {
    return axios.get(baseUrl).then(response => response.data)
}

export const createNew = (content) => {
    return axios.post(baseUrl, { content, votes: 0 }).then(response => response.data)
}

export const update = (newObject) => {
    return axios.put(`${baseUrl}/${newObject.id}`, newObject).then(response => response.data)
}