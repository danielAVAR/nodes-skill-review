import { BaseEntity } from "./BaseEntity.js";

export class Topic extends BaseEntity {
  constructor({ id, courseId, code, title, description, active = 1 }) {
    super(id);
    this.courseId = courseId;
    this.code = code;
    this.title = title;
    this.description = description ?? null;
    this.active = active;
  }

  describe() {
    return `${this.code} - ${this.title}`;
  }

  toRow() {
    return {
      course_id: this.courseId,
      code: this.code,
      title: this.title,
      description: this.description,
      active: this.active,
    };
  }

  static fromRow(row) {
    return new Topic({
      id: row.id,
      courseId: row.course_id,
      code: row.code,
      title: row.title,
      description: row.description,
      active: row.active,
    });
  }
}
