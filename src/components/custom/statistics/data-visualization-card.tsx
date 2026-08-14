'use client'

import type { ReactNode } from 'react'
import { parseAsString, useQueryState } from 'nuqs'

import { DateRangeFilter } from '@/components/custom/filters/date-range-filter'
import type { DateRange } from '@/components/custom/filters/date-presets'
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

import { TableExportButton } from './table-export-button'
import type { TableExportable } from './table-export'

export type GraphCardTab = {
    name: string
    value: string
    content: ReactNode
    icon?: ReactNode
}

export type GraphCardDateRange = {
    value: DateRange
    onChange: (value: DateRange) => void
    today?: Date
}

export type GraphCardProps = {
    title: string
    description?: string
    action?: ReactNode
    dateRange?: GraphCardDateRange
    queryKey: string
    className?: string
    children?: ReactNode
    footer?: ReactNode
    tabs?: GraphCardTab[]
    tableExportable?: TableExportable
}

export function DataVisulaizationCard({
    title,
    description,
    action,
    dateRange,
    queryKey,
    className,
    children,
    footer,
    tabs,
    tableExportable,
}: GraphCardProps) {
    const fallbackValue = tabs?.[0]?.value ?? ''
    const [value, setValue] = useQueryState(
        queryKey,
        parseAsString.withDefault(fallbackValue).withOptions({ clearOnDefault: true }),
    )

    if (tabs) {
        return (
            <Tabs
                value={value}
                onValueChange={(next) => {
                    if (next) void setValue(next)
                }}
                className={cn('w-full gap-0', className)}
            >
                <Card className="flex w-full flex-1 flex-col gap-0 pb-3">
                    <CardHeader className="pb-2">
                        <CardTitle className="truncate text-sm font-medium">
                            {title}
                        </CardTitle>
                        {description && <CardDescription>{description}</CardDescription>}
                        <CardAction>
                            <div className="flex flex-wrap items-center justify-end gap-2">
                                {action}
                                {dateRange && (
                                    <DateRangeFilter
                                        value={dateRange.value}
                                        onChange={dateRange.onChange}
                                        today={dateRange.today}
                                        className="h-8"
                                    />
                                )}
                                <TabsList>
                                    {tabs.map((tab) => (
                                        <TabsTrigger key={tab.value} value={tab.value}>
                                            {tab.icon}
                                            {tab.name}
                                        </TabsTrigger>
                                    ))}
                                </TabsList>
                                {tableExportable && (
                                    <TableExportButton exportable={tableExportable} />
                                )}
                            </div>
                        </CardAction>
                    </CardHeader>
                    <CardContent className="flex min-h-0 flex-1 flex-col pb-0">
                        {tabs.map((tab) => (
                            <TabsContent key={tab.value} value={tab.value}>
                                {tab.content}
                            </TabsContent>
                        ))}
                    </CardContent>
                    {footer && <CardFooter>{footer}</CardFooter>}
                </Card>
            </Tabs>
        )
    }

    return (
        <Card className={cn('flex flex-1 flex-col gap-0 pb-3', className)}>
            <CardHeader className="pb-2">
                <CardTitle className="truncate text-sm font-medium">{title}</CardTitle>
                {description && <CardDescription>{description}</CardDescription>}
                {(dateRange || action || tableExportable) && (
                    <CardAction>
                        <div className="flex flex-wrap items-center justify-end gap-2">
                            {dateRange && (
                                <DateRangeFilter
                                    value={dateRange.value}
                                    onChange={dateRange.onChange}
                                    today={dateRange.today}
                                    className="h-8"
                                />
                            )}
                            {action}
                            {tableExportable && (
                                <TableExportButton exportable={tableExportable} />
                            )}
                        </div>
                    </CardAction>
                )}
            </CardHeader>
            <CardContent className="flex min-h-0 flex-1 flex-col pb-0">
                {children}
            </CardContent>
            {footer && <CardFooter>{footer}</CardFooter>}
        </Card>
    )
}
