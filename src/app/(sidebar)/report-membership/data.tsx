import type { SimpleTableColumn } from '@/components/custom/statistics/simple-table'

import membershipReport from './data/membership-report.json'

const numberFormatter = new Intl.NumberFormat('cs-CZ')

export type MembershipStatRow = {
    id: string
    status: string
    paymentType: string
    orderType: string
    membershipId: number
    membershipName: string
    price: number
    currentCount: number
    currentRevenue: number
}

export type MembershipReportData = {
    meta: {
        organizationName: string
        generatedAt: string
    }
    rows: MembershipStatRow[]
}

export const MEMBERSHIP_STATS_COLUMNS: SimpleTableColumn<MembershipStatRow>[] = [
    {
        id: 'status',
        header: 'Stav',
        cell: (row) => row.status,
    },
    {
        id: 'paymentType',
        header: 'Typ platby',
        cell: (row) => row.paymentType,
    },
    {
        id: 'orderType',
        header: 'Typ objednávky',
        cell: (row) => row.orderType,
    },
    {
        id: 'membershipId',
        header: 'Membership ID',
        headerClassName: 'text-right',
        cellClassName: 'text-right tabular-nums',
        cell: (row) => numberFormatter.format(row.membershipId),
    },
    {
        id: 'membershipName',
        header: 'Název členství',
        cellClassName: 'font-medium',
        cell: (row) => row.membershipName,
    },
    {
        id: 'price',
        header: 'Cena',
        headerClassName: 'text-right',
        cellClassName: 'text-right tabular-nums',
        cell: (row) => numberFormatter.format(row.price),
    },
    {
        id: 'currentCount',
        header: 'Aktuální stav',
        headerClassName: 'text-right',
        cellClassName: 'text-right tabular-nums',
        cell: (row) => numberFormatter.format(row.currentCount),
    },
    {
        id: 'currentRevenue',
        header: 'Aktuální příjem',
        headerClassName: 'text-right',
        cellClassName: 'text-right font-medium tabular-nums',
        cell: (row) => numberFormatter.format(row.currentRevenue),
    },
]

export const MEMBERSHIP_REPORT_DATA =
    membershipReport as MembershipReportData
