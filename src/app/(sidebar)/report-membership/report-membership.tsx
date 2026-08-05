'use client'

import { DataVisulaizationCard } from '@/components/custom/statistics/data-visualization-card'
import { ReportHeaderCard } from '@/components/custom/statistics/report-header-card'
import { SimpleTable } from '@/components/custom/statistics/simple-table'

import { MEMBERSHIP_REPORT_DATA, MEMBERSHIP_STATS_COLUMNS } from './data'

export function ReportMembership() {
    const report = MEMBERSHIP_REPORT_DATA
    const rowCount = report.rows.length

    return (
        <div className="flex w-full max-w-6xl flex-col gap-4">
            <ReportHeaderCard
                title="Membership"
                description="Statistiky členství podle typu platby a objednávky."
            />

            <DataVisulaizationCard
                title="Tabulka statistik k membershipu"
                description="Přehled aktuálního stavu a příjmu podle členství."
                queryKey="membership-stats-table"
                footer={
                    <p className="text-muted-foreground w-full text-right text-sm">
                        {rowCount} řádků
                    </p>
                }
            >
                <SimpleTable
                    data={report.rows}
                    columns={MEMBERSHIP_STATS_COLUMNS}
                    getRowKey={(row) => row.id}
                />
            </DataVisulaizationCard>
        </div>
    )
}
