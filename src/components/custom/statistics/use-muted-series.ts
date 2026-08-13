'use client'

import { useCallback, useMemo } from 'react'
import { parseAsArrayOf, parseAsString, useQueryState } from 'nuqs'

const mutedSeriesParser = parseAsArrayOf(parseAsString)
    .withDefault([])
    .withOptions({ clearOnDefault: true })

// Hooks must be called unconditionally, so charts without a legend query key
// still call useQueryState — just against a placeholder param that never gets
// written to the URL.
const DISABLED_QUERY_KEY = '__chart-muted-unused'

export type MutedSeriesState = {
    /** All series in legend order: active first, muted at the end. */
    orderedSeries: string[]
    /** Series that should be rendered in the chart (not muted). */
    visibleSeries: string[]
    /** Muted keys from the URL, restricted to known series. */
    mutedKeys: string[]
    /** Toggles muting of a series; undefined when no query key is set. */
    toggleSeries?: (key: string) => void
}

/**
 * Persists a per-chart set of muted (hidden) series in the URL under
 * `queryKey`. When `queryKey` is undefined, the hook is inert and returns
 * all series as visible.
 */
export function useMutedSeries(
    queryKey: string | undefined,
    series: string[],
): MutedSeriesState {
    const [mutedParam, setMutedParam] = useQueryState(
        queryKey ?? DISABLED_QUERY_KEY,
        mutedSeriesParser,
    )

    const { orderedSeries, visibleSeries, mutedKeys } = useMemo(() => {
        if (!queryKey) {
            return {
                orderedSeries: series,
                visibleSeries: series,
                mutedKeys: [] as string[],
            }
        }

        const seriesSet = new Set(series)
        let mutedKeys = mutedParam.filter((key) => seriesSet.has(key))

        // Always keep at least one series visible so the legend stays interactive.
        if (series.length > 0 && mutedKeys.length >= series.length) {
            const keepVisible = series[0]
            mutedKeys = mutedKeys.filter((key) => key !== keepVisible)
        }

        const mutedSet = new Set(mutedKeys)
        const visibleSeries = series.filter((key) => !mutedSet.has(key))

        return {
            orderedSeries: [
                ...visibleSeries,
                ...series.filter((key) => mutedSet.has(key)),
            ],
            visibleSeries,
            mutedKeys,
        }
    }, [mutedParam, queryKey, series])

    const toggleSeries = useCallback(
        (key: string) => {
            if (!series.includes(key)) return
            void setMutedParam((current) => {
                if (current.includes(key)) {
                    return current.filter((item) => item !== key)
                }
                const nextMuted = [...current, key]
                const mutedSet = new Set(nextMuted)
                const remaining = series.filter((item) => !mutedSet.has(item))
                // Don't mute the last visible series.
                if (remaining.length === 0) return current
                return nextMuted
            })
        },
        [series, setMutedParam],
    )

    return {
        orderedSeries,
        visibleSeries,
        mutedKeys,
        toggleSeries: queryKey ? toggleSeries : undefined,
    }
}
