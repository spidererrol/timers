import { IWorldOptions, IWorld, World } from '@cucumber/cucumber'
import { Browser, BrowserContext, chromium, Page } from '@playwright/test'

let browser: Browser

export async function closeBrowser() {
    // console.log("Closing browser")
    await browser.close()
}

export interface XWorld extends IWorld {
    ctx: MyWorld
}

export interface MyWorldOptions {
    headless: boolean
    appUrl: string
}

export class MyWorld /* implements IWorld<MyWorldOptions> */ {
    appUrl: string = "http://172.31.0.3:3000/"
    context: BrowserContext | undefined
    attach: (data: Buffer, mediatypeoptions: string) => void
    log: (text: string) => void
    private _page?: Page
    public get page(): Page {
        if (!this._page)
            throw new Error("Page not initialised")
        return this._page
    }
    public async initContext(parameters: MyWorldOptions) {
        if (this.context)
            return
        if (!browser) {
            // this.log("Init browser")
            browser = await chromium.launch({ headless: parameters?.headless ?? true })
        }
        // this.log("Init context")
        this.context = await browser.newContext()
        this._page = await this.context.newPage()
        return
    }
    async attachScreenshot() {
        const ss = await this.page.screenshot({ type: 'png' })
        this.attach(ss, "image/png")
    }
    async close() {
        if (this.context) {
            // this.log("Close context")
            await this.context.close()
            this.context = undefined
        }
        // (this.realworld as any) = undefined
    }
    constructor(realworld: IWorld) {
        this.attach = realworld.attach
        this.log = realworld.log
        if (realworld.parameters.appUrl)
            this.appUrl = realworld.parameters.appUrl
    }
    // constructor(options: IWorldOptions<MyWorldOptions>) {
    //     super({ attach: options.attach, log: options.log, parameters: options.parameters })
    //     if (options.parameters.appUrl)
    //         this.appUrl = options.parameters.appUrl
    // }
}