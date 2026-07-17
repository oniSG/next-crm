import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export type TagColor =
    | 'orange'
    | 'gray'
    | 'red'
    | 'green'
    | 'blue'
    | 'purple'
    | 'yellow'
    | 'pink'

export type Tag = {
    id: string
    label: string
    color: TagColor
}

const colorClass: Record<TagColor, string> = {
    orange: 'bg-orange-100 text-orange-800 dark:bg-orange-500/15 dark:text-orange-300',
    gray: 'bg-neutral-100 text-neutral-700 dark:bg-neutral-500/15 dark:text-neutral-300',
    red: 'bg-red-100 text-red-800 dark:bg-red-500/15 dark:text-red-300',
    green: 'bg-green-100 text-green-800 dark:bg-green-500/15 dark:text-green-300',
    blue: 'bg-blue-100 text-blue-800 dark:bg-blue-500/15 dark:text-blue-300',
    purple: 'bg-purple-100 text-purple-800 dark:bg-purple-500/15 dark:text-purple-300',
    yellow: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-500/15 dark:text-yellow-300',
    pink: 'bg-pink-100 text-pink-800 dark:bg-pink-500/15 dark:text-pink-300',
}

export function TagCell({ value }: { value: Tag[] | null | undefined }) {
    if (!value || value.length === 0) {
        return <span className="text-muted-foreground">—</span>
    }
    return (
        <div className="flex flex-wrap gap-1">
            {value.map((tag) => (
                <Badge key={tag.id} className={cn('border-transparent', colorClass[tag.color])}>
                    {tag.label}
                </Badge>
            ))}
        </div>
    )
}
