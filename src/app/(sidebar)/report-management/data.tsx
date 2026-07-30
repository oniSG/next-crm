export type ManagementReportPeriod = {
    from: string
    to: string
    granularity: 'day' | 'month'
}

export type ManagementReportDataPoint = {
    period: string
    label: string
}

export type TicketSalesPoint = ManagementReportDataPoint & {
    online: { count: number; revenue: number }
    boxOffice: { count: number; revenue: number }
    administration: { count: number; revenue: number }
    mobileApp: { count: number; revenue: number }
    partner: { count: number; revenue: number }
    total: { count: number; revenue: number }
    eventCount: number
}

export type FanGrowthPoint = ManagementReportDataPoint & {
    added: number
    removed: number
    netChange: number
    total: number
    blocked: number
}

export type CommunicationPoint = ManagementReportDataPoint & {
    delivered: number
    failed: number
    openedUnique?: number
    clickedUnique?: number
}

export type BusinessCasePoint = ManagementReportDataPoint & {
    won: { count: number; value: number }
    open: { count: number; value: number }
    cancelled: { count: number; value: number }
}

export type ManagementReportData = {
    meta: {
        organizationName: string
        generatedAt: string
        currency: 'CZK'
        period: ManagementReportPeriod
    }
    fans: {
        current: number
        blocked: number
        initial: number
        added: number
        removed: number
        netGrowth: number
        development: FanGrowthPoint[]
    }
    seasonTickets: {
        sold: number
        revenue: number
        development: (ManagementReportDataPoint & {
            sold: number
            revenue: number
        })[]
    }
    tickets: {
        sold: number
        revenue: number
        eventCount: number
        development: TicketSalesPoint[]
    }
    communication: {
        email: {
            delivered: number
            failed: number
            openedUnique: number
            clickedUnique: number
            openRate: number
            clickRate: number
            development: CommunicationPoint[]
        }
        push: {
            delivered: number
            failed: number
            failureRate: number
            development: CommunicationPoint[]
        }
        sms: {
            delivered: number
            failed: number
            failureRate: number
            development: CommunicationPoint[]
        }
    }
    business: {
        advertisingSpaces: {
            occupied: number
            free: number
            development: (ManagementReportDataPoint & {
                occupied: number
                free: number
            })[]
        }
        plans: {
            id: string
            from: string
            to: string
            planned: number
            actual: number
            difference: number
            currency: 'CZK'
        }[]
        planDevelopment: (ManagementReportDataPoint & {
            planned: number
            actual: number
        })[]
        wonCases: {
            count: number
            value: number
            development: (ManagementReportDataPoint & {
                count: number
                value: number
            })[]
        }
        caseDevelopment: BusinessCasePoint[]
    }
}

