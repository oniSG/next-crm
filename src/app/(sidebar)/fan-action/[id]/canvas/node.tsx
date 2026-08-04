'use client'

import {
    Handle,
    Position,
    type Node,
    type NodeProps,
} from '@xyflow/react'
import { cn } from '@/lib/utils'

import { useFanActionEditor } from '../context'
import type { FanActionWorkflowNodeData } from '../data'
import {
    workflowActionNodeBox,
    workflowConditionNodeBounds,
    workflowConditionNodeBox,
    workflowNodeBoxRect,
    workflowNodeBoxShapeStyles,
    workflowNodeEditingBorderClass,
    workflowNodeIconClass,
    workflowNodeLabelOffset,
    workflowTriggerNodeBox,
    workflowTriggerPath,
    workflowTriggerShapeStyles,
} from '../shared/node-styles'
import {
    workflowItemIcon,
    workflowItemIconModifier,
    workflowItemLabel,
} from '../shared/workflow-catalog'

/** Shared size/shape for connection ports on workflow nodes. */
const handlePortBase =
    '!size-[1.09375rem] !rounded-full !border-0'
/** Default (non yes/no) port: muted background + chevron arrow. */
const handleMutedArrowClass = cn(
    handlePortBase,
    '!flex !items-center !justify-center !bg-border dark:!bg-secondary [&_svg]:size-2.5 [&_svg]:stroke-[2.5] [&_svg]:text-muted-foreground',
)
/** Incoming flow handle on the left of the node. */
const handleFlowInputClass = cn(handleMutedArrowClass, '!left-0')
/** Outgoing flow handle on the right of the node. */
const handleFlowOutputClass = cn(handleMutedArrowClass, '!right-0')
/** Condition "yes" / true branch port. */
const handleYesClass = cn(handlePortBase, '!bg-success')
/** Condition "no" / false branch port. */
const handleNoClass = cn(handlePortBase, '!bg-destructive')

function WorkflowNodeIcon({
    itemId,
    variant,
    className,
}: {
    itemId: string
    variant: FanActionWorkflowNodeData['variant']
    className?: string
}) {
    const Icon = workflowItemIcon(itemId)
    return (
        <Icon
            className={cn(
                workflowNodeIconClass(itemId, variant),
                workflowItemIconModifier(itemId),
                className,
            )}
        />
    )
}

function HandleChevron() {
    return (
        <svg
            aria-hidden
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="size-2.5"
        >
            <path d="m9 18 6-6-6-6" />
        </svg>
    )
}

