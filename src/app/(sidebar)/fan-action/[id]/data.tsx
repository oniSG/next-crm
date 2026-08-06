import fanActionsJson from './data/fan-actions.json'
import optionsJson from './data/options.json'

export type FanActionWorkflowNodeData = {
    itemId: string
    variant: 'trigger' | 'condition' | 'action'
    incomplete?: boolean
    config?: Record<string, unknown>
}

export type FanActionWorkflowNode = {
    id: string
    type: string
    position: { x: number; y: number }
    data: FanActionWorkflowNodeData
}

export type FanActionWorkflowEdgeData = {
    /** Fan/visitor count shown on the mid-edge badge. */
    count: number
}

export type FanActionWorkflowEdge = {
    id: string
    source: string
    target: string
    type?: string
    sourceHandle?: string
    targetHandle?: string
    data?: FanActionWorkflowEdgeData
}

export type FanActionWorkflow = {
    nodes: FanActionWorkflowNode[]
    edges: FanActionWorkflowEdge[]
}

export type FanAction = {
    id: number
    event: string
    tags: string[]
    description: string
    created_at: string
    created_by: string
    active: boolean
    transactionActions: boolean
    automaticStop: boolean
    plannedRunOut: boolean
    /**
     * When true, another session is editing this action: UI is read-only
     * (grayscale, no graph mutations). Frontend mock until real locking exists.
     */
    isEdited: boolean
    workflow: FanActionWorkflow
}

export type FanActionOptions = {
    allTags: string[]
    allEventLists: string[]
    allMembershipStatuses: string[]
    allQuestionnaires: string[]
    allWebForms: string[]
    allCreators: string[]
}

/** Seed snapshot from JSON (immutable). Live edits go through the mock API store. */
export const FAN_ACTIONS = fanActionsJson as FanAction[]
export const FAN_ACTION_OPTIONS = optionsJson as FanActionOptions
