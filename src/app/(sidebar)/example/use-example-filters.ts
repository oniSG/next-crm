'use client'

import { useMemo, useState } from 'react'
import { parseAsIsoDate, useQueryState } from 'nuqs'

import type { DateRange } from '@/components/custom/filters/date-presets'
import {
    useFilterParam,
    useMultiFilterParam,
} from '@/lib/alumni/use-filter-param'

import {
    CHANNEL_OPTIONS,
    REGION_OPTIONS,
    SEGMENT_OPTIONS,
    TEAM_OPTIONS,
} from './data'

const segmentValues = SEGMENT_OPTIONS.map((option) => option.value)
const teamValues = TEAM_OPTIONS.map((option) => option.value)
const channelValues = CHANNEL_OPTIONS.map((option) => option.value)
const regionValues = REGION_OPTIONS.map((option) => option.value)

/** Demo data months cover Jan–Jul 2026. */
const defaultFrom = new Date(2026, 0, 1)
const defaultTo = new Date(2026, 6, 31)

export function useExampleFilters() {
    const [today] = useState(() => new Date(2026, 7, 15))
    const [from, setFrom] = useQueryState(
        'from',
        parseAsIsoDate.withDefault(defaultFrom),
    )
    const [to, setTo] = useQueryState(
        'to',
        parseAsIsoDate.withDefault(defaultTo),
    )
    const [segment, setSegment] = useFilterParam(
        'segment',
        segmentValues,
        'all',
    )
    const [teams, setTeams] = useMultiFilterParam('team', teamValues)
    const [channels, setChannels] = useMultiFilterParam('channel', channelValues)
    const [regions, setRegions] = useMultiFilterParam('region', regionValues)

    const dateRange = useMemo<DateRange>(() => ({ from, to }), [from, to])

    function setDateRange(range: DateRange) {
        void setFrom(range.from)
        void setTo(range.to)
    }

    return {
        today,
        dateRange,
        setDateRange,
        segment,
        setSegment,
        teams,
        setTeams,
        channels,
        setChannels,
        regions,
        setRegions,
    }
}
