import { MoreHorizontalIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
    Card,
    CardAction,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'

export type ValueCardProps = {
    title: string
    value: string
    action?: React.ReactNode
    className?: string
}

export function ValueCard({ title, value, action, className }: ValueCardProps) {
    return (
        <Card className={cn('gap-0', className)}>
            <CardHeader className="pb-2">
                <CardTitle className="truncate text-sm font-medium">
                    {title}
                </CardTitle>
                <CardAction>
                    {action ?? (
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon-sm"
                            className="text-muted-foreground"
                            aria-label="Další možnosti"
                        >
                            <MoreHorizontalIcon />
                        </Button>
                    )}
                </CardAction>
            </CardHeader>
            <CardContent className="flex flex-1 items-center justify-center py-8">
                <p className="text-3xl font-semibold tracking-tight">{value}</p>
            </CardContent>
        </Card>
    )
}
