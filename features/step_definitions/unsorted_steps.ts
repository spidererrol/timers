import { Given, Then } from '@cucumber/cucumber'
import { XWorld } from '../support/World'
import { expect } from '@playwright/test'

Given('I open the app', async function (this: XWorld) {
    await this.ctx.page.goto(this.ctx.appUrl)
    await this.ctx.page.waitForURL(this.ctx.appUrl, { waitUntil: "commit" })
    await this.ctx.page.locator("text=Loading").waitFor({ state: "hidden", timeout: 60000 })
})

Then('There should be {int} timer(s)', async function (this: XWorld, int: number) {
    const count = await this.ctx.page.locator('fieldset.Timer').count()
    // await this.ctx.attachScreenshot()
    expect(count).toBe(int)
})

Given('I add a timer', async function (this: XWorld) {
    await this.ctx.page.locator("button.addTimer").click()
})
