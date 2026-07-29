import { Badge } from '@/components/ui/badge'

export function PersonCell({ value }: { value: string | null | undefined }) {
    if (!value) {
        return <span className="text-muted-foreground">—</span>
    }
    return (
        <Badge variant="secondary" className="font-normal">
            <span className="text-muted-foreground">@</span>
            {value}
        </Badge>
    )
}
