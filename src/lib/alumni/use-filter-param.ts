'use client'

import { parseAsArrayOf, parseAsStringLiteral, useQueryState } from 'nuqs'

/** URL query param constrained to a fixed set of string values. */
export function useFilterParam(
    key: string,
    values: readonly string[],
    defaultValue: string,
) {
    return useQueryState(
        key,
        parseAsStringLiteral([...values]).withDefault(defaultValue),
    )
}

/** URL query param as a multi-value list constrained to known values. */
export function useMultiFilterParam(
    key: string,
    values: readonly string[],
    defaultValue: string[] = [],
) {
    return useQueryState(
        key,
        parseAsArrayOf(parseAsStringLiteral([...values]))
            .withDefault(defaultValue)
            .withOptions({ clearOnDefault: true }),
    )
}
