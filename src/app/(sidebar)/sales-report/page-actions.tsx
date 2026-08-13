'use client'

import { useState } from 'react'
import { parseAsIsoDate, parseAsStringLiteral, useQueryState } from 'nuqs'

import { DateRangeFilter } from '@/components/custom/filters/date-range-filter'
import { FiltersPopover } from '@/components/custom/filters/filters-popover'
import { SelectFilter } from '@/components/custom/filters/select-filter'
import { ExportButton } from '@/components/custom/statistics/export-button'
import { Label } from '@/components/ui/label'

import {
    DISCOUNT_CATEGORY_OPTIONS,
    PERIOD_OPTIONS,
    TEAM_OPTIONS,
    type Period,
} from './data'

const defaultFrom = new Date(2026, 0, 1)
const defaultTo = new Date(2026, 7, 13)
const periodValues = PERIOD_OPTIONS.map((option) => option.value)
const teamValues = TEAM_OPTIONS.map((option) => option.value)
const categoryValues = DISCOUNT_CATEGORY_OPTIONS.map((option) => option.value)

export function PageActions() {
    const [today] = useState(() => new Date())
    const [from, setFrom] = useQueryState(
        'from',
        parseAsIsoDate.withDefault(defaultFrom),
    )
    const [to, setTo] = useQueryState('to', parseAsIsoDate.withDefault(defaultTo))
    const [period, setPeriod] = useQueryState(
        'period',
        parseAsStringLiteral(periodValues).withDefault('month'),
    )
    const [team, setTeam] = useQueryState(
        'team',
        parseAsStringLiteral(teamValues).withDefault('energie-long'),
    )
    const [category, setCategory] = useQueryState(
        'category',
        parseAsStringLiteral(categoryValues).withDefault('zdarma'),
    )

    const activeCount = [
        from.getTime() !== defaultFrom.getTime(),
        to.getTime() !== defaultTo.getTime(),
        period !== 'month',
        team !== 'energie-long',
        category !== 'zdarma',
    ].filter(Boolean).length

    return (
        <>
            <FiltersPopover activeCount={activeCount}>
                <div className="flex flex-col gap-1">
                    <Label>Datum</Label>
                    <DateRangeFilter
                        value={{ from, to }}
                        onChange={(range) => {
                            void setFrom(range.from)
                            void setTo(range.to)
                        }}
                        today={today}
                    />
                </div>
                <SelectFilter
                    label="Období"
                    options={PERIOD_OPTIONS}
                    value={period}
                    onChange={(value) => {
                        if (periodValues.includes(value as Period)) {
                            void setPeriod(value as Period)
                        }
                    }}
                />
                <SelectFilter
                    label="Tým"
                    options={TEAM_OPTIONS}
                    value={team}
                    onChange={(value) => void setTeam(value as typeof team)}
                />
                <SelectFilter
                    label="Kategorie slev"
                    options={DISCOUNT_CATEGORY_OPTIONS}
                    value={category}
                    onChange={(value) =>
                        void setCategory(value as typeof category)
                    }
                />
            </FiltersPopover>
            <ExportButton dashboard="sales-report" filename="sales-report.pdf" />
        </>
    )
}
