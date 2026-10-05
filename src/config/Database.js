import mysql from "mysql2/promise";

export class Database {
  static #instance = null;
  #pool;

  constructor() {
    this.#pool = mysql.createPool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
  }

  static getInstance() {
    if (!Database.#instance) {
      Database.#instance = new Database();
    }
    return Database.#instance;
  }

  async query(sql, params = []) {
    const [result] = await this.#pool.execute(sql, params);
    return result;
  }

  async close() {
    await this.#pool.end();
  }
}
