import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'

export type ValueCardProps = {
    title: string
    value: string
    className?: string
}

export function ValueCard({ title, value, className }: ValueCardProps) {
    return (
        <Card className={cn('gap-0', className)}>
            <CardHeader className="pb-2">
                <CardTitle className="truncate text-sm font-medium">
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-1 items-center justify-center py-8">
                <p className="text-3xl font-semibold tracking-tight">{value}</p>
            </CardContent>
        </Card>
    )
}
