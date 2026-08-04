'use client'

import * as React from 'react'
import {
    ChevronDownIcon,
    GripVerticalIcon,
    InfoIcon,
    SearchIcon,
} from 'lucide-react'

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from '@/components/ui/hover-card'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

import { workflowNodeIconClass } from '../shared/node-styles'
import type { WorkflowPaletteItem } from '../shared/types'
import { WORKFLOW_DRAG_MIME } from '../shared/types'
import {
    workflowActionPaletteItems,
    workflowItemDescription,
    workflowItemIcon,
    workflowItemIconModifier,
    workflowItemLabel,
    workflowOperatorPaletteItems,
    workflowTriggerPaletteGroups,
} from '../shared/workflow-catalog'
import { BasicInfoForm } from './basic-info-form'
import { SettingsForm } from './settings-form'

const sectionTriggerClass =
    'flex w-full cursor-pointer items-center justify-between px-4 py-3.5 text-left text-base font-semibold hover:no-underline'
const subheadingClass = 'text-sm font-medium text-muted-foreground'
const paletteRowClass = 'flex w-full items-center gap-2 py-1.5 hover:bg-accent/50'
const paletteItemButtonClass =
    'flex min-w-0 flex-1 cursor-grab items-center gap-2 text-left active:cursor-grabbing'

function onDragStart(
    event: React.DragEvent<HTMLButtonElement>,
    item: WorkflowPaletteItem,
) {
    const payload: WorkflowPaletteItem = {
        id: item.id,
        variant: item.variant,
        incomplete: item.incomplete,
    }
    event.dataTransfer.setData(WORKFLOW_DRAG_MIME, JSON.stringify(payload))
    event.dataTransfer.effectAllowed = 'move'
}

function PaletteItemRow({ item }: { item: WorkflowPaletteItem }) {
    const Icon = workflowItemIcon(item.id)
    const label = workflowItemLabel(item.id)
    const description = workflowItemDescription(item.id)
    const showInfo = Boolean(description || item.incomplete)

    return (
        <li>
            <div className={paletteRowClass}>
                <button
                    type="button"
                    className={paletteItemButtonClass}
                    draggable
                    onDragStart={(event) => onDragStart(event, item)}
                >
                    <GripVerticalIcon
                        className="size-4 shrink-0 text-muted-foreground/70"
                        aria-hidden
                    />
                    <Icon
                        className={cn(
                            'size-4 shrink-0',
                            workflowNodeIconClass(item.id, item.variant),
                            workflowItemIconModifier(item.id),
                        )}
                    />
                    <span className="min-w-0 flex-1 truncate text-sm">
                        {label}
                    </span>
                </button>

                {showInfo ? (
                    <HoverCard>
                        <HoverCardTrigger
                            render={
                                <button
                                    type="button"
                                    className="inline-flex shrink-0 cursor-pointer rounded-sm p-0.5 text-muted-foreground hover:text-foreground"
                                    onClick={(event) => event.stopPropagation()}
                                />
                            }
                        >
                            <InfoIcon className="size-3.5" />
                            <span className="sr-only">{label}</span>
                        </HoverCardTrigger>
                        <HoverCardContent side="right" className="w-56">
                            <div className="space-y-1">
                                <h4 className="text-sm font-semibold">
                                    {label}
                                </h4>
                                {description ? (
                                    <p className="text-sm text-muted-foreground">
                                        {description}
                                    </p>
                                ) : null}
                                {item.incomplete ? (
                                    <p className="text-destructive text-sm">
                                        Je nutné dokončit!
                                    </p>
                                ) : null}
                            </div>
                        </HoverCardContent>
                    </HoverCard>
                ) : null}
            </div>
        </li>
    )
}

function PaletteItemList({ items }: { items: WorkflowPaletteItem[] }) {
    return (
        <ul className="space-y-0.5">
            {items.map((item) => (
                <PaletteItemRow key={item.id} item={item} />
            ))}
        </ul>
    )
}

function PaletteSection({
    title,
    defaultOpen = false,
    children,
}: {
    title: string
    defaultOpen?: boolean
    children: React.ReactNode
}) {
    return (
        <Collapsible
            defaultOpen={defaultOpen}
            className="group/section border-b"
        >
            <CollapsibleTrigger className={sectionTriggerClass}>
                <span>{title}</span>
                <ChevronDownIcon className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-open/section:rotate-180" />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-0 pt-0 pb-2">
                {children}
            </CollapsibleContent>
        </Collapsible>
    )
}

