import axios from "axios";
export default () => {
  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  let Api = axios.create({
    baseURL: "https://dev123.gigin.ai/abc/index.php/",
    withCredentials: true,
  });

  return Api;
};
