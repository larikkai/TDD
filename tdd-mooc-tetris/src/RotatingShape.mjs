export class RotatingShape {
  width;
  shape;
  rotateTable;
  visited;

  constructor(shapeString) {
    this.width = shapeString.indexOf("\n");
    let string = shapeString.replace(/\s+/g, "");
    this.shape = string.split("");
    this.visited = new Array(string.length);
    this.rotateTable = [2, 5, 8, 1, 4, 7, 0, 3, 6];
  }

  rotateRight() {
    this.rotate(this.shape, this.visited);
    return this.toString(this.visited);
  }

  rotateLeft() {
    this.shape = [...this.visited];
    this.rotate(this.shape, this.visited);
    this.shape = [...this.visited];
    this.rotate(this.shape, this.visited);
    return this.toString(this.visited);
  }

  rotate(src, dest) {
    for(let i = 0; i < this.rotateTable.length; i++) {
      const nextPos = this.rotateTable[i];
      const letter = src[i];
      dest[nextPos] = letter;
    }
  }

  toString(source) {
    const arr = source ?? this.shape;
    let print = "";
    for(let i = 0; i < this.width; i++) {
      for(let j = 0; j < this.width; j++) {
        print += arr[i*3+j];
      }
      print += "\n";
    }
    return print;
  }
}
