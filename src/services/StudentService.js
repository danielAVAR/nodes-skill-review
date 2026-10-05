import { PersonService } from "./PersonService.js";

export class StudentService extends PersonService {
  constructor(repository) {
    super(repository, "student");
  }

  async register(data) {
    if (!data.code) {
      throw new Error("El código del estudiante es obligatorio");
    }
    return super.register(data);
  }
}
