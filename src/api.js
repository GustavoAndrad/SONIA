import axios from "axios";
console.log(import.meta.env.VITE_API_BASE_URL)
export default axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Authorization': '',
    "Content-Type": "application/json"
  }
});
