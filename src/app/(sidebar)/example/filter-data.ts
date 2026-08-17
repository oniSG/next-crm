import { endOfMonth, startOfMonth } from 'date-fns'

import type { DateRange } from '@/components/custom/filters/date-presets'
import type { HeatmapCell } from '@/components/custom/statistics/heatmap'

import {
    CAMPAIGN_TABLE_ROWS,
    CATEGORY_SHARE,
    FUNNEL_FLOW,
    HEATMAP_BY_TEAM,
    MRR_BY_MONTH,
    NET_INCOME_MONTHLY,
    REVENUE_BY_MONTH,
    SESSIONS_BY_CHANNEL,
    TEAM_OPTIONS,
    VISITORS_BY_MONTH,
    VISITS_BY_DAY,
    type CampaignTableRow,
    type FunnelFlowTableRow,
    type RevenueTableRow,
} from './data'

export type ExampleFilterState = {
    dateRange: DateRange
    segment: string
    teams: string[]
    channels: string[]
    regions: string[]
}

const MONTH_STARTS: { label: string; date: Date }[] = [
    { label: 'Led', date: new Date(2026, 0, 1) },
    { label: 'Úno', date: new Date(2026, 1, 1) },
    { label: 'Bře', date: new Date(2026, 2, 1) },
    { label: 'Dub', date: new Date(2026, 3, 1) },
    { label: 'Kvě', date: new Date(2026, 4, 1) },
    { label: 'Čer', date: new Date(2026, 5, 1) },
    { label: 'Čvc', date: new Date(2026, 6, 1) },
]

const SEGMENT_LABEL: Record<string, string> = {
    enterprise: 'Enterprise',
    smb: 'SMB',
    startup: 'Startup',
    personal: 'Personal',
}

const TEAM_LABEL_BY_ID = Object.fromEntries(
    TEAM_OPTIONS.map((option) => [option.value, option.label]),
) as Record<string, string>

function monthsInRange(range: DateRange): Set<string> {
    if (range.from > range.to) return new Set()

    return new Set(
        MONTH_STARTS.filter((month) => {
            const monthStart = startOfMonth(month.date)
            const monthEnd = endOfMonth(month.date)
            return monthStart <= range.to && monthEnd >= range.from
        }).map((month) => month.label),
    )
}

function filterByMonth<T extends { month: string }>(rows: T[], months: Set<string>): T[] {
    return rows.filter((row) => months.has(row.month))
}

function toFunnelRows(): FunnelFlowTableRow[] {
    return FUNNEL_FLOW.links.map((link, index) => ({
        id: String(index),
        from: FUNNEL_FLOW.nodes[link.source]?.name ?? String(link.source),
        to: FUNNEL_FLOW.nodes[link.target]?.name ?? String(link.target),
        value: link.value,
    }))
}

function campaignFooter(rows: CampaignTableRow[]) {
    return [
        'Celkem',
        '',
        '',
        rows.reduce((sum, row) => sum + row.sent, 0).toLocaleString('cs-CZ'),
        rows.reduce((sum, row) => sum + row.opened, 0).toLocaleString('cs-CZ'),
        rows.reduce((sum, row) => sum + row.clicked, 0).toLocaleString('cs-CZ'),
    ]
}

export function getExampleDashboardData(filters: ExampleFilterState) {
    const months = monthsInRange(filters.dateRange)

    const revenueByMonth = filterByMonth(REVENUE_BY_MONTH, months)
    const revenueTableRows: RevenueTableRow[] = revenueByMonth.map((row) => ({
        month: row.month,
        desktop: row.desktop,
        mobile: row.mobile,
        total: row.desktop + row.mobile,
    }))

    const categoryShare =
        filters.segment === 'all'
            ? CATEGORY_SHARE
            : CATEGORY_SHARE.filter((row) => row.name === SEGMENT_LABEL[filters.segment])

    const visitsByDay = VISITS_BY_DAY
    const mrrByMonth = filterByMonth(MRR_BY_MONTH, months)
    const visitorsByMonth = filterByMonth(VISITORS_BY_MONTH, months)
    const netIncomeMonthly = filterByMonth(NET_INCOME_MONTHLY, months)

    const teamLabels =
        filters.teams.length === 0
            ? null
            : new Set(filters.teams.map((id) => TEAM_LABEL_BY_ID[id]).filter(Boolean))

    const heatmapByTeam: HeatmapCell[] = HEATMAP_BY_TEAM.filter((cell) => {
        if (teamLabels && !teamLabels.has(cell.row)) return false
        return months.has(cell.column)
    })

    const sessionsByChannel = SESSIONS_BY_CHANNEL.filter((row) => {
        if (filters.channels.length === 0) return true
        return filters.channels.includes(row.channelId)
    })

    const campaignRows = CAMPAIGN_TABLE_ROWS.filter((row) => {
        if (filters.channels.length > 0 && !filters.channels.includes(row.channelId)) {
            return false
        }
        if (filters.regions.length > 0 && !filters.regions.includes(row.regionId)) {
            return false
        }
        return true
    })

    const funnelFlow = FUNNEL_FLOW
    const funnelFlowTableRows = toFunnelRows()

    const totalRevenue = revenueTableRows.reduce((sum, row) => sum + row.total, 0)
    const totalVisitors = visitorsByMonth.reduce((sum, row) => sum + row.desktop, 0)
    const totalSessions = sessionsByChannel.reduce((sum, row) => sum + row.sessions, 0)
    const totalCampaignSent = campaignRows.reduce((sum, row) => sum + row.sent, 0)
    const totalCampaignOpened = campaignRows.reduce((sum, row) => sum + row.opened, 0)
    const openRate =
        totalCampaignSent > 0 ? (totalCampaignOpened / totalCampaignSent) * 100 : 0

    return {
        revenueByMonth,
        revenueTableRows,
        categoryShare,
        visitsByDay,
        mrrByMonth,
        visitorsByMonth,
        netIncomeMonthly,
        heatmapByTeam,
        sessionsByChannel,
        campaignRows,
        campaignFooter: campaignFooter(campaignRows),
        funnelFlow,
        funnelFlowTableRows,
        kpis: {
            totalRevenue: totalRevenue.toLocaleString('cs-CZ'),
            totalVisitors: totalVisitors.toLocaleString('cs-CZ'),
            totalSessions: totalSessions.toLocaleString('cs-CZ'),
            openRate: `${openRate.toFixed(1).replace('.', ',')} %`,
            campaignSent: totalCampaignSent.toLocaleString('cs-CZ'),
        },
    }
}
