export class ReferenceService {
  constructor(cityRepository, identificationTypeRepository) {
    this.cityRepository = cityRepository;
    this.identificationTypeRepository = identificationTypeRepository;
  }

  listCities() {
    return this.cityRepository.findAll();
  }

  listIdentificationTypes() {
    return this.identificationTypeRepository.findAll();
  }
}
