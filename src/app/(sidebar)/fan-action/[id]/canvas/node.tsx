'use client'

import * as React from 'react'
import {
    Handle,
    NodeToolbar,
    Position,
    useReactFlow,
    type Node,
    type NodeProps,
} from '@xyflow/react'
import {
    ChevronRightIcon,
    CopyIcon,
    MailIcon,
    XIcon,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { ButtonGroup } from '@/components/ui/button-group'
import { cn } from '@/lib/utils'

import {
    useFanActionEditor,
    type WorkflowNode,
} from '../context'
import type { FanActionWorkflowNodeData } from '../data'
import {
    workflowActionNodeBox,
    workflowConditionNodeBounds,
    workflowConditionNodeBox,
    workflowNodeBoxRect,
    workflowNodeBoxShapeStyles,
    workflowNodeIconClass,
    workflowNodeLabelOffset,
    workflowTriggerNodeBox,
    workflowTriggerPath,
    workflowTriggerShapeStyles,
} from '../shared/node-styles'
import {
    workflowItemDefinition,
    workflowItemLabel,
} from '../shared/workflow-catalog'

/** Shared size/shape for connection ports on workflow nodes. */
const handlePortBase = '!size-[1.09375rem] !rounded-full !border-0'
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

/** Catalog icon for the current workflow block (color from variant/section). */
function WorkflowNodeIcon({
    itemId,
    variant,
}: {
    itemId: string
    variant: FanActionWorkflowNodeData['variant']
}) {
    const item = workflowItemDefinition(itemId)
    const Icon = item?.icon ?? MailIcon

    return (
        <Icon
            className={cn(
                'size-[1.875rem]',
                workflowNodeIconClass(itemId, variant),
                item?.iconModifier,
            )}
        />
    )
}

/** Hover toolbar above the node: duplicate + delete (same as Svelte NodeToolbar). */
function NodeHoverToolbar({
    visible,
    onMouseEnter,
    onMouseLeave,
    onDuplicate,
    onDelete,
}: {
    visible: boolean
    onMouseEnter: () => void
    onMouseLeave: () => void
    onDuplicate: (event: React.MouseEvent) => void
    onDelete: (event: React.MouseEvent) => void
}) {
    return (
        <NodeToolbar
            position={Position.Top}
            align="center"
            isVisible={visible}
        >
            <div
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                role="presentation"
            >
                <ButtonGroup className="overflow-hidden rounded-4xl bg-background">
                    <Button
                        type="button"
                        size="icon-sm"
                        variant="outline"
                        className="px-2"
                        aria-label="Duplicate"
                        onClick={onDuplicate}
                    >
                        <CopyIcon />
                    </Button>
                    <Button
                        type="button"
                        size="icon-sm"
                        variant="outline"
                        className="px-2 text-destructive hover:text-destructive"
                        aria-label="Delete"
                        onClick={onDelete}
                    >
                        <XIcon />
                    </Button>
                </ButtonGroup>
            </div>
        </NodeToolbar>
    )
}

/** React Flow custom node: trigger (chevron), condition (diamond), or action (square). */
export function WorkflowNode({
    id,
    data,
}: NodeProps<Node<FanActionWorkflowNodeData>>) {
    const { activeNodeId, drawerOpen, configureNode, setNodes } =
        useFanActionEditor()
    const { deleteElements, getNode } = useReactFlow()
    const [toolbarVisible, setToolbarVisible] = React.useState(false)
    const hideToolbarTimeoutRef = React.useRef<ReturnType<
        typeof setTimeout
    > | null>(null)

    const isEditing = drawerOpen && activeNodeId === id
    const label = workflowItemLabel(data.itemId)
    const boxShapeStyles = workflowNodeBoxShapeStyles(
        data.itemId,
        data.variant,
        isEditing,
    )
    const triggerShapeStyles = workflowTriggerShapeStyles(isEditing)
    const editingBorderClass = isEditing
        ? 'workflow-node-editing-border'
        : undefined
    const conditionRect = workflowNodeBoxRect(
        workflowConditionNodeBox.size,
        workflowConditionNodeBox.stroke,
    )
    const actionRect = workflowNodeBoxRect(
        workflowActionNodeBox.size,
        workflowActionNodeBox.stroke,
    )

    function showToolbar() {
        if (hideToolbarTimeoutRef.current) {
            clearTimeout(hideToolbarTimeoutRef.current)
            hideToolbarTimeoutRef.current = null
        }
        setToolbarVisible(true)
    }

    function scheduleHideToolbar() {
        hideToolbarTimeoutRef.current = setTimeout(() => {
            setToolbarVisible(false)
        }, 150)
    }

    React.useEffect(() => {
        return () => {
            if (hideToolbarTimeoutRef.current) {
                clearTimeout(hideToolbarTimeoutRef.current)
            }
        }
    }, [])

    /** Open (or toggle) the node config panel for this node. */
    function openSettings(event: React.MouseEvent) {
        event.stopPropagation()
        configureNode(id)
    }

    function duplicateNode(event: React.MouseEvent) {
        event.stopPropagation()
        const node = getNode(id)
        if (!node) return

        const clone: WorkflowNode = {
            ...node,
            id: `node-${crypto.randomUUID().slice(0, 8)}`,
            position: {
                x: node.position.x + 40,
                y: node.position.y + 40,
            },
            selected: false,
            data: node.data as FanActionWorkflowNodeData,
        }

        setNodes((nodes) => [...nodes, clone])
    }

    function deleteNode(event: React.MouseEvent) {
        event.stopPropagation()
        void deleteElements({ nodes: [{ id }] })
    }

    const toolbar = (
        <NodeHoverToolbar
            visible={toolbarVisible}
            onMouseEnter={showToolbar}
            onMouseLeave={scheduleHideToolbar}
            onDuplicate={duplicateNode}
            onDelete={deleteNode}
        />
    )

    if (data.variant === 'trigger') {
        return (
            <div
                className="relative"
                onMouseEnter={showToolbar}
                onMouseLeave={scheduleHideToolbar}
            >
                {toolbar}
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
                            />
                        </div>
                    </button>
                    <Handle
                        className={handleFlowOutputClass}
                        position={Position.Right}
                        type="source"
                    >
                        <ChevronRightIcon
                            className="size-2.5"
                            strokeWidth={2.5}
                        />
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
            <div
                className="relative"
                onMouseEnter={showToolbar}
                onMouseLeave={scheduleHideToolbar}
            >
                {toolbar}
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
                        />
                    </div>
                    <Handle
                        className={handleFlowInputClass}
                        position={Position.Left}
                        type="target"
                    >
                        <ChevronRightIcon
                            className="size-2.5"
                            strokeWidth={2.5}
                        />
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

    if (data.variant === 'action') {
        return (
            <div
                className="relative"
                onMouseEnter={showToolbar}
                onMouseLeave={scheduleHideToolbar}
            >
                {toolbar}
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
                            />
                        </div>
                    </button>
                    <Handle
                        className={handleFlowInputClass}
                        position={Position.Left}
                        type="target"
                    >
                        <ChevronRightIcon
                            className="size-2.5"
                            strokeWidth={2.5}
                        />
                    </Handle>
                    <Handle
                        className={handleFlowOutputClass}
                        position={Position.Right}
                        type="source"
                    >
                        <ChevronRightIcon
                            className="size-2.5"
                            strokeWidth={2.5}
                        />
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

    return null
}

/** Caption under the node shape; shows incomplete warning when needed. */
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
