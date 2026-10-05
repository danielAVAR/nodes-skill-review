import { Menu } from "../Menu.js";
import { printList } from "../printer.js";
import { buildStudentMenu } from "./studentMenu.js";
import { buildTeacherMenu } from "./teacherMenu.js";
import { buildCourseMenu } from "./courseMenu.js";
import { buildClassroomMenu } from "./classroomMenu.js";
import { buildScheduleMenu } from "./scheduleMenu.js";
import { buildInscriptionMenu } from "./inscriptionMenu.js";

export function buildMainMenu(services) {
  return new Menu(
    "Gestión académica",
    [
      { label: "Estudiantes", action: () => buildStudentMenu(services).run() },
      { label: "Docentes", action: () => buildTeacherMenu(services).run() },
      { label: "Cursos", action: () => buildCourseMenu(services).run() },
      { label: "Aulas", action: () => buildClassroomMenu(services).run() },
      { label: "Horarios", action: () => buildScheduleMenu(services).run() },
      { label: "Inscripciones", action: () => buildInscriptionMenu(services).run() },
      {
        label: "Todas las personas",
        action: async () => {
          const students = await services.studentService.list();
          const teachers = await services.teacherService.list();
          printList([...students, ...teachers]);
        },
      },
    ],
    "Salir"
  );
}
