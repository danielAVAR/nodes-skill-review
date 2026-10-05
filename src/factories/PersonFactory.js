import { Student } from "../models/Student.js";
import { Teacher } from "../models/Teacher.js";

const personTypes = {
  student: Student,
  teacher: Teacher,
};

export class PersonFactory {
  static create(type, data) {
    const PersonClass = personTypes[type];
    if (!PersonClass) {
      throw new Error(`Tipo de persona desconocido: ${type}`);
    }
    return new PersonClass(data);
  }
}
