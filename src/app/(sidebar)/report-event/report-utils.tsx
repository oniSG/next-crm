'use client'

import { parseAsString, useQueryState } from 'nuqs'

export function useEventReportFilters() {
    const [eventId, setEventId] = useQueryState('event', parseAsString)

    return { eventId, setEventId }
}
