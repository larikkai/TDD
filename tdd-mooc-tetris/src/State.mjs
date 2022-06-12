export class State {
  score;
  soft;
  level;
  combo;
  lines;
  empty;

  constructor() {
    [this.score, this.soft, this.level] = [0, 0, 0, 0];
    [this.combo, this.lines, this.empty] = [0, 0, false];
  }
}
