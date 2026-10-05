import { BaseRepository } from "./BaseRepository.js";
import { Student } from "../models/Student.js";

export class StudentRepository extends BaseRepository {
  constructor(db) {
    super(db, "students", Student);
  }
}
