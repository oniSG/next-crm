import { ReportHeaderCard } from '@/components/custom/statistics/report-header-card'

export function ReportHistoryFan() {
    return (
        <div className="flex w-full max-w-6xl flex-col gap-4">
            <ReportHeaderCard
                title="Fan history"
                description="Overview of fan history."
            />
        </div>
    )
}
