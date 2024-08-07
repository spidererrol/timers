import { Given, Then, When } from '@cucumber/cucumber'
import { XWorld as World } from '../support/World'
import { duration, s } from '../support/duration.ts'
import { expect } from '@playwright/test'

function sleep(length: duration) {
    return new Promise(res => setTimeout(res, length.ms.Number))
}

function getTimerByName(world: World, name: string) {
    return world.ctx.page.locator(`fieldset.Timer:has(legend:text-is("${name}"))`)
}

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

async function addTimer(world: World) {
    await world.ctx.page.locator("button.addTimer").click()
}
Given('I add a(nother) timer', async function (this: World) {
    await addTimer(this)
})

Then('There should be a timer called {string}', async function (this: World, name: string) {
    const namedTimer = this.ctx.page.locator(`fieldset.Timer > legend:text-is("${name}")`)
    await expect(namedTimer).toBeVisible()
})

Then('There should not be a timer called {string}', async function (this: World, name: string) {
    const namedTimer = this.ctx.page.locator(`fieldset.Timer > legend:text-is("${name}")`)
    await expect(namedTimer).not.toBeVisible()
})

async function renameTimer(world: World, from: string, to: string) {
    getTimerByName(world, from).locator(`p.label:has-text("Name") + input[type="text"]`).fill(to)
}
When('I rename timer {string} to {string}', async function (this: World, from: string, to: string) {
    renameTimer(this, from, to)
})

Given('I add a timer with name {string}', async function (this: World, name: string) {
    await addTimer(this)
    await this.ctx.page.locator(`fieldset.Timer`).last().locator(`p.label:has-text("Name") + input[type="text"]`).fill(name)
})

Given('I set (the )timer {string} to {int}:{int}', async function (this: World, name: string, mins: number, secs: number) {
    const timer = getTimerByName(this, name)
    await timer.locator(`div.timeset.hms .NumberScroller`).nth(1).locator(`input[type="number"]`).fill("" + mins)
    await timer.locator(`div.timeset.hms .NumberScroller`).nth(2).locator(`input[type="number"]`).fill("" + secs)
})

When('I switch timer {string} to Run mode', async function (this: World, name: string) {
    await getTimerByName(this, name).locator(`button.done`).first().click()
})

When('I start (the )timer {string}', async function (this: World, name: string) {
    await getTimerByName(this, name).locator(`button.Play`).click()
})

When('I wait {int} seconds', async function (this: World, seconds: number) {
    await sleep(s(seconds))
})

Then('Timer {string} is finished', async function (this: World, name: string) {
    const match = getTimerByName(this, name).locator(`.TimerRun.finished`)
    await expect(match).toBeVisible({ timeout: s(1).ms.Number })
})

Then('Timer {string} is not finished', async function (this: World, name: string) {
    const match = getTimerByName(this, name).locator(`.TimerRun.finished`)
    await expect(match).not.toBeVisible({ timeout: s(1).ms.Number })
})
