export function TextCell({ value }: { value: string | null | undefined }) {
    if (value == null || value === '') {
        return <span className="text-muted-foreground">—</span>
    }
    return <span className="truncate">{value}</span>
}
