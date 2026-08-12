'use client'

import { ChartColumnIcon, TableIcon } from 'lucide-react'

import InfoTooltip from '@/components/custom/other/info-tooltip'
import { BarChart } from '@/components/custom/statistics/bar-chart'
import { DataVisulaizationCard } from '@/components/custom/statistics/data-visualization-card'
import { KpiCard } from '@/components/custom/statistics/kpi-card'
import { PieChart } from '@/components/custom/statistics/pie-chart'
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
                queryKey="view-best-send-time"
                action={
                    <InfoTooltip>
                        <p>
                            Přehled z agregovaných dat unikátních otevření v půlhodinových
                            intervalech, mapující aktivitu návštěvníků v akcích během dne.
                        </p>
                    </InfoTooltip>
                }
                tableExportable={{
                    filename: 'nejlepsi-cas-na-odesilani-emailu',
                    headers: ['Čas', 'Počet'],
                    rows: BEST_SEND_TIME_BY_SLOT.map((row) => [row.label, row.pocet]),
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
                queryKey="view-best-send-day"
                action={
                    <InfoTooltip>
                        Přehled z agregovaných dat unikátních otevření v daných dnech v
                        týdnu, mapující aktivitu návštěvníků v akcích během týdne.
                    </InfoTooltip>
                }
                tableExportable={{
                    filename: 'nejlepsi-den-na-odesilani-emailu',
                    headers: ['Den', 'Počet'],
                    rows: BEST_SEND_DAY_BY_WEEKDAY.map((row) => [row.label, row.pocet]),
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
                queryKey="view-email-funnel"
                action={
                    <InfoTooltip>
                        Flowchart e-mailových kampaní graficky znázorňuje statistiku a
                        úspěšnost e-mailových kampaní za posledních 30 dní. Pokud se vám
                        nezobrazují informace o celkovém počtu doručených e-mailů, nebyly
                        za posledních 30 dní poslány žádné e-maily a zobrazené informace
                        se tak týkají interakcí s dříve poslanými e-maily.
                    </InfoTooltip>
                }
            >
                <SankeyChart data={EMAIL_FUNNEL_FLOW} className="min-h-80" />
            </DataVisulaizationCard>

            <DataVisulaizationCard
                title="Typy odhlášení"
                queryKey="view-unsubscribe-types"
                action={
                    <InfoTooltip>
                        Přehledové zobrazení agregovaného počtu tří typů odhlášení
                        GDPR souhlasů napříč všemi komunikačními kanály (e-mail + SMS
                        + push).
                    </InfoTooltip>
                }
                tableExportable={{
                    filename: 'typy-odhlaseni',
                    headers: ['Typ', 'Počet'],
                    rows: UNSUBSCRIBE_TYPES.map((row) => [
                        String(UNSUBSCRIBE_TYPES_CHART_CONFIG[row.name].label),
                        row.value,
                    ]),
                }}
                tabs={[
                    {
                        name: 'Graf',
                        value: 'chart',
                        icon: <ChartColumnIcon />,
                        content: (
                            <PieChart
                                data={UNSUBSCRIBE_TYPES}
                                config={UNSUBSCRIBE_TYPES_CHART_CONFIG}
                                className="max-h-72"
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
                                getRowKey={(row) => row.name}
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
