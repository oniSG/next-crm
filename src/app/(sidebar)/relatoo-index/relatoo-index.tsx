'use client'

import { ChartColumnIcon, TableIcon } from 'lucide-react'

import { BarChart } from '@/components/custom/statistics/bar-chart'
import { DataVisulaizationCard } from '@/components/custom/statistics/data-visualization-card'
import { KpiCard } from '@/components/custom/statistics/kpi-card'
import { ReportHeaderCard } from '@/components/custom/statistics/report-header-card'
import { SankeyChart } from '@/components/custom/statistics/sankey-chart'
import { SimpleTable } from '@/components/custom/statistics/simple-table'

import {
    BEST_SEND_DAY_BY_WEEKDAY,
    BEST_SEND_DAY_CHART_CONFIG,
    BEST_SEND_DAY_COLUMNS,
    BEST_SEND_DAY_SERIES,
    BEST_SEND_TIME_BY_SLOT,
    BEST_SEND_TIME_CHART_CONFIG,
    BEST_SEND_TIME_COLUMNS,
    BEST_SEND_TIME_SERIES,
    EMAIL_FUNNEL_FLOW,
    formatExpertCount,
    RELATOO_INDEX_KPIS,
    TOP_ACTIONS,
    TOP_ACTIONS_COLUMNS,
    UNSUBSCRIBE_TYPES,
    UNSUBSCRIBE_TYPES_CHART_CONFIG,
    UNSUBSCRIBE_TYPES_COLUMNS,
    UNSUBSCRIBE_TYPES_SERIES,
} from './data'

export function RelatooIndex() {
    return (
        <div className="flex w-full max-w-6xl flex-col gap-4">
            <ReportHeaderCard
                title="Postřehy relatoo"
                description="Relatoo index a expertní přehledy odesílání e-mailů."
            />

            <section
                className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
                aria-label="Relatoo index overview"
            >
                {RELATOO_INDEX_KPIS.map((kpi) => (
                    <KpiCard key={kpi.label} {...kpi} />
                ))}
            </section>

            <DataVisulaizationCard
                title="Nejlepší čas na odesílání e-mailů"
                description="Průměr unikátně otevřených za celou dobu."
                queryKey="view-best-send-time"
                tableExportable={{
                    filename: 'nejlepsi-cas-na-odesilani-emailu',
                    headers: ['Čas', 'Počet'],
                    rows: BEST_SEND_TIME_BY_SLOT.map((row) => [
                        row.label,
                        row.pocet,
                    ]),
                }}
                tabs={[
                    {
                        name: 'Graf',
                        value: 'chart',
                        icon: <ChartColumnIcon />,
                        content: (
                            <BarChart
                                data={BEST_SEND_TIME_BY_SLOT}
                                config={BEST_SEND_TIME_CHART_CONFIG}
                                categoryKey="label"
                                series={[...BEST_SEND_TIME_SERIES]}
                                showYAxis
                                angledXAxis
                                xAxisLabel="Čas"
                                yAxisLabel="Počet"
                                formatValue={formatExpertCount}
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
                                data={BEST_SEND_TIME_BY_SLOT}
                                columns={BEST_SEND_TIME_COLUMNS}
                                getRowKey={(row) => row.label}
                            />
                        ),
                    },
                ]}
            />

            <DataVisulaizationCard
                title="Nejlepší den na odesílání e-mailů"
                description="Průměr unikátně otevřených za celou dobu."
                queryKey="view-best-send-day"
                tableExportable={{
                    filename: 'nejlepsi-den-na-odesilani-emailu',
                    headers: ['Den', 'Počet'],
                    rows: BEST_SEND_DAY_BY_WEEKDAY.map((row) => [
                        row.label,
                        row.pocet,
                    ]),
                }}
                tabs={[
                    {
                        name: 'Graf',
                        value: 'chart',
                        icon: <ChartColumnIcon />,
                        content: (
                            <BarChart
                                data={BEST_SEND_DAY_BY_WEEKDAY}
                                config={BEST_SEND_DAY_CHART_CONFIG}
                                categoryKey="label"
                                series={[...BEST_SEND_DAY_SERIES]}
                                showYAxis
                                xAxisLabel="Den"
                                yAxisLabel="Počet"
                                formatValue={formatExpertCount}
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
                                data={BEST_SEND_DAY_BY_WEEKDAY}
                                columns={BEST_SEND_DAY_COLUMNS}
                                getRowKey={(row) => row.label}
                            />
                        ),
                    },
                ]}
            />

            <DataVisulaizationCard
                title="Flowchart e-mailových kampaní"
                description="Statistiky e-mailových kampaní za celou dobu."
                queryKey="view-email-funnel"
            >
                <SankeyChart data={EMAIL_FUNNEL_FLOW} className="min-h-80" />
            </DataVisulaizationCard>

            <DataVisulaizationCard
                title="Typy odhlášení"
                description="Rozložení odhlášení podle typu souhlasu za celou dobu."
                queryKey="view-unsubscribe-types"
                tableExportable={{
                    filename: 'typy-odhlaseni',
                    headers: [
                        'Kategorie',
                        'Sdělení o akci',
                        'Sdělení pořadatele',
                        'Marketing',
                    ],
                    rows: UNSUBSCRIBE_TYPES.map((row) => [
                        row.label,
                        row.sdeleniOAkci,
                        row.sdeleniPoradatele,
                        row.marketing,
                    ]),
                }}
                tabs={[
                    {
                        name: 'Graf',
                        value: 'chart',
                        icon: <ChartColumnIcon />,
                        content: (
                            <BarChart
                                data={UNSUBSCRIBE_TYPES}
                                config={UNSUBSCRIBE_TYPES_CHART_CONFIG}
                                categoryKey="label"
                                series={[...UNSUBSCRIBE_TYPES_SERIES]}
                                orientation="horizontal"
                                stacked
                                showYAxis
                                xAxisLabel="Počet"
                                yAxisLabel="Kategorie"
                                formatValue={formatExpertCount}
                                className="h-48"
                            />
                        ),
                    },
                    {
                        name: 'Tabulka',
                        value: 'table',
                        icon: <TableIcon />,
                        content: (
                            <SimpleTable
                                data={UNSUBSCRIBE_TYPES}
                                columns={UNSUBSCRIBE_TYPES_COLUMNS}
                                getRowKey={(row) => row.label}
                            />
                        ),
                    },
                ]}
            />

            <DataVisulaizationCard
                title="Nejvýkonnější akce"
                description="Akce s nejvyšším CTR za celou dobu."
                queryKey="top-actions"
            >
                <SimpleTable
                    data={TOP_ACTIONS}
                    columns={TOP_ACTIONS_COLUMNS}
                    getRowKey={(row) => row.id}
                />
            </DataVisulaizationCard>
        </div>
    )
}
