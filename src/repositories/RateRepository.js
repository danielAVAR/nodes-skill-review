import { BaseRepository } from "./BaseRepository.js";
import { Rate } from "../models/Rate.js";

export class RateRepository extends BaseRepository {
  constructor(db) {
    super(db, "rates", Rate);
  }
}
