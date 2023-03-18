import axios from "axios";
const url = "/api/persons";

const post = (newPost) => {
  return getAll().then((response) => {
    const existName = response.find((person) => person.name === newPost.name);
    if (existName) {
      console.log("if");
      return axios.put(url + "/" + existName.id, newPost);
    } else {
      console.log("else");
      return axios.post(url, newPost);
    }
  });
};

const getAll = () => {
  return axios.get(url).then((response) => {
    return response.data;
  });
};

const deleteEntry = (id) => {
  const f = axios.delete(url + "/" + id);
  return f;
};

export { post, getAll, deleteEntry };
