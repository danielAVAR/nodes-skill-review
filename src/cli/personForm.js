import { ask, askNumber } from "./prompt.js";
import { printList } from "./printer.js";

export async function askPersonData(referenceService) {
  printList(await referenceService.listIdentificationTypes());
  return {
    firstName: await ask("Nombres: "),
    lastName: await ask("Apellidos: "),
    identificationTypeId: await askNumber("Id tipo de identificación: "),
    identificationNumber: await ask("Número de identificación: "),
    email: await ask("Correo: "),
  };
}
