export class RotatingShape {
  #shape;

  constructor(shape) {
    if(typeof shape === "string") {
      this.shape = shape
        .replaceAll(" ", "")
        .split("\n")
        .map(s => s.split(""));
    } else {
      this.shape = shape;
    }
  }

  rotateRight() {
    const width = this.shape.length;
    const parsed = JSON.parse(JSON.stringify(this.shape));
    return new RotatingShape(parsed
      .map((rows, row) => rows
      .map((columns, col) => this.shape[width - 1 - col][row])));
  }

  rotateLeft() {
    return this.rotateRight().rotateRight().rotateRight();
  }

  toString() {
    return this.shape.map(arr => arr.join("")).join("\n") + "\n";
  }
}
