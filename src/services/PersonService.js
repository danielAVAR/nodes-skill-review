import { BaseService } from "./BaseService.js";
import { PersonFactory } from "../factories/PersonFactory.js";

export class PersonService extends BaseService {
  constructor(repository, type) {
    super(repository);
    this.type = type;
  }

  async register(data) {
    const person = PersonFactory.create(this.type, data);
    if (!person.firstName || !person.lastName) {
      throw new Error("Nombres y apellidos son obligatorios");
    }
    if (!person.identificationNumber) {
      throw new Error("El número de identificación es obligatorio");
    }
    if (!person.email.includes("@")) {
      throw new Error("El correo no es válido");
    }
    return this.repository.create(person);
  }
}
