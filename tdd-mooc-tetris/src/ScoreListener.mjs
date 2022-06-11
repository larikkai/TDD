export class ScoreListener {
  #score;

  constructor() {
    this.#score = 0;
  }

  update_combo(combo, lines) {
    return combo + 2 * lines - 2;
  }

  update(data) {
    const [soft, lines, level, emptyBoard, oldCombo] = data;
    const bravo = emptyBoard ? 4 : 1;
    const combo = this.update_combo(oldCombo, lines);
    const roundedUp = Math.ceil((level + lines) / 4);
    this.#score = (roundedUp + soft) * lines * combo * bravo;
  }

  getScore() {
    return this.#score;
  }
}
