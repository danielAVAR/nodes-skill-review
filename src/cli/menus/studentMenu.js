import { Menu } from "../Menu.js";
import { ask, askNumber } from "../prompt.js";
import { printList } from "../printer.js";
import { askPersonData } from "../personForm.js";

export function buildStudentMenu({ studentService, referenceService }) {
  return new Menu("Estudiantes", [
    {
      label: "Listar",
      action: async () => printList(await studentService.list()),
    },
    {
      label: "Registrar",
      action: async () => {
        const data = await askPersonData(referenceService);
        printList(await referenceService.listCities());
        data.code = await ask("Código: ");
        data.gender = await ask("Género: ");
        data.birthdate = await ask("Fecha de nacimiento (AAAA-MM-DD): ");
        data.address = await ask("Dirección: ");
        data.cityId = await askNumber("Id ciudad: ");
        const student = await studentService.register(data);
        console.log(`Estudiante creado con id ${student.id}`);
      },
    },
    {
      label: "Eliminar",
      action: async () => {
        await studentService.remove(await askNumber("Id del estudiante: "));
        console.log("Estudiante eliminado");
      },
    },
  ]);
}
