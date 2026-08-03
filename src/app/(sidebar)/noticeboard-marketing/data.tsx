import type { ChartConfig } from '@/components/ui/chart'
import type { KpiTrend } from '@/components/custom/statistics/kpi-card'
import type { SimpleTableColumn } from '@/components/custom/statistics/simple-table'

import communicationChannels from './data/communication-channels.json'
import emailCampaignFlow from './data/email-campaign-flow.json'
import emailCampaignStats from './data/email-campaign-stats.json'
import eventLists from './data/event-lists.json'
import gdprOptoutCounts from './data/gdpr-optout-counts.json'
import gdprUnsubscribeStats from './data/gdpr-unsubscribe-stats.json'
import undeliveredEmails from './data/undelivered-emails.json'

export type NoticeboardMetric = {
    title: string
    value: string
    trend: KpiTrend
}

export type NoticeboardDetail = {
    title: string
    rows: { label: string; value: string }[]
    trend: KpiTrend
}

export const NOTICEBOARD_METRIC: NoticeboardMetric = {
    title: 'Úspěšnost e-mailů',
    value: '5,76 %',
    trend: {
        direction: 'up',
        delta: '+0,42 %',
        hint: 'za poslední měsíc',
    },
}

export const NOTICEBOARD_DETAIL: NoticeboardDetail = {
    title: 'Relatoo index',
    rows: [
        { label: 'Relatoo index', value: '3,65' },
        { label: 'Stav', value: 'Dobrý' },
    ],
    trend: {
        direction: 'up',
        delta: '+0,18',
        hint: 'za poslední měsíc',
    },
}

export const EMAIL_CAMPAIGN_FLOW = emailCampaignFlow

export const EMAIL_CAMPAIGN_STATS_SERIES = [
    'doruceno',
    'softBounce',
    'unikatneOtevreno',
] as const

export const EMAIL_CAMPAIGN_STATS_CONFIG = {
    doruceno: { label: 'Doručeno', color: 'var(--chart-1)' },
    softBounce: { label: 'Soft Bounce', color: 'oklch(0.7 0.16 10)' },
    unikatneOtevreno: { label: 'Unikátně otevřeno', color: 'var(--chart-2)' },
} satisfies ChartConfig

export const EMAIL_CAMPAIGN_STATS = emailCampaignStats

export const GDPR_UNSUBSCRIBE_STATS_SERIES = [
    'sdeleniOAkci',
    'sdeleniPoradatele',
    'marketing',
] as const

export const GDPR_UNSUBSCRIBE_STATS_CONFIG = {
    sdeleniOAkci: { label: 'Sdělení o akci', color: 'var(--chart-1)' },
    sdeleniPoradatele: {
        label: 'Sdělení pořadatele',
        color: 'var(--chart-2)',
    },
    marketing: { label: 'Marketing', color: 'oklch(0.7 0.16 10)' },
} satisfies ChartConfig

export const GDPR_UNSUBSCRIBE_STATS = gdprUnsubscribeStats

export const COMMUNICATION_CHANNELS_CONFIG = {
    email: { label: 'E-mail', color: 'var(--chart-2)' },
    push: { label: 'Push', color: 'var(--chart-4)' },
} satisfies ChartConfig

export const COMMUNICATION_CHANNELS = communicationChannels

export const UNDELIVERED_EMAILS_CONFIG = {
    softBounce: { label: 'Soft Bounce', color: 'oklch(0.7 0.16 10)' },
    ostatni: { label: 'Ostatní', color: 'oklch(0.45 0.02 260)' },
} satisfies ChartConfig

export const UNDELIVERED_EMAILS = undeliveredEmails

export const GDPR_OPTOUT_COUNTS_CONFIG = {
    zpravy: { label: 'Zprávy', color: 'var(--chart-1)' },
    push: { label: 'Push', color: 'var(--chart-4)' },
    email: { label: 'E-mail', color: 'var(--chart-2)' },
} satisfies ChartConfig

export const GDPR_OPTOUT_COUNTS = gdprOptoutCounts

export type EventList = {
    id: string
    name: string
    events: string[]
}

export const EVENT_LISTS = eventLists as EventList[]

export const EVENT_LIST_COLUMNS: SimpleTableColumn<EventList>[] = [
    {
        id: 'name',
        header: 'Jméno seznamu',
        headerClassName: 'pl-0',
        cellClassName: 'pl-0 font-medium',
        cell: (row) => row.name,
    },
    {
        id: 'events',
        header: 'Události',
        cellClassName: 'text-muted-foreground max-w-md truncate',
        cell: (row) =>
            row.events.length > 0 ? `[${row.events.join(', ')}]` : '[]',
    },
    {
        id: 'id',
        header: 'ID seznamu událostí',
        cellClassName: 'font-mono text-xs',
        cell: (row) => row.id,
    },
]
