'use client'

import {
    CalendarCheckIcon,
    CalendarRangeIcon,
    CircleDollarSignIcon,
    HashIcon,
    ScanLineIcon,
    TicketCheckIcon,
} from 'lucide-react'

import { OverviewKpiCard } from '@/components/custom/statistics/overview-kpi-card'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

import { getReportEvent, REPORT_EVENT_OPTIONS } from './data'
import {
    SalesByDaySection,
    SalesByPriceSection,
    SalesBySectorSection,
    SeasonTicketOverviewSection,
    TicketSalesOverviewSection,
} from './event-report-sections'
import { filterEventsByDateRange, useEventReportFilters } from './report-utils'

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
    const { dateRange, eventId, setEventId } = useEventReportFilters()
    const event = getReportEvent(eventId)
    const visibleEvents = filterEventsByDateRange(REPORT_EVENT_OPTIONS, dateRange)

    if (!event) {
        return (
            <div className="flex w-full max-w-6xl flex-col gap-4">
                <div>
                    <h1 className="text-xl font-semibold">Select an event</h1>
                    <p className="text-muted-foreground mt-1 text-sm">
                        Choose an event to display its sales and attendance report.
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {visibleEvents.map((option) => {
                        const eventData = getReportEvent(option.id)

                        return (
                            <OverviewKpiCard
                                key={option.id}
                                onClick={() => void setEventId(option.id)}
                                ariaLabel={`Open report for ${option.name}`}
                                className="min-h-48"
                                label={`${dateFormatter.format(new Date(`${option.date}T00:00:00`))} · ${option.id}`}
                                value={option.name}
                                valueClassName="text-xl leading-snug"
                                icon={<CalendarCheckIcon className="size-4" />}
                                iconClassName="bg-primary/10 text-primary"
                                metrics={[
                                    {
                                        label: 'Venue',
                                        value: eventData?.venue ?? 'Venue not specified',
                                    },
                                    {
                                        label: 'Capacity',
                                        value: `${numberFormatter.format(option.capacity)} seats`,
                                    },
                                ]}
                            />
                        )
                    })}
                </div>

                {visibleEvents.length === 0 && (
                    <div className="text-muted-foreground flex min-h-48 items-center justify-center rounded-xl border border-dashed text-sm">
                        No events in the selected period.
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className="flex w-full max-w-6xl flex-col gap-4">
            <Card className="gap-0">
                <CardContent className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <HeaderDetail
                        icon={<CalendarCheckIcon />}
                        label="Event date"
                        value={dateFormatter.format(new Date(`${event.date}T00:00:00`))}
                    />
                    <HeaderDetail
                        icon={<HashIcon />}
                        label="Event ID"
                        value={event.id}
                        className="sm:border-l sm:pl-6"
                    />
                    <HeaderDetail
                        icon={<TicketCheckIcon />}
                        label="Capacity"
                        value={`${numberFormatter.format(event.capacity)} seats`}
                        className="lg:border-l lg:pl-6"
                    />
                    <HeaderDetail
                        icon={<CalendarRangeIcon />}
                        label="Sales started"
                        value={dateFormatter.format(
                            new Date(`${event.startOfSale}T00:00:00`),
                        )}
                        className="sm:border-l sm:pl-6"
                    />
                </CardContent>
            </Card>

            <section className="grid gap-4 md:grid-cols-3" aria-label="Event overview">
                <OverviewKpiCard
                    label="Tickets sold / capacity"
                    value={`${numberFormatter.format(event.tickets.sold)} / ${numberFormatter.format(event.tickets.capacity)}`}
                    icon={<TicketCheckIcon className="size-4" />}
                    iconClassName="bg-chart-1/10 text-chart-1"
                    metrics={[
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
                <OverviewKpiCard
                    label="Total entries incl. season tickets"
                    value={numberFormatter.format(event.entrances.total)}
                    icon={<ScanLineIcon className="size-4" />}
                    iconClassName="bg-chart-2/10 text-chart-2"
                    metrics={[
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
                <OverviewKpiCard
                    label="Total revenue"
                    value={currencyFormatter.format(event.revenue.total)}
                    icon={<CircleDollarSignIcon className="size-4" />}
                    iconClassName="bg-chart-4/10 text-chart-4"
                    metrics={[
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
    className,
}: {
    icon: React.ReactNode
    label: string
    value: string
    className?: string
}) {
    return (
        <div className={cn('flex items-start gap-3', className)}>
            <span className="text-muted-foreground mt-0.5 [&_svg]:size-4">{icon}</span>
            <div>
                <p className="text-muted-foreground text-xs">{label}</p>
                <p className="mt-1 font-medium tabular-nums">{value}</p>
            </div>
        </div>
    )
}
