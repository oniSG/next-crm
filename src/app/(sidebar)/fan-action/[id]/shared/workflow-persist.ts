import type {
    FanActionWorkflowEdge,
    FanActionWorkflowNode,
    FanActionWorkflowNodeData,
} from '../data'

/** Strip React Flow runtime fields; keep only what we persist on the action. */
export function toPersistedNodes(
    nodes: {
        id: string
        type?: string
        position: { x: number; y: number }
        data: FanActionWorkflowNodeData
    }[],
): FanActionWorkflowNode[] {
    return nodes.map((node) => ({
        id: node.id,
        type: node.type ?? 'workflow',
        position: { x: node.position.x, y: node.position.y },
        data: node.data,
    }))
}

/** Persist edges; map RF `default` back to our `workflow` edge type when needed. */
export function toPersistedEdges(
    edges: {
        id: string
        source: string
        target: string
        type?: string
        sourceHandle?: string | null
        targetHandle?: string | null
    }[],
): FanActionWorkflowEdge[] {
    return edges.map((edge) => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        type:
            edge.type == null || edge.type === 'default'
                ? 'workflow'
                : edge.type,
        ...(edge.sourceHandle
            ? { sourceHandle: edge.sourceHandle }
            : {}),
        ...(edge.targetHandle
            ? { targetHandle: edge.targetHandle }
            : {}),
    }))
}
