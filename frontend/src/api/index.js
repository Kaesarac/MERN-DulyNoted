const axios = require("axios");

const api = axios.create({ baseURL: "http://localhost:5000" });

export const setToken = (token) => {
  api.headers.authorization = "Bearer " + token;
};

export default api;
