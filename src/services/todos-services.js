const { TodosRepository } = require('../repository');

class TodosServices {
  constructor() {
    this.repositories = {
      todos: new TodosRepository(),
    };
  }

  async getAll(userId, query) {
    const data = await this.repositories.todos.getAll(userId, query);
    return data;
  }

  async getById(userId, { id }) {
    const data = await this.repositories.todos.getById(userId, id);
    return data;
  }

  async create(userId, body) {
    const data = await this.repositories.todos.create(userId, body);
    return data;
  }

  async update(userId, { id }, body) {
    const data = await this.repositories.todos.update(userId, id, body);
    return data;
  }

  async remove(userId, { id }) {
    const data = await this.repositories.todos.remove(userId, id);
    return data;
  }

  async updateStatus(userId, { id }, body) {
    const data = this.repositories.todos.updateStatus(userId, id, body);
    return data;
  }
}
module.exports = TodosServices;
