import { ensureExists } from "../utils/ensureExists.js";

export class BaseService {
  constructor(repository) {
    this.repository = repository;
  }

  list() {
    return this.repository.findAll();
  }

  async getById(id) {
    const entity = await this.repository.findById(id);
    return ensureExists(entity, "Registro");
  }

  async remove(id) {
    await this.getById(id);
    await this.repository.delete(id);
  }
}
