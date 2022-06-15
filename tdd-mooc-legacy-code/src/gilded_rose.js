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
      const ab = "Aged Brie";
      const taf = "Backstage passes to a TAFKAL80ETC concert";
      const rag = "Sulfuras, Hand of Ragnaros";
      const item = this.items[i];
      if (item.name === ab) this.updateAgeBrie(item);
      else if (item.name === taf) {
        if (item.quality < 50) item.quality++;
        if (item.sellIn < 11 && item.quality < 50) item.quality++;
        if (item.sellIn < 6 && item.quality < 50) item.quality++;
        item.sellIn--;
        if (item.sellIn < 0) item.quality = 0;
      } else if (item.name === rag) {
        if (item.sellIn >= 0 && item.quality > 0) item.quality--;
      } else {
        if (item.quality > 0) item.quality--;
        item.sellIn--;
        if (item.sellIn < 0 && item.quality > 0) item.quality--;
      }
    }
    return this.items;
  }

  updateAgeBrie(item) {
    if (item.quality < 50) item.quality++;
    item.sellIn--;
    if (item.sellIn < 0 && item.quality < 50) item.quality++;
  }
}

module.exports = {
  Item,
  Shop,
};
