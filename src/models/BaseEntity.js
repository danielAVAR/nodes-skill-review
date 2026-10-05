export class BaseEntity {
  constructor(id = null) {
    if (new.target === BaseEntity) {
      throw new Error("BaseEntity es abstracta");
    }
    this.id = id ?? null;
  }

  describe() {
    throw new Error("describe no implementado");
  }

  toRow() {
    throw new Error("toRow no implementado");
  }
}
