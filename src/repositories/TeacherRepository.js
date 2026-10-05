import { BaseRepository } from "./BaseRepository.js";
import { Teacher } from "../models/Teacher.js";

export class TeacherRepository extends BaseRepository {
  constructor(db) {
    super(db, "teachers", Teacher);
  }
}
