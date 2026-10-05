import { Menu } from "../Menu.js";
import { ask, askNumber } from "../prompt.js";
import { printList } from "../printer.js";

export function buildCourseMenu({ courseService }) {
  return new Menu("Cursos", [
    {
      label: "Listar con temas",
      action: async () => printList(await courseService.list()),
    },
    {
      label: "Crear curso",
      action: async () => {
        const course = await courseService.create({
          code: await ask("Código: "),
          description: await ask("Descripción: "),
          intensity: await askNumber("Intensidad (horas): "),
          weight: await askNumber("Peso: "),
        });
        console.log(`Curso creado con id ${course.id}`);
      },
    },
    {
      label: "Agregar tema a un curso",
      action: async () => {
        const courseId = await askNumber("Id del curso: ");
        const topic = await courseService.addTopic(courseId, {
          code: await ask("Código del tema: "),
          title: await ask("Título: "),
          description: await ask("Descripción: "),
        });
        console.log(`Tema creado con id ${topic.id}`);
      },
    },
  ]);
}
