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
      const ab = "Aged Brie";
      const taf = "Backstage passes to a TAFKAL80ETC concert";
      const rag = "Sulfuras, Hand of Ragnaros";
      if (name === ab && quality < 50) quality++;
      if (name === taf && quality < 50) {
        quality++;
        if (sellIn < 11 && quality < 50) quality++;
        if (sellIn < 6 && quality < 50) quality++;
      }
      if (quality > 0 && name !== ab && name !== taf && name !== rag) quality--;
      if (name !== rag) {
        sellIn--;
      }
      if (sellIn >= 0) {
        this.items[i] = { name, sellIn, quality };
        return this.items;
      }
      if (name === ab) {
        if (quality < 50) quality++;
        this.items[i] = { name, sellIn, quality };
        return this.items;
      }
      if (name === taf) quality = 0;
      if (name !== rag && quality > 0) quality--;
      this.items[i] = { name, sellIn, quality };
    }
    return this.items;
  }
}

module.exports = {
  Item,
  Shop,
};