export const MANAGEMENT_REPORT_DATA = {
    meta: {
        organizationName: 'HC Relatoo Praha',
        generatedAt: '2026-07-29T09:30:00+02:00',
        currency: 'CZK',
        period: {
            from: '2026-01-01',
            to: '2026-06-30',
            granularity: 'month',
        },
    },
    fans: {
        current: 28_746,
        blocked: 384,
        initial: 24_910,
        added: 4_128,
        removed: 292,
        netGrowth: 3_836,
        development: [
            { period: '2026-01', label: 'Led', added: 648, removed: 38, netChange: 610, total: 25_520, blocked: 342 },
            { period: '2026-02', label: 'Úno', added: 582, removed: 42, netChange: 540, total: 26_060, blocked: 351 },
            { period: '2026-03', label: 'Bře', added: 711, removed: 47, netChange: 664, total: 30_000, blocked: 359 },
            { period: '2026-04', label: 'Dub', added: 693, removed: 51, netChange: 642, total: 27_366, blocked: 367 },
            { period: '2026-05', label: 'Kvě', added: 782, removed: 54, netChange: 728, total: 28_094, blocked: 376 },
            { period: '2026-06', label: 'Čer', added: 712, removed: 60, netChange: 652, total: 25_000, blocked: 384 },
        ],
    },
    seasonTickets: {
        sold: 1_284,
        revenue: 7_896_400,
        development: [
            { period: '2026-01', label: 'Led', sold: 148, revenue: 910_200 },
            { period: '2026-02', label: 'Úno', sold: 166, revenue: 1_020_900 },
            { period: '2026-03', label: 'Bře', sold: 192, revenue: 1_180_800 },
            { period: '2026-04', label: 'Dub', sold: 214, revenue: 1_316_100 },
            { period: '2026-05', label: 'Kvě', sold: 268, revenue: 1_648_200 },
            { period: '2026-06', label: 'Čer', sold: 296, revenue: 1_820_200 },
        ],
    },
    tickets: {
        sold: 46_820,
        revenue: 11_761_300,
        eventCount: 18,
        development: [
            {
                period: '2026-01',
                label: 'Led',
                online: { count: 4_820, revenue: 1_205_000 },
                boxOffice: { count: 1_120, revenue: 274_400 },
                administration: { count: 410, revenue: 98_400 },
                mobileApp: { count: 1_540, revenue: 392_700 },
                partner: { count: 360, revenue: 84_600 },
                total: { count: 8_250, revenue: 2_055_100 },
                eventCount: 3,
            },
            {
                period: '2026-02',
                label: 'Úno',
                online: { count: 4_310, revenue: 1_077_500 },
                boxOffice: { count: 1_030, revenue: 252_300 },
                administration: { count: 380, revenue: 91_200 },
                mobileApp: { count: 1_420, revenue: 362_100 },
                partner: { count: 330, revenue: 77_600 },
                total: { count: 7_470, revenue: 1_860_700 },
                eventCount: 3,
            },
            {
                period: '2026-03',
                label: 'Bře',
                online: { count: 5_040, revenue: 1_310_400 },
                boxOffice: { count: 1_180, revenue: 295_000 },
                administration: { count: 430, revenue: 107_500 },
                mobileApp: { count: 1_680, revenue: 436_800 },
                partner: { count: 390, revenue: 93_600 },
                total: { count: 8_720, revenue: 2_243_300 },
                eventCount: 4,
            },
            {
                period: '2026-04',
                label: 'Dub',
                online: { count: 4_550, revenue: 1_137_500 },
                boxOffice: { count: 1_050, revenue: 257_300 },
                administration: { count: 390, revenue: 93_600 },
                mobileApp: { count: 1_510, revenue: 385_100 },
                partner: { count: 350, revenue: 82_300 },
                total: { count: 7_850, revenue: 1_955_800 },
                eventCount: 3,
            },
            {
                period: '2026-05',
                label: 'Kvě',
                online: { count: 4_970, revenue: 1_267_400 },
                boxOffice: { count: 1_160, revenue: 284_200 },
                administration: { count: 420, revenue: 100_800 },
                mobileApp: { count: 1_650, revenue: 420_800 },
                partner: { count: 380, revenue: 89_300 },
                total: { count: 8_580, revenue: 2_162_500 },
                eventCount: 3,
            },
            {
                period: '2026-06',
                label: 'Čer',
                online: { count: 3_430, revenue: 857_500 },
                boxOffice: { count: 820, revenue: 200_900 },
                administration: { count: 310, revenue: 74_400 },
                mobileApp: { count: 1_150, revenue: 293_300 },
                partner: { count: 240, revenue: 57_800 },
                total: { count: 5_950, revenue: 1_483_900 },
                eventCount: 2,
            },
        ],
    },
    communication: {
        email: {
            delivered: 187_420,
            failed: 4_860,
            openedUnique: 96_580,
            clickedUnique: 28_340,
            openRate: 51.53,
            clickRate: 15.12,
            development: [
                { period: '2026-01', label: 'Led', delivered: 28_600, failed: 820, openedUnique: 14_780, clickedUnique: 4_120 },
                { period: '2026-02', label: 'Úno', delivered: 30_240, failed: 790, openedUnique: 15_410, clickedUnique: 4_380 },
                { period: '2026-03', label: 'Bře', delivered: 32_180, failed: 850, openedUnique: 16_640, clickedUnique: 4_720 },
                { period: '2026-04', label: 'Dub', delivered: 29_940, failed: 760, openedUnique: 15_260, clickedUnique: 4_410 },
                { period: '2026-05', label: 'Kvě', delivered: 34_260, failed: 880, openedUnique: 17_920, clickedUnique: 5_360 },
                { period: '2026-06', label: 'Čer', delivered: 32_200, failed: 760, openedUnique: 16_570, clickedUnique: 5_350 },
            ],
        },
        push: {
            delivered: 82_340,
            failed: 3_160,
            failureRate: 3.7,
            development: [
                { period: '2026-01', label: 'Led', delivered: 12_420, failed: 510 },
                { period: '2026-02', label: 'Úno', delivered: 13_180, failed: 480 },
                { period: '2026-03', label: 'Bře', delivered: 14_260, failed: 560 },
                { period: '2026-04', label: 'Dub', delivered: 13_540, failed: 490 },
                { period: '2026-05', label: 'Kvě', delivered: 15_120, failed: 610 },
                { period: '2026-06', label: 'Čer', delivered: 13_820, failed: 510 },
            ],
        },
        sms: {
            delivered: 31_760,
            failed: 1_020,
            failureRate: 3.11,
            development: [
                { period: '2026-01', label: 'Led', delivered: 4_820, failed: 170 },
                { period: '2026-02', label: 'Úno', delivered: 5_140, failed: 160 },
                { period: '2026-03', label: 'Bře', delivered: 5_460, failed: 180 },
                { period: '2026-04', label: 'Dub', delivered: 4_980, failed: 150 },
                { period: '2026-05', label: 'Kvě', delivered: 5_720, failed: 190 },
                { period: '2026-06', label: 'Čer', delivered: 5_640, failed: 170 },
            ],
        },
    },
    business: {
        advertisingSpaces: {
            occupied: 86,
            free: 34,
            development: [
                { period: '2026-01', label: 'Led', occupied: 70, free: 50 },
                { period: '2026-02', label: 'Úno', occupied: 73, free: 47 },
                { period: '2026-03', label: 'Bře', occupied: 76, free: 44 },
                { period: '2026-04', label: 'Dub', occupied: 80, free: 40 },
                { period: '2026-05', label: 'Kvě', occupied: 83, free: 37 },
                { period: '2026-06', label: 'Čer', occupied: 86, free: 34 },
            ],
        },
        plans: [
            {
                id: 'plan-2026-h1',
                from: '2026-01-01',
                to: '2026-06-30',
                planned: 12_000_000,
                actual: 10_940_000,
                difference: -1_060_000,
                currency: 'CZK',
            },
            {
                id: 'plan-2026',
                from: '2026-01-01',
                to: '2026-12-31',
                planned: 25_000_000,
                actual: 10_940_000,
                difference: -14_060_000,
                currency: 'CZK',
            },
        ],
        planDevelopment: [
            { period: '2026-01', label: 'Led', planned: 2_000_000, actual: 1_650_000 },
            { period: '2026-02', label: 'Úno', planned: 2_000_000, actual: 1_720_000 },
            { period: '2026-03', label: 'Bře', planned: 2_000_000, actual: 1_910_000 },
            { period: '2026-04', label: 'Dub', planned: 2_000_000, actual: 1_780_000 },
            { period: '2026-05', label: 'Kvě', planned: 2_000_000, actual: 2_060_000 },
            { period: '2026-06', label: 'Čer', planned: 2_000_000, actual: 1_820_000 },
        ],
        wonCases: {
            count: 49,
            value: 8_740_000,
            development: [
                { period: '2026-01', label: 'Led', count: 7, value: 1_120_000 },
                { period: '2026-02', label: 'Úno', count: 6, value: 980_000 },
                { period: '2026-03', label: 'Bře', count: 9, value: 1_540_000 },
                { period: '2026-04', label: 'Dub', count: 8, value: 1_360_000 },
                { period: '2026-05', label: 'Kvě', count: 11, value: 2_140_000 },
                { period: '2026-06', label: 'Čer', count: 8, value: 1_600_000 },
            ],
        },
        caseDevelopment: [
            {
                period: '2026-01',
                label: 'Led',
                won: { count: 7, value: 1_120_000 },
                open: { count: 18, value: 3_240_000 },
                cancelled: { count: 3, value: 420_000 },
            },
            {
                period: '2026-02',
                label: 'Úno',
                won: { count: 6, value: 980_000 },
                open: { count: 21, value: 3_680_000 },
                cancelled: { count: 4, value: 590_000 },
            },
            {
                period: '2026-03',
                label: 'Bře',
                won: { count: 9, value: 1_540_000 },
                open: { count: 20, value: 3_520_000 },
                cancelled: { count: 2, value: 310_000 },
            },
            {
                period: '2026-04',
                label: 'Dub',
                won: { count: 8, value: 1_360_000 },
                open: { count: 24, value: 4_180_000 },
                cancelled: { count: 5, value: 720_000 },
            },
            {
                period: '2026-05',
                label: 'Kvě',
                won: { count: 11, value: 2_140_000 },
                open: { count: 23, value: 4_050_000 },
                cancelled: { count: 3, value: 460_000 },
            },
            {
                period: '2026-06',
                label: 'Čer',
                won: { count: 8, value: 1_600_000 },
                open: { count: 26, value: 4_620_000 },
                cancelled: { count: 4, value: 610_000 },
            },
        ],
    },
} satisfies ManagementReportData
