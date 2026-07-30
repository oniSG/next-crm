'use client'

import { DownloadIcon } from 'lucide-react'

import { DateRangeFilter } from '@/components/custom/filters/date-range-filter'
import { Button } from '@/components/ui/button'

import { useReportPeriod } from './report-period-context'

export default function PageActions() {
    const { dateRange, setDateRange, today } = useReportPeriod()

    return (
        <>
            <DateRangeFilter value={dateRange} onChange={setDateRange} today={today} />
            <Button type="button" variant="outline" size="sm">
                <DownloadIcon />
                Export
            </Button>
        </>
    )
}
