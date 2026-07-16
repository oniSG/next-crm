const formatter = new Intl.DateTimeFormat('cs-CZ', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
})

export function DateCell({ value }: { value: string | Date | null | undefined }) {
    if (!value) {
        return <span className="text-muted-foreground">—</span>
    }
    const date = value instanceof Date ? value : new Date(value)
    if (Number.isNaN(date.getTime())) {
        return <span className="text-muted-foreground">—</span>
    }
    return (
        <span className="tabular-nums whitespace-nowrap">
            {formatter.format(date)}
        </span>
    )
}
