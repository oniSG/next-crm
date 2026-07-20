import type { NextRequest } from 'next/server'

import { templates } from './data'

const MOCK_LATENCY_MS = 1000

type SortDir = 'asc' | 'desc'

function compareValues(a: unknown, b: unknown): number {
    if (a === b) return 0
    if (a == null) return 1
    if (b == null) return -1
    if (typeof a === 'number' && typeof b === 'number') return a - b
    if (typeof a === 'boolean' && typeof b === 'boolean') {
        return a === b ? 0 : a ? 1 : -1
    }
    return String(a).localeCompare(String(b), 'cs', { numeric: true })
}

export async function GET(request: NextRequest) {
    const { searchParams } = request.nextUrl
    const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10) || 1)
    const limit = Math.max(1, parseInt(searchParams.get('limit') ?? '30', 10) || 30)
    const endless = searchParams.get('endless') === 'true'
    const sort = searchParams.get('sort')
    const dir = searchParams.get('dir') as SortDir | null

    await new Promise((resolve) => setTimeout(resolve, MOCK_LATENCY_MS))

    const sorted = sort
        ? [...templates].sort((a, b) => {
              const cmp = compareValues(
                  (a as Record<string, unknown>)[sort],
                  (b as Record<string, unknown>)[sort],
              )
              return dir === 'desc' ? -cmp : cmp
          })
        : templates

    const total = sorted.length
    const rows = endless ? sorted : sorted.slice((page - 1) * limit, page * limit)

    return Response.json(
        { rows, total },
        { headers: { 'Cache-Control': 'no-store' } },
    )
}
