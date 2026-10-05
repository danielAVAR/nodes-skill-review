import { BaseRepository } from "./BaseRepository.js";
import { IdentificationType } from "../models/IdentificationType.js";

export class IdentificationTypeRepository extends BaseRepository {
  constructor(db) {
    super(db, "identification_types", IdentificationType);
  }
}
