import { Database } from "./config/Database.js";
import { Subject } from "./patterns/Subject.js";
import { ConsoleObserver } from "./patterns/ConsoleObserver.js";
import { StudentRepository } from "./repositories/StudentRepository.js";
import { TeacherRepository } from "./repositories/TeacherRepository.js";
import { CityRepository } from "./repositories/CityRepository.js";
import { IdentificationTypeRepository } from "./repositories/IdentificationTypeRepository.js";
import { CourseRepository } from "./repositories/CourseRepository.js";
import { TopicRepository } from "./repositories/TopicRepository.js";
import { ClassroomRepository } from "./repositories/ClassroomRepository.js";
import { CourseScheduleRepository } from "./repositories/CourseScheduleRepository.js";
import { InscriptionRepository } from "./repositories/InscriptionRepository.js";
import { RateRepository } from "./repositories/RateRepository.js";
import { StudentService } from "./services/StudentService.js";
import { PersonService } from "./services/PersonService.js";
import { ReferenceService } from "./services/ReferenceService.js";
import { CourseService } from "./services/CourseService.js";
import { ClassroomService } from "./services/ClassroomService.js";
import { ScheduleService } from "./services/ScheduleService.js";
import { InscriptionService } from "./services/InscriptionService.js";
import { RateService } from "./services/RateService.js";
import { buildMainMenu } from "./cli/menus/mainMenu.js";
import { closePrompt } from "./cli/prompt.js";

const db = Database.getInstance();

const studentRepository = new StudentRepository(db);
const teacherRepository = new TeacherRepository(db);
const cityRepository = new CityRepository(db);
const identificationTypeRepository = new IdentificationTypeRepository(db);
const courseRepository = new CourseRepository(db);
const topicRepository = new TopicRepository(db);
const classroomRepository = new ClassroomRepository(db);
const scheduleRepository = new CourseScheduleRepository(db);
const inscriptionRepository = new InscriptionRepository(db);
const rateRepository = new RateRepository(db);

const events = new Subject();
events.subscribe(new ConsoleObserver());

const services = {
  studentService: new StudentService(studentRepository),
  teacherService: new PersonService(teacherRepository, "teacher"),
  referenceService: new ReferenceService(cityRepository, identificationTypeRepository),
  courseService: new CourseService(courseRepository, topicRepository),
  classroomService: new ClassroomService(classroomRepository),
  scheduleService: new ScheduleService(
    scheduleRepository,
    courseRepository,
    teacherRepository,
    classroomRepository
  ),
  inscriptionService: new InscriptionService(
    inscriptionRepository,
    studentRepository,
    scheduleRepository,
    events
  ),
  rateService: new RateService(rateRepository, inscriptionRepository),
};

try {
  await buildMainMenu(services).run();
} finally {
  closePrompt();
  await db.close();
}
