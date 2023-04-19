import axios from "axios";

const baseUrl = "/api/login";

const login = async (credentials) => {
    const response = await axios.post(baseUrl, credentials);
    console.log(response.data)
    return response.data;
    };
const tokenLogin = async (token) => {
    const config = {
        headers: { Authorization: `bearer ${token}` },
    };
    const response = await axios.post(baseUrl, {}, config);
    return response.data;
};

export { login, tokenLogin };
