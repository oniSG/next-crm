'use client'

import { useMemo, useState } from 'react'
import { format } from 'date-fns'
import { parseAsIsoDate, parseAsString, useQueryState } from 'nuqs'

import type { DateRange } from '@/components/custom/filters/date-presets'

import type { ReportEventOption } from './data'

export function useEventReportFilters() {
    const [today] = useState(() => new Date())
    const defaultFrom = useMemo(
        () => new Date(today.getFullYear() - 1, today.getMonth(), today.getDate()),
        [today],
    )
    const [from, setFrom] = useQueryState('from', parseAsIsoDate)
    const [to, setTo] = useQueryState('to', parseAsIsoDate)
    const [eventId, setEventId] = useQueryState('event', parseAsString)

    const dateRange: DateRange = {
        from: from ?? defaultFrom,
        to: to ?? today,
    }

    function setDateRange(range: DateRange) {
        void setFrom(range.from)
        void setTo(range.to)
    }

    function resetDateRange() {
        void setFrom(null)
        void setTo(null)
    }

    return {
        today,
        dateRange,
        setDateRange,
        resetDateRange,
        hasDateFilter: from !== null || to !== null,
        eventId,
        setEventId,
    }
}

export function filterEventsByDateRange(events: ReportEventOption[], range: DateRange) {
    const from = format(range.from, 'yyyy-MM-dd')
    const to = format(range.to, 'yyyy-MM-dd')
    return events.filter((event) => event.date >= from && event.date <= to)
}
