import { expect } from "chai";
import { encode } from "../src/RLEcoder.mjs";

describe("Encodind to RLE format", () => {
  it("Encoding RLE block pattern", () => {
    const encoded = encode("oo$oo!");
    expect(encoded).to.equal("2o$2o!");
  });

  xit("Decoding RLE blinker pattern", () => {
    const decoded = decode("3o!");
    expect(decoded).to.equal("ooo!");
  });

  xit("Decoding RLE glider pattern", () => {
    const decoded = decode("bob$2bo$3o!");
    expect(decoded).to.equal("bob$bbo$ooo!");
  });
});
