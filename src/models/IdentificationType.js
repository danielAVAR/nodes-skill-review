import { BaseEntity } from "./BaseEntity.js";

export class IdentificationType extends BaseEntity {
  constructor({ id, code, name, description }) {
    super(id);
    this.code = code;
    this.name = name;
    this.description = description ?? null;
  }

  describe() {
    return `[Tipo ${this.id}] ${this.code} - ${this.name}`;
  }

  toRow() {
    return { code: this.code, name: this.name, description: this.description };
  }

  static fromRow(row) {
    return new IdentificationType(row);
  }
}
