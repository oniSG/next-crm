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

type GraphCardBaseProps = {
    title: string
    description?: string
    action?: ReactNode
    className?: string
}

export type GraphCardPlainProps = GraphCardBaseProps & {
    children: ReactNode
    tabs?: never
    queryKey?: never
    defaultValue?: never
}

export type GraphCardTabbedProps = GraphCardBaseProps & {
    tabs: GraphCardTab[]
    queryKey: string
    defaultValue?: string
    children?: never
}

export type GraphCardProps = GraphCardPlainProps | GraphCardTabbedProps

function GraphCardHeader({
    title,
    description,
    action,
}: {
    title: string
    description?: string
    action?: ReactNode
}) {
    return (
        <CardHeader className="pb-2">
            <CardTitle className="truncate text-sm font-medium">
                {title}
            </CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
            {action && <CardAction>{action}</CardAction>}
        </CardHeader>
    )
}

function GraphCardPlain({
    title,
    description,
    action,
    children,
    className,
}: GraphCardPlainProps) {
    return (
        <Card className={cn('flex flex-1 flex-col gap-0', className)}>
            <GraphCardHeader
                title={title}
                description={description}
                action={action}
            />
            <CardContent className="flex min-h-0 flex-1 flex-col">
                {children}
            </CardContent>
        </Card>
    )
}

function GraphCardTabbed({
    title,
    description,
    action,
    tabs,
    queryKey,
    defaultValue,
    className,
}: GraphCardTabbedProps) {
    const fallbackValue = defaultValue ?? tabs[0]?.value ?? ''
    const [value, setValue] = useQueryState(
        queryKey,
        parseAsString
            .withDefault(fallbackValue)
            .withOptions({ clearOnDefault: true }),
    )

    const headerAction = (
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
    )

    return (
        <Tabs
            value={value}
            onValueChange={(next) => {
                if (next) void setValue(next)
            }}
            className={cn('w-full gap-0', className)}
        >
            <Card className="flex w-full flex-1 flex-col gap-0">
                <GraphCardHeader
                    title={title}
                    description={description}
                    action={headerAction}
                />
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

export function GraphCard(props: GraphCardProps) {
    if (props.tabs) {
        return <GraphCardTabbed {...props} />
    }
    return <GraphCardPlain {...props} />
}
