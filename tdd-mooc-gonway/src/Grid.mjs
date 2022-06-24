export class Grid {
  #grid;

  constructor(shape, width, iterations) {
    let newGrid = shape.split("");
    while (iterations !== 0) {
      iterations--;
      const arr = shape.split("");
      const n = arr.length;
      for (let i = 0; i < n; i++) {
        let ne = 0;
        if (i < n - 1 && newGrid[i + 1] === "o") ne++;
        if (i > 0 && newGrid[i - 1] === "o") ne++;
        if (i < n - width - 2 && newGrid[i + width + 2] === "o") ne++;
        if (i < n - width - 1 && newGrid[i + width + 1] === "o") ne++;
        if (i < n - width && newGrid[i + width] === "o") ne++;
        if (i > width + 2 && newGrid[i - width - 2] === "o") ne++; 
        if (i > width + 1 && newGrid[i - width - 1] === "o") ne++;
        if (i > width && newGrid[i - width] === "o") ne++;

        if (newGrid[i] === "o" && ne < 2) arr[i] = "b";
        if (newGrid[i] === "o" && ne > 3) arr[i] = "b";
        if (newGrid[i] === "b" && ne === 3) arr[i] = "o";
      }
      newGrid = arr;
    }
    this.#grid = newGrid;
  }

  toString() {
    return this.#grid.join("");
  }
}
