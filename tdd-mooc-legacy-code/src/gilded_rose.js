class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      let { name, sellIn, quality } = this.items[i];
      if (name !== "Aged Brie" && name !== "Backstage passes to a TAFKAL80ETC concert") {
        if (quality > 0 && name !== "Sulfuras, Hand of Ragnaros") quality--;
      } else {
        if (quality < 50) {
          quality++;
          if (name === "Backstage passes to a TAFKAL80ETC concert") {
            if (sellIn < 11 && quality < 50) {
              quality++;
            }
            if (sellIn < 6 && quality < 50) {
              quality++;
            }
          }
        }
      }
      if (name !== "Sulfuras, Hand of Ragnaros") {
        sellIn--;
      }
      if (sellIn >= 0) {
        this.items[i] = { name, sellIn, quality };
        return this.items;
      }
      if (name === "Aged Brie") {
        if (quality < 50) quality++;
        this.items[i] = { name, sellIn, quality };
        return this.items;
      }
      if (name === "Backstage passes to a TAFKAL80ETC concert") quality = 0;
      if (name !== "Sulfuras, Hand of Ragnaros" && quality > 0) quality--;
      this.items[i] = { name, sellIn, quality };
    }
    return this.items;
  }
}

module.exports = {
  Item,
  Shop,
};
