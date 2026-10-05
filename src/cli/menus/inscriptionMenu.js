import { Menu } from "../Menu.js";
import { ask, askNumber } from "../prompt.js";
import { printList } from "../printer.js";

export function buildInscriptionMenu({ inscriptionService, rateService }) {
  return new Menu("Inscripciones", [
    {
      label: "Listar",
      action: async () => printList(await inscriptionService.list()),
    },
    {
      label: "Inscribir estudiante",
      action: async () => {
        const studentId = await askNumber("Id del estudiante: ");
        const scheduleId = await askNumber("Id del horario: ");
        const inscription = await inscriptionService.enroll(studentId, scheduleId);
        console.log(`Inscripción creada con id ${inscription.id}`);
      },
    },
    {
      label: "Cancelar inscripción",
      action: async () => {
        await inscriptionService.cancel(await askNumber("Id de la inscripción: "));
        console.log("Inscripción cancelada");
      },
    },
    {
      label: "Calificar inscripción",
      action: async () => {
        const inscriptionId = await askNumber("Id de la inscripción: ");
        const value = await askNumber("Calificación (1 a 5): ");
        const comments = await ask("Comentarios: ");
        await rateService.rate(inscriptionId, value, comments);
        console.log("Calificación registrada");
      },
    },
    {
      label: "Listar calificaciones",
      action: async () => printList(await rateService.list()),
    },
  ]);
}
