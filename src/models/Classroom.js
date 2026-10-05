import { BaseEntity } from "./BaseEntity.js";

export class Classroom extends BaseEntity {
  constructor({ id, code, description, capacity, active = 1 }) {
    super(id);
    this.code = code;
    this.description = description ?? null;
    this.capacity = capacity;
    this.active = active;
  }

  describe() {
    return `[Aula ${this.id}] ${this.code} - ${this.description} (capacidad ${this.capacity})`;
  }

  toRow() {
    return {
      code: this.code,
      description: this.description,
      capacity: this.capacity,
      active: this.active,
    };
  }

  static fromRow(row) {
    return new Classroom(row);
  }
}
