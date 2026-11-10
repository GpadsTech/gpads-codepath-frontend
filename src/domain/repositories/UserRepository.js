import { ApiClient } from "../infrastructure/api/apiClient.js";

/**
 * Implementação concreta de acesso aos dados de Usuário e Células via API.
 */
export class UserRepository {
  constructor(client = new ApiClient()) {
    this.client = client;
  }

  // GET /users/me/ (ou /auth/me/)
  async getMe() {
    return await this.client.get("/auth/me/");
  }

  // GET /users/:id
  async getById(id) {
    return await this.client.get(`/users/${id}`);
  }

  // GET /cells/ -> Busca a origem real das opções de célula para o cadastro
  async getCells() {
    return await this.client.get("/cells/");
  }

  // POST /users/ -> Envia o payload correto para persistir no banco
  async createUser(userData) {
    // userData contém { name, email, cellId, role, etc }
    return await this.client.post("/users/", userData);
  }
}