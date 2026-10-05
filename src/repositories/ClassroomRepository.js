import { BaseRepository } from "./BaseRepository.js";
import { Classroom } from "../models/Classroom.js";

export class ClassroomRepository extends BaseRepository {
  constructor(db) {
    super(db, "classrooms", Classroom);
  }
}
