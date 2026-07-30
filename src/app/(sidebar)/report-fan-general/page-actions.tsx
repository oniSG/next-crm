'use client'

import { DateRangeFilter } from '@/components/custom/filters/date-range-filter'
import { ExportButton } from '@/components/custom/statistics/export-button'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

import { PERIOD_OPTIONS } from './data'
import { useReportDateRange, useReportPeriod } from './report-utils'

export function PageActions() {
    const [period, setPeriod] = useReportPeriod()
    const { dateRange, setDateRange, today } = useReportDateRange()

    return (
        <>
            <Select
                items={PERIOD_OPTIONS}
                value={period}
                onValueChange={(value) => {
                    if (value === 'day' || value === 'month' || value === 'year') {
                        void setPeriod(value)
                    }
                }}
            >
                <SelectTrigger className="w-36">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent alignItemWithTrigger={false} align="end">
                    <SelectGroup>
                        {PERIOD_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
            <DateRangeFilter value={dateRange} onChange={setDateRange} today={today} />
            <ExportButton
                dashboard="report-fan-general"
                filename="report-fan-general.pdf"
            />
        </>
    )
}
