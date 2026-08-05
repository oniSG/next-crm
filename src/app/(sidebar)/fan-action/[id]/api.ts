import type { FanAction } from './data'

/** Persist fan-action via temp mock API (in-memory server store). */
export async function saveFanAction(action: FanAction): Promise<FanAction> {
    const response = await fetch(`/api/mock/fan-actions/${action.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(action),
    })

    if (!response.ok) {
        throw new Error(`Failed to save fan-action (${response.status})`)
    }

    return (await response.json()) as FanAction
}
