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
    const rotated = new Array(9);
    const width = Math.sqrt(this.shape.length);
    for(let i = 0; i < width; i++) {
      for(let j = 0; j < width; j++) {
        const row = ((i*width+j)%width)*width;
        const column = width-1-i;
        const pos = i*width+j;
        rotated[row+column] = this.shape[pos];
      }
    }
    return new RotatingShape(rotated);
  }

  rotateLeft() {
    return this.rotateRight().rotateRight().rotateRight();
  }

  toString() {
    const width = Math.sqrt(this.shape.length);
    let print = "";
    for(let i = 0; i < width; i++) {
      for(let j = 0; j < width; j++) {
        print += this.shape[i*width+j];
      }
      print += "\n";
    }
    return print;
  }
}
