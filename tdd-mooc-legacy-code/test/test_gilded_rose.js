var { expect } = require("chai");
var { Shop, Item } = require("../src/gilded_rose.js");

function daysWillPass(shop, n) {
  for (let i = 1; i <= n; i++) {
    shop.endOfDay();
  }
}

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

  it("Item without quality value gets default quality value 0", function () {
    const gildedRose = new Shop([new Item("foo", null)]);
    expect(gildedRose.items[0].quality).to.equal(0);
  });

  it("End of the day all items decrease sellIn and quality", function () {
    const item1 = new Item("f", 1, 2);
    const item2 = new Item("g", 5, 5);
    const gildedRose = new Shop([item1, item2]);
    gildedRose.endOfDay().items;
    expect(gildedRose.items[0].sellIn).to.equal(0);
    expect(gildedRose.items[0].quality).to.equal(1);
    expect(gildedRose.items[1].sellIn).to.equal(4);
    expect(gildedRose.items[1].quality).to.equal(4);
  });

  it("Once sellin < 0 then quality drops twice as fast", function () {
    const gildedRose = new Shop([new Item("f", 1, 8)]);
    daysWillPass(gildedRose, 2);
    expect(gildedRose.items[0].quality).to.equal(5);
  });

  it("End of day quality never negative", function () {
    const gildedRose = new Shop([new Item("f", 1, 0)]);
    gildedRose.endOfDay();
    expect(gildedRose.items[0].quality).to.equal(0);
  });

  it("Cannot create item with negative quality", function () {
    const gildedRose = new Shop([new Item("f", 1, -1)]);
    expect(gildedRose.items[0].quality).to.equal(0);
  });

  it("Aged Brie increaces increases quality the older it gets", function () {
    const gildedRose = new Shop([new Item("Aged Brie", 5, 1)]);
    daysWillPass(gildedRose, 4);
    expect(gildedRose.items[0].quality).to.equal(5);
  });

  it("Cannot create item with quality higher than 50", function () {
    const gildedRose = new Shop([new Item("f", 1, 100)]);
    expect(gildedRose.items[0].quality).to.equal(50);
  });
});
