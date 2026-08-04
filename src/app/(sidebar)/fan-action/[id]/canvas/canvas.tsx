'use client'

import * as React from 'react'
import {
    Background,
    ReactFlow,
    useEdgesState,
    useNodesState,
    useReactFlow,
    useStore,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

import { cn } from '@/lib/utils'

import {
    useFanActionEditor,
    type WorkflowEdge,
    type WorkflowNode,
} from '../context'
import type { FanActionWorkflowNodeData } from '../data'
import { WorkflowNode as WorkflowNodeComponent } from './node'

const nodeTypes = {
    workflow: WorkflowNodeComponent,
}

const fitViewOptions = { padding: 0.2, duration: 0 } as const

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

function toFlowEdges(
    edges: {
        id: string
        source: string
        target: string
        type?: string
        sourceHandle?: string
        targetHandle?: string
    }[],
): WorkflowEdge[] {
    return edges.map((edge) => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        type: edge.type === 'workflow' ? 'default' : edge.type,
        sourceHandle: edge.sourceHandle,
        targetHandle: edge.targetHandle,
    }))
}

function FlowApiRegistrar() {
    const { registerFlowApi } = useFanActionEditor()
    const reactFlow = useReactFlow<WorkflowNode, WorkflowEdge>()

    React.useEffect(() => {
        registerFlowApi({
            getNodes: () => reactFlow.getNodes(),
            getEdges: () => reactFlow.getEdges(),
            setNodes: reactFlow.setNodes,
            setEdges: reactFlow.setEdges,
        })
    }, [reactFlow, registerFlowApi])

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

export function Canvas() {
    const { action, isRunning } = useFanActionEditor()
    const [nodes, setNodes, onNodesChange] = useNodesState<WorkflowNode>(
        toFlowNodes(action.workflow.nodes),
    )
    const [edges, setEdges, onEdgesChange] = useEdgesState<WorkflowEdge>(
        toFlowEdges(action.workflow.edges),
    )

    React.useEffect(() => {
        setNodes(toFlowNodes(action.workflow.nodes))
        setEdges(toFlowEdges(action.workflow.edges))
    }, [
        action.id,
        action.workflow.nodes,
        action.workflow.edges,
        setNodes,
        setEdges,
    ])

    return (
        <div className="bg-muted/20 h-full min-h-0 w-full">
            <ReactFlow
                className={cn(
                    'workflow-flow',
                    isRunning && 'workflow-flow-running',
                )}
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                fitView
                proOptions={{ hideAttribution: true }}
            >
                <FlowApiRegistrar />
                <FitViewOnResize />
                <Background />
            </ReactFlow>
        </div>
    )
}
