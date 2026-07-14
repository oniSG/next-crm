import type { Browser } from 'puppeteer'
import puppeteer from 'puppeteer'

export const runtime = 'nodejs'
export const maxDuration = 60

const ALLOWED_DASHBOARDS = new Set([
    'example',
    'stats-push',
    'stats-sms',
    'stats-popup',
    'stats-email',
    'prehled-emailu',
    'stats-notify-listy',
])

const VIEWPORT_WIDTH = 1280
const VIEWPORT_HEIGHT = 800

export async function GET(
    request: Request,
    { params }: { params: Promise<{ dashboard: string }> },
) {
    const { dashboard } = await params

    if (!ALLOWED_DASHBOARDS.has(dashboard)) {
        return new Response('Unknown dashboard', { status: 404 })
    }

    const origin = new URL(request.url).origin
    const printUrl = `${origin}/print/${dashboard}`

    let browser: Browser | undefined
    try {
        browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        })
        const page = await browser.newPage()
        await page.setViewport({
            width: VIEWPORT_WIDTH,
            height: VIEWPORT_HEIGHT,
            deviceScaleFactor: 2,
        })

        const cookie = request.headers.get('cookie')
        if (cookie) await page.setExtraHTTPHeaders({ cookie })

        await page.goto(printUrl, {
            waitUntil: 'networkidle0',
            timeout: 30_000,
        })

        await page.evaluateHandle('document.fonts.ready')
        await new Promise((resolve) => setTimeout(resolve, 1500))

        const contentHeight = await page.evaluate(() =>
            Math.ceil(document.body.scrollHeight),
        )

        const pdf = await page.pdf({
            width: `${VIEWPORT_WIDTH}px`,
            height: `${contentHeight + 2}px`,
            printBackground: true,
            margin: { top: 0, bottom: 0, left: 0, right: 0 },
        })

        return new Response(new Uint8Array(pdf), {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="${dashboard}.pdf"`,
                'Cache-Control': 'no-store',
            },
        })
    } catch (err) {
        console.error('[export] failed', err)
        return new Response('Export failed', { status: 500 })
    } finally {
        if (browser) await browser.close()
    }
}
