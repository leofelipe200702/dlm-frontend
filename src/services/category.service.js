// src/services/category.service.js
import api from "./http-common";

class CategoryService {

    // Método auxiliar para adicionar o Header de Autorização
    // O token é obtido do LocalStorage (onde o login o salvou)
    getAuthHeader() {
        const user = JSON.parse(localStorage.getItem('user'));
        
        // Verifica se há um usuário logado e se há um token
        if (user?.token) {
            return { Authorization: 'Bearer ' + user.token };
        } else {
            return {};
        }
    }

    getAll() {
        // GET /api/management/categories
        return api.get("/management/categories", { headers: this.getAuthHeader() });
    }

    create(name) {
        // POST /api/management/categories
        return api.post("/management/categories", { name }, { headers: this.getAuthHeader() });
    }

    update(id, name) {
        // PUT /api/management/categories/{id}
        return api.put(`/management/categories/${id}`, { name }, { headers: this.getAuthHeader() });
    }

    delete(id) {
        // DELETE /api/management/categories/{id}
        return api.delete(`/management/categories/${id}`, { headers: this.getAuthHeader() });
    }
}

export default new CategoryService();