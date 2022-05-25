export class RotatingShape {
  shape;

  constructor(shape) {
    if(typeof shape === "string") {
      this.shape = shape
        .replace(/\s+/g, "")
        .split("");
    } else {
      this.shape = shape;
    }
  }

  rotateRight() {
    const dest = new Array(9);
    const n = Math.sqrt(this.shape.length);
    for(let i = 0; i < n; i++) {
      for(let j = 0; j < n; j++) {
        dest[((i*n+j)%n)*n+n-1-i] = this.shape[i*n+j];
      }
    }
    return new RotatingShape(dest);
  }

  rotateLeft() {
    return this.rotateRight().rotateRight().rotateRight();
  }

  toString() {
    const n = Math.sqrt(this.shape.length);
    let print = "";
    for(let i = 0; i < n; i++) {
      for(let j = 0; j < n; j++) {
        print += this.shape[i*n+j];
      }
      print += "\n";
    }
    return print;
  }
}
