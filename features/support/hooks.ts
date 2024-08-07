import { After, AfterAll, AfterStep, Before, IWorldOptions, setWorldConstructor } from '@cucumber/cucumber'
import { closeBrowser, MyWorld, MyWorldOptions, XWorld } from './World.ts'

// setWorldConstructor(function (this: XWorld, options: IWorldOptions<MyWorldOptions>) {
//     // Object.assign(this,options) // Doesn't work.
//     this.ctx = new MyWorld(options)
// })

Before(async function (this: XWorld) {
    this.ctx = new MyWorld(this)
    await this.ctx.initContext(this.parameters)
})

After(async function (this: XWorld) {
    await this.ctx.close()
})

AfterStep(async function (this: XWorld) {
    await this.ctx.attachScreenshot()
})

AfterAll(async function () {
    // this.parameters.log("Close broweser") // <- Untested
    await closeBrowser()
})