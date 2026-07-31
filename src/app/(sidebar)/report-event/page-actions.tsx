'use client'

import { format } from 'date-fns'
import { parseAsString, useQueryState } from 'nuqs'

import { ExportButton } from '@/components/custom/statistics/export-button'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

import { REPORT_EVENT_OPTIONS } from './data'

export function PageActions() {
    const [eventId, setEventId] = useQueryState(
        'event',
        parseAsString
            .withDefault(REPORT_EVENT_OPTIONS[0].id)
            .withOptions({ clearOnDefault: true }),
    )
    const items = REPORT_EVENT_OPTIONS.map((event) => ({
        value: event.id,
        label: event.name,
    }))

    return (
        <>
            <Select
                items={items}
                value={eventId}
                onValueChange={(value) => void setEventId(value)}
            >
                <SelectTrigger className="w-72">
                    <SelectValue placeholder="Select event" />
                </SelectTrigger>
                <SelectContent alignItemWithTrigger={false} align="end">
                    <SelectGroup>
                        {REPORT_EVENT_OPTIONS.map((event) => (
                            <SelectItem key={event.id} value={event.id}>
                                <span>{event.name}</span>
                                <span className="text-muted-foreground text-xs">
                                    {format(
                                        new Date(`${event.date}T00:00:00`),
                                        'd MMM yyyy',
                                    )}
                                    {' · '}
                                    {event.id}
                                </span>
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
            <ExportButton dashboard="report-event" filename="report-event.pdf" />
        </>
    )
}
