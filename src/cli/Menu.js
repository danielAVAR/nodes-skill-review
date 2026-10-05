import { ask } from "./prompt.js";

export class Menu {
  constructor(title, options, backLabel = "Volver") {
    this.title = title;
    this.options = options;
    this.backLabel = backLabel;
  }

  async run() {
    let running = true;
    while (running) {
      this.show();
      const choice = await ask("Opción: ");
      if (choice === "0") {
        running = false;
      } else {
        await this.execute(choice);
      }
    }
  }

  show() {
    console.log(`\n=== ${this.title} ===`);
    this.options.forEach((option, index) => console.log(`${index + 1}. ${option.label}`));
    console.log(`0. ${this.backLabel}`);
  }

  async execute(choice) {
    const option = this.options[Number(choice) - 1];
    if (!option) {
      console.log("Opción inválida");
      return;
    }
    try {
      await option.action();
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  }
}
