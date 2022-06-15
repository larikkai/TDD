class Item {
  constructor(...args) {
    this.name = args[0] ?? "tempName";
    this.sellIn = args[1] ?? 0;
    this.quality = args[2] ?? 0;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      this.update(this.items[i]);
    }
    return this.items;
  }

  update(item) {
    const { name } = item;
    if (name === "Sulfuras, Hand of Ragnaros") return;
    else if (name === "Aged Brie") this.updateAgeBrie(item);
    else if (name === "Backstage passes to a TAFKAL80ETC concert") this.updateTafka(item);
    else this.updateItem(item);
  }

  updateAgeBrie(item) {
    item.sellIn--;
    if (item.quality < 50) item.quality++;
    if (item.sellIn < 0 && item.quality < 50) item.quality++;
  }

  updateTafka(item) {
    if (item.quality < 50) item.quality++;
    if (item.sellIn < 11 && item.quality < 50) item.quality++;
    if (item.sellIn < 6 && item.quality < 50) item.quality++;
    item.sellIn--;
    if (item.sellIn < 0) item.quality = 0;
  }

  updateItem(item) {
    item.sellIn--;
    if (item.quality > 0) item.quality--;
    if (item.sellIn < 0 && item.quality > 0) item.quality--;
  }

  endOfDay() {
    this.items.forEach((item) => {
      item.sellIn--;
      item.quality--;
    });
    return this.items;
  }
}

module.exports = {
  Item,
  Shop,
};
