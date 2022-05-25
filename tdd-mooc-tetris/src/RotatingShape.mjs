export class RotatingShape {
  width;
  shape;

  constructor(shapeString) {
    if(typeof shapeString === "string") {
      this.width = shapeString.indexOf("\n");
      let string = shapeString.replace(/\s+/g, "");
      this.shape = string.split("");
    } else {
      this.width = Math.sqrt(shapeString.length);
      this.shape = shapeString;
    }
  }

  rotateRight() {
    const dest = new Array(9);
    const n = this.width;
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
    const n = this.width;
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
