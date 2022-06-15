var { expect } = require("chai");
var { Shop, Item } = require("../src/gilded_rose.js");

describe("Gilded Rose", function () {
  it("Empty shop can be created", function () {
    const gildedRose = new Shop();
    const items = gildedRose.updateQuality();
    expect(items.length).to.equal(0);
  });

  it("Quality decreases by one if quality is zero", function () {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("foo");
    expect(items[0].quality).to.equal(0);
    expect(items[0].sellIn).to.equal(-1);
  });

  it("Quality decreases by two if selling = 0 and quality > 0", function () {
    const gildedRose = new Shop([new Item("foo", 0, 5)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(3);
  });

  it("Quality decreases by 1 if selling > 0 and quality > 0", function () {
    const gildedRose = new Shop([new Item("foo", 1, 5)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(4);
  });

  it("Aged Brie quality increases by two if quality < 49 and selling < 1", function () {
    const gildedRose = new Shop([new Item("Aged Brie", 0, 48)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(50);
  });

  it("Aged Brie quality does not increace if >= 50", function () {
    const gildedRose = new Shop([new Item("Aged Brie", 0, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(50);
  });

  it("Aged Brie quality increases by one if selling >= 1", function () {
    const gildedRose = new Shop([new Item("Aged Brie", 1, 48)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(49);
  });

  it("TAFKAL80ETC quality is zero if sellin <= 0", function () {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
  });

  it("TAFKAL80ETC quality does not increace if sellin > 0 and quality >= 50 ", function () {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 1, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(50);
  });

  it("TAFKAL80ETC quality increases by three if selling < 6 and quality < 48", function () {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 47)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(50);
  });

  it("TAFKAL80ETC quality increases by two if selling < 11 and quality < 48", function () {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 6, 47)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(49);
  });

  it("TAFKAL80ETC quality increases by one if selling > 10 and quality < 48", function () {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 11, 47)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(48);
  });

  it("Hand of Ragnaros values does not update", function () {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 0, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(0);
    expect(items[0].quality).to.equal(1);
  });

  it("Item without sellin value gets default sellin value 0", function () {
    const gildedRose = new Shop([new Item("foo", null, 5)]);
    expect(gildedRose.items[0].sellIn).to.equal(0);
  });
});
