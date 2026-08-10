'use client'

import { ChartColumnIcon, ChartPieIcon, TableIcon } from 'lucide-react'

import { BarChart } from '@/components/custom/statistics/bar-chart'
import { DataVisulaizationCard } from '@/components/custom/statistics/data-visualization-card'
import { PieChart } from '@/components/custom/statistics/pie-chart'
import { ReportHeaderCard } from '@/components/custom/statistics/report-header-card'
import { SimpleTable } from '@/components/custom/statistics/simple-table'

import {
    ADVERTISING_SPACES_COLUMNS,
    ADVERTISING_SPACES_CONFIG,
    ADVERTISING_SPACES_SERIES,
    BUSINESS_CASE_STATUS_COLUMNS,
    BUSINESS_CASE_STATUS_CONFIG,
    BUSINESS_CASE_STATUS_SECONDARY_SERIES,
    BUSINESS_CASE_STATUS_SERIES,
    BUSINESS_REPORT_DATA,
    formatBusinessCount,
    formatBusinessCurrency,
    sumAdvertisingSpacesBySeason,
    sumBusinessCaseCounts,
    sumBusinessCaseIncome,
    sumTradeTypeValues,
    toTradeTypePieData,
    TRADE_TYPE_COLUMNS,
    TRADE_TYPE_CONFIG,
} from './data'

export function ReportBusiness() {
    const report = BUSINESS_REPORT_DATA
    const cases = report.businessCasesByStatus
    const spacesBySeason = report.advertisingSpacesBySeason
    const tradeTypes = report.tradeTypeRatio

    const caseCountTotal = sumBusinessCaseCounts(cases)
    const caseIncomeTotal = sumBusinessCaseIncome(cases)
    const spacesTotals = sumAdvertisingSpacesBySeason(spacesBySeason)
    const tradeTotal = sumTradeTypeValues(tradeTypes)

    return (
        <div className="flex w-full max-w-6xl flex-col gap-4">
            <ReportHeaderCard
                title="Business"
                description="Přehled obchodních případů, reklamních ploch a typu obchodu."
            />

            <DataVisulaizationCard
                title="Počet obchodních případů a potenciální příjem"
                description="Objem a potenciální příjem podle stavu obchodního případu."
                queryKey="business-cases-by-status-view"
                tabs={[
                    {
                        name: 'Graf',
                        value: 'chart',
                        icon: <ChartColumnIcon />,
                        content: (
                            <BarChart
                                data={cases}
                                config={BUSINESS_CASE_STATUS_CONFIG}
                                categoryKey="label"
                                series={[...BUSINESS_CASE_STATUS_SERIES]}
                                secondarySeries={[
                                    ...BUSINESS_CASE_STATUS_SECONDARY_SERIES,
                                ]}
                                showYAxis
                                xAxisLabel="Stav obchodního případu"
                                yAxisLabel="Počet"
                                secondaryYAxisLabel="Kč"
                                formatValue={formatBusinessCount}
                                formatSecondaryValue={formatBusinessCurrency}
                                className="h-96"
                            />
                        ),
                    },
                    {
                        name: 'Tabulka',
                        value: 'table',
                        icon: <TableIcon />,
                        content: (
                            <SimpleTable
                                data={cases}
                                columns={BUSINESS_CASE_STATUS_COLUMNS}
                                getRowKey={(row) => row.id}
                                footer={[
                                    'Celkem',
                                    formatBusinessCount(caseCountTotal),
                                    formatBusinessCurrency(caseIncomeTotal),
                                ]}
                            />
                        ),
                    },
                ]}
            />

            <DataVisulaizationCard
                title="Poměr obsazených a volných ploch za sezónu"
                description="Obsazenost reklamních ploch podle sezóny."
                queryKey="business-advertising-spaces-by-season-view"
                tabs={[
                    {
                        name: 'Graf',
                        value: 'chart',
                        icon: <ChartColumnIcon />,
                        content: (
                            <BarChart
                                data={spacesBySeason}
                                config={ADVERTISING_SPACES_CONFIG}
                                categoryKey="label"
                                series={[...ADVERTISING_SPACES_SERIES]}
                                showYAxis
                                xAxisLabel="Sezóna"
                                yAxisLabel="Počet"
                                formatValue={formatBusinessCount}
                                className="h-80"
                            />
                        ),
                    },
                    {
                        name: 'Tabulka',
                        value: 'table',
                        icon: <TableIcon />,
                        content: (
                            <SimpleTable
                                data={spacesBySeason}
                                columns={ADVERTISING_SPACES_COLUMNS}
                                getRowKey={(row) => row.id}
                                footer={[
                                    'Celkem',
                                    formatBusinessCount(spacesTotals.occupied),
                                    formatBusinessCount(
                                        spacesTotals.occupiedMultiple,
                                    ),
                                    formatBusinessCount(spacesTotals.free),
                                ]}
                            />
                        ),
                    },
                ]}
            />

            <DataVisulaizationCard
                title="Poměr barteru a finančního obchodu"
                description="Rozložení obchodů podle typu (finance / barter / kombinace)."
                queryKey="business-trade-type-ratio-view"
                className="max-w-xl"
                tabs={[
                    {
                        name: 'Graf',
                        value: 'chart',
                        icon: <ChartPieIcon />,
                        content: (
                            <PieChart
                                data={toTradeTypePieData(tradeTypes)}
                                config={TRADE_TYPE_CONFIG}
                                className="max-h-72"
                                innerRadius={56}
                            />
                        ),
                    },
                    {
                        name: 'Tabulka',
                        value: 'table',
                        icon: <TableIcon />,
                        content: (
                            <SimpleTable
                                data={tradeTypes}
                                columns={TRADE_TYPE_COLUMNS}
                                getRowKey={(row) => row.id}
                                footer={[
                                    'Celkem',
                                    formatBusinessCount(tradeTotal),
                                ]}
                            />
                        ),
                    },
                ]}
            />
        </div>
    )
}
