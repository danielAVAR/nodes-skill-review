import { BaseService } from "./BaseService.js";
import { CourseSchedule } from "../models/CourseSchedule.js";
import { ensureExists } from "../utils/ensureExists.js";

export class ScheduleService extends BaseService {
  constructor(scheduleRepository, courseRepository, teacherRepository, classroomRepository) {
    super(scheduleRepository);
    this.courseRepository = courseRepository;
    this.teacherRepository = teacherRepository;
    this.classroomRepository = classroomRepository;
  }

  async list() {
    const schedules = await super.list();
    for (const schedule of schedules) {
      await this.loadReferences(schedule);
    }
    return schedules;
  }

  async loadReferences(schedule) {
    schedule.course = await this.courseRepository.findById(schedule.courseId);
    schedule.teacher = await this.teacherRepository.findById(schedule.teacherId);
    schedule.classroom = await this.classroomRepository.findById(schedule.classroomId);
  }

  async create(data) {
    ensureExists(await this.courseRepository.findById(data.courseId), "Curso");
    ensureExists(await this.teacherRepository.findById(data.teacherId), "Docente");
    ensureExists(await this.classroomRepository.findById(data.classroomId), "Aula");
    if (new Date(data.endDate) <= new Date(data.startDate)) {
      throw new Error("La fecha final debe ser posterior a la inicial");
    }
    return this.repository.create(new CourseSchedule(data));
  }
}
