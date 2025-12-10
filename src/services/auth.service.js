import api from "./http-common";

class AuthService {
  async login(username, password) {
    const response = await api.post("/auth/signin", {
      username,
      password
    });

    if (response.data.token) {
      // ⚠️ IMPORTANTE: Salva o token no LocalStorage para que o Axios possa
      // usá-lo em todas as requisições futuras para rotas protegidas.
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    
    return response.data;
  }

  logout() {
    // Remove o usuário do LocalStorage
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return api.post("/auth/signup", {
      username,
      email,
      password,
      // Se necessário, inclua a lista de roles (ex: role: ["admin"])
    });
  }

  getCurrentUser() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }
}

export default new AuthService();