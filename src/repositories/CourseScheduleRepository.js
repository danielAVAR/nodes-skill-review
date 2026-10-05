import { BaseRepository } from "./BaseRepository.js";
import { CourseSchedule } from "../models/CourseSchedule.js";

export class CourseScheduleRepository extends BaseRepository {
  constructor(db) {
    super(db, "courses_schedules", CourseSchedule);
  }
}
