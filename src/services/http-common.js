import axios from "axios";

// Instância do Axios
export default axios.create({
  // URL base do seu backend Spring Boot
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-type": "application/json"
  }
});