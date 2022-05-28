import {RotatingShape} from "../src/RotatingShape.mjs";

export class Tetromino {
 #shape;
 
 static T_SHAPE = `.T.\nTTT\n...\n`; 

  constructor() {
    this.#shape = new RotatingShape(T_SHAPE);
    console.log(this.shape);
  };
};
