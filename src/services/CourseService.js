import { BaseService } from "./BaseService.js";
import { Course } from "../models/Course.js";
import { Topic } from "../models/Topic.js";

export class CourseService extends BaseService {
  constructor(courseRepository, topicRepository) {
    super(courseRepository);
    this.topicRepository = topicRepository;
  }

  async list() {
    const courses = await super.list();
    for (const course of courses) {
      const topics = await this.topicRepository.findByCourse(course.id);
      topics.forEach((topic) => course.addTopic(topic));
    }
    return courses;
  }

  create(data) {
    if (!data.code || !data.description) {
      throw new Error("Código y descripción son obligatorios");
    }
    if (data.intensity <= 0 || data.weight <= 0) {
      throw new Error("Intensidad y peso deben ser mayores a cero");
    }
    return this.repository.create(new Course(data));
  }

  async addTopic(courseId, data) {
    await this.getById(courseId);
    if (!data.code || !data.title) {
      throw new Error("Código y título son obligatorios");
    }
    return this.topicRepository.create(new Topic({ ...data, courseId }));
  }
}
