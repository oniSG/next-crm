'use client'

import { RotateCcwIcon } from 'lucide-react'

import { DateRangeFilter } from '@/components/custom/filters/date-range-filter'
import { ExportButton } from '@/components/custom/statistics/export-button'
import { Button } from '@/components/ui/button'

import { useEventReportFilters } from './report-utils'

export function PageActions() {
    const { eventId, dateRange, setDateRange, resetDateRange, hasDateFilter, today } =
        useEventReportFilters()

    if (!eventId) {
        return (
            <>
                <DateRangeFilter
                    value={dateRange}
                    onChange={setDateRange}
                    today={today}
                />
                {hasDateFilter && (
                    <Button variant="ghost" size="sm" onClick={resetDateRange}>
                        <RotateCcwIcon />
                        Reset filter
                    </Button>
                )}
            </>
        )
    }

    return <ExportButton dashboard="report-event" filename="report-event.pdf" />
}
