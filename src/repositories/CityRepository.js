import { BaseRepository } from "./BaseRepository.js";
import { City } from "../models/City.js";

export class CityRepository extends BaseRepository {
  constructor(db) {
    super(db, "cities", City);
  }
}