function BlocksList() {
    const [searchQuery, setSearchQuery] = React.useState('')
    const [openTriggerCategories, setOpenTriggerCategories] = React.useState<
        string[]
    >(['common'])
    const openCategoriesRef = React.useRef(openTriggerCategories)
    const openTriggerCategoriesSnapshot = React.useRef<string[] | null>(null)
    openCategoriesRef.current = openTriggerCategories

    const query = searchQuery.trim().toLowerCase()
    function matchesSearch(item: WorkflowPaletteItem) {
        if (!query) return true
        return workflowItemLabel(item.id).toLowerCase().includes(query)
    }

    const triggerGroups = workflowTriggerPaletteGroups()
        .map((group) => ({
            ...group,
            items: group.items.filter(matchesSearch),
        }))
        .filter((group) => group.items.length > 0)

    const operatorItems = workflowOperatorPaletteItems().filter(matchesSearch)
    const actionItems = workflowActionPaletteItems().filter(matchesSearch)
    const hasBlockResults =
        triggerGroups.length > 0 ||
        operatorItems.length > 0 ||
        actionItems.length > 0

    React.useEffect(() => {
        const trimmed = searchQuery.trim()

        if (trimmed) {
            if (openTriggerCategoriesSnapshot.current === null) {
                openTriggerCategoriesSnapshot.current = openCategoriesRef.current
            }
            setOpenTriggerCategories(
                workflowTriggerPaletteGroups()
                    .map((group) => ({
                        ...group,
                        items: group.items.filter((item) =>
                            workflowItemLabel(item.id)
                                .toLowerCase()
                                .includes(trimmed.toLowerCase()),
                        ),
                    }))
                    .filter((group) => group.items.length > 0)
                    .map((group) => group.id),
            )
            return
        }

        if (openTriggerCategoriesSnapshot.current !== null) {
            setOpenTriggerCategories(openTriggerCategoriesSnapshot.current)
            openTriggerCategoriesSnapshot.current = null
        }
    }, [searchQuery])

    return (
        <div className="min-h-[13.75rem] space-y-3 px-4 pb-1">
            <div className="relative mt-3">
                <SearchIcon
                    className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                    aria-hidden
                />
                <Input
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    className="w-full bg-background pl-9"
                    placeholder="Hledat bloky..."
                />
            </div>

            {!hasBlockResults ? (
                <p className="py-6 text-center text-sm text-muted-foreground">
                    Žádné bloky nenalezeny.
                </p>
            ) : (
                <>
                    {triggerGroups.length > 0 ? (
                        <div className="space-y-0">
                            {triggerGroups.map((group) => {
                                const open = openTriggerCategories.includes(
                                    group.id,
                                )
                                return (
                                    <Collapsible
                                        key={group.id}
                                        open={open}
                                        onOpenChange={(nextOpen) => {
                                            setOpenTriggerCategories((prev) => {
                                                if (nextOpen) {
                                                    return prev.includes(
                                                        group.id,
                                                    )
                                                        ? prev
                                                        : [...prev, group.id]
                                                }
                                                return prev.filter(
                                                    (item) =>
                                                        item !== group.id,
                                                )
                                            })
                                        }}
                                        className="group/trigger-cat border-0 bg-transparent"
                                    >
                                        <CollapsibleTrigger className="flex w-full cursor-pointer items-center justify-between py-1.5 text-left text-sm font-medium text-muted-foreground hover:no-underline">
                                            <span>{group.label}</span>
                                            <ChevronDownIcon className="size-3.5 shrink-0 transition-transform duration-200 group-data-open/trigger-cat:rotate-180" />
                                        </CollapsibleTrigger>
                                        <CollapsibleContent className="p-0">
                                            <PaletteItemList
                                                items={group.items}
                                            />
                                        </CollapsibleContent>
                                    </Collapsible>
                                )
                            })}
                        </div>
                    ) : null}

                    {operatorItems.length > 0 ? (
                        <section className="space-y-2">
                            <p className={subheadingClass}>Operátory</p>
                            <PaletteItemList items={operatorItems} />
                        </section>
                    ) : null}

                    {actionItems.length > 0 ? (
                        <section className="space-y-2">
                            <p className={subheadingClass}>Akce</p>
                            <PaletteItemList items={actionItems} />
                        </section>
                    ) : null}
                </>
            )}
        </div>
    )
}

export function PalettePanel() {
    return (
        <aside className="flex h-full min-h-0 w-80 shrink-0 flex-col overflow-hidden border-e bg-background">
            <div className="min-h-0 flex-1 overflow-y-auto bg-transparent">
                <PaletteSection title="Základní informace">
                    <BasicInfoForm />
                </PaletteSection>
                <PaletteSection title="Bloky" defaultOpen>
                    <BlocksList />
                </PaletteSection>
                <PaletteSection title="Nastavení">
                    <SettingsForm />
                </PaletteSection>
            </div>
        </aside>
    )
}
