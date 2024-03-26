export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  handleBackstagePasses(item: Item) {
    if (this.isBackStagePass(item.name)) {
      if (item.sellIn < 11 && item.quality < 50) {
        item.quality = item.quality + 1;
      }
      if (item.sellIn < 6 && item.quality < 50) {
        item.quality = item.quality + 1;
      }
    }
  }

  isAgedBrie(name: string) {
    return name === "Aged Brie";
  }

  isConjured(name: string) {
    return name === "Conjured Mana Cake";
  }

  isBackStagePass(name: string) {
    return name === "Backstage passes to a TAFKAL80ETC concert";
  }
  isSulfuras(name: string) {
    return name === "Sulfuras, Hand of Ragnaros";
  }

  decreaseQuality(item: Item) {
    item.quality = item.quality - 1;
  }

  increaseQuality(item: Item) {
    item.quality = item.quality + 1;
  }

  adjustQuality(item: Item) {
    if (this.isAgedBrie(item.name) || this.isBackStagePass(item.name)) {
      if (item.quality < 50) {
        this.increaseQuality(item);
        this.handleBackstagePasses(item);
      }
    } else {
      if (!this.isSulfuras(item.name) && item.quality > 0) {
        if (this.isConjured(item.name)) {
          this.decreaseQuality(item);
          this.decreaseQuality(item);
        } else {
          this.decreaseQuality(item);
        }
      }
    }
  }

  adjustSellIn(item: Item) {
    if (!this.isSulfuras(item.name)) {
      item.sellIn = item.sellIn - 1;
    }

    if (item.sellIn < 0) {
      if (this.isAgedBrie(item.name)) {
        if (item.quality < 50) {
          this.increaseQuality(item);
        }
      } else {
        if (this.isBackStagePass(item.name)) {
          item.quality = item.quality - item.quality;
        } else {
          if (item.quality > 0 && !this.isSulfuras(item.name)) {
            this.decreaseQuality(item);
          }
        }
      }
    }
  }

  updateQuality() {
    for (const item of this.items) {
      this.adjustQuality(item);
      this.adjustSellIn(item);
    }

    return this.items;
  }
}
