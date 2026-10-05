import { BaseEntity } from "./BaseEntity.js";

export class City extends BaseEntity {
  constructor({ id, code, name }) {
    super(id);
    this.code = code;
    this.name = name;
  }

  describe() {
    return `[Ciudad ${this.id}] ${this.code} - ${this.name}`;
  }

  toRow() {
    return { code: this.code, name: this.name };
  }

  static fromRow(row) {
    return new City(row);
  }
}
