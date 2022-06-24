export class Grid {
  #grid;

  constructor(shape, width, iterations) {
    const arr = shape.split("");
    const newGrid = shape.split("");
    while (iterations !== 0) {
      iterations--;
      const n = arr.length;
      for (let i = 0; i < n; i++) {
        let ne = 0;
        if (i < n - 1 && arr[i + 1] === "o") ne++;
        if (i > 0 && arr[i - 1] === "o") ne++;
        if (i < n - width - 2 && arr[i + width + 2] === "o") ne++;
        if (i < n - width - 1 && arr[i + width + 1] === "o") ne++;
        if (i < n - width && arr[i + width] === "o") ne++;
        if (i > width + 2 && arr[i - width - 2] === "o") ne++; 
        if (i > width + 1 && arr[i - width - 1] === "o") ne++;
        if (i > width && arr[i - width] === "o") ne++;

        if (arr[i] === "o" && ne < 2) newGrid[i] = "b";
        if (arr[i] === "o" && ne > 3) newGrid[i] = "b";
        if (arr[i] === "b" && ne === 3) newGrid[i] = "o";
      }
    }
    this.#grid = newGrid;
  }

  toString() {
    return this.#grid.join("");
  }
}
