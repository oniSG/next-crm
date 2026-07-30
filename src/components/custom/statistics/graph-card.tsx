import type { ReactNode } from 'react'

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'

export type GraphCardProps = {
    title: string
    description?: string
    children: ReactNode
    className?: string
}

export function GraphCard({
    title,
    description,
    children,
    className,
}: GraphCardProps) {
    return (
        <Card className={cn('flex flex-1 flex-col gap-0', className)}>
            <CardHeader className="pb-2">
                <CardTitle className="truncate text-sm font-medium">
                    {title}
                </CardTitle>
                {description && (
                    <CardDescription>{description}</CardDescription>
                )}
            </CardHeader>
            <CardContent className="flex min-h-0 flex-1 flex-col">
                {children}
            </CardContent>
        </Card>
    )
}
