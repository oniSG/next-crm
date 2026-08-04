import type { LucideIcon } from 'lucide-react'
import {
    ArrowLeftRightIcon,
    AwardIcon,
    CalendarClockIcon,
    CalendarDaysIcon,
    ChevronsRightIcon,
    CircleCheckIcon,
    CircleMinusIcon,
    CircleXIcon,
    ClockIcon,
    FileTextIcon,
    FrownIcon,
    GaugeIcon,
    GiftIcon,
    GitForkIcon,
    ListIcon,
    LogInIcon,
    MailIcon,
    MessageSquareIcon,
    MonitorUpIcon,
    PackageIcon,
    PhoneIcon,
    RefreshCwIcon,
    ShoppingCartIcon,
    SmartphoneIcon,
    StarIcon,
    TagIcon,
    TagsIcon,
    UserCheckIcon,
    UserPenIcon,
    UserPlusIcon,
    UserXIcon,
    WalletIcon,
    XIcon,
} from 'lucide-react'

import catalogJson from '../data/workflow-catalog.json'
import type { WorkflowNodeVariant, WorkflowPaletteSection } from './node-styles'
import type { WorkflowPaletteItem } from './types'

export type WorkflowTriggerCategory =
    | 'common'
    | 'time'
    | 'ticketing'
    | 'eshop'
    | 'call-center'
    | 'mobile-app'
    | 'other'

type WorkflowCatalogItemJson = {
    id: string
    variant: WorkflowNodeVariant
    paletteSection: WorkflowPaletteSection
    icon: string
    label: string
    description: string
    iconModifier?: string
    incomplete?: boolean
    category?: WorkflowTriggerCategory
    drawerTitle?: string
}

type WorkflowCatalogJson = {
    triggerCategories: { id: WorkflowTriggerCategory; label: string }[]
    items: WorkflowCatalogItemJson[]
}

export type WorkflowItemDefinition = {
    id: string
    variant: WorkflowNodeVariant
    paletteSection: WorkflowPaletteSection
    label: string
    description: string
    icon: LucideIcon
    iconModifier?: string
    incomplete?: boolean
    category?: WorkflowTriggerCategory
    drawerTitle?: string
}

export type WorkflowTriggerPaletteGroup = {
    id: WorkflowTriggerCategory
    label: string
    items: WorkflowPaletteItem[]
}

const catalog = catalogJson as WorkflowCatalogJson

const workflowIcons: Record<string, LucideIcon> = {
    ArrowLeftRight: ArrowLeftRightIcon,
    Award: AwardIcon,
    CalendarClock: CalendarClockIcon,
    CalendarDays: CalendarDaysIcon,
    ChevronsRight: ChevronsRightIcon,
    CircleCheck: CircleCheckIcon,
    CircleMinus: CircleMinusIcon,
    CircleX: CircleXIcon,
    Clock: ClockIcon,
    FileText: FileTextIcon,
    Frown: FrownIcon,
    Gauge: GaugeIcon,
    Gift: GiftIcon,
    GitFork: GitForkIcon,
    List: ListIcon,
    LogIn: LogInIcon,
    Mail: MailIcon,
    MessageSquare: MessageSquareIcon,
    MonitorUp: MonitorUpIcon,
    Package: PackageIcon,
    Phone: PhoneIcon,
    RefreshCw: RefreshCwIcon,
    ShoppingCart: ShoppingCartIcon,
    Smartphone: SmartphoneIcon,
    Star: StarIcon,
    Tag: TagIcon,
    Tags: TagsIcon,
    UserCheck: UserCheckIcon,
    UserPen: UserPenIcon,
    UserPlus: UserPlusIcon,
    UserX: UserXIcon,
    Wallet: WalletIcon,
    X: XIcon,
}

function resolveItem(item: WorkflowCatalogItemJson): WorkflowItemDefinition {
    return {
        id: item.id,
        variant: item.variant,
        paletteSection: item.paletteSection,
        label: item.label,
        description: item.description,
        icon: workflowIcons[item.icon] ?? MailIcon,
        iconModifier: item.iconModifier,
        incomplete: item.incomplete,
        category: item.category,
        drawerTitle: item.drawerTitle,
    }
}

const allDefinitions = catalog.items.map(resolveItem)

const definitionById = new Map(
    allDefinitions.map((item) => [item.id, item] as const),
)

const triggerDefinitions = allDefinitions.filter(
    (item) => item.paletteSection === 'triggers',
)
const operatorDefinitions = allDefinitions.filter(
    (item) => item.paletteSection === 'operators',
)
const actionDefinitions = allDefinitions.filter(
    (item) => item.paletteSection === 'actions',
)

function toPaletteItem(item: WorkflowItemDefinition): WorkflowPaletteItem {
    return {
        id: item.id,
        variant: item.variant,
        incomplete: item.incomplete,
    }
}

export function workflowItemDefinition(
    itemId: string,
): WorkflowItemDefinition | undefined {
    return definitionById.get(itemId)
}

export function workflowItemLabel(itemId: string): string {
    return (
        definitionById.get(itemId)?.label ??
        itemId
            .split('-')
            .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
            .join(' ')
    )
}

export function workflowDrawerTitle(itemId: string): string {
    const item = definitionById.get(itemId)
    return item?.drawerTitle ?? item?.label ?? workflowItemLabel(itemId)
}

export function workflowItemDescription(itemId: string): string {
    return definitionById.get(itemId)?.description ?? ''
}

export function workflowItemIcon(itemId: string): LucideIcon {
    return definitionById.get(itemId)?.icon ?? MailIcon
}

export function workflowItemIconModifier(itemId: string): string | undefined {
    return definitionById.get(itemId)?.iconModifier
}

export function workflowTriggerPaletteGroups(): WorkflowTriggerPaletteGroup[] {
    const itemsByCategory = new Map<
        WorkflowTriggerCategory,
        WorkflowPaletteItem[]
    >(catalog.triggerCategories.map((category) => [category.id, []]))

    for (const trigger of triggerDefinitions) {
        if (!trigger.category) continue
        itemsByCategory.get(trigger.category)?.push(toPaletteItem(trigger))
    }

    return catalog.triggerCategories
        .map((category) => ({
            id: category.id,
            label: category.label,
            items: itemsByCategory.get(category.id) ?? [],
        }))
        .filter((group) => group.items.length > 0)
}

export function workflowOperatorPaletteItems(): WorkflowPaletteItem[] {
    return operatorDefinitions.map(toPaletteItem)
}

export function workflowActionPaletteItems(): WorkflowPaletteItem[] {
    return actionDefinitions.map(toPaletteItem)
}
