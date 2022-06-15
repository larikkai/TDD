var { expect } = require("chai");
var { Shop, Item } = require("../src/gilded_rose.js");

describe("Gilded Rose", function () {
  it("should foo", function () {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("foo");
  });
  
  it("Empty shop can be created", function () {
    const gildedRose = new Shop();
    const items = gildedRose.updateQuality();
    expect(items.length).to.equal(0);
  });

  it("Random item quality decreases if > 0", function () {
    const gildedRose = new Shop([new Item("foo", 0, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
  });

  it("Random item quality decreases by 2 if selling < 0", function () {
    const gildedRose = new Shop([new Item("foo", -1, 5)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(3);
  });

  it("Random item quality decreases by 1 if selling >= 0", function () {
    const gildedRose = new Shop([new Item("foo", 1, 5)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(4);
  });

  it("Aged Brie quality increases by two if < 50", function () {
    const gildedRose = new Shop([new Item("Aged Brie", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(2);
  });

  it("Aged Brie quality does not increace if >= 50", function () {
    const gildedRose = new Shop([new Item("Aged Brie", 0, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(50);
  });
  
  it("TAFKAL80ETC quality decreace if > 0", function () {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
  });

  it("TAFKAL80ETC quality increase by one if sellin > 10 && quality < 50 ", function () {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 11, 49)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(50);
  });

  it("TAFKAL80ETC quality increase by one if sellin < 6 && quality > 48 ", function () {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(50);
  });
  
  it("TAFKAL80ETC quality increase by one if sellin < 11 && quality > 48 ", function () {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(50);
  });

  it("Hand of Ragnaros quality does not increase if > 0", function () {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 0, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(1);
  });

  it("Hand of Ragnaros quality does not increase if sellin < 0", function () {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", -1, 2)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(2);
  });
});
