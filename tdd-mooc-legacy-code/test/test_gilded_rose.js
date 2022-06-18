var { expect } = require("chai");
var { Shop, Item } = require("../src/gilded_rose.js");

function daysWillPass(shop, n) {
  for (let i = 1; i <= n; i++) {
    shop.endOfDay();
  }
}

const brie = "Aged Brie";
const backstage = "Backstage passes to a TAFKAL80ETC concert";
const sulfuras = "Sulfuras, Hand of Ragnaros";

describe("Gilded Rose", function () {
  it("Empty shop can be created", function () {
    const gildedRose = new Shop();
    gildedRose.endOfDay();
    expect(gildedRose.items.length).to.equal(0);
  });

  it("Cannot create item with negative quality", function () {
    const gildedRose = new Shop([new Item("f", 1, -1)]);
    expect(gildedRose.items[0].quality).to.equal(0);
  });

  it("Cannot create item with quality higher than 50", function () {
    const gildedRose = new Shop([new Item("f", 1, 100)]);
    expect(gildedRose.items[0].quality).to.equal(50);
  });

  it("Item without sellin value gets default sellin value 0", function () {
    const gildedRose = new Shop([new Item("foo", null, 5)]);
    expect(gildedRose.items[0].sellIn).to.equal(0);
  });

  it("Item without quality value gets default quality value 0", function () {
    const gildedRose = new Shop([new Item("foo", null)]);
    expect(gildedRose.items[0].quality).to.equal(0);
  });

  it("At the end of each day sellIn and quality decreases", function () {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    gildedRose.endOfDay();
    expect(gildedRose.items[0].name).to.equal("foo");
    expect(gildedRose.items[0].quality).to.equal(0);
    expect(gildedRose.items[0].sellIn).to.equal(-1);
  });

  it("End of day quality never negative", function () {
    const gildedRose = new Shop([new Item("foo", 1, 0)]);
    gildedRose.endOfDay();
    expect(gildedRose.items[0].quality).to.equal(0);
  });

  it("Quality decreases by two if selling = 0 and quality > 0", function () {
    const gildedRose = new Shop([new Item("foo", 0, 5)]);
    gildedRose.endOfDay();
    expect(gildedRose.items[0].quality).to.equal(3);
  });

  it("Quality decreases by 1 if selling > 0 and quality > 0", function () {
    const gildedRose = new Shop([new Item("foo", 1, 5)]);
    gildedRose.endOfDay();
    expect(gildedRose.items[0].quality).to.equal(4);
  });

  it("Once sellin < 0 then quality drops twice as fast", function () {
    const gildedRose = new Shop([new Item("f", 1, 8)]);
    daysWillPass(gildedRose, 2);
    expect(gildedRose.items[0].quality).to.equal(5);
  });

  it("Aged Brie quality increases by two if quality < 49 and selling < 1", function () {
    const gildedRose = new Shop([new Item(brie, 0, 48)]);
    gildedRose.endOfDay();
    expect(gildedRose.items[0].quality).to.equal(50);
  });

  it("Aged Brie quality does not increace if >= 50", function () {
    const gildedRose = new Shop([new Item(brie, 0, 50)]);
    gildedRose.endOfDay();
    expect(gildedRose.items[0].quality).to.equal(50);
  });

  it("Aged Brie quality increases by one if selling >= 1", function () {
    const gildedRose = new Shop([new Item(brie, 1, 48)]);
    gildedRose.endOfDay();
    expect(gildedRose.items[0].quality).to.equal(49);
  });

  it("Aged Brie increaces increases quality the older it gets", function () {
    const gildedRose = new Shop([new Item(brie, 5, 1)]);
    daysWillPass(gildedRose, 4);
    expect(gildedRose.items[0].quality).to.equal(5);
  });

  it("Backstage passes quality is never zero", function () {
    const gildedRose = new Shop([new Item(backstage, 0, 1)]);
    gildedRose.endOfDay();
    expect(gildedRose.items[0].quality).to.equal(0);
  });

  it("Backstage passes quality does not increace if sellin > 0 and quality >= 50 ", function () {
    const gildedRose = new Shop([new Item(backstage, 1, 50)]);
    gildedRose.endOfDay();
    expect(gildedRose.items[0].quality).to.equal(50);
  });

  it("Backstage passes quality increases by three if selling < 6 and quality < 48", function () {
    const gildedRose = new Shop([new Item(backstage, 5, 47)]);
    gildedRose.endOfDay();
    expect(gildedRose.items[0].quality).to.equal(50);
  });

  it("Backstage passes quality increases by two if selling < 11 and quality < 48", function () {
    const gildedRose = new Shop([new Item(backstage, 6, 47)]);
    gildedRose.endOfDay();
    expect(gildedRose.items[0].quality).to.equal(49);
  });

  it("Backstage passes quality increases by one if selling > 10 and quality < 48", function () {
    const gildedRose = new Shop([new Item(backstage, 11, 47)]);
    gildedRose.endOfDay();
    expect(gildedRose.items[0].quality).to.equal(48);
  });

  it("Sulfuras quality after creation is always 80", function () {
    const gildedRose = new Shop([new Item(sulfuras, 0, 1)]);
    gildedRose.endOfDay();
    expect(gildedRose.items[0].quality).to.equal(80);
  });

  it("Sulfuras values does not change", function () {
    const gildedRose = new Shop([new Item(sulfuras, 0, 80)]);
    gildedRose.endOfDay();
    expect(gildedRose.items[0].sellIn).to.equal(0);
    expect(gildedRose.items[0].quality).to.equal(80);
  });

  it("Conjured quality never gets less than 0", function () {
    const gildedRose = new Shop([new Item("Conjured", 0, 0)]);
    gildedRose.endOfDay();
    expect(gildedRose.items[0].quality).to.equal(0);
  });

  it("Conjured items degrade in quality twice as fast as normal", function () {
    const normal = new Item("foo", 5, 10);
    const conjured = new Item("Conjured", 5, 10);
    const gildedRose = new Shop([normal, conjured]);
    gildedRose.endOfDay();
    expect(gildedRose.items[0].quality).to.equal(9);
    expect(gildedRose.items[1].quality).to.equal(8);
  });

  it("Conjured items degrade in quality by 4 after last sellIn day", function () {
    const gildedRose = new Shop([new Item("Conjured", 0, 10)]);
    gildedRose.endOfDay();
    expect(gildedRose.items[0].quality).to.equal(6);
  });

  it("End of the day all normal items decrease sellIn and quality", function () {
    const item1 = new Item("f", 1, 2);
    const item2 = new Item("g", 5, 5);
    const gildedRose = new Shop([item1, item2]);
    gildedRose.endOfDay().items;
    expect(gildedRose.items[0].sellIn).to.equal(0);
    expect(gildedRose.items[0].quality).to.equal(1);
    expect(gildedRose.items[1].sellIn).to.equal(4);
    expect(gildedRose.items[1].quality).to.equal(4);
  });
});
