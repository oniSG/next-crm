import { ReportHeaderCard } from '@/components/custom/statistics/report-header-card'

export function ReportLoyaltyProgram() {
    return (
        <div className="flex w-full max-w-6xl flex-col gap-4">
            <ReportHeaderCard
                title="Loyalty program"
                description="Overview of the loyalty program."
            />
        </div>
    )
}
