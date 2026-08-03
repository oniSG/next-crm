import { ReportHeaderCard } from '@/components/custom/statistics/report-header-card'

export function ReportGdprChange() {
    return (
        <div className="flex w-full max-w-6xl flex-col gap-4">
            <ReportHeaderCard
                title="GDPR changes"
                description="Overview of GDPR changes."
            />
        </div>
    )
}
