import type { FanActionWorkflowNodeData } from '../data'
import type { WorkflowNodeVariant } from './node-styles'

export type WorkflowPaletteItem = {
    id: string
    variant: WorkflowNodeVariant
    incomplete?: boolean
}

export const WORKFLOW_DRAG_MIME = 'application/fan-action-workflow-node'

export type SyncNodeConfig = (
    nodeId: string,
    config: Record<string, unknown>,
) => void

export type WorkflowDrawerContentProps = {
    actionId: number
    nodeId: string
    data: FanActionWorkflowNodeData
    syncNodeConfig: SyncNodeConfig
}
