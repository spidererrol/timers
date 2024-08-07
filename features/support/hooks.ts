import { After, AfterAll, AfterStep, Before, setDefaultTimeout } from '@cucumber/cucumber'
import { closeBrowser, MyWorld, XWorld } from './World.ts'
import { s } from './duration.ts'

// setWorldConstructor(function (this: XWorld, options: IWorldOptions<MyWorldOptions>) {
//     // Object.assign(this,options) // Doesn't work.
//     this.ctx = new MyWorld(options)
// })

setDefaultTimeout(new s(30).ms.Number) // Default timeout is 5s which can be too short.

Before({ tags: "not @internal" }, async function (this: XWorld) {
    this.ctx = new MyWorld(this)
    await this.ctx.initContext(this.parameters)
})

After({ tags: "not @internal" }, async function (this: XWorld) {
    await this.ctx.close()
})

AfterStep({ tags: "not @internal" }, async function (this: XWorld) {
    await this.ctx.attachScreenshot()
})

AfterAll(async function () {
    // this.parameters.log("Close broweser") // <- Untested
    await closeBrowser()
})