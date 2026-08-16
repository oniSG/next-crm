'use client'

import { SlidersHorizontal } from 'lucide-react'

import { ExportButton } from '@/components/custom/statistics/export-button'
import { DateRangeFilter } from '@/components/custom/filters/date-range-filter'
import { FiltersPopover } from '@/components/custom/filters/filters-popover'
import { MultiSelectFilter } from '@/components/custom/filters/multi-select-filter'
import { SelectFilter } from '@/components/custom/filters/select-filter'

import {
    CHANNEL_OPTIONS,
    REGION_OPTIONS,
    SEGMENT_OPTIONS,
    TEAM_OPTIONS,
} from './data'
import { useExampleFilters } from './use-example-filters'

export function PageActions() {
    const {
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
    } = useExampleFilters()

    const activeCount = [
        segment !== 'all',
        teams.length > 0,
        channels.length > 0,
        regions.length > 0,
    ].filter(Boolean).length

    return (
        <>
            <DateRangeFilter
                value={dateRange}
                onChange={setDateRange}
                today={today}
            />
            <FiltersPopover
                activeCount={activeCount}
                label="Filtry"
                icon={SlidersHorizontal}
            >
                <SelectFilter
                    options={SEGMENT_OPTIONS}
                    value={segment}
                    onChange={setSegment}
                    label="Segment (koláč)"
                    className="w-full"
                />
                <MultiSelectFilter
                    label="Tým (heatmapa)"
                    options={TEAM_OPTIONS}
                    value={teams}
                    onChange={setTeams}
                    placeholder="Vše"
                    className="w-full"
                />
                <MultiSelectFilter
                    label="Kanál (sessions + kampaně)"
                    options={CHANNEL_OPTIONS}
                    value={channels}
                    onChange={setChannels}
                    placeholder="Vše"
                    className="w-full"
                />
                <MultiSelectFilter
                    label="Region (kampaně)"
                    options={REGION_OPTIONS}
                    value={regions}
                    onChange={setRegions}
                    placeholder="Vše"
                    className="w-full"
                />
            </FiltersPopover>
            <ExportButton dashboard="example" filename="example-dashboard.pdf" />
        </>
    )
}
