import Axios from "axios";

export const API_HOST = process.env.REACT_APP_URL

const axiosApi = Axios.create({
  baseURL: API_HOST,
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMjA3MTE3ZTA4MGMyZDUwZDAxZDZiOCIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjQ2Mjk3OTE5LCJleHAiOjE2NDYzMzM5MTl9.U4JCc_TjY8Uns4w950aHWLOsVCqrc5Hor8QnvoDTBsk`
  },
  timeout: 100000,
});

Axios.interceptors.request.use(function (config) {
  return config;
});

axiosApi.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);


export default axiosApi;
export async function get(url, config) {
  return await axiosApi
    .get(url, {
      ...config,
    })
    .then((response) => response.data.data);
}