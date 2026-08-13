'use client'

import { parseAsStringLiteral, useQueryState } from 'nuqs'

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
