export class Shape {
  #shape;
  #coordinates;

  constructor(string) {
    this.#shape = string ?? "";
    this.#coordinates = this.#shape
      .replaceAll("!", "")
      .split("$")
      .map((row) => row.split(""))
      .map((row, ri) => row
        .map((col, ci) => {
          if (col === "o") return ri * 3 + ci
          return col
        })
        .filter((col) => col !== "b")
    ).flat().toString();
  }

  getCoordinates() {
    return this.#coordinates;
  }

  toString() {
    return this.#shape;
  }
}
