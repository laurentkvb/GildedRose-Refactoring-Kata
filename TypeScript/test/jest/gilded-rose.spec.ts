import { Item, GildedRose } from "@/gilded-rose";

describe("Gilded Rose", () => {
  // "Aged Brie" actually increases in Quality the older it gets
  it("should process Aged Brie", () => {
    const gildedRose = new GildedRose([new Item("Aged Brie", 2, 2)]);
    // what happens after 1 day
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("Aged Brie");
    expect(items[0].sellIn).toBe(1);
    expect(items[0].quality).toBe(3);
  });

  // "Sulfuras", being a legendary item, never has to be sold or decreases in   Quality
  // - It doesn't degrade in quality or sellin value - due to being legendary
  it("should process Sulfuras, Hand of Ragnaros", () => {
    const gildedRose = new GildedRose([
      new Item("Sulfuras, Hand of Ragnaros", 2, 2),
    ]);
    const items = gildedRose.updateQuality();

    expect(items[0].name).toBe("Sulfuras, Hand of Ragnaros");
    expect(items[0].sellIn).toBe(2);
    expect(items[0].quality).toBe(2);
  });

  it("should process Backstage passes to a TAFKAL80ETC concert", () => {
    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 2, 2),
    ]);
    const items = gildedRose.updateQuality();

    expect(items[0].name).toBe("Backstage passes to a TAFKAL80ETC concert");
    expect(items[0].sellIn).toBe(1);
    expect(items[0].quality).toBe(5);
  });

  //The Quality of an item is never more than 50
  it("should process an item with already 50 quality", () => {
    const gildedRose = new GildedRose([
      new Item("Sulfuras, Hand of Ragnaros", 0, 50),
    ]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(50);
  });

  // The Quality of an item is never negative
  it("should process when item quality cannot be negative", () => {
    const gildedRose = new GildedRose([
      new Item("Sulfuras, Hand of Ragnaros", 0, 0),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  it("should process Once the sell by date has passed, Quality degrades twice as fast", () => {
    const gildedRose = new GildedRose([new Item("Bronze Scimitar", 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(8);
  });

  it("should process backstage pass drops to 0 after concert AKA sell in value 0", () => {
    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 0, 10),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  it("should process backstage pass drops to 10 days left to 1", () => {
    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 11, 10),
    ]);
    let items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(11);
    gildedRose.updateQuality(); // 10 days left
    expect(items[0].quality).toBe(13);

    let days = 5;
    for (let i = 0; i < days; i++) {
      gildedRose.updateQuality(); // 5 days left
    }

    expect(items[0].quality).toBe(24);
    gildedRose.updateQuality(); // 4 days left
    expect(items[0].quality).toBe(27);
  });
});
