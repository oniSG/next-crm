import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'

export type DetailCardRow = {
    label: string
    value: string
}

export type DetailCardProps = {
    title: string
    rows: DetailCardRow[]
    className?: string
}

export function DetailCard({ title, rows, className }: DetailCardProps) {
    return (
        <Card className={cn('gap-0', className)}>
            <CardHeader className="pb-2">
                <CardTitle className="truncate text-sm font-medium">
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col justify-center gap-4 py-6">
                {rows.map((row) => (
                    <div
                        key={row.label}
                        className="flex items-start justify-between gap-4"
                    >
                        <span className="text-muted-foreground max-w-[50%] text-sm leading-snug">
                            {row.label}
                        </span>
                        <span className="text-right text-sm font-semibold">
                            {row.value}
                        </span>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}
