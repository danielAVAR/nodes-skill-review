import { BaseEntity } from "./BaseEntity.js";

export class Person extends BaseEntity {
  constructor({ id, firstName, lastName, identificationTypeId, identificationNumber, email }) {
    super(id);
    if (new.target === Person) {
      throw new Error("Person es abstracta");
    }
    this.firstName = firstName;
    this.lastName = lastName;
    this.identificationTypeId = identificationTypeId;
    this.identificationNumber = identificationNumber;
    this.email = email ?? "";
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  describe() {
    return `${this.fullName} <${this.email}>`;
  }
}
