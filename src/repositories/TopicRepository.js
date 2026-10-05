import { BaseRepository } from "./BaseRepository.js";
import { Topic } from "../models/Topic.js";

export class TopicRepository extends BaseRepository {
  constructor(db) {
    super(db, "topics", Topic);
  }

  async findByCourse(courseId) {
    const rows = await this.db.query("SELECT * FROM topics WHERE course_id = ?", [courseId]);
    return rows.map((row) => Topic.fromRow(row));
  }
}
