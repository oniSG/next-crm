'use client'

import { Children, type ReactNode } from 'react'

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
    icon?: ReactNode
}

export type TabbedCardProps = {
    title: string
    description?: string
    tabs: TabbedCardTab[]
    children: ReactNode
    defaultIndex?: number
    className?: string
}

export function TabbedCard({
    title,
    description,
    tabs,
    children,
    defaultIndex = 0,
    className,
}: TabbedCardProps) {
    const panels = Children.toArray(children)
    const defaultValue = `tab-${defaultIndex}`

    return (
        <Tabs defaultValue={defaultValue} className={cn('w-full gap-0', className)}>
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    {description && (
                        <CardDescription>{description}</CardDescription>
                    )}
                    <CardAction>
                        <TabsList>
                            {tabs.map((tab, index) => (
                                <TabsTrigger key={tab.name} value={`tab-${index}`}>
                                    {tab.icon}
                                    {tab.name}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    {panels.map((panel, index) => (
                        <TabsContent key={tabs[index]?.name ?? index} value={`tab-${index}`}>
                            {panel}
                        </TabsContent>
                    ))}
                </CardContent>
            </Card>
        </Tabs>
    )
}
