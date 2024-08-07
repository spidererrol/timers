import { IWorldOptions, World } from '@cucumber/cucumber'
import { Browser, BrowserContext, chromium, Page } from '@playwright/test'

let browser: Browser

export function closeBrowser() {
    browser.close()
}

export interface XWorld extends World {
    ctx: MyWorld
}

export interface MyWorldOptions {
    headless: boolean
    appUrl: string
}

export class MyWorld {
    appUrl: string = "http://172.31.0.3:3000/"
    context: BrowserContext | undefined
    private _page?: Page
    public get page(): Page {
        if (!this._page)
            throw new Error("Page not initialised")
        return this._page
    }
    public async initContext(parameters: MyWorldOptions) {
        if (this.context)
            return
        if (!browser)
            browser = await chromium.launch({ headless: parameters?.headless ?? true })
        this.context = await browser.newContext()
        this._page = await this.context.newPage()
        return
    }
    close() {
        browser.close()
    }
    constructor(options: IWorldOptions<MyWorldOptions>) {
        if (options.parameters.appUrl)
            this.appUrl = options.parameters.appUrl
    }
}