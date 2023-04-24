
export const APP_ENV = process.env.REACT_APP_ENV
export const ENCRYPT_REQ_RES = process.env.REACT_APP_ENCRYPT_REQ_RES === 'true'; // Whether or not to encrypt the requesta and response data

//export const API_URL = "http://192.168.133.142:3001"
//export const API_URL = process.env.REACT_APP_LOCAL_API_URL
export const API_URL = process.env.REACT_APP_AWS_API_URL