'use client'

import { DataVisulaizationCard } from '@/components/custom/statistics/data-visualization-card'
import { LineChart } from '@/components/custom/statistics/line-chart'
import { KpiCard } from '@/components/custom/statistics/kpi-card'
import { PieChart } from '@/components/custom/statistics/pie-chart'
import { SankeyChart } from '@/components/custom/statistics/sankey-chart'
import { SimpleTable } from '@/components/custom/statistics/simple-table'
import { ReportHeaderCard } from '@/components/custom/statistics/report-header-card'
import InfoTooltip from '@/components/custom/other/info-tooltip'

import {
    COMMUNICATION_CHANNELS,
    COMMUNICATION_CHANNELS_CONFIG,
    EMAIL_CAMPAIGN_FLOW,
    EMAIL_CAMPAIGN_STATS,
    EMAIL_CAMPAIGN_STATS_CONFIG,
    EMAIL_CAMPAIGN_STATS_SERIES,
    EVENT_LIST_COLUMNS,
    EVENT_LISTS,
    GDPR_OPTOUT_COUNTS,
    GDPR_OPTOUT_COUNTS_CONFIG,
    GDPR_UNSUBSCRIBE_STATS,
    GDPR_UNSUBSCRIBE_STATS_CONFIG,
    GDPR_UNSUBSCRIBE_STATS_SERIES,
    NOTICEBOARD_DETAIL,
    NOTICEBOARD_METRIC,
    UNDELIVERED_EMAILS,
    UNDELIVERED_EMAILS_CONFIG,
} from './data'

