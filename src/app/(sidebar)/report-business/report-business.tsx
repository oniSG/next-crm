'use client'

import { ChartColumnIcon, ChartPieIcon, TableIcon } from 'lucide-react'

import InfoTooltip from '@/components/custom/other/info-tooltip'
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
    sumWeeklyRevenue,
    toTradeTypePieData,
    toWeeklyRevenueChartRows,
    TRADE_TYPE_COLUMNS,
    TRADE_TYPE_CONFIG,
    WEEKLY_REVENUE_COLUMNS,
    WEEKLY_REVENUE_CONFIG,
    WEEKLY_REVENUE_SERIES,
} from './data'

export function ReportBusiness() {
    const report = BUSINESS_REPORT_DATA
    const weeklyRevenue = toWeeklyRevenueChartRows(report.weeklyRevenue)
    const cases = report.businessCasesByStatus
    const spacesBySeason = report.advertisingSpacesBySeason
    const tradeTypes = report.tradeTypeRatio

    const weeklyRevenueTotal = sumWeeklyRevenue(weeklyRevenue)
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
                title="Příjem z obchodních případů po týdnech"
                action={
                    <InfoTooltip>
                        Statistický přehled příjmů z obchodních případů a spolupráce za
                        posledních 30 dní nebo jiný vámi zvolený časový interval.
                    </InfoTooltip>
                }
                queryKey="business-weekly-revenue-view"
                tableExportable={{
                    filename: 'prijem-z-obchodnich-pripadu-po-tydnech',
                    headers: ['Týden', 'Příjem'],
                    rows: weeklyRevenue.map((row) => [row.label, row.totalRevenue]),
                }}
                tabs={[
                    {
                        name: 'Graf',
                        value: 'chart',
                        icon: <ChartColumnIcon />,
                        content: (
                            <BarChart
                                data={weeklyRevenue}
                                config={WEEKLY_REVENUE_CONFIG}
                                categoryKey="label"
                                series={[...WEEKLY_REVENUE_SERIES]}
                                showYAxis
                                angledXAxis
                                xAxisLabel="Týden"
                                yAxisLabel="Kč"
                                formatValue={formatBusinessCurrency}
                                legendQueryKey="business-weekly-revenue-muted"
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
                                data={weeklyRevenue}
                                columns={WEEKLY_REVENUE_COLUMNS}
                                getRowKey={(row) => row.week}
                                footer={[
                                    'Celkem',
                                    formatBusinessCurrency(weeklyRevenueTotal),
                                ]}
                            />
                        ),
                    },
                ]}
            />

            <DataVisulaizationCard
                title="Počet obchodních případů a potenciální příjem"
                queryKey="business-cases-by-status-view"
                action={
                    <InfoTooltip>
                        Grafické znázornění rozdělení OP podle stavu a jaký mohou
                        potenciálně generovat příjem. Na levé svislé ose je počet OP, na
                        pravé svislé ose příjem v Kč.
                    </InfoTooltip>
                }
                tableExportable={{
                    filename: 'obchodni-pripady-podle-stavu',
                    headers: ['Stav', 'Počet', 'Potenciální příjem'],
                    rows: cases.map((row) => [row.label, row.count, row.potentialIncome]),
                }}
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
                                legendQueryKey="business-cases-by-status-muted"
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
                action={
                    <InfoTooltip>
                        Grafické znázornění poměru volných a prodaných reklamních ploch,
                        rozdělené podle sezón. Pokud se reklamní plochy zobrazují ve
                        sloupci "Mimo sezónu", znamená to, že v atributech reklamní plochy
                        není sezóna definovaná. Pokud jí definujete, graf bude více
                        odpovídat realitě prodejů.
                    </InfoTooltip>
                }
                queryKey="business-advertising-spaces-by-season-view"
                tableExportable={{
                    filename: 'reklamni-plochy-za-sezonu',
                    headers: [
                        'Sezóna',
                        ADVERTISING_SPACES_CONFIG.occupied.label,
                        ADVERTISING_SPACES_CONFIG.occupiedMultiple.label,
                        ADVERTISING_SPACES_CONFIG.free.label,
                    ],
                    rows: spacesBySeason.map((row) => [
                        row.label,
                        row.occupied,
                        row.occupiedMultiple,
                        row.free,
                    ]),
                }}
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
                                legendQueryKey="business-advertising-spaces-muted"
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
                                    formatBusinessCount(spacesTotals.occupiedMultiple),
                                    formatBusinessCount(spacesTotals.free),
                                ]}
                            />
                        ),
                    },
                ]}
            />

            <DataVisulaizationCard
                title="Poměr barteru a finančního obchodu"
                action={
                    <InfoTooltip>
                        Grafické znázornění poměru mezi četností barteru a finančního
                        obchodu v rámci OP z poslední sezóny (vnitřní kruh) a příjem z
                        nich (vnější kruh).
                    </InfoTooltip>
                }
                queryKey="business-trade-type-ratio-view"
                tableExportable={{
                    filename: 'pomer-typu-obchodu',
                    headers: ['Typ obchodu', 'Počet'],
                    rows: tradeTypes.map((row) => [row.label, row.value]),
                }}
                tabs={[
                    {
                        name: 'Graf',
                        value: 'chart',
                        icon: <ChartPieIcon />,
                        content: (
                            <PieChart
                                data={toTradeTypePieData(tradeTypes)}
                                config={TRADE_TYPE_CONFIG}
                                className="max-h-80"
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
                                footer={['Celkem', formatBusinessCount(tradeTotal)]}
                            />
                        ),
                    },
                ]}
            />
        </div>
    )
}
