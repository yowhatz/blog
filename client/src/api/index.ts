import axios from "axios";
import { TOKEN_KEY } from "src/utils/localstorage";

const token = localStorage.getItem(TOKEN_KEY);
export const $api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: token || "",
  },
});
