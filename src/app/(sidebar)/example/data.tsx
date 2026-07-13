import type { ChartConfig } from '@/components/ui/chart'
import type { TypeFilterOption } from '@/components/custom/filters/type-filter'
import InfoTooltip from '@/components/custom/other/info-tooltip'

export const SEGMENT_OPTIONS: TypeFilterOption[] = [
    { value: 'all', label: 'All segments' },
    { value: 'enterprise', label: 'Enterprise' },
    { value: 'smb', label: 'SMB' },
    { value: 'startup', label: 'Startup' },
    { value: 'personal', label: 'Personal' },
]

export const KPIS = [
    {
        label: 'Total Revenue',
        value: '$45,231',
        delta: '+10.1%',
        hint: 'vs. last month',
        trend: 'up' as const,
        action: (
            <InfoTooltip>
                The KPI card is a component that displays key performance indicators
                (KPIs) in a concise and visually appealing manner. It typically includes a
                label, value, delta (change), and trend indicator to provide insights into
                the performance of a specific metric.
            </InfoTooltip>
        ),
    },
    {
        label: 'Active Customers',
        value: '1,203',
        delta: '+5.4%',
        hint: 'vs. last month',
        trend: 'up' as const,
    },
    {
        label: 'Conversion Rate',
        value: '3.62%',
        delta: '-0.34%',
        hint: 'vs. last month',
        trend: 'down' as const,
    },
]

export const REVENUE_BY_MONTH = [
    { month: 'Jan', desktop: 186, mobile: 80 },
    { month: 'Feb', desktop: 214, mobile: 120 },
    { month: 'Mar', desktop: 305, mobile: 190 },
    { month: 'Apr', desktop: 273, mobile: 220 },
    { month: 'May', desktop: 356, mobile: 260 },
    { month: 'Jun', desktop: 421, mobile: 310 },
    { month: 'Jul', desktop: 480, mobile: 355 },
]

export const REVENUE_CHART_CONFIG = {
    desktop: { label: 'Desktop', color: 'var(--chart-1)' }, // green
    mobile: { label: 'Mobile', color: 'var(--chart-2)' }, // blue
} satisfies ChartConfig

export const REVENUE_STACKED_CHART_CONFIG = {
    desktop: { label: 'Desktop', color: 'var(--chart-1)' }, // green
    mobile: { label: 'Mobile', color: 'var(--chart-2)' }, // blue
} satisfies ChartConfig

export const CATEGORY_SHARE = [
    { name: 'Enterprise', value: 45, fill: 'var(--chart-1)' }, // green
    { name: 'SMB', value: 30, fill: 'var(--chart-2)' }, // blue
    { name: 'Startup', value: 15, fill: 'var(--chart-3)' }, // yellow
    { name: 'Personal', value: 10, fill: 'var(--chart-4)' }, // purple
]

export const CATEGORY_CHART_CONFIG = {
    value: { label: 'Share' },
    Enterprise: { label: 'Enterprise', color: 'var(--chart-1)' },
    SMB: { label: 'SMB', color: 'var(--chart-2)' },
    Startup: { label: 'Startup', color: 'var(--chart-3)' },
    Personal: { label: 'Personal', color: 'var(--chart-4)' },
} satisfies ChartConfig

export const VISITS_BY_DAY = [
    { day: 'Mon', visits: 320, signups: 24 },
    { day: 'Tue', visits: 412, signups: 32 },
    { day: 'Wed', visits: 502, signups: 45 },
    { day: 'Thu', visits: 468, signups: 38 },
    { day: 'Fri', visits: 543, signups: 51 },
    { day: 'Sat', visits: 380, signups: 28 },
    { day: 'Sun', visits: 295, signups: 20 },
]

export const VISITS_CHART_CONFIG = {
    visits: { label: 'Visits', color: 'var(--chart-1)' }, // green
    signups: { label: 'Signups', color: 'var(--chart-2)' }, // blue
} satisfies ChartConfig

export const MRR_BY_MONTH = [
    { month: 'Jan', newMrr: 42, expansion: 18 },
    { month: 'Feb', newMrr: 51, expansion: 22 },
    { month: 'Mar', newMrr: 63, expansion: 28 },
    { month: 'Apr', newMrr: 58, expansion: 35 },
    { month: 'May', newMrr: 74, expansion: 41 },
    { month: 'Jun', newMrr: 89, expansion: 48 },
    { month: 'Jul', newMrr: 102, expansion: 55 },
]

export const MRR_CHART_CONFIG = {
    newMrr: { label: 'New MRR', color: 'var(--chart-1)' }, // green
    expansion: { label: 'Expansion MRR', color: 'var(--chart-2)' }, // blue
} satisfies ChartConfig

export const PERFORMANCE = [
    { metric: 'Speed', team: 92, target: 80 },
    { metric: 'Quality', team: 78, target: 85 },
    { metric: 'Support', team: 85, target: 75 },
    { metric: 'Cost', team: 65, target: 70 },
    { metric: 'Reliability', team: 88, target: 90 },
    { metric: 'Docs', team: 72, target: 65 },
]

export const PERFORMANCE_CHART_CONFIG = {
    team: { label: 'Our Team', color: 'var(--chart-1)' }, // green
    target: { label: 'Target', color: 'var(--chart-2)' }, // blue
} satisfies ChartConfig

export const VISITORS_BY_MONTH = [
    { month: 'Jan', desktop: 186 },
    { month: 'Feb', desktop: 305 },
    { month: 'Mar', desktop: 237 },
    { month: 'Apr', desktop: 73 },
    { month: 'May', desktop: 209 },
    { month: 'Jun', desktop: 214 },
]

export const VISITORS_CHART_CONFIG = {
    desktop: { label: 'Desktop', color: 'var(--chart-1)' }, // green — brand
} satisfies ChartConfig

export const SESSIONS_BY_CHANNEL = [
    { channel: 'Organic', sessions: 4200 },
    { channel: 'Direct', sessions: 3120 },
    { channel: 'Referral', sessions: 1840 },
    { channel: 'Email', sessions: 1420 },
    { channel: 'Ads', sessions: 980 },
    { channel: 'Social', sessions: 620 },
]

export const SESSIONS_CHART_CONFIG = {
    sessions: { label: 'Sessions', color: 'var(--chart-2)' }, // blue
} satisfies ChartConfig

export const NET_INCOME_MONTHLY = [
    { month: 'Jan', netIncome: 186 },
    { month: 'Feb', netIncome: 205 },
    { month: 'Mar', netIncome: -207 },
    { month: 'Apr', netIncome: 173 },
    { month: 'May', netIncome: -209 },
    { month: 'Jun', netIncome: 214 },
]

export const NET_INCOME_CHART_CONFIG = {
    netIncome: { label: 'Net Income' },
} satisfies ChartConfig
