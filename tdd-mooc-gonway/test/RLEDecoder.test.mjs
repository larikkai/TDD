import { expect } from "chai";
import { decode } from "../src/RLEDecoder.mjs";

describe("Decoding RLE format", () => {
  it("Decoding RLE pattern", () => {
    const decoded = decode("2o$2o!");
    expect(decoded).to.equal("oo&oo!");
  });
});
