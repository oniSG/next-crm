'use client'

import { useMemo, useState } from 'react'
import { parseAsIsoDate, useQueryStates } from 'nuqs'

import type { DateRange } from '@/components/custom/filters/date-presets'

import {
    TICKETS_BY_EVENT_DEFAULT_FROM,
    TICKETS_BY_EVENT_DEFAULT_TO,
} from './data'

export function useFilters() {
    const [today] = useState(() => new Date())
    const [{ 'event-from': eventFrom, 'event-to': eventTo }, setRange] =
        useQueryStates({
            'event-from': parseAsIsoDate.withDefault(TICKETS_BY_EVENT_DEFAULT_FROM),
            'event-to': parseAsIsoDate.withDefault(TICKETS_BY_EVENT_DEFAULT_TO),
        })

    const eventDateRange = useMemo<DateRange>(
        () => ({ from: eventFrom, to: eventTo }),
        [eventFrom, eventTo],
    )

    function setEventDateRange(range: DateRange) {
        void setRange({
            'event-from': range.from,
            'event-to': range.to,
        })
    }

    return {
        today,
        eventDateRange,
        setEventDateRange,
    }
}
