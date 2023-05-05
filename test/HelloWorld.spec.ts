import { describe, expect, it } from 'vitest'
import { HelloWorld } from '../src/HelloWorld'

describe('HelloWorld', () => {
    it('greets you', () => {
        const helloWorld = new HelloWorld()

        const greeting = helloWorld.greet()

        expect(greeting).toEqual('Hello World!')
    })
})
