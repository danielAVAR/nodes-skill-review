import { Repository } from "../interfaces/Repository.js";

export class BaseRepository extends Repository {
  constructor(db, table, model) {
    super();
    this.db = db;
    this.table = table;
    this.model = model;
  }

  async findAll() {
    const rows = await this.db.query(`SELECT * FROM ${this.table}`);
    return rows.map((row) => this.model.fromRow(row));
  }

  async findById(id) {
    const rows = await this.db.query(`SELECT * FROM ${this.table} WHERE id = ?`, [id]);
    return rows.length ? this.model.fromRow(rows[0]) : null;
  }

  async create(entity) {
    const row = entity.toRow();
    const columns = Object.keys(row);
    const placeholders = columns.map(() => "?").join(", ");
    const sql = `INSERT INTO ${this.table} (${columns.join(", ")}) VALUES (${placeholders})`;
    const result = await this.db.query(sql, Object.values(row));
    entity.id = result.insertId;
    return entity;
  }

  async update(entity) {
    const row = entity.toRow();
    const assignments = Object.keys(row).map((column) => `${column} = ?`).join(", ");
    const sql = `UPDATE ${this.table} SET ${assignments} WHERE id = ?`;
    await this.db.query(sql, [...Object.values(row), entity.id]);
    return entity;
  }

  async delete(id) {
    await this.db.query(`DELETE FROM ${this.table} WHERE id = ?`, [id]);
  }
}
