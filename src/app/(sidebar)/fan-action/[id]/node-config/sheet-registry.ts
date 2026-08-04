import type { ComponentType } from 'react'

import { workflowItemDefinition } from '../shared/workflow-catalog'
import type { WorkflowDrawerContentProps } from '../shared/types'
import { CustomAttributeContent } from './sheets/custom-attribute'
import { DataChangeContent } from './sheets/data-change'
import { EmailContent } from './sheets/email'
import { EventDateOccursContent } from './sheets/event-date-occurs'
import { EventListContent } from './sheets/event-list'
import { ExactDateContent } from './sheets/exact-date'
import { FormCompletedContent } from './sheets/form-completed'
import { LoyaltyPointsByTypeContent } from './sheets/loyalty-points-by-type'
import { LoyaltyPointsReachedContent } from './sheets/loyalty-points-reached'
import { MembershipStatusChangeContent } from './sheets/membership-status-change'
import { PushContent } from './sheets/push'
import { QuestionnaireCompletedContent } from './sheets/questionnaire-completed'
import { RemoveTagContent } from './sheets/remove-tag'
import { RewardConversionContent } from './sheets/reward-conversion'
import { ScheduledSendingContent } from './sheets/scheduled-sending'
import { SmsContent } from './sheets/sms'
import { SpecificMembershipPurchaseContent } from './sheets/specific-membership-purchase'
import { TagContent } from './sheets/tag'
import { TicketPurchaseContent } from './sheets/ticket-purchase'
import { WaitContent } from './sheets/wait'

/** Catalog items without a form — panel shows header only. */
function EmptySheet(_props: WorkflowDrawerContentProps) {
    return null
}

const workflowSheetRegistry: Record<
    string,
    ComponentType<WorkflowDrawerContentProps>
> = {
    wait: WaitContent,
    email: EmailContent,
    sms: SmsContent,
    push: PushContent,
    tag: TagContent,
    'remove-tag': RemoveTagContent,
    'custom-attribute': CustomAttributeContent,
    'reward-conversion': RewardConversionContent,
    'scheduled-sending': ScheduledSendingContent,
    'loyalty-points-by-type': LoyaltyPointsByTypeContent,
    'ticket-purchase': TicketPurchaseContent,
    'event-entry': EventListContent,
    'exact-date': ExactDateContent,
    'event-date-occurs': EventDateOccursContent,
    'cart-auto-emptied': EventListContent,
    'specific-membership-purchase': SpecificMembershipPurchaseContent,
    'ticket-transfer': EventListContent,
    'season-ticket-release': EventListContent,
    'season-ticket-forward': EventListContent,
    'membership-status-change': MembershipStatusChangeContent,
    'season-ticket-bulk-forward': EventListContent,
    'loyalty-points-reached': LoyaltyPointsReachedContent,
    'questionnaire-completed': QuestionnaireCompletedContent,
    'data-change': DataChangeContent,
    'form-completed': FormCompletedContent,
}

export function workflowDrawerContent(
    itemId: string,
): ComponentType<WorkflowDrawerContentProps> | null {
    const sheet = workflowSheetRegistry[itemId]
    if (sheet) return sheet
    if (workflowItemDefinition(itemId)) return EmptySheet
    return null
}
