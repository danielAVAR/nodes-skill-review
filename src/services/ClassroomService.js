import { BaseService } from "./BaseService.js";
import { Classroom } from "../models/Classroom.js";

export class ClassroomService extends BaseService {
  create(data) {
    if (!data.code) {
      throw new Error("El código del aula es obligatorio");
    }
    if (data.capacity <= 0) {
      throw new Error("La capacidad debe ser mayor a cero");
    }
    return this.repository.create(new Classroom(data));
  }
}
