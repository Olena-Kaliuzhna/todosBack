const User = require('../schemas/users-schemas');

class UsersRepository {
  constructor() {
    this.model = User;
  }

  async findByEmail(email) {
    const result = await this.model.findOne({ email });
    return result;
  }

  async findById(id) {
    const result = await this.model.findById(id);
    return result;
  }

  async create(body) {
    const user = new this.model(body);
    return user.save();
  }

  async updateToken(id, token) {
    await this.model.updateOne({ _id: id }, { token });
  }
}

module.exports = UsersRepository;
