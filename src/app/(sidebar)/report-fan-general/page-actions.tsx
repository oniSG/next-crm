'use client'

import { ExportButton } from '@/components/custom/statistics/export-button'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

import { PERIOD_OPTIONS, type Period } from './data'
import { usePeriod } from './report-utils'

const periodItems = PERIOD_OPTIONS.map((option) => ({
    label: option.label,
    value: option.value,
}))

export function PageActions() {
    const { period, setPeriod } = usePeriod()

    return (
        <>
            <Select
                items={periodItems}
                value={period}
                onValueChange={(value) => {
                    if (value) setPeriod(value as Period)
                }}
            >
                <SelectTrigger className="w-36">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent alignItemWithTrigger={false} align="end">
                    <SelectGroup>
                        {PERIOD_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
            <ExportButton
                dashboard="report-fan-general"
                filename="report-fan-general.pdf"
            />
        </>
    )
}
