'use client'

import { useMemo, useState } from 'react'
import {
    parseAsArrayOf,
    parseAsIsoDate,
    parseAsStringLiteral,
    useQueryState,
    useQueryStates,
} from 'nuqs'

import type { DateRange } from '@/components/custom/filters/date-presets'

import {
    CHANNEL_OPTIONS,
    REGION_OPTIONS,
    SEGMENT_OPTIONS,
    TEAM_OPTIONS,
} from './data'
import { setLiteralParam, setLiteralParams } from '@/lib/query-state'

const segmentValues = SEGMENT_OPTIONS.map((option) => option.value) as [
    (typeof SEGMENT_OPTIONS)[number]['value'],
    ...(typeof SEGMENT_OPTIONS)[number]['value'][],
]
const teamValues = TEAM_OPTIONS.map((option) => option.value) as [
    (typeof TEAM_OPTIONS)[number]['value'],
    ...(typeof TEAM_OPTIONS)[number]['value'][],
]
const channelValues = CHANNEL_OPTIONS.map((option) => option.value) as [
    (typeof CHANNEL_OPTIONS)[number]['value'],
    ...(typeof CHANNEL_OPTIONS)[number]['value'][],
]
const regionValues = REGION_OPTIONS.map((option) => option.value) as [
    (typeof REGION_OPTIONS)[number]['value'],
    ...(typeof REGION_OPTIONS)[number]['value'][],
]

/** Demo data months cover Jan–Jul 2026. */
const defaultFrom = new Date(2026, 0, 1)
const defaultTo = new Date(2026, 6, 31)

export function useFilters() {
    const [today] = useState(() => new Date(2026, 7, 15))
    const [{ from, to }, setRange] = useQueryStates({
        from: parseAsIsoDate.withDefault(defaultFrom),
        to: parseAsIsoDate.withDefault(defaultTo),
    })
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
        void setRange({ from: range.from, to: range.to })
    }

    return {
        today,
        dateRange,
        setDateRange,
        segment,
        setSegment: setLiteralParam(setSegment),
        teams,
        setTeams: setLiteralParams(setTeams),
        channels,
        setChannels: setLiteralParams(setChannels),
        regions,
        setRegions: setLiteralParams(setRegions),
    }
}
