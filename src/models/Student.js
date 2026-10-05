import { Person } from "./Person.js";
import { formatDate } from "../utils/formatDate.js";

export class Student extends Person {
  constructor(data) {
    super(data);
    this.code = data.code;
    this.gender = data.gender ?? null;
    this.birthdate = data.birthdate ?? null;
    this.address = data.address ?? null;
    this.cityId = data.cityId ?? null;
  }

  describe() {
    return `[Estudiante ${this.id}] ${this.code} - ${super.describe()} - nacimiento: ${formatDate(this.birthdate)}`;
  }

  toRow() {
    return {
      code: this.code,
      firstName: this.firstName,
      lastName: this.lastName,
      identification_type_id: this.identificationTypeId,
      identificationNumber: this.identificationNumber,
      gender: this.gender,
      birthdate: this.birthdate,
      email: this.email,
      address: this.address,
      city_id: this.cityId,
    };
  }

  static fromRow(row) {
    return new Student({
      id: row.id,
      code: row.code,
      firstName: row.firstName,
      lastName: row.lastName,
      identificationTypeId: row.identification_type_id,
      identificationNumber: row.identificationNumber,
      gender: row.gender,
      birthdate: row.birthdate,
      email: row.email,
      address: row.address,
      cityId: row.city_id,
    });
  }
}
