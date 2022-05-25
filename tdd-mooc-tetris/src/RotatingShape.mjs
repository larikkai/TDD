export class RotatingShape {
  width;
  shape;

  constructor(shapeString) {
    this.width = shapeString.indexOf("\n");
    let string = shapeString.replace(/\s+/g, "");
    this.shape = string.split("");
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
    const n = this.width;
    for(let i = 0; i < n; i++) {
      for(let j = 0; j < n; j++) {
        dest[((i*n+j)%n)*n+n-1-i] = src[i*n+j];
      }
    }
  }

  rotate2(src, dest) {
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