export function NoticeboardMarketing() {
    return (
        <div className="flex w-full max-w-6xl flex-col gap-4">
            <ReportHeaderCard
                title="Komunikace a akce"
                description="Přehled komunikace a akcí."
            />

            <section className="grid grid-cols-1 gap-4 lg:grid-cols-4">
                <div className="flex flex-col gap-4">
                    <KpiCard
                        label={NOTICEBOARD_DETAIL.title}
                        content={NOTICEBOARD_DETAIL.rows}
                        trend={NOTICEBOARD_DETAIL.trend}
                        action={
                            <InfoTooltip>
                                Relatoo index měří CRM zralost vašeho klubu za
                                posledních 30 dní. Více najdete na stránce
                                „relatoo index“.
                            </InfoTooltip>
                        }
                    />
                    <KpiCard
                        label={NOTICEBOARD_METRIC.title}
                        value={NOTICEBOARD_METRIC.value}
                        trend={NOTICEBOARD_METRIC.trend}
                        action={
                            <InfoTooltip>
                                Click-rate e-mailových kampaní vyjadřuje poměr
                                unikátních prokliků vůči doručeným e-mailům za
                                posledních 30 dní. Pokud za posledních 30 dní
                                nebyly doručeny žádné e-maily, zobrazí se
                                hláška „Nejsou data“.
                            </InfoTooltip>
                        }
                    />
                </div>

                <DataVisulaizationCard
                    title="Flowchart e-mailových kampaní"
                    className="h-full min-h-0 lg:col-span-3"
                    queryKey="email-campaign-flow"
                    action={
                        <InfoTooltip>
                            Flowchart e-mailových kampaní graficky znázorňuje
                            statistiku a úspěšnost e-mailových kampaní za
                            posledních 30 dní. Pokud se vám nezobrazují informace
                            o celkovém počtu doručených e-mailů, nebyly za
                            posledních 30 dní poslány žádné e-maily a zobrazené
                            informace se tak týkají interakcí s dříve poslanými
                            e-maily.
                        </InfoTooltip>
                    }
                >
                    <SankeyChart
                        data={EMAIL_CAMPAIGN_FLOW}
                        className="h-full min-h-0 max-lg:min-h-75"
                    />
                </DataVisulaizationCard>
            </section>

            <section className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-stretch">
                <div className="flex h-full min-h-0 flex-col gap-4 lg:col-span-2">
                    <DataVisulaizationCard
                        title="Statistika e-mailových kampaní"
                        description="Doručeno, otevřeno, kliknuto a odhlášeno po dnech."
                        queryKey="email-campaign-stats"
                        action={
                            <InfoTooltip>
                                Statistika e-mailových kampaní znázorňuje počty
                                e-mailů spadající do 3 kategorií za posledních
                                90 dní.
                                <br />
                                Kategorie:
                                <br />
                                Doručeno,
                                <br />
                                Soft bounce = e-maily nedoručené z důvodu
                                dočasné závady (např. plná e-mailová schránka),
                                <br />
                                Unikátní otevření = otevřeno unikátním
                                uživatelem (tj. i při větším počtu rozkliknutí
                                jedním uživatelem se rozklik počítá jen
                                jednou)
                            </InfoTooltip>
                        }
                    >
                        <LineChart
                            data={EMAIL_CAMPAIGN_STATS}
                            config={EMAIL_CAMPAIGN_STATS_CONFIG}
                            categoryKey="datum"
                            series={[...EMAIL_CAMPAIGN_STATS_SERIES]}
                            showYAxis
                            angledXAxis
                            showDots
                            className="min-h-72 flex-1"
                        />
                    </DataVisulaizationCard>

                    <DataVisulaizationCard
                        title="Statistika odhlášení GDPR souhlasů"
                        queryKey="gdpr-unsubscribe-stats"
                        action={
                            <InfoTooltip>GDPR souhlasy - trendy</InfoTooltip>
                        }
                    >
                        <LineChart
                            data={GDPR_UNSUBSCRIBE_STATS}
                            config={GDPR_UNSUBSCRIBE_STATS_CONFIG}
                            categoryKey="datum"
                            series={[...GDPR_UNSUBSCRIBE_STATS_SERIES]}
                            showYAxis
                            showDots
                            className="min-h-72 flex-1"
                        />
                    </DataVisulaizationCard>
                </div>

                <div className="flex h-full min-h-0 flex-col gap-4">
                    <DataVisulaizationCard
                        title="Komunikační kanály"
                        queryKey="communication-channels"
                        action={
                            <InfoTooltip>
                                Grafické vyobrazení četnosti užívání
                                jednotlivých komunikačních kanálů v posledních
                                30 dnech.
                            </InfoTooltip>
                        }
                    >
                        <PieChart
                            data={COMMUNICATION_CHANNELS}
                            config={COMMUNICATION_CHANNELS_CONFIG}
                            className="max-h-44"
                        />
                    </DataVisulaizationCard>

                    <DataVisulaizationCard
                        title="Nedoručené e-maily"
                        queryKey="undelivered-emails"
                        action={
                            <InfoTooltip>
                                Grafické vyobrazení poměrů známých příčin
                                nedoručení e-mailové komunikace v posledních 30
                                dnech.
                                <br />
                                Soft bounce = e-maily nedoručené z důvodu
                                dočasné závady (např. plná e-mailová schránka)
                                <br />
                                Hard bounce = e-maily, které jsou trvale
                                nedoručitelné (např. neexistující adresa,
                                závada na straně domény)
                                <br />
                                Spam = pošta byla označena za spam
                            </InfoTooltip>
                        }
                    >
                        <PieChart
                            data={UNDELIVERED_EMAILS}
                            config={UNDELIVERED_EMAILS_CONFIG}
                            className="max-h-44"
                        />
                    </DataVisulaizationCard>

                    <DataVisulaizationCard
                        title="Počty odhlášených GDPR"
                        queryKey="gdpr-optout-counts"
                        action={
                            <InfoTooltip>
                                Tabulka celkových počtů odhlášených GDPR
                                souhlasů pro jednotlivé komunikační kanály.
                            </InfoTooltip>
                        }
                    >
                        <PieChart
                            data={GDPR_OPTOUT_COUNTS}
                            config={GDPR_OPTOUT_COUNTS_CONFIG}
                            className="max-h-44"
                        />
                    </DataVisulaizationCard>
                </div>
            </section>

            <section>
                <DataVisulaizationCard title="Seznamy událostí" queryKey="event-lists">
                    <SimpleTable
                        data={EVENT_LISTS}
                        columns={EVENT_LIST_COLUMNS}
                        getRowKey={(row) => row.id}
                    />
                </DataVisulaizationCard>
            </section>
        </div>
    )
}
