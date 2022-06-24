import { Cell } from "./Cell.mjs";

export class Grid {
  #grid;

  constructor(width, height) {
    this.#grid = this.createGrid(width, height);
  }

  createGrid(w, h) {
    return [...Array(h)].map((row) => this.addNewRow(w));
  }

  addNewRow(w) {
    return Array(w).fill(new Cell(false));
  }

  toString() {
    return (
      this.#grid
        .map((row) => row.map((col) => col.getColor()).join(""))
        .join("$") + "!"
    );
  }
}
