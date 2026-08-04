export type WorkflowNodeVariant = 'trigger' | 'condition' | 'action'

export type WorkflowPaletteSection = 'triggers' | 'operators' | 'actions'

const workflowOperatorItemIds = new Set([
    'condition',
    'wait',
    'ab-test',
    'end-branch',
])

export function workflowPaletteSection(
    itemId: string,
    variant: WorkflowNodeVariant,
): WorkflowPaletteSection {
    if (variant === 'trigger') return 'triggers'
    if (variant === 'condition' || workflowOperatorItemIds.has(itemId)) {
        return 'operators'
    }
    return 'actions'
}

export const workflowPaletteSectionBgClass: Record<
    WorkflowPaletteSection,
    string
> = {
    triggers: 'bg-workflow-trigger',
    operators: 'bg-workflow-operator/85',
    actions: 'bg-workflow-action/85',
}

const workflowColorVarBySection: Record<WorkflowPaletteSection, string> = {
    triggers: 'var(--workflow-color-trigger)',
    operators: 'var(--workflow-color-operator)',
    actions: 'var(--workflow-color-action)',
}

const workflowIconClassBySection: Record<WorkflowPaletteSection, string> = {
    triggers: 'text-workflow-trigger',
    operators: 'text-workflow-operator',
    actions: 'text-workflow-action',
}

export type TriggerShapeStyles = {
    backgroundFill: string
    tintFill: string
    tintOpacity: number
    stroke: string
}

export const workflowNodeEditingBorderClass = 'workflow-node-editing-border'

export function workflowNodeBoxShapeStyles(
    itemId: string,
    variant: WorkflowNodeVariant,
    editing = false,
): TriggerShapeStyles {
    const section = workflowPaletteSection(itemId, variant)
    const opacity = editing ? (section === 'triggers' ? 0.45 : 0.4) : 0.15

    return {
        backgroundFill: 'var(--background)',
        tintFill: workflowColorVarBySection[section],
        tintOpacity: opacity,
        stroke: workflowColorVarBySection[section],
    }
}

export const workflowNodeStroke = 2.5
export const workflowNodeCornerRadius = 12
export const workflowNodeLabelOffset = 2

export const workflowConditionNodeBox = {
    size: 70,
    radius: workflowNodeCornerRadius,
    stroke: workflowNodeStroke,
} as const

export function workflowConditionNodeBounds(
    size: number = workflowConditionNodeBox.size,
): number {
    return Math.ceil(size * Math.SQRT2)
}

export const workflowActionNodeBox = {
    size: 80,
    radius: workflowNodeCornerRadius,
    stroke: workflowNodeStroke,
} as const

export const workflowTriggerNodeBox = {
    height: 70,
    width: 95,
    stroke: workflowNodeStroke,
    viewBox: { width: 78, height: 58 },
} as const

/** Chevron arrow — left corners use circular arcs; shoulders use quadratic curves. */
export const workflowTriggerPath =
    'M 7 2 L 49.72 2 Q 55.72 2 59.325 6.796 L 76 29 L 59.325 51.204 Q 55.72 56 49.72 56 L 7 56 A 5 5 0 0 1 2 51 L 2 7 A 5 5 0 0 1 7 2 Z'

export function workflowNodeBoxRect(size: number, stroke: number) {
    const inset = stroke / 2
    return {
        x: inset,
        y: inset,
        width: size - stroke,
        height: size - stroke,
    }
}

export function workflowTriggerShapeStyles(
    editing = false,
): TriggerShapeStyles {
    return {
        backgroundFill: 'var(--background)',
        tintFill: workflowColorVarBySection.triggers,
        tintOpacity: editing ? 0.45 : 0.15,
        stroke: workflowColorVarBySection.triggers,
    }
}

export function workflowNodeIconClass(
    itemId: string,
    variant: WorkflowNodeVariant,
): string {
    return workflowIconClassBySection[workflowPaletteSection(itemId, variant)]
}

export function workflowNodeIconGlowColor(
    itemId: string,
    variant: WorkflowNodeVariant,
): string {
    return workflowColorVarBySection[workflowPaletteSection(itemId, variant)]
}
