import { Menu } from "../Menu.js";
import { askNumber } from "../prompt.js";
import { printList } from "../printer.js";
import { askPersonData } from "../personForm.js";

export function buildTeacherMenu({ teacherService, referenceService }) {
  return new Menu("Docentes", [
    {
      label: "Listar",
      action: async () => printList(await teacherService.list()),
    },
    {
      label: "Registrar",
      action: async () => {
        const data = await askPersonData(referenceService);
        const teacher = await teacherService.register(data);
        console.log(`Docente creado con id ${teacher.id}`);
      },
    },
    {
      label: "Eliminar",
      action: async () => {
        await teacherService.remove(await askNumber("Id del docente: "));
        console.log("Docente eliminado");
      },
    },
  ]);
}
