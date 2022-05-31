import axios from "axios";
const host = process.env.NODE_ENV === "production" ? "https://blood-bank-np.herokuapp.com/api" : "http://127.0.0.1:3035/api";
export default axios.create({
  baseURL: host,
  headers: {
    "Access-Control-Allow-Origin": "*",
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
});
