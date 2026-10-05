import { BaseService } from "./BaseService.js";
import { Rate } from "../models/Rate.js";
import { ensureExists } from "../utils/ensureExists.js";

export class RateService extends BaseService {
  constructor(rateRepository, inscriptionRepository) {
    super(rateRepository);
    this.inscriptionRepository = inscriptionRepository;
  }

  async rate(inscriptionId, value, comments) {
    const inscription = ensureExists(
      await this.inscriptionRepository.findById(inscriptionId),
      "Inscripción"
    );
    if (!inscription.active) {
      throw new Error("No se puede calificar una inscripción cancelada");
    }
    if (!Number.isInteger(value) || value < 1 || value > 5) {
      throw new Error("La calificación debe ser un entero entre 1 y 5");
    }
    return this.repository.create(new Rate({ inscriptionId, rate: value, comments }));
  }
}
