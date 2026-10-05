import { BaseRepository } from "./BaseRepository.js";
import { Course } from "../models/Course.js";

export class CourseRepository extends BaseRepository {
  constructor(db) {
    super(db, "courses", Course);
  }
}
