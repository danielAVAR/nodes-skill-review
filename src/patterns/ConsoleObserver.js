import { Observer } from "../interfaces/Observer.js";

export class ConsoleObserver extends Observer {
  update(event, data) {
    console.log(`[evento] ${event} -> id ${data.id}`);
  }
}
