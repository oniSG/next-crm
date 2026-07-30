'use client'

import type { ReactNode } from 'react'
import { parseAsString, useQueryState } from 'nuqs'

import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

export type GraphCardTab = {
    name: string
    value: string
    content: ReactNode
    icon?: ReactNode
}

export type GraphCardProps = {
    title: string
    description?: string
    action?: ReactNode
    queryKey: string
    className?: string
    children?: ReactNode
    tabs?: GraphCardTab[]
}

export function DataVisulaizationCard({
    title,
    description,
    action,
    queryKey,
    className,
    children,
    tabs,
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
                <Card className="flex w-full flex-1 flex-col gap-0">
                    <CardHeader className="pb-2">
                        <CardTitle className="truncate text-sm font-medium">
                            {title}
                        </CardTitle>
                        {description && <CardDescription>{description}</CardDescription>}
                        <CardAction>
                            <div className="flex items-center gap-2">
                                <TabsList>
                                    {tabs.map((tab) => (
                                        <TabsTrigger key={tab.value} value={tab.value}>
                                            {tab.icon}
                                            {tab.name}
                                        </TabsTrigger>
                                    ))}
                                </TabsList>
                                {action}
                            </div>
                        </CardAction>
                    </CardHeader>
                    <CardContent className="flex min-h-0 flex-1 flex-col">
                        {tabs.map((tab) => (
                            <TabsContent key={tab.value} value={tab.value}>
                                {tab.content}
                            </TabsContent>
                        ))}
                    </CardContent>
                </Card>
            </Tabs>
        )
    }

    return (
        <Card className={cn('flex flex-1 flex-col gap-0', className)}>
            <CardHeader className="pb-2">
                <CardTitle className="truncate text-sm font-medium">{title}</CardTitle>
                {description && <CardDescription>{description}</CardDescription>}
                {action && <CardAction>{action}</CardAction>}
            </CardHeader>
            <CardContent className="flex min-h-0 flex-1 flex-col">{children}</CardContent>
        </Card>
    )
}
