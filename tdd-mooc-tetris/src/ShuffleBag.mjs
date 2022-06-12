export class ShuffleBag {
  #items;
  #currentPos;

  constructor(...items) {
    this.#items = items;
    this.#currentPos = items.length - 1;
  }

  addItem(item) {
    this.#items = this.#items.concat(item);
    this.#currentPos = this.#items.length - 1;
  }

  getNext() {
    let currentItem;
    if (this.#currentPos < 1) {
      this.#currentPos = this.#items.length - 1;
      currentItem = this.#items[0];
      return currentItem;
    }

    const pos = Math.floor(Math.random() * this.#currentPos);
    currentItem = this.#items[pos];
    this.#items[pos] = this.#items[this.#currentPos];
    this.#items[this.#currentPos] = currentItem;
    this.#currentPos--;
    return currentItem;
  }
}