export function WorkflowNode({
    id,
    data,
}: NodeProps<Node<FanActionWorkflowNodeData>>) {
    const { activeNodeId, drawerOpen, configureNode } = useFanActionEditor()
    const isEditing = drawerOpen && activeNodeId === id
    const label = workflowItemLabel(data.itemId)
    const boxShapeStyles = workflowNodeBoxShapeStyles(
        data.itemId,
        data.variant,
        isEditing,
    )
    const triggerShapeStyles = workflowTriggerShapeStyles(isEditing)
    const editingBorderClass = isEditing
        ? workflowNodeEditingBorderClass
        : undefined
    const conditionRect = workflowNodeBoxRect(
        workflowConditionNodeBox.size,
        workflowConditionNodeBox.stroke,
    )
    const actionRect = workflowNodeBoxRect(
        workflowActionNodeBox.size,
        workflowActionNodeBox.stroke,
    )

    function openSettings(event: React.MouseEvent) {
        event.stopPropagation()
        configureNode(id)
    }

    if (data.variant === 'trigger') {
        return (
            <div className="relative">
                <div
                    className="relative z-20 mx-auto"
                    style={{
                        height: workflowTriggerNodeBox.height,
                        width: workflowTriggerNodeBox.width,
                    }}
                >
                    <button
                        type="button"
                        className="relative block h-full w-full cursor-pointer border-0 bg-transparent p-0"
                        aria-label={label}
                        onClick={openSettings}
                    >
                        <svg
                            className="absolute inset-0 size-full overflow-visible"
                            viewBox={`0 0 ${workflowTriggerNodeBox.viewBox.width} ${workflowTriggerNodeBox.viewBox.height}`}
                            aria-hidden
                        >
                            <path
                                d={workflowTriggerPath}
                                fill={triggerShapeStyles.backgroundFill}
                                stroke="none"
                            />
                            <path
                                d={workflowTriggerPath}
                                fill={triggerShapeStyles.tintFill}
                                fillOpacity={triggerShapeStyles.tintOpacity}
                                stroke="none"
                            />
                            <path
                                d={workflowTriggerPath}
                                className={editingBorderClass}
                                fill="none"
                                stroke={triggerShapeStyles.stroke}
                                strokeWidth={workflowTriggerNodeBox.stroke}
                                strokeLinejoin="round"
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="pointer-events-none absolute inset-0 flex items-center justify-center pr-2.5">
                            <WorkflowNodeIcon
                                itemId={data.itemId}
                                variant={data.variant}
                                className="size-[1.875rem]"
                            />
                        </div>
                    </button>
                    <Handle
                        className={handleFlowOutputClass}
                        position={Position.Right}
                        type="source"
                    >
                        <HandleChevron />
                    </Handle>
                </div>
                <NodeLabel
                    label={label}
                    incomplete={data.incomplete}
                    onClick={openSettings}
                />
            </div>
        )
    }

    if (data.variant === 'condition') {
        const conditionBounds = workflowConditionNodeBounds()
        return (
            <div className="relative">
                <div
                    className="relative z-20 mx-auto"
                    style={{
                        width: conditionBounds,
                        height: conditionBounds,
                    }}
                >
                    <button
                        type="button"
                        className="absolute top-1/2 left-1/2 size-[70px] -translate-x-1/2 -translate-y-1/2 rotate-45 cursor-pointer border-0 bg-transparent p-0"
                        aria-label={label}
                        onClick={openSettings}
                    >
                        <svg
                            className="size-full"
                            viewBox={`0 0 ${workflowConditionNodeBox.size} ${workflowConditionNodeBox.size}`}
                            aria-hidden
                        >
                            <rect
                                {...conditionRect}
                                rx={workflowConditionNodeBox.radius}
                                fill={boxShapeStyles.backgroundFill}
                                stroke="none"
                            />
                            <rect
                                {...conditionRect}
                                rx={workflowConditionNodeBox.radius}
                                fill={boxShapeStyles.tintFill}
                                fillOpacity={boxShapeStyles.tintOpacity}
                                stroke="none"
                            />
                            <rect
                                {...conditionRect}
                                rx={workflowConditionNodeBox.radius}
                                className={editingBorderClass}
                                fill="none"
                                stroke={boxShapeStyles.stroke}
                                strokeWidth={workflowConditionNodeBox.stroke}
                            />
                        </svg>
                    </button>
                    <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <WorkflowNodeIcon
                            itemId={data.itemId}
                            variant={data.variant}
                            className="size-[1.875rem]"
                        />
                    </div>
                    <Handle
                        className={handleFlowInputClass}
                        position={Position.Left}
                        type="target"
                    >
                        <HandleChevron />
                    </Handle>
                    <Handle
                        id="yes"
                        className={handleYesClass}
                        position={Position.Right}
                        type="source"
                        style={{
                            left: '75%',
                            top: '25%',
                            transform: 'translate(-50%, -50%)',
                        }}
                    />
                    <Handle
                        id="no"
                        className={handleNoClass}
                        position={Position.Right}
                        type="source"
                        style={{
                            left: '75%',
                            top: '75%',
                            transform: 'translate(-50%, -50%)',
                        }}
                    />
                </div>
                <NodeLabel
                    label={label}
                    incomplete={data.incomplete}
                    onClick={openSettings}
                />
            </div>
        )
    }

    return (
        <div className="relative">
            <div className="relative z-20 mx-auto w-20">
                <button
                    type="button"
                    className="relative size-20 cursor-pointer border-0 bg-transparent p-0"
                    aria-label={label}
                    onClick={openSettings}
                >
                    <svg
                        className="size-full"
                        viewBox={`0 0 ${workflowActionNodeBox.size} ${workflowActionNodeBox.size}`}
                        aria-hidden
                    >
                        <rect
                            {...actionRect}
                            rx={workflowActionNodeBox.radius}
                            fill={boxShapeStyles.backgroundFill}
                            stroke="none"
                        />
                        <rect
                            {...actionRect}
                            rx={workflowActionNodeBox.radius}
                            fill={boxShapeStyles.tintFill}
                            fillOpacity={boxShapeStyles.tintOpacity}
                            stroke="none"
                        />
                        <rect
                            {...actionRect}
                            rx={workflowActionNodeBox.radius}
                            className={editingBorderClass}
                            fill="none"
                            stroke={boxShapeStyles.stroke}
                            strokeWidth={workflowActionNodeBox.stroke}
                        />
                    </svg>
                    <div className="pointer-events-none absolute inset-0 m-auto flex items-center justify-center">
                        <WorkflowNodeIcon
                            itemId={data.itemId}
                            variant={data.variant}
                            className="size-[2.1875rem]"
                        />
                    </div>
                </button>
                <Handle
                    className={handleFlowInputClass}
                    position={Position.Left}
                    type="target"
                >
                    <HandleChevron />
                </Handle>
                <Handle
                    className={handleFlowOutputClass}
                    position={Position.Right}
                    type="source"
                >
                    <HandleChevron />
                </Handle>
            </div>
            <NodeLabel
                label={label}
                incomplete={data.incomplete}
                onClick={openSettings}
            />
        </div>
    )
}

function NodeLabel({
    label,
    incomplete,
    onClick,
}: {
    label: string
    incomplete?: boolean
    onClick: (event: React.MouseEvent) => void
}) {
    return (
        <div
            className="pointer-events-none absolute left-1/2 z-0 w-max max-w-[11.25rem] -translate-x-1/2 text-center"
            style={{ top: `calc(100% + ${workflowNodeLabelOffset}px)` }}
        >
            <button
                type="button"
                className="pointer-events-auto max-w-[11.25rem] cursor-pointer border-0 bg-transparent p-0 text-center text-sm leading-tight font-normal text-foreground"
                onClick={onClick}
            >
                {label}
            </button>
            {incomplete ? (
                <p className="text-destructive text-sm leading-tight">
                    Must be completed
                </p>
            ) : null}
        </div>
    )
}
