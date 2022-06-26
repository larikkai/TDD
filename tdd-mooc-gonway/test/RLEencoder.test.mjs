import { expect } from "chai";
import { encode } from "../src/RLEcoder.mjs";

describe("Encodind to RLE format", () => {
  it("Encoding RLE block pattern", () => {
    const encoded = encode("oo$oo!");
    expect(encoded).to.equal("2o$2o!");
  });

  it("Decoding RLE blinker pattern", () => {
    const encoded = encode("ooo!");
    expect(encoded).to.equal("3o!");
  });

  it("Decoding RLE glider pattern", () => {
    const encoded = encode("bob$bbo$ooo!");
    expect(encoded).to.equal("bob$2bo$3o!");
  });
});
