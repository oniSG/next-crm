'use client'

import { useMemo, useState } from 'react'
import {
    parseAsArrayOf,
    parseAsIsoDate,
    parseAsStringLiteral,
    useQueryState,
} from 'nuqs'

import type { DateRange } from '@/components/custom/filters/date-presets'

import {
    CHANNEL_OPTIONS,
    REGION_OPTIONS,
    SEGMENT_OPTIONS,
    TEAM_OPTIONS,
} from './data'

const segmentValues: string[] = SEGMENT_OPTIONS.map((option) => option.value)
const teamValues: string[] = TEAM_OPTIONS.map((option) => option.value)
const channelValues: string[] = CHANNEL_OPTIONS.map((option) => option.value)
const regionValues: string[] = REGION_OPTIONS.map((option) => option.value)

/** Demo data months cover Jan–Jul 2026. */
const defaultFrom = new Date(2026, 0, 1)
const defaultTo = new Date(2026, 6, 31)

export function useFilters() {
    const [today] = useState(() => new Date(2026, 7, 15))
    const [from, setFrom] = useQueryState(
        'from',
        parseAsIsoDate.withDefault(defaultFrom),
    )
    const [to, setTo] = useQueryState(
        'to',
        parseAsIsoDate.withDefault(defaultTo),
    )
    const [segment, setSegment] = useQueryState(
        'segment',
        parseAsStringLiteral(segmentValues).withDefault('all'),
    )
    const [teams, setTeams] = useQueryState(
        'team',
        parseAsArrayOf(parseAsStringLiteral(teamValues))
            .withDefault([])
            .withOptions({ clearOnDefault: true }),
    )
    const [channels, setChannels] = useQueryState(
        'channel',
        parseAsArrayOf(parseAsStringLiteral(channelValues))
            .withDefault([])
            .withOptions({ clearOnDefault: true }),
    )
    const [regions, setRegions] = useQueryState(
        'region',
        parseAsArrayOf(parseAsStringLiteral(regionValues))
            .withDefault([])
            .withOptions({ clearOnDefault: true }),
    )

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
