'use client'

import { useId, useState } from 'react'
import { parseAsIsoDate, parseAsStringLiteral, useQueryState } from 'nuqs'

import { DateRangeFilter } from '@/components/custom/filters/date-range-filter'
import { Filters } from '@/components/custom/filters/filters'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

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

type FilterSelectProps = {
    label: string
    options: readonly { label: string; value: string }[]
    value: string
    onChange: (value: string) => void
    className?: string
}

function FilterSelect({
    label,
    options,
    value,
    onChange,
    className,
}: FilterSelectProps) {
    const id = useId()

    return (
        <div className="flex flex-col gap-1">
            <Label htmlFor={id}>{label}</Label>
            <Select
                items={[...options]}
                value={value}
                onValueChange={(next) => {
                    if (next) onChange(next)
                }}
            >
                <SelectTrigger
                    id={id}
                    className={className ?? 'w-44 min-w-0 overflow-hidden'}
                >
                    <SelectValue placeholder={label} />
                </SelectTrigger>
                <SelectContent alignItemWithTrigger={false} align="start">
                    <SelectGroup>
                        {options.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}

export function SalesReportFilters() {
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

    return (
        <Filters
            filters={[
                <div key="date-range" className="flex flex-col gap-1">
                    <Label>Datum</Label>
                    <DateRangeFilter
                        value={{ from, to }}
                        onChange={(range) => {
                            void setFrom(range.from)
                            void setTo(range.to)
                        }}
                        today={today}
                    />
                </div>,
                <FilterSelect
                    key="period"
                    label="Období"
                    options={PERIOD_OPTIONS}
                    value={period}
                    onChange={(value) => {
                        if (periodValues.includes(value as Period)) {
                            void setPeriod(value as Period)
                        }
                    }}
                    className="w-28 min-w-0 overflow-hidden"
                />,
                <FilterSelect
                    key="team"
                    label="Tým"
                    options={TEAM_OPTIONS}
                    value={team}
                    onChange={(value) => void setTeam(value as typeof team)}
                    className="w-48 min-w-0 overflow-hidden"
                />,
                <FilterSelect
                    key="category"
                    label="Kategorie slev"
                    options={DISCOUNT_CATEGORY_OPTIONS}
                    value={category}
                    onChange={(value) =>
                        void setCategory(value as typeof category)
                    }
                    className="w-40 min-w-0 overflow-hidden"
                />,
            ]}
        />
    )
}
