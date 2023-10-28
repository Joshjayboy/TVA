import axios from "axios";

const Axios = axios.create({
 // baseURL: "http://localhost:5000/api",
  baseURL: "https://lunchserver.onrender.com/api",
});

export default Axios;
