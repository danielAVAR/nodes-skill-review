import { BaseEntity } from "./BaseEntity.js";
import { formatDate } from "../utils/formatDate.js";

export class Inscription extends BaseEntity {
  constructor({ id, courseScheduleId, studentId, registerDate, active = 1 }) {
    super(id);
    this.courseScheduleId = courseScheduleId;
    this.studentId = studentId;
    this.registerDate = registerDate;
    this.active = active;
    this.student = null;
    this.schedule = null;
  }

  describe() {
    const student = this.student ? this.student.fullName : `estudiante ${this.studentId}`;
    const schedule = this.schedule ? this.schedule.describe() : `horario ${this.courseScheduleId}`;
    const status = this.active ? "activa" : "cancelada";
    return `[Inscripción ${this.id}] ${student} -> ${schedule} | ${formatDate(this.registerDate)} | ${status}`;
  }

  toRow() {
    return {
      course_schedule: this.courseScheduleId,
      student_id: this.studentId,
      register_date: this.registerDate,
      active: this.active,
    };
  }

  static fromRow(row) {
    return new Inscription({
      id: row.id,
      courseScheduleId: row.course_schedule,
      studentId: row.student_id,
      registerDate: row.register_date,
      active: row.active,
    });
  }
}
