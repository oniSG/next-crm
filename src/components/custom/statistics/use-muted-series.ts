'use client'

import { useCallback, useMemo } from 'react'
import { parseAsArrayOf, parseAsString, useQueryState } from 'nuqs'

export function useMutedSeries(
    queryKey: string | undefined,
    series: string[],
) {
    const [mutedParam, setMutedParam] = useQueryState(
        queryKey ?? '__chart-muted-unused',
        parseAsArrayOf(parseAsString)
            .withDefault([])
            .withOptions({ clearOnDefault: true }),
    )

    const mutedKeys = useMemo(() => {
        if (!queryKey) return [] as string[]
        const seriesSet = new Set(series)
        return mutedParam.filter((key) => seriesSet.has(key))
    }, [mutedParam, queryKey, series])

    const mutedSet = useMemo(() => new Set(mutedKeys), [mutedKeys])

    const visibleSeries = useMemo(
        () => series.filter((key) => !mutedSet.has(key)),
        [mutedSet, series],
    )

    const orderedSeries = useMemo(() => {
        const active = series.filter((key) => !mutedSet.has(key))
        const muted = series.filter((key) => mutedSet.has(key))
        return [...active, ...muted]
    }, [mutedSet, series])

    const toggleSeries = useCallback(
        (key: string) => {
            if (!queryKey || !series.includes(key)) return
            void setMutedParam((current) => {
                const next = current.includes(key)
                    ? current.filter((item) => item !== key)
                    : [...current, key]
                return next
            })
        },
        [queryKey, series, setMutedParam],
    )

    return {
        orderedSeries,
        visibleSeries,
        mutedKeys,
        toggleSeries: queryKey ? toggleSeries : undefined,
    }
}
