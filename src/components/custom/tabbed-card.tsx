'use client'

import { type ReactNode } from 'react'
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

export type Tab = {
    name: string
    value: string
    content: ReactNode
    icon?: ReactNode
}

export type TabbedCardProps = {
    title: string
    description?: string
    tabs: Tab[]
    /** URL search param key for the active tab (nuqs). */
    queryKey: string
    defaultValue?: string
    className?: string
}

export function TabbedCard({
    title,
    description,
    tabs,
    queryKey,
    defaultValue,
    className,
}: TabbedCardProps) {
    const fallbackValue = defaultValue ?? tabs[0]?.value ?? ''
    const [value, setValue] = useQueryState(
        queryKey,
        parseAsString
            .withDefault(fallbackValue)
            .withOptions({ clearOnDefault: true }),
    )

    return (
        <Tabs
            value={value}
            onValueChange={(next) => {
                if (next) void setValue(next)
            }}
            className={cn('w-full gap-0', className)}
        >
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    {description && (
                        <CardDescription>{description}</CardDescription>
                    )}
                    <CardAction>
                        <TabsList>
                            {tabs.map((tab) => (
                                <TabsTrigger key={tab.value} value={tab.value}>
                                    {tab.icon}
                                    {tab.name}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </CardAction>
                </CardHeader>
                <CardContent>
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
