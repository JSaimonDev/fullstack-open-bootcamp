import axios from "axios";
const url = "http://localhost:3001/api/persons";

const post = (newPost) => {
  return getAll().then((response) => {
    return axios.post(url, newPost);
  });
};

const getAll = () => {
  return axios.get(url).then((response) => {
    console.log(response.data);
    return response.data;
  });
};

const deleteEntry = (id) => {
  const f = axios.delete(url + "/" + id);
  return f;
};

export { post, getAll, deleteEntry };
