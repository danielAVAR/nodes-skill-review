import { BaseEntity } from "./BaseEntity.js";
import { formatDate } from "../utils/formatDate.js";

export class CourseSchedule extends BaseEntity {
  constructor({ id, courseId, teacherId, classroomId, startDate, endDate, active = 1 }) {
    super(id);
    this.courseId = courseId;
    this.teacherId = teacherId;
    this.classroomId = classroomId;
    this.startDate = startDate;
    this.endDate = endDate;
    this.active = active;
    this.course = null;
    this.teacher = null;
    this.classroom = null;
  }

  describe() {
    const course = this.course ? this.course.description : `curso ${this.courseId}`;
    const teacher = this.teacher ? this.teacher.fullName : `docente ${this.teacherId}`;
    const classroom = this.classroom ? this.classroom.code : `aula ${this.classroomId}`;
    const dates = `${formatDate(this.startDate)} a ${formatDate(this.endDate)}`;
    return `[Horario ${this.id}] ${course} | ${teacher} | ${classroom} | ${dates}`;
  }

  toRow() {
    return {
      course_id: this.courseId,
      teacher_id: this.teacherId,
      classroom_id: this.classroomId,
      start_date: this.startDate,
      end_date: this.endDate,
      active: this.active,
    };
  }

  static fromRow(row) {
    return new CourseSchedule({
      id: row.id,
      courseId: row.course_id,
      teacherId: row.teacher_id,
      classroomId: row.classroom_id,
      startDate: row.start_date,
      endDate: row.end_date,
      active: row.active,
    });
  }
}
