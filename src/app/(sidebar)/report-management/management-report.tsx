'use client'

import {
    CalendarRangeIcon,
    CircleDollarSignIcon,
    Clock3Icon,
    ContactRoundIcon,
    MailIcon,
    MessageSquareTextIcon,
    SendIcon,
    TicketCheckIcon,
} from 'lucide-react'

import { KpiCard } from '@/components/custom/statistics/kpi-card'
import { Badge } from '@/components/ui/badge'
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

import { MANAGEMENT_REPORT_DATA } from './data'
import { useReportPeriod } from './report-period-context'
import {
    AdvertisingSpacesSection,
    BusinessCaseStatusSection,
    DeliveredEmailSection,
    DeliveredPushSection,
    DeliveredSmsSection,
    TicketCountSection,
    TicketRevenueSection,
    VisitorGrowthSection,
    VisitorTotalSection,
    WonBusinessCasesSection,
} from './report-sections'

const numberFormatter = new Intl.NumberFormat('cs-CZ')
const currencyFormatter = new Intl.NumberFormat('cs-CZ', {
    style: 'currency',
    currency: 'CZK',
    maximumFractionDigits: 0,
})
const dateFormatter = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
})
const dateTimeFormatter = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
})

export function ManagementReport() {
    const { meta, fans, seasonTickets, tickets, communication } = MANAGEMENT_REPORT_DATA
    const { dateRange, periodFrom, periodTo } = useReportPeriod()
    const periodKey = `${periodFrom}-${periodTo}`

    const fanDevelopment = fans.development.filter(
        (point) => point.period >= periodFrom && point.period <= periodTo,
    )
    const seasonTicketDevelopment = seasonTickets.development.filter(
        (point) => point.period >= periodFrom && point.period <= periodTo,
    )
    const ticketDevelopment = tickets.development.filter(
        (point) => point.period >= periodFrom && point.period <= periodTo,
    )
    const emailDevelopment = communication.email.development.filter(
        (point) => point.period >= periodFrom && point.period <= periodTo,
    )
    const pushDevelopment = communication.push.development.filter(
        (point) => point.period >= periodFrom && point.period <= periodTo,
    )
    const smsDevelopment = communication.sms.development.filter(
        (point) => point.period >= periodFrom && point.period <= periodTo,
    )
    const advertisingDevelopment =
        MANAGEMENT_REPORT_DATA.business.advertisingSpaces.development.filter(
            (point) => point.period >= periodFrom && point.period <= periodTo,
        )
    const wonBusinessCasesDevelopment =
        MANAGEMENT_REPORT_DATA.business.wonCases.development.filter(
            (point) => point.period >= periodFrom && point.period <= periodTo,
        )
    const businessCaseDevelopment =
        MANAGEMENT_REPORT_DATA.business.caseDevelopment.filter(
            (point) => point.period >= periodFrom && point.period <= periodTo,
        )

    const lastFanPoint = fanDevelopment.at(-1)
    const currentFanCount = lastFanPoint?.total ?? 0
    const blockedFanCount = lastFanPoint?.blocked ?? 0
    const fanNetGrowth = fanDevelopment.reduce((sum, point) => sum + point.netChange, 0)
    const seasonTicketSummary = seasonTicketDevelopment.reduce(
        (summary, point) => ({
            sold: summary.sold + point.sold,
            revenue: summary.revenue + point.revenue,
        }),
        { sold: 0, revenue: 0 },
    )
    const ticketSummary = ticketDevelopment.reduce(
        (summary, point) => ({
            sold: summary.sold + point.total.count,
            revenue: summary.revenue + point.total.revenue,
            eventCount: summary.eventCount + point.eventCount,
        }),
        { sold: 0, revenue: 0, eventCount: 0 },
    )
    const ticketRevenueChartData = ticketDevelopment.map((point) => ({
        period: point.period,
        label: point.label,
        online: point.online.revenue,
        boxOffice: point.boxOffice.revenue,
        administration: point.administration.revenue,
        mobileApp: point.mobileApp.revenue,
        partner: point.partner.revenue,
        total: point.total.revenue,
    }))
    const ticketCountChartData = ticketDevelopment.map((point) => ({
        period: point.period,
        label: point.label,
        online: point.online.count,
        boxOffice: point.boxOffice.count,
        administration: point.administration.count,
        mobileApp: point.mobileApp.count,
        partner: point.partner.count,
        total: point.total.count,
    }))
    const emailSummary = emailDevelopment.reduce(
        (summary, point) => ({
            delivered: summary.delivered + point.delivered,
            failed: summary.failed + point.failed,
            openedUnique: summary.openedUnique + (point.openedUnique ?? 0),
            clickedUnique: summary.clickedUnique + (point.clickedUnique ?? 0),
        }),
        { delivered: 0, failed: 0, openedUnique: 0, clickedUnique: 0 },
    )
    const pushSummary = pushDevelopment.reduce(
        (summary, point) => ({
            delivered: summary.delivered + point.delivered,
            failed: summary.failed + point.failed,
        }),
        { delivered: 0, failed: 0 },
    )
    const smsSummary = smsDevelopment.reduce(
        (summary, point) => ({
            delivered: summary.delivered + point.delivered,
            failed: summary.failed + point.failed,
        }),
        { delivered: 0, failed: 0 },
    )
    const emailOpenRate = emailSummary.delivered
        ? (emailSummary.openedUnique / emailSummary.delivered) * 100
        : 0
    const emailClickRate = emailSummary.delivered
        ? (emailSummary.clickedUnique / emailSummary.delivered) * 100
        : 0
    const pushTotal = pushSummary.delivered + pushSummary.failed
    const pushFailureRate = pushTotal ? (pushSummary.failed / pushTotal) * 100 : 0
    const currentAdvertisingSpaces = advertisingDevelopment.at(-1)
    const businessCaseStatusData = businessCaseDevelopment.map((point) => ({
        period: point.period,
        label: point.label,
        won: point.won.count,
        open: point.open.count,
        cancelled: point.cancelled.count,
        total: point.won.count + point.open.count + point.cancelled.count,
    }))

    return (
        <div className="flex w-full max-w-6xl flex-col gap-4">
            <Card className="relative gap-0 overflow-hidden py-0">
                <CardHeader className="bg-primary/8 gap-3 border-b p-4 sm:grid-cols-[1fr_auto]">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <Badge variant="secondary">CRM+ relatoo</Badge>
                            <span className="text-muted-foreground text-xs">
                                Management report
                            </span>
                        </div>
                        <CardTitle className="text-2xl sm:text-3xl">
                            Monthly results overview
                        </CardTitle>
                        <CardDescription>
                            A concise overview of audience growth and ticketing
                            performance.
                        </CardDescription>
                    </div>
                    <CardAction className="hidden sm:block">
                        <div className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-xl">
                            <CircleDollarSignIcon className="size-6" />
                        </div>
                    </CardAction>
                </CardHeader>
                <CardContent className="grid gap-4 p-4 sm:grid-cols-3">
                    <div className="flex items-start gap-3">
                        <ContactRoundIcon className="text-muted-foreground mt-0.5 size-4" />
                        <div>
                            <p className="text-muted-foreground text-xs">Organization</p>
                            <p className="mt-1 font-medium">{meta.organizationName}</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <CalendarRangeIcon className="text-muted-foreground mt-0.5 size-4" />
                        <div>
                            <p className="text-muted-foreground text-xs">Report period</p>
                            <p className="mt-1 font-medium tabular-nums">
                                {dateFormatter.format(dateRange.from)} –{' '}
                                {dateFormatter.format(dateRange.to)}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Clock3Icon className="text-muted-foreground mt-0.5 size-4" />
                        <div>
                            <p className="text-muted-foreground text-xs">Generated</p>
                            <p className="mt-1 font-medium tabular-nums">
                                {dateTimeFormatter.format(new Date(meta.generatedAt))}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <section className="grid gap-4 md:grid-cols-3" aria-label="Report overview">
                <KpiCard
                    label="Visitors"
                    icon={<ContactRoundIcon className="size-4" />}
                    iconClassName="bg-chart-2/10 text-chart-2"
                    value={numberFormatter.format(currentFanCount)}
                    content={[
                        {
                            label: 'Net growth',
                            value: `${fanNetGrowth >= 0 ? '+' : ''}${numberFormatter.format(fanNetGrowth)}`,
                        },
                        {
                            label: 'Blocked',
                            value: numberFormatter.format(blockedFanCount),
                        },
                    ]}
                />
                <KpiCard
                    label="Season tickets"
                    icon={<TicketCheckIcon className="size-4" />}
                    iconClassName="bg-chart-4/10 text-chart-4"
                    value={currencyFormatter.format(seasonTicketSummary.revenue)}
                    content={[
                        {
                            label: 'Sold',
                            value: `${numberFormatter.format(seasonTicketSummary.sold)} pcs`,
                        },
                        {
                            label: 'Average price',
                            value: currencyFormatter.format(
                                seasonTicketSummary.sold
                                    ? seasonTicketSummary.revenue /
                                          seasonTicketSummary.sold
                                    : 0,
                            ),
                        },
                    ]}
                />
                <KpiCard
                    label="Tickets"
                    icon={<TicketCheckIcon className="size-4" />}
                    iconClassName="bg-chart-1/10 text-chart-1"
                    value={currencyFormatter.format(ticketSummary.revenue)}
                    content={[
                        {
                            label: 'Sold',
                            value: `${numberFormatter.format(ticketSummary.sold)} pcs`,
                        },
                        {
                            label: 'Events',
                            value: numberFormatter.format(ticketSummary.eventCount),
                        },
                    ]}
                />
            </section>

            <TicketRevenueSection rows={ticketRevenueChartData} periodKey={periodKey} />

            <TicketCountSection rows={ticketCountChartData} periodKey={periodKey} />

            <VisitorTotalSection rows={fanDevelopment} periodKey={periodKey} />

            <VisitorGrowthSection rows={fanDevelopment} periodKey={periodKey} />

            <section
                className="grid gap-4 md:grid-cols-3"
                aria-label="Communication overview"
            >
                <KpiCard
                    label="E-mail"
                    icon={<MailIcon className="size-4" />}
                    iconClassName="bg-chart-2/10 text-chart-2"
                    value={numberFormatter.format(emailSummary.delivered)}
                    content={[
                        {
                            label: 'Uniquely opened',
                            value: `${emailOpenRate.toFixed(1)} %`,
                        },
                        {
                            label: 'Unique click through',
                            value: `${emailClickRate.toFixed(1)} %`,
                        },
                    ]}
                />
                <KpiCard
                    label="Push"
                    icon={<SendIcon className="size-4" />}
                    iconClassName="bg-chart-4/10 text-chart-4"
                    value={numberFormatter.format(pushSummary.delivered)}
                    content={[
                        {
                            label: 'Not delivered',
                            value: `${pushFailureRate.toFixed(1)} %`,
                        },
                        {
                            label: 'Failed',
                            value: numberFormatter.format(pushSummary.failed),
                        },
                    ]}
                />
                <KpiCard
                    label="SMS"
                    icon={<MessageSquareTextIcon className="size-4" />}
                    iconClassName="bg-chart-1/10 text-chart-1"
                    value={numberFormatter.format(smsSummary.delivered)}
                    content={[
                        {
                            label: 'Delivered',
                            value: numberFormatter.format(smsSummary.delivered),
                        },
                        {
                            label: 'Failed',
                            value: numberFormatter.format(smsSummary.failed),
                        },
                    ]}
                />
            </section>

            <DeliveredEmailSection rows={emailDevelopment} periodKey={periodKey} />

            <DeliveredPushSection rows={pushDevelopment} periodKey={periodKey} />

            <DeliveredSmsSection rows={smsDevelopment} periodKey={periodKey} />

            <AdvertisingSpacesSection
                occupied={currentAdvertisingSpaces?.occupied}
                free={currentAdvertisingSpaces?.free}
                dateLabel={dateFormatter.format(dateRange.to)}
                periodKey={periodKey}
            />

            {/* Fulfillment of business plans remains intentionally hidden. */}

            <WonBusinessCasesSection
                rows={wonBusinessCasesDevelopment}
                periodKey={periodKey}
            />

            <BusinessCaseStatusSection
                rows={businessCaseStatusData}
                periodKey={periodKey}
            />
        </div>
    )
}
