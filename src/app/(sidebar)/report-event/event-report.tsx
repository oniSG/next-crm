'use client'

import {
    CalendarCheckIcon,
    CalendarRangeIcon,
    CircleDollarSignIcon,
    HashIcon,
    MapPinIcon,
    ScanLineIcon,
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

import { getReportEvent } from './data'
import {
    SalesByDaySection,
    SalesByPriceSection,
    SalesBySectorSection,
    SeasonTicketOverviewSection,
    TicketSalesOverviewSection,
} from './event-report-sections'
import { useEventReportFilters } from './report-utils'

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
})

const numberFormatter = new Intl.NumberFormat('cs-CZ')
const currencyFormatter = new Intl.NumberFormat('cs-CZ', {
    style: 'currency',
    currency: 'CZK',
    maximumFractionDigits: 0,
})

export function EventReport() {
    const { eventId } = useEventReportFilters()
    const event = getReportEvent(eventId)

    if (!event) {
        return (
            <div className="text-muted-foreground flex min-h-64 w-full max-w-6xl items-center justify-center text-sm">
                Select an event to display its report.
            </div>
        )
    }

    return (
        <div className="flex w-full max-w-6xl flex-col gap-4">
            <Card className="relative gap-0 overflow-hidden py-0">
                <CardHeader className="bg-primary/8 gap-3 border-b p-4 sm:grid-cols-[1fr_auto]">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <Badge variant="secondary">CRM+ relatoo</Badge>
                            <span className="text-muted-foreground text-xs">
                                Event report
                            </span>
                        </div>
                        <CardTitle className="text-2xl sm:text-3xl">
                            {event.name}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-1.5">
                            <MapPinIcon className="size-3.5" />
                            {event.venue}
                        </CardDescription>
                    </div>
                    <CardAction className="hidden sm:block">
                        <div className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-xl">
                            <CalendarCheckIcon className="size-6" />
                        </div>
                    </CardAction>
                </CardHeader>
                <CardContent className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-4">
                    <HeaderDetail
                        icon={<CalendarCheckIcon />}
                        label="Event date"
                        value={dateFormatter.format(new Date(`${event.date}T00:00:00`))}
                    />
                    <HeaderDetail icon={<HashIcon />} label="Event ID" value={event.id} />
                    <HeaderDetail
                        icon={<TicketCheckIcon />}
                        label="Capacity"
                        value={`${numberFormatter.format(event.capacity)} seats`}
                    />
                    <HeaderDetail
                        icon={<CalendarRangeIcon />}
                        label="Sales started"
                        value={dateFormatter.format(
                            new Date(`${event.startOfSale}T00:00:00`),
                        )}
                    />
                </CardContent>
            </Card>

            <section className="grid gap-4 md:grid-cols-3" aria-label="Event overview">
                <KpiCard
                    label="Tickets sold / capacity"
                    icon={<TicketCheckIcon className="size-4" />}
                    iconClassName="bg-chart-1/10 text-chart-1"
                    content={[
                        {
                            value: `${numberFormatter.format(event.tickets.sold)} / ${numberFormatter.format(event.tickets.capacity)}`,
                        },
                        {
                            label: 'Paid',
                            value: `${numberFormatter.format(event.tickets.paid)} pcs`,
                        },
                        {
                            label: 'Free',
                            value: `${numberFormatter.format(event.tickets.free)} pcs`,
                        },
                    ]}
                />
                <KpiCard
                    label="Total entries incl. season tickets"
                    icon={<ScanLineIcon className="size-4" />}
                    iconClassName="bg-chart-2/10 text-chart-2"
                    content={[
                        {
                            value: numberFormatter.format(event.entrances.total),
                        },
                        {
                            label: 'Tickets',
                            value: `${numberFormatter.format(event.entrances.tickets)} pcs`,
                        },
                        {
                            label: 'Season tickets',
                            value: `${numberFormatter.format(event.entrances.seasonTickets)} pcs`,
                        },
                        ...(event.entrances.unassigned > 0
                            ? [
                                  {
                                      label: 'Unassigned',
                                      value: `${numberFormatter.format(event.entrances.unassigned)} pcs`,
                                  },
                              ]
                            : []),
                    ]}
                />
                <KpiCard
                    label="Total revenue"
                    icon={<CircleDollarSignIcon className="size-4" />}
                    iconClassName="bg-chart-4/10 text-chart-4"
                    content={[
                        {
                            value: currencyFormatter.format(event.revenue.total),
                        },
                        {
                            label: 'Ticket sales',
                            value: currencyFormatter.format(event.revenue.tickets),
                        },
                        {
                            label: 'Forwarded season tickets',
                            value: currencyFormatter.format(
                                event.revenue.forwardedSeasonTickets,
                            ),
                        },
                    ]}
                />
            </section>

            <SalesByDaySection data={event.salesByDay} eventId={event.id} />

            <SalesByPriceSection data={event.salesByPrice} eventId={event.id} />

            <SeasonTicketOverviewSection
                data={event.seasonTicketFlow}
                eventId={event.id}
            />

            <TicketSalesOverviewSection data={event.ticketSalesFlow} eventId={event.id} />

            <SalesBySectorSection data={event.salesBySector} eventId={event.id} />
        </div>
    )
}

function HeaderDetail({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode
    label: string
    value: string
}) {
    return (
        <div className="flex items-start gap-3">
            <span className="text-muted-foreground mt-0.5 [&_svg]:size-4">{icon}</span>
            <div>
                <p className="text-muted-foreground text-xs">{label}</p>
                <p className="mt-1 font-medium tabular-nums">{value}</p>
            </div>
        </div>
    )
}
