'use client'

import { useState, type KeyboardEvent } from 'react'
import { ChevronsUpDownIcon, GripVerticalIcon, PlusIcon, Trash2Icon } from 'lucide-react'
import {
    closestCenter,
    DndContext,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
} from '@dnd-kit/core'
import { restrictToParentElement, restrictToVerticalAxis } from '@dnd-kit/modifiers'
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

export function StringListPopover({
    id,
    name,
    label,
    itemLabel,
    value,
    maxItems = 10,
    onValueChange,
}: {
    id: string
    name: string
    label: string
    itemLabel: string
    value: string[]
    maxItems?: number
    onValueChange: (value: string[]) => void
}) {
    const [draft, setDraft] = useState('')
    const atLimit = value.length >= maxItems
    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
    )

    function addItem() {
        const nextItem = draft.trim()

        if (!nextItem || atLimit) return

        onValueChange([...value, nextItem])
        setDraft('')
    }

    function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key !== 'Enter') return

        event.preventDefault()
        addItem()
    }

    function reorderItems(event: DragEndEvent) {
        const { active, over } = event

        if (!over || active.id === over.id) return

        onValueChange(arrayMove(value, Number(active.id), Number(over.id)))
    }

    return (
        <div>
            {value.map((item, index) => (
                <input
                    key={`${item}-${index}`}
                    type="hidden"
                    name={`${name}[]`}
                    value={item}
                />
            ))}
            <Popover>
                <PopoverTrigger
                    render={
                        <Button
                            id={id}
                            type="button"
                            variant="outline"
                            className="w-full justify-between font-normal"
                        />
                    }
                >
                    <span>
                        {label}{' '}
                        <span className="text-muted-foreground">
                            ({value.length}/{maxItems})
                        </span>
                    </span>
                    <ChevronsUpDownIcon className="text-muted-foreground" />
                </PopoverTrigger>
                <PopoverContent align="start" className="w-(--anchor-width) p-3">
                    <div className="space-y-3">
                        <div className="flex gap-2">
                            <Input
                                value={draft}
                                placeholder={`New ${itemLabel.toLowerCase()}`}
                                disabled={atLimit}
                                onChange={(event) => setDraft(event.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                            <Button
                                type="button"
                                size="icon"
                                disabled={!draft.trim() || atLimit}
                                aria-label={`Add ${itemLabel.toLowerCase()}`}
                                onClick={addItem}
                            >
                                <PlusIcon />
                            </Button>
                        </div>

                        {value.length > 0 ? (
                            <DndContext
                                id={`${id}-items-dnd`}
                                sensors={sensors}
                                collisionDetection={closestCenter}
                                modifiers={[
                                    restrictToVerticalAxis,
                                    restrictToParentElement,
                                ]}
                                onDragEnd={reorderItems}
                            >
                                <SortableContext
                                    items={value.map((_, index) => index)}
                                    strategy={verticalListSortingStrategy}
                                >
                                    <div className="max-h-52 space-y-1 overflow-y-auto">
                                        {value.map((item, index) => (
                                            <SortableStringItem
                                                key={`${item}-${index}`}
                                                id={index}
                                                item={item}
                                                onRemove={() =>
                                                    onValueChange(
                                                        value.filter(
                                                            (_, itemIndex) =>
                                                                itemIndex !== index,
                                                        ),
                                                    )
                                                }
                                            />
                                        ))}
                                    </div>
                                </SortableContext>
                            </DndContext>
                        ) : (
                            <p className="text-muted-foreground py-2 text-center text-xs">
                                No {label.toLowerCase()} added yet.
                            </p>
                        )}

                        {atLimit && (
                            <p className="text-muted-foreground text-xs">
                                Maximum of {maxItems} items reached.
                            </p>
                        )}
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}

function SortableStringItem({
    id,
    item,
    onRemove,
}: {
    id: number
    item: string
    onRemove: () => void
}) {
    const {
        attributes,
        listeners,
        setActivatorNodeRef,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id })

    return (
        <div
            ref={setNodeRef}
            style={{ transform: CSS.Transform.toString(transform), transition }}
            className={cn(
                'bg-muted/60 flex items-center gap-1 rounded-md px-1 py-1',
                isDragging && 'relative z-10 opacity-80 shadow-md',
            )}
        >
            <Button
                ref={setActivatorNodeRef}
                type="button"
                variant="ghost"
                size="icon-xs"
                className="text-muted-foreground cursor-grab touch-none active:cursor-grabbing"
                aria-label={`Move ${item}`}
                {...attributes}
                {...listeners}
            >
                <GripVerticalIcon />
            </Button>
            <span className="min-w-0 flex-1 truncate px-1 text-sm">{item}</span>
            <Button
                type="button"
                variant="ghost"
                size="icon-xs"
                className="text-muted-foreground hover:text-destructive"
                aria-label={`Remove ${item}`}
                onClick={onRemove}
            >
                <Trash2Icon />
            </Button>
        </div>
    )
}
