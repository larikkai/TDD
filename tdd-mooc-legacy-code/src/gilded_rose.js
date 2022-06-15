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
      else if (item.name === taf) this.updateTafka(item);
      else if (item.name === rag) this.updateSulfuras(item);
      else this.updateItem(item);
    }
    return this.items;
  }

  updateAgeBrie(item) {
    if (item.quality < 50) item.quality++;
    item.sellIn--;
    if (item.sellIn < 0 && item.quality < 50) item.quality++;
  }

  updateTafka(item) {
    if (item.quality < 50) item.quality++;
    if (item.sellIn < 11 && item.quality < 50) item.quality++;
    if (item.sellIn < 6 && item.quality < 50) item.quality++;
    item.sellIn--;
    if (item.sellIn < 0) item.quality = 0;
  }

  updateSulfuras(item) {
    if (item.sellIn >= 0 && item.quality > 0) item.quality--;
  }

  updateItem(item) {
    if (item.quality > 0) item.quality--;
    item.sellIn--;
    if (item.sellIn < 0 && item.quality > 0) item.quality--;
  }
}

module.exports = {
  Item,
  Shop,
};
