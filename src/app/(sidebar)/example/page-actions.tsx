'use client'

import { useState } from 'react'
import { subDays } from 'date-fns'

import { ExportButton } from '@/components/custom/export-button'
import { DateRangeFilter } from '@/components/custom/filters/date-range-filter'
import type { DateRange } from '@/components/custom/filters/date-presets'
import { TypeFilter } from '@/components/custom/filters/type-filter'

import { SEGMENT_OPTIONS } from './data'

export function PageActions() {
    const [today] = useState(() => new Date())
    const [segment, setSegment] = useState('all')
    const [range, setRange] = useState<DateRange>(() => ({
        from: subDays(today, 27),
        to: today,
    }))

    return (
        <>
            <TypeFilter
                options={SEGMENT_OPTIONS}
                value={segment}
                onChange={setSegment}
                searchPlaceholder="Search segments…"
            />
            <DateRangeFilter value={range} onChange={setRange} today={today} />
            <ExportButton dashboard="example" />
        </>
    )
}
