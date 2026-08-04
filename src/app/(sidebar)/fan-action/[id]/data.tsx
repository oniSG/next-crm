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

export type FanActionWorkflowEdge = {
    id: string
    source: string
    target: string
    type?: string
    sourceHandle?: string
    targetHandle?: string
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

export const FAN_ACTIONS = fanActionsJson as FanAction[]
export const FAN_ACTION_OPTIONS = optionsJson as FanActionOptions

export function getFanActionById(id: number | string): FanAction | undefined {
    const numericId = typeof id === 'string' ? Number(id) : id
    if (Number.isNaN(numericId)) return undefined
    return FAN_ACTIONS.find((action) => action.id === numericId)
}
