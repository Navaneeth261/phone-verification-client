import axios from "axios"
import { API_URL } from "../config";

//apply base url for axios
const axiosApi = axios.create({
  baseURL: API_URL,
  //withCredentials: true
})

axiosApi.interceptors.request.use(
  config => {   
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axiosApi.interceptors.response.use(
  response => {
    return response;
  },

  error => {
    let errMsg= error?.message
   if(errMsg.includes('status code 401')){
    window.location.reload();
   }else{
    Promise.reject(error)
   }
  }
)

export async function get(url, headers = {}) {
  return await axiosApi.get(url,{headers})
  .then(response => response?.data)
  .catch(error => error.response?.data)
}
export async function post(url, data, headers = {}) {
  return axiosApi.post(url,data,{headers})
  .then(response => response?.data)
  .catch(error => error.response?.data)
}

export async function put(url, data, headers = {}) {
  return axiosApi.put(url, data, {headers} )
    .then(response => response?.data)   
    .catch(error => error.response?.data)
}
export async function del(url, headers = {}) {
  return await axiosApi
    .delete(url,{headers})
    .then(response => response?.data)
    .catch(error => error.response?.data)
   
}