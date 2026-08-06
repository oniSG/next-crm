'use client'

import {
    BaseEdge,
    EdgeLabelRenderer,
    getBezierPath,
    useReactFlow,
    type Edge,
    type EdgeProps,
    type Node,
} from '@xyflow/react'
import { UserIcon, XIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { ButtonGroup } from '@/components/ui/button-group'
import { cn } from '@/lib/utils'

import type {
    FanActionWorkflowEdgeData,
    FanActionWorkflowNodeData,
} from '../data'
import { useFanActionEditor } from '../context'

const conditionBranchButtonClass = {
    yes: 'bg-success/10 text-success hover:bg-success/20 dark:bg-success/20 dark:hover:bg-success/30 border-success/25 dark:border-success/30',
    no: 'bg-destructive/10 text-destructive hover:bg-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 border-destructive/25 dark:border-destructive/30',
} as const

type WorkflowEdgeType = Edge<FanActionWorkflowEdgeData>

/** Custom Bezier edge: dashed flow animation (CSS), yes/no colors, mid-edge delete. */
export function WorkflowEdge({
    id,
    source,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    sourceHandleId,
    markerEnd,
    markerStart,
    style,
    data,
}: EdgeProps<WorkflowEdgeType>) {
    const { action } = useFanActionEditor()
    const locked = action.isEdited
    const { deleteElements, getNode } = useReactFlow()
    const [path, labelX, labelY] = getBezierPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
        sourcePosition,
        targetPosition,
    })

    const sourceNode = getNode(source) as
        | Node<FanActionWorkflowNodeData>
        | undefined
    const isCondition = sourceNode?.data.variant === 'condition'
    const branch =
        isCondition && sourceHandleId === 'yes'
            ? 'yes'
            : isCondition && sourceHandleId === 'no'
              ? 'no'
              : null

    const edgeStyle = {
        ...style,
        strokeWidth: 1.5,
        ...(branch === 'yes'
            ? { stroke: 'var(--success)' }
            : branch === 'no'
              ? { stroke: 'var(--destructive)' }
              : {}),
    }

    function deleteEdge(event: React.MouseEvent) {
        event.stopPropagation()
        if (locked) return
        void deleteElements({ edges: [{ id }] })
    }

    return (
        <>
            <BaseEdge
                id={id}
                path={path}
                markerEnd={markerEnd}
                markerStart={markerStart}
                style={edgeStyle}
            />
            <EdgeLabelRenderer>
                <div
                    className={cn(
                        'workflow-edge-label nopan nodrag absolute z-10',
                        locked ? 'pointer-events-none' : 'pointer-events-auto',
                    )}
                    style={{
                        transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
                    }}
                >
                    <ButtonGroup className="overflow-hidden rounded-4xl bg-background">
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className={cn(
                                branch ? conditionBranchButtonClass[branch] : undefined,
                            )}
                            tabIndex={locked ? -1 : undefined}
                        >
                            <UserIcon />
                            {data?.count ?? 0}
                        </Button>
                        {!locked ? (
                            <Button
                                type="button"
                                variant="outline"
                                size="icon-sm"
                                aria-label="Delete connection"
                                onClick={deleteEdge}
                            >
                                <XIcon />
                            </Button>
                        ) : null}
                    </ButtonGroup>
                </div>
            </EdgeLabelRenderer>
        </>
    )
}
