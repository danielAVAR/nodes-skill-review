import { Menu } from "../Menu.js";
import { ask, askNumber } from "../prompt.js";
import { printList } from "../printer.js";

export function buildClassroomMenu({ classroomService }) {
  return new Menu("Aulas", [
    {
      label: "Listar",
      action: async () => printList(await classroomService.list()),
    },
    {
      label: "Crear",
      action: async () => {
        const classroom = await classroomService.create({
          code: await ask("Código: "),
          description: await ask("Descripción: "),
          capacity: await askNumber("Capacidad: "),
        });
        console.log(`Aula creada con id ${classroom.id}`);
      },
    },
  ]);
}
