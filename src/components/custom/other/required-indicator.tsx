import { cn } from '@/lib/utils'

export function RequiredIndicator({ className }: { className?: string }) {
    return (
        <span aria-hidden="true" className={cn('text-destructive', className)}>
            *
        </span>
    )
}
