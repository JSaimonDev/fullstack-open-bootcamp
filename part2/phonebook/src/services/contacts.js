import axios from "axios";
const url = "http://localhost:3001/api/persons";

const post = (newPost) => {
  // return getAll().then((response) => {
  return axios.post(url, newPost);
};
//)
//}

const getAll = () => {
  return axios.get(url).then((response) => {
    return response.data;
  });
};

const deleteEntry = (id) => {
  const f = axios.delete(url + "/" + id);
  return f;
};

const put = (newPost, id) => {
  return axios.put(url + "/" + id, newPost);
};

export { post, getAll, deleteEntry, put };
