const Todo = require('../schemas/todos-schemas.js');

class TodosRepository {
  constructor() {
    this.model = Todo;
  }

  async getAll(userId, { page = 1, limit = 20, favorite }) {
    const result = await this.model.paginate(
      { owner: userId, favorite: favorite },
      {
        limit,
        page,
        populate: {
          path: 'owner',
          select: ' title description completed -_id',
        },
      },
    );

    return result;
  }

  async getById(userId, id) {
    const result = await this.model.findById(id);
    return result;
  }

  async create(userId, body) {
    const result = await this.model.create({ ...body, owner: userId });
    return result;
  }

  async update(userId, id, body) {
    const result = await this.model.findByIdAndUpdate(
      id,
      { ...body },
      {
        new: true,
      },
    );
    return result;
  }

  async remove(userId, id) {
    const result = await this.model.findByIdAndRemove(id, { owner: userId });
    return result;
  }

  async updateStatus(userId, id, body) {
    const result = await this.model.findByIdAndUpdate(
      id,
      { ...body },
      {
        new: true,
      },
    );
    return result;
  }
}
module.exports = TodosRepository;
