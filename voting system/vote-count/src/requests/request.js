import axios from "axios";
export const Axios = axios.create({
  baseURL: "http://127.0.0.1:4000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
