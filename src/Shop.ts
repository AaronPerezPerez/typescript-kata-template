export enum SPECIAL_ITEM {
    SULFURAS = 'Sulfuras, Hand of Ragnaros',
    AGED_BRIE = 'Aged Brie',
    BACKSTAGE_PASSES = 'Backstage passes to a TAFKAL80ETC concert',
}

export class Quality {
    static create(amount: number) {
        const qualityBoundaries = {
            min: 0,
            max: 50,
        }
        const restrictedAmount = Math.max(
            Math.min(amount, qualityBoundaries.max),
            qualityBoundaries.min
        )
        return new Quality(restrictedAmount)
    }
    static zero() {
        return new Quality(0)
    }

    private constructor(private value: number) {}

    getValue() {
        return this.value
    }

    add(amount: number) {
        return Quality.create(amount + this.value)
    }

    subtract(amount: number) {
        return Quality.create(amount - this.value)
    }
}
export class Item {
    constructor(
        public name: string,
        public sellIn: number,
        public quality: Quality
    ) {
        this.name = name
        this.sellIn = sellIn
        this.quality = quality
    }

    isSulfuras() {
        return this.name === SPECIAL_ITEM.SULFURAS
    }

    isAgedBrie() {
        return this.name === SPECIAL_ITEM.AGED_BRIE
    }
    isBackstagePasses() {
        return this.name === SPECIAL_ITEM.BACKSTAGE_PASSES
    }
}

export class Shop {
    constructor(private items: Item[] = []) {
        this.items = items
    }
    updateQuality() {
        this.items = this.items.map((item) => {
            if (item.isSulfuras()) return item

            const updatedSellIn = item.sellIn - 1
            const updatedQuality = this.computeUpdatedItemQuality(item)

            return new Item(item.name, updatedSellIn, updatedQuality)
        })

        return this.items
    }

    private restrictQualityToBoundaries(quality: number) {
        const qualityBoundaries = {
            min: 0,
            max: 50,
        }
        return Math.max(
            Math.min(quality, qualityBoundaries.max),
            qualityBoundaries.min
        )
    }

    private computeUpdatedItemQuality(item: Item): Quality {
        const updatedSellIn = item.sellIn - 1
        if (item.isAgedBrie()) {
            return this.computeAgedBrieUpdatedQuality(item)
        }
        if (item.isBackstagePasses()) {
            return this.computeBackstagePassesQuality(updatedSellIn, item)
        }

        const sellInDateHasPassed = updatedSellIn < 0
        const qualityAmountToSubtract = sellInDateHasPassed ? 2 : 1

        return item.quality.subtract(qualityAmountToSubtract)
    }

    private computeBackstagePassesQuality(updatedSellIn: number, item: Item) {
        if (updatedSellIn < 0) return Quality.zero()
        if (updatedSellIn <= 5) return item.quality.add(3)
        if (updatedSellIn <= 10) return item.quality.add(2)

        return item.quality.add(1)
    }

    private computeAgedBrieUpdatedQuality(agedBrie: Item) {
        const sellInDateHasPassed = agedBrie.sellIn < 0
        const qualityAmountToUpdate = sellInDateHasPassed ? 2 : 1

        return agedBrie.quality.add(qualityAmountToUpdate)
    }
}
