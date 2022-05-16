import axios from 'axios';

const request = axios.create({
  baseURL: process.env.VUE_APP_SERVER_URL
});

request.interceptors.request.use((config) => {
  let authToken = localStorage.getItem('authToken');
  if(authToken) {
      config.headers.Authorization = 'Bearer ' + authToken;
  }
  config.headers.Accept = 'application/json';

  return config
}, null)

request.interceptors.response.use(
    null,
    function (error) {
      console.log("Request error data", error.response.data);
      console.log("Request status", error.response.status);

      return Promise.reject(error)
    }
)

export default request;
