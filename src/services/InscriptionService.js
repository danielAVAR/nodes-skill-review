import { BaseService } from "./BaseService.js";
import { Inscription } from "../models/Inscription.js";
import { ensureExists } from "../utils/ensureExists.js";

export class InscriptionService extends BaseService {
  constructor(inscriptionRepository, studentRepository, scheduleRepository, events) {
    super(inscriptionRepository);
    this.studentRepository = studentRepository;
    this.scheduleRepository = scheduleRepository;
    this.events = events;
  }

  async list() {
    const inscriptions = await super.list();
    for (const inscription of inscriptions) {
      inscription.student = await this.studentRepository.findById(inscription.studentId);
      inscription.schedule = await this.scheduleRepository.findById(inscription.courseScheduleId);
    }
    return inscriptions;
  }

  async enroll(studentId, scheduleId) {
    ensureExists(await this.studentRepository.findById(studentId), "Estudiante");
    const schedule = ensureExists(await this.scheduleRepository.findById(scheduleId), "Horario");
    if (!schedule.active) {
      throw new Error("El horario no está activo");
    }
    const existing = await this.repository.findActiveByStudentAndSchedule(studentId, scheduleId);
    if (existing) {
      throw new Error("El estudiante ya está inscrito en este horario");
    }
    const inscription = new Inscription({
      courseScheduleId: scheduleId,
      studentId,
      registerDate: new Date(),
    });
    await this.repository.create(inscription);
    this.events.notify("inscripcion.creada", inscription);
    return inscription;
  }

  async cancel(id) {
    const inscription = await this.getById(id);
    inscription.active = 0;
    await this.repository.update(inscription);
    this.events.notify("inscripcion.cancelada", inscription);
    return inscription;
  }
}
