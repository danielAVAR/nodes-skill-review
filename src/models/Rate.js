import { BaseEntity } from "./BaseEntity.js";

export class Rate extends BaseEntity {
  constructor({ id, inscriptionId, rate, comments }) {
    super(id);
    this.inscriptionId = inscriptionId;
    this.rate = rate;
    this.comments = comments ?? null;
  }

  describe() {
    return `[Calificación ${this.id}] inscripción ${this.inscriptionId}: ${this.rate}/5 - ${this.comments ?? ""}`;
  }

  toRow() {
    return {
      inscription_id: this.inscriptionId,
      rate: this.rate,
      comments: this.comments,
    };
  }

  static fromRow(row) {
    return new Rate({
      id: row.id,
      inscriptionId: row.inscription_id,
      rate: row.rate,
      comments: row.comments,
    });
  }
}
