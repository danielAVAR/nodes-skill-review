import { Person } from "./Person.js";

export class Teacher extends Person {
  describe() {
    return `[Docente ${this.id}] ${super.describe()}`;
  }

  toRow() {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      identification_type_id: this.identificationTypeId,
      identificationNumber: this.identificationNumber,
      email: this.email,
    };
  }

  static fromRow(row) {
    return new Teacher({
      id: row.id,
      firstName: row.firstName,
      lastName: row.lastName,
      identificationTypeId: row.identification_type_id,
      identificationNumber: row.identificationNumber,
      email: row.email,
    });
  }
}
