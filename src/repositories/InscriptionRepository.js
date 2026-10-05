import { BaseRepository } from "./BaseRepository.js";
import { Inscription } from "../models/Inscription.js";

export class InscriptionRepository extends BaseRepository {
  constructor(db) {
    super(db, "inscriptions", Inscription);
  }

  async findActiveByStudentAndSchedule(studentId, scheduleId) {
    const sql = "SELECT * FROM inscriptions WHERE student_id = ? AND course_schedule = ? AND active = 1";
    const rows = await this.db.query(sql, [studentId, scheduleId]);
    return rows.length ? Inscription.fromRow(rows[0]) : null;
  }
}
