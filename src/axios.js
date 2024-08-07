import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URI,
  withCredentials: true,
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const userlocalStorage = JSON.parse(
      localStorage.getItem("persist:shop/user")
    );
    const userAccessToken = JSON.parse(userlocalStorage.accessToken);
    config.headers = { Authorization: `Bearer ${userAccessToken}` }; // khi gọi api thì mỗi req đều có key Authorization là token của user
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return error.response?.data;
  }
);

export default instance;
