import axios from "axios";

// const env = "http://localhost:5000/";
export const loginService = () => {
  return axios.get("http://localhost:5000/api/orders");
};
