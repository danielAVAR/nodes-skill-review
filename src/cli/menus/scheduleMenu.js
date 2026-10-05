import { Menu } from "../Menu.js";
import { ask, askNumber } from "../prompt.js";
import { printList } from "../printer.js";

export function buildScheduleMenu({ scheduleService }) {
  return new Menu("Horarios de cursos", [
    {
      label: "Listar",
      action: async () => printList(await scheduleService.list()),
    },
    {
      label: "Crear",
      action: async () => {
        const schedule = await scheduleService.create({
          courseId: await askNumber("Id del curso: "),
          teacherId: await askNumber("Id del docente: "),
          classroomId: await askNumber("Id del aula: "),
          startDate: await ask("Fecha de inicio (AAAA-MM-DD): "),
          endDate: await ask("Fecha final (AAAA-MM-DD): "),
        });
        console.log(`Horario creado con id ${schedule.id}`);
      },
    },
  ]);
}
