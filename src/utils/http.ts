import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api'; // todo - add env for dev/prod

axios.interceptors.response.use(
  (resp) => {
    resp.data = resp.data.rows || resp.data;
    return resp;
  }, // on success always rows
  function (error) {
    console.log('error', error);
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  },
);

export default axios;
