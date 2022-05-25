export class RotatingShape {
  width;
  shape;
  rotateTable;

  constructor(shapeString) {
    this.width = shapeString.indexOf("\n");
    let string = shapeString.replace(/\s+/g, "");
    this.shape = string.split("");
    this.rotateTable = [2, 5, 8, 1, 4, 7, 0, 3, 6];
  }

  rotateRight() {
    const dest = [...this.shape];
    this.rotate(this.shape, dest);
    return this.toString(dest);
  }

  rotateLeft() {
    const dest = [...this.shape];
    for(let i = 0; i < 3; i++) {
      let temp = [...dest];
      this.rotate(temp, dest);
    }
    return this.toString(dest);
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
