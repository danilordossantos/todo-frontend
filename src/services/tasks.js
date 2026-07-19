import axios from "axios"

const baseUrl = ('http://localhost:3004/api/tasks') 

const create = (newTask) => {
    return axios.post(baseUrl, newTask).then(res => res.data)
}

const getAll = () => {
    return axios.get(baseUrl).then(res => res.data)
}

const update = (id, Task) => {
    return axios.put(`${baseUrl}/${id}`, Task).then(res => res.data)
}

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`).then(res => res.data)
}

export default {create, getAll, update, remove}