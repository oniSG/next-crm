'use client'

import * as React from 'react'
import {
    ReactFlowProvider,
    type Edge,
    type Node,
    type ReactFlowInstance,
} from '@xyflow/react'

import type { FanAction, FanActionWorkflowNodeData } from './data'

/** Save handler slots registered by palette forms, node config, and (later) workflow. */
export type SaveKey = 'basicInfo' | 'settings' | 'nodeConfig' | 'workflow'

/** React Flow node typed with our workflow `data` payload. */
export type WorkflowNode = Node<FanActionWorkflowNodeData>
export type WorkflowEdge = Edge

/** Imperative bridge to the live React Flow instance (registered from Canvas). */
type FlowApi = {
    getNodes: () => WorkflowNode[]
    getEdges: () => WorkflowEdge[]
    setNodes: ReactFlowInstance<WorkflowNode, WorkflowEdge>['setNodes']
    setEdges: ReactFlowInstance<WorkflowNode, WorkflowEdge>['setEdges']
}

type FanActionEditorContextValue = {
    /** Current fan-action document (basic info, settings, workflow snapshot). */
    action: FanAction
    updateAction: (patch: Partial<FanAction>) => void
    /** Visual “running” state for animated edges. */
    isRunning: boolean
    setRunning: (value: boolean) => void
    /** Node currently open in the config panel (if any). */
    activeNodeId: string | null
    drawerOpen: boolean
    /** Open config for a node, or close when `null` / same node toggled again. */
    configureNode: (nodeId: string | null) => void
    registerSaveHandler: (
        key: SaveKey,
        fn: () => Promise<boolean>,
    ) => void
    unregisterSaveHandler: (key: SaveKey) => void
    /** Run registered save handlers in order; stops on first failure. */
    saveAll: () => Promise<boolean>
    registerFlowApi: (api: FlowApi) => void
    getNodes: () => WorkflowNode[]
    getEdges: () => WorkflowEdge[]
    setNodes: FlowApi['setNodes']
    setEdges: FlowApi['setEdges']
}

const FanActionEditorContext =
    React.createContext<FanActionEditorContextValue | null>(null)

/** Access editor state; must be used under `FanActionEditorProvider`. */
export function useFanActionEditor() {
    const ctx = React.useContext(FanActionEditorContext)
    if (!ctx) {
        throw new Error(
            'useFanActionEditor must be used within FanActionEditorProvider',
        )
    }
    return ctx
}

/**
 * Shared state for the fan-action editor: action document, node-config drawer,
 * save orchestration, and a façade over React Flow nodes/edges.
 */
export function FanActionEditorProvider({
    action: initialAction,
    children,
}: {
    action: FanAction
    children: React.ReactNode
}) {
    const [action, setAction] = React.useState(initialAction)
    const [isRunning, setRunning] = React.useState(false)
    const [activeNodeId, setActiveNodeId] = React.useState<string | null>(null)
    const [drawerOpen, setDrawerOpen] = React.useState(false)
    const saveHandlersRef = React.useRef<
        Partial<Record<SaveKey, () => Promise<boolean>>>
    >({})
    const flowApiRef = React.useRef<FlowApi | null>(null)

    // Reset local UI when a different action is loaded into the provider.
    React.useEffect(() => {
        setAction(initialAction)
        setActiveNodeId(null)
        setDrawerOpen(false)
    }, [initialAction])

    const updateAction = React.useEffectEvent((patch: Partial<FanAction>) => {
        setAction((prev) => ({ ...prev, ...patch }))
    })

    /** Toggle / open / close the right-hand node config panel. */
    const configureNode = React.useEffectEvent((nodeId: string | null) => {
        if (nodeId === null) {
            setActiveNodeId(null)
            setDrawerOpen(false)
            return
        }
        if (drawerOpen && activeNodeId === nodeId) {
            setActiveNodeId(null)
            setDrawerOpen(false)
            return
        }
        setActiveNodeId(nodeId)
        setDrawerOpen(true)
    })

    const registerSaveHandler = React.useEffectEvent(
        (key: SaveKey, fn: () => Promise<boolean>) => {
            saveHandlersRef.current[key] = fn
        },
    )

    const unregisterSaveHandler = React.useEffectEvent((key: SaveKey) => {
        delete saveHandlersRef.current[key]
    })

    const saveAll = React.useEffectEvent(async () => {
        for (const key of [
            'basicInfo',
            'settings',
            'nodeConfig',
            'workflow',
        ] as const) {
            const handler = saveHandlersRef.current[key]
            if (!handler) continue
            const ok = await handler()
            if (!ok) return false
        }
        return true
    })

    const registerFlowApi = React.useEffectEvent((api: FlowApi) => {
        flowApiRef.current = api
    })

    const getNodes = React.useEffectEvent(() => {
        return flowApiRef.current?.getNodes() ?? []
    })

    const getEdges = React.useEffectEvent(() => {
        return flowApiRef.current?.getEdges() ?? []
    })

    const setNodes = React.useEffectEvent<FlowApi['setNodes']>((payload) => {
        flowApiRef.current?.setNodes(payload)
    })

    const setEdges = React.useEffectEvent<FlowApi['setEdges']>((payload) => {
        flowApiRef.current?.setEdges(payload)
    })

    const value: FanActionEditorContextValue = {
        action,
        updateAction,
        isRunning,
        setRunning,
        activeNodeId,
        drawerOpen,
        configureNode,
        registerSaveHandler,
        unregisterSaveHandler,
        saveAll,
        registerFlowApi,
        getNodes,
        getEdges,
        setNodes,
        setEdges,
    }

    return (
        <FanActionEditorContext.Provider value={value}>
            <ReactFlowProvider>{children}</ReactFlowProvider>
        </FanActionEditorContext.Provider>
    )
}
