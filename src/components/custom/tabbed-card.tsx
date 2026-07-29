'use client'

import { Children, type ReactNode } from 'react'
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

export type TabbedCardTab = {
    name: string
    value: string
    icon?: ReactNode
}

export type TabbedCardProps = {
    title: string
    description?: string
    tabs: TabbedCardTab[]
    children: ReactNode
    /** URL search param key for the active tab (nuqs). */
    queryKey: string
    defaultValue?: string
    className?: string
}

export function TabbedCard({
    title,
    description,
    tabs,
    children,
    queryKey,
    defaultValue,
    className,
}: TabbedCardProps) {
    const fallbackValue = defaultValue ?? tabs[0]?.value ?? ''
    const [value, setValue] = useQueryState(
        queryKey,
        parseAsString.withDefault(fallbackValue).withOptions({ clearOnDefault: true }),
    )

    const panels = Children.toArray(children)

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
                    {description && <CardDescription>{description}</CardDescription>}
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
                    {panels.map((panel, index) => {
                        const tab = tabs[index]
                        if (!tab) return null
                        return (
                            <TabsContent key={tab.value} value={tab.value}>
                                {panel}
                            </TabsContent>
                        )
                    })}
                </CardContent>
            </Card>
        </Tabs>
    )
}
