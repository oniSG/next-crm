import fanActionsJson from '@/app/(sidebar)/fan-action/[id]/data/fan-actions.json'
import type { FanAction } from '@/app/(sidebar)/fan-action/[id]/data'

/**
 * In-memory stub store shared across RSC + Route Handlers.
 * Must live on `globalThis` — Next/Turbopack otherwise create separate module copies.
 */
const globalForFanActions = globalThis as typeof globalThis & {
    __fanActionsStore?: FanAction[]
}

function getStore(): FanAction[] {
    if (!globalForFanActions.__fanActionsStore) {
        globalForFanActions.__fanActionsStore = structuredClone(
            fanActionsJson as FanAction[],
        )
    }
    return globalForFanActions.__fanActionsStore
}

export function listFanActions(): FanAction[] {
    return getStore()
}

export function getStoredFanAction(
    id: number | string,
): FanAction | undefined {
    const numericId = typeof id === 'string' ? Number(id) : id
    if (Number.isNaN(numericId)) return undefined
    return getStore().find((action) => action.id === numericId)
}

export function upsertStoredFanAction(action: FanAction): FanAction {
    const store = getStore()
    const next = structuredClone(action)
    const index = store.findIndex((item) => item.id === next.id)
    if (index >= 0) {
        store[index] = next
    } else {
        store.push(next)
    }
    return structuredClone(next)
}

/** Reset to seed JSON (handy for tests / manual reset). */
export function resetFanActionsStore() {
    globalForFanActions.__fanActionsStore = structuredClone(
        fanActionsJson as FanAction[],
    )
}
