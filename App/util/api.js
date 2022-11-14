import axios from "axios";

export const url = "http://10.51.56.54:5000/";

export const api = axios.create({
    baseURL: "http://10.51.56.54:5000/api/",
});
