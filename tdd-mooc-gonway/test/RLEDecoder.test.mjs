import { expect } from "chai";
import { decode } from "../src/RLEDecoder.mjs";

describe("Decoding RLE format", () => {
  it("Decoding RLE block pattern", () => {
    const decoded = decode("2o$2o!");
    expect(decoded).to.equal("oo$oo!");
  });

  it("Decoding RLE blinker pattern", () => {
    const decoded = decode("3o!");
    expect(decoded).to.equal("ooo!");
  });

  it("Decoding RLE glider pattern", () => {
    const decoded = decode("bob$2bo$3o!");
    expect(decoded).to.equal("bob$bbo$ooo!");
  });
});
