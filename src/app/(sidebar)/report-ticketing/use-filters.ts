'use client'

import { useMemo, useState } from 'react'
import { parseAsIsoDate, useQueryState } from 'nuqs'

import type { DateRange } from '@/components/custom/filters/date-presets'

import {
    TICKETS_BY_EVENT_DEFAULT_FROM,
    TICKETS_BY_EVENT_DEFAULT_TO,
} from './data'

export function useFilters() {
    const [today] = useState(() => new Date())
    const [eventFrom, setEventFrom] = useQueryState(
        'event-from',
        parseAsIsoDate.withDefault(TICKETS_BY_EVENT_DEFAULT_FROM),
    )
    const [eventTo, setEventTo] = useQueryState(
        'event-to',
        parseAsIsoDate.withDefault(TICKETS_BY_EVENT_DEFAULT_TO),
    )

    const eventDateRange = useMemo<DateRange>(
        () => ({ from: eventFrom, to: eventTo }),
        [eventFrom, eventTo],
    )

    function setEventDateRange(range: DateRange) {
        void setEventFrom(range.from)
        void setEventTo(range.to)
    }

    return {
        today,
        eventDateRange,
        setEventDateRange,
    }
}
