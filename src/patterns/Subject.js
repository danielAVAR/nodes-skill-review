export class Subject {
  #observers = [];

  subscribe(observer) {
    this.#observers.push(observer);
  }

  notify(event, data) {
    this.#observers.forEach((observer) => observer.update(event, data));
  }
}
