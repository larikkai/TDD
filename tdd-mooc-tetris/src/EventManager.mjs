export class EventManager {
  #listeners;

  constructor() {
    this.#listeners = new Map();
  }

  subscribe(event_type, listener) {
    if (!this.#listeners.get(event_type)) this.#listeners.set(event_type, []);
    this.#listeners.set(
      event_type,
      this.#listeners.get(event_type).concat(listener)
    );
  }

  unsubscribe(event_type, listener) {
    this.#listeners.set(
      event_type,
      this.#listeners.get(event_type).filter((item) => item !== listener)
    );
  }
  notify(event_type, ...data) {
    if (!this.#listeners.get(event_type)) return;
    this.#listeners.get(event_type).forEach((listener) => {
      listener.update(data);
    });
  }
}
