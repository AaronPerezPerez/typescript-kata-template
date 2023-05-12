import { describe, expect, it } from 'vitest'
import { Item, Quality, Shop, SPECIAL_ITEM } from '../src/Shop'

describe('GildedRose', () => {
    it('decreases the quality and sellIn values of every item each day', () => {
        const chocolate = new Item('Chocolate', 3, Quality.create(1))
        const shop = new Shop([chocolate])

        const updatedChocolate = shop.updateQuality().at(0)

        expect(updatedChocolate?.quality.getValue()).toBe(0)
        expect(updatedChocolate?.sellIn).toBe(2)
    })

    it('decreases the quality twice as fast after sell date has passed', () => {
        const chocolate = new Item('Chocolate', 1, Quality.create(10))
        const shop = new Shop([chocolate])

        shop.updateQuality()
        const updatedChocolate = shop.updateQuality().at(0)

        expect(updatedChocolate?.quality.getValue()).toBe(7)
        expect(updatedChocolate?.sellIn).toBe(-1)
    })

    it('never lowers the quality below zero', () => {
        const chocolate = new Item('Chocolate', 1, Quality.create(1))
        const shop = new Shop([chocolate])

        shop.updateQuality()
        shop.updateQuality()
        shop.updateQuality()
        shop.updateQuality()
        const updatedChocolate = shop.updateQuality().at(0)

        expect(updatedChocolate?.quality.getValue()).toBe(0)
        expect(updatedChocolate?.sellIn).toBe(-4)
    })

    it('increases the quality of "Aged Brie" the older it gets', () => {
        const agedBrie = new Item(SPECIAL_ITEM.AGED_BRIE, 1, Quality.create(1))
        const shop = new Shop([agedBrie])

        const updatedAgedBrie = shop.updateQuality().at(0)

        expect(updatedAgedBrie?.quality.getValue()).toBe(2)
    })

    it('does not increase the quality the item above 50', () => {
        const agedBrie = new Item(SPECIAL_ITEM.AGED_BRIE, 1, Quality.create(50))
        const shop = new Shop([agedBrie])

        const updatedAgedBrie = shop.updateQuality().at(0)

        expect(updatedAgedBrie?.quality.getValue()).toBe(50)
    })

    it('does not increase the quality the item above 50', () => {
        const agedBrie = new Item(SPECIAL_ITEM.AGED_BRIE, 1, Quality.create(50))
        const shop = new Shop([agedBrie])

        const updatedAgedBrie = shop.updateQuality().at(0)

        expect(updatedAgedBrie?.quality.getValue()).toBe(50)
    })

    it('does not decrease the quality or sell in value of the item "Sulfuras, Hand of Ragnaros"', () => {
        const sulfuras = new Item(SPECIAL_ITEM.SULFURAS, 1, Quality.create(80))
        const shop = new Shop([sulfuras])

        const updatedSulfuras = shop.updateQuality().at(0)

        expect(updatedSulfuras?.quality.getValue()).toBe(80)
        expect(updatedSulfuras?.sellIn).toBe(1)
    })

    it('increases the value of “Backstage passes to a TAFKAL80ETC concert” as its sell in value approaches ', () => {
        const backstagePasses = new Item(
            SPECIAL_ITEM.BACKSTAGE_PASSES,
            15,
            Quality.create(1)
        )
        const shop = new Shop([backstagePasses])

        const updatedBackstagePasses = shop.updateQuality().at(0)

        expect(updatedBackstagePasses?.quality.getValue()).toBe(2)
        expect(updatedBackstagePasses?.sellIn).toBe(14)
    })

    it('increases the value by 2 of “Backstage passes to a TAFKAL80ETC concert” as its sell in value is 10 or below', () => {
        const backstagePasses = new Item(
            SPECIAL_ITEM.BACKSTAGE_PASSES,
            10,
            Quality.create(1)
        )
        const shop = new Shop([backstagePasses])

        const updatedBackstagePasses = shop.updateQuality().at(0)

        expect(updatedBackstagePasses?.quality.getValue()).toBe(3)
        expect(updatedBackstagePasses?.sellIn).toBe(9)
    })

    it('increases the value by 3 of “Backstage passes to a TAFKAL80ETC concert” as its sell in value is 5 or below', () => {
        const backstagePasses = new Item(
            SPECIAL_ITEM.BACKSTAGE_PASSES,
            5,
            Quality.create(1)
        )
        const shop = new Shop([backstagePasses])

        const updatedBackstagePasses = shop.updateQuality().at(0)

        expect(updatedBackstagePasses?.quality.getValue()).toBe(4)
        expect(updatedBackstagePasses?.sellIn).toBe(4)
    })

    it('sets the quality of “Backstage passes to a TAFKAL80ETC concert” after the sell in value is below 0', () => {
        const backstagePasses = new Item(
            SPECIAL_ITEM.BACKSTAGE_PASSES,
            1,
            Quality.create(4)
        )
        const shop = new Shop([backstagePasses])

        shop.updateQuality()
        const updatedBackstagePasses = shop.updateQuality().at(0)

        expect(updatedBackstagePasses?.quality.getValue()).toBe(0)
        expect(updatedBackstagePasses?.sellIn).toBe(-1)
    })
})
