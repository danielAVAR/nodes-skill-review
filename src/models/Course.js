import { BaseEntity } from "./BaseEntity.js";

export class Course extends BaseEntity {
  constructor({ id, code, description, intensity, weight, active = 1 }) {
    super(id);
    this.code = code;
    this.description = description ?? null;
    this.intensity = intensity;
    this.weight = weight;
    this.active = active;
    this.topics = [];
  }

  addTopic(topic) {
    this.topics.push(topic);
  }

  describe() {
    const header = `[Curso ${this.id}] ${this.code} - ${this.description} (${this.intensity} h, peso ${this.weight})`;
    const topics = this.topics.map((topic) => `     - ${topic.describe()}`);
    return [header, ...topics].join("\n");
  }

  toRow() {
    return {
      code: this.code,
      description: this.description,
      intensity: this.intensity,
      weight: this.weight,
      active: this.active,
    };
  }

  static fromRow(row) {
    return new Course(row);
  }
}
