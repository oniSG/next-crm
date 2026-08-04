'use client'

import * as React from 'react'

import { useFanActionEditor } from '../../context'
import type { SyncNodeConfig } from '../../shared/types'

export function useNodeConfigSave({
    nodeId,
    syncNodeConfig,
    getPayload,
    validate,
}: {
    nodeId: string
    syncNodeConfig: SyncNodeConfig
    getPayload: () => Record<string, unknown>
    validate?: () => Record<string, string> | null
}) {
    const { registerSaveHandler, unregisterSaveHandler } = useFanActionEditor()
    const [errors, setErrors] = React.useState<Record<string, string>>({})
    const getPayloadRef = React.useRef(getPayload)
    const validateRef = React.useRef(validate)
    getPayloadRef.current = getPayload
    validateRef.current = validate

    React.useEffect(() => {
        registerSaveHandler('nodeConfig', async () => {
            const payload = getPayloadRef.current()
            const nextErrors = validateRef.current?.() ?? null
            if (nextErrors && Object.keys(nextErrors).length > 0) {
                setErrors(nextErrors)
                return false
            }
            setErrors({})
            syncNodeConfig(nodeId, payload)
            return true
        })

        return () => {
            unregisterSaveHandler('nodeConfig')
        }
    }, [
        nodeId,
        syncNodeConfig,
        registerSaveHandler,
        unregisterSaveHandler,
    ])

    React.useEffect(() => {
        return () => {
            syncNodeConfig(nodeId, getPayloadRef.current())
        }
    }, [nodeId, syncNodeConfig])

    return { errors, setErrors }
}

export function stringConfig(
    config: Record<string, unknown> | undefined,
    key: string,
    fallback = '',
): string {
    const value = config?.[key]
    return typeof value === 'string' ? value : fallback
}

export function boolConfig(
    config: Record<string, unknown> | undefined,
    key: string,
    fallback = false,
): boolean {
    const value = config?.[key]
    return typeof value === 'boolean' ? value : fallback
}
