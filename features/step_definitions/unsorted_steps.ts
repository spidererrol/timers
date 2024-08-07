import { Given, Then, When } from '@cucumber/cucumber'
import { XWorld as World } from '../support/World'
import { expect } from '@playwright/test'

Given('I open the app', async function (this: World) {
    await this.ctx.page.goto(this.ctx.appUrl)
    await this.ctx.page.waitForURL(this.ctx.appUrl, { waitUntil: "commit" })
    await this.ctx.page.locator("text=Loading").waitFor({ state: "hidden", timeout: 60000 })
})

Then('There should be {int} timer(s)', async function (this: World, int: number) {
    const count = await this.ctx.page.locator('fieldset.Timer').count()
    // await this.ctx.attachScreenshot()
    expect(count).toBe(int)
})

Given('I add a(nother) timer', async function (this: World) {
    await this.ctx.page.locator("button.addTimer").click()
})

Then('There should be a timer called {string}', async function (this: World, name: string) {
    const namedTimer = this.ctx.page.locator(`fieldset.Timer > legend:text-is("${name}")`)
    await expect(namedTimer).toBeVisible()
})

Then('There should not be a timer called {string}', async function (this: World, name: string) {
    const namedTimer = this.ctx.page.locator(`fieldset.Timer > legend:text-is("${name}")`)
    await expect(namedTimer).not.toBeVisible()
})

When('I rename timer {string} to {string}', async function (this: World, from: string, to: string) {
    await this.ctx.page.locator(`fieldset.Timer:has(legend:text-is("${from}")) p.label:has-text("Name") + input[type="text"]`).fill(to)
})
