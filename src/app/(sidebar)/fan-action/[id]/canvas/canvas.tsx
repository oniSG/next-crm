'use client'

import * as React from 'react'
import {
    Background,
    ReactFlow,
    addEdge,
    useEdgesState,
    useNodesState,
    useReactFlow,
    useStore,
    type Connection,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

import { cn } from '@/lib/utils'

import { useFanActionEditor, type WorkflowEdge, type WorkflowNode } from '../context'
import type { FanActionWorkflowEdgeData, FanActionWorkflowNodeData } from '../data'
import type { WorkflowPaletteItem } from '../shared/types'
import { WORKFLOW_DRAG_MIME } from '../shared/types'
import { WorkflowEdge as WorkflowEdgeComponent } from './edge'
import { WorkflowNode as WorkflowNodeComponent } from './node'
import { ZoomControls } from './zoom-controls'

/** Maps React Flow `node.type` → custom node component (stable ref outside Canvas). */
const nodeTypes = {
    workflow: WorkflowNodeComponent,
}

/** Maps React Flow `edge.type` → custom edge component. */
const edgeTypes = {
    workflow: WorkflowEdgeComponent,
}

const defaultEdgeOptions = { type: 'workflow' } as const

const fitViewOptions = { padding: 0.2, duration: 0 } as const

/** Convert persisted workflow nodes into React Flow node objects. */
function toFlowNodes(
    nodes: {
        id: string
        type: string
        position: { x: number; y: number }
        data: FanActionWorkflowNodeData
    }[],
): WorkflowNode[] {
    return nodes.map((node) => ({
        id: node.id,
        type: node.type,
        position: node.position,
        data: node.data,
    }))
}

/** Convert persisted workflow edges; keep / restore custom `workflow` edge type. */
function toFlowEdges(
    edges: {
        id: string
        source: string
        target: string
        type?: string
        sourceHandle?: string
        targetHandle?: string
        data?: FanActionWorkflowEdgeData
    }[],
): WorkflowEdge[] {
    return edges.map((edge) => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        type: edge.type == null || edge.type === 'default' ? 'workflow' : edge.type,
        sourceHandle: edge.sourceHandle,
        targetHandle: edge.targetHandle,
        data: edge.data,
    }))
}

/**
 * Wires the xyflow store into editor context: reads via `getNodes`/`getEdges`,
 * writes via the same `setNodes`/`setEdges` that drive controlled React Flow state.
 */
function RegisterFlowApi({
    setNodes,
    setEdges,
}: {
    setNodes: React.Dispatch<React.SetStateAction<WorkflowNode[]>>
    setEdges: React.Dispatch<React.SetStateAction<WorkflowEdge[]>>
}) {
    const { registerFlowApi } = useFanActionEditor()
    const reactFlow = useReactFlow<WorkflowNode, WorkflowEdge>()

    React.useEffect(() => {
        registerFlowApi({
            getNodes: () => reactFlow.getNodes(),
            getEdges: () => reactFlow.getEdges(),
            setNodes,
            setEdges,
        })
    }, [reactFlow, registerFlowApi, setNodes, setEdges])

    return null
}

/** Re-fit the graph when the canvas width changes (e.g. config panel open/close). */
function FitViewOnResize() {
    const { fitView } = useReactFlow()
    const domNode = useStore((state) => state.domNode)

    React.useEffect(() => {
        if (!domNode) return

        let skipInitial = true
        let previousWidth = domNode.clientWidth
        let timeout: ReturnType<typeof setTimeout> | undefined

        const scheduleFitView = () => {
            requestAnimationFrame(() => {
                void fitView(fitViewOptions)
            })
        }

        const observer = new ResizeObserver(() => {
            const nextWidth = domNode.clientWidth
            if (nextWidth === previousWidth) return
            previousWidth = nextWidth

            if (skipInitial) {
                skipInitial = false
                return
            }

            clearTimeout(timeout)
            timeout = setTimeout(scheduleFitView, 0)
        })

        observer.observe(domNode)

        return () => {
            observer.disconnect()
            clearTimeout(timeout)
        }
    }, [domNode, fitView])

    return null
}

/** React Flow canvas: graph lives in xyflow; context is the API facade. */
export function Canvas() {
    const { action, isRunning, configureNode } = useFanActionEditor()
    const locked = action.isEdited
    const { screenToFlowPosition } = useReactFlow<WorkflowNode, WorkflowEdge>()
    const [nodes, setNodes, onNodesChange] = useNodesState<WorkflowNode>(
        toFlowNodes(action.workflow.nodes),
    )
    const [edges, setEdges, onEdgesChange] = useEdgesState<WorkflowEdge>(
        toFlowEdges(action.workflow.edges),
    )

    // Reset graph when a different action (or its workflow) is loaded.
    React.useEffect(() => {
        setNodes(toFlowNodes(action.workflow.nodes))
        setEdges(toFlowEdges(action.workflow.edges))
    }, [action.id, action.workflow.nodes, action.workflow.edges, setNodes, setEdges])

    function onDragOver(event: React.DragEvent) {
        if (locked) return
        event.preventDefault()
        event.dataTransfer.dropEffect = 'move'
    }

    function onDrop(event: React.DragEvent) {
        if (locked) return
        event.preventDefault()

        const raw = event.dataTransfer.getData(WORKFLOW_DRAG_MIME)
        if (!raw) return

        let item: WorkflowPaletteItem
        try {
            item = JSON.parse(raw) as WorkflowPaletteItem
        } catch {
            return
        }
        if (!item.id || !item.variant) return

        const position = screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
        })
        const id = `${item.id}-${crypto.randomUUID()}`
        const newNode: WorkflowNode = {
            id,
            type: 'workflow',
            position,
            data: {
                itemId: item.id,
                variant: item.variant,
                incomplete: item.incomplete ?? true,
            },
        }

        setNodes((current) => [...current, newNode])
        configureNode(id)
    }

    function onConnect(connection: Connection) {
        if (locked) return
        setEdges((current) =>
            addEdge(
                {
                    ...connection,
                    type: 'workflow',
                    data: { count: Math.floor(Math.random() * 500) + 1 },
                },
                current,
            ),
        )
    }

    return (
        <div className="bg-muted/20 h-full min-h-0 w-full">
            <ReactFlow
                className={cn('workflow-flow', isRunning && 'workflow-flow-running')}
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                defaultEdgeOptions={defaultEdgeOptions}
                onNodesChange={locked ? undefined : onNodesChange}
                onEdgesChange={locked ? undefined : onEdgesChange}
                onConnect={locked ? undefined : onConnect}
                onDragOver={onDragOver}
                onDrop={onDrop}
                nodesDraggable={!locked}
                nodesConnectable={!locked}
                nodesFocusable={!locked}
                edgesFocusable={!locked}
                edgesReconnectable={!locked}
                elementsSelectable={!locked}
                connectOnClick={!locked}
                deleteKeyCode={locked ? null : ['Backspace', 'Delete']}
                fitView
                proOptions={{ hideAttribution: true }}
            >
                <RegisterFlowApi setNodes={setNodes} setEdges={setEdges} />
                <FitViewOnResize />
                <ZoomControls />
                <Background />
            </ReactFlow>
        </div>
    )
}
