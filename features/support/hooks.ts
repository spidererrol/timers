import { After, AfterAll, Before, IWorldOptions, setWorldConstructor } from '@cucumber/cucumber'
import { closeBrowser, MyWorld, MyWorldOptions, XWorld } from './World.ts'

setWorldConstructor(function (this: XWorld, options: IWorldOptions<MyWorldOptions>) {
    this.ctx = new MyWorld(options)
})

Before(async function (this: XWorld) {
    await this.ctx.initContext(this.parameters)
})

After(function (this: XWorld) {
    this.ctx.close()
})

AfterAll(function () {
    closeBrowser()
})