import { numericFormatter } from 'react-number-format'

/** Compact axis labels: 7,2M / 500,0k (same as LineChart). */
export function formatCompactNumber(value: number): string {
    const abs = Math.abs(value)

    if (abs >= 1_000_000) {
        return `${numericFormatter(String(value / 1_000_000), {
            decimalScale: 1,
            decimalSeparator: ',',
        })}M`
    }

    if (abs >= 1_000) {
        return `${numericFormatter(String(value / 1_000), {
            decimalScale: 1,
            decimalSeparator: ',',
        })}k`
    }

    return numericFormatter(String(value), {
        thousandSeparator: ' ',
        decimalScale: 0,
    })
}
