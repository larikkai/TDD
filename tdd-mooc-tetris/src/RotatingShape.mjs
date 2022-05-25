export class RotatingShape {
  width;
  shape;
  rotateTable3;
  rotateTable5;

  constructor(shapeString) {
    this.width = shapeString.indexOf("\n");
    let string = shapeString.replace(/\s+/g, "");
    this.shape = string.split("");
    this.rotateTable3 = [
      2, 5, 8,
      1, 4, 7,
      0, 3, 6];
    this.rotateTable5 = [
      4, 9, 14, 19, 24,
      3, 8, 13, 18, 23,
      2, 7, 12, 17, 22,
      1, 6, 11, 16, 21,
      0, 5, 10, 15, 20];
  }

  rotateRight() {
    const dest = [...this.shape];
    const temp = [...this.shape];
    this.rotate(temp, dest);
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
    const table = this.width === 3 ? this.rotateTable3 : this.rotateTable5;
    for(let i = 0; i < this.shape.length; i++) {
      const nextPos = table[i];
      const letter = src[i];
      dest[nextPos] = letter;
    }
  }

  toString(source) {
    const arr = source ?? this.shape;
    const n = this.width;
    let print = "";
    for(let i = 0; i < n; i++) {
      for(let j = 0; j < n; j++) {
        print += arr[i*n+j];
      }
      print += "\n";
    }
    return print;
  }
}
