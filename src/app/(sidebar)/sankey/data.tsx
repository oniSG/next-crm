export const SANKEY_DATA = {
    nodes: [
        { name: 'Odesláno', fill: 'var(--chart-1)' },
        { name: 'Doručeno', fill: 'var(--chart-1)' },
        { name: 'Nedoručeno', fill: 'var(--chart-7)' },
        { name: 'Otevřeno', fill: 'var(--chart-2)' },
        { name: 'Neotevřeno', fill: 'var(--chart-7)' },
        { name: 'Kliknuto', fill: 'var(--chart-3)' },
        { name: 'Bez kliknutí', fill: 'var(--chart-7)' },
        { name: 'Konverze', fill: 'var(--chart-4)' },
    ],
    links: [
        // Odesláno →
        { source: 0, target: 1, value: 8200 },
        { source: 0, target: 2, value: 1800 },
        // Doručeno →
        { source: 1, target: 3, value: 5100 },
        { source: 1, target: 4, value: 3100 },
        // Otevřeno →
        { source: 3, target: 5, value: 1900 },
        { source: 3, target: 6, value: 3200 },
        // Kliknuto →
        { source: 5, target: 7, value: 640 },
    ],
}
