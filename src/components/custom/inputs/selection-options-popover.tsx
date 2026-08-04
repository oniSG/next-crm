'use client'

import { useRef, useState, type KeyboardEvent } from 'react'
import {
    ChevronsUpDownIcon,
    EllipsisIcon,
    GripVerticalIcon,
    PlusIcon,
    Trash2Icon,
} from 'lucide-react'
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

import type { SelectionOption } from '@/app/(sidebar)/survey/temp'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'

export function SelectionOptionsPopover({
    id,
    name,
    value,
    onValueChange,
}: {
    id: string
    name: string
    value: SelectionOption[]
    onValueChange: (value: SelectionOption[]) => void
}) {
    const [draft, setDraft] = useState('')
    const optionId = useRef(value.length + 1)
    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
    )

    function addOption() {
        const label = draft.trim()

        if (!label) return

        onValueChange([
            ...value,
            {
                id: `option-${optionId.current++}`,
                label,
                allowSecondaryText: false,
                secondaryTextRequired: false,
            },
        ])
        setDraft('')
    }

    function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key !== 'Enter') return

        event.preventDefault()
        addOption()
    }

    function updateOption(optionId: string, updates: Partial<SelectionOption>) {
        onValueChange(
            value.map((option) =>
                option.id === optionId ? { ...option, ...updates } : option,
            ),
        )
    }

    function reorderOptions(event: DragEndEvent) {
        const { active, over } = event

        if (!over || active.id === over.id) return

        const oldIndex = value.findIndex((option) => option.id === active.id)
        const newIndex = value.findIndex((option) => option.id === over.id)

        if (oldIndex === -1 || newIndex === -1) return

        onValueChange(arrayMove(value, oldIndex, newIndex))
    }

    return (
        <>
            {value.map((option, index) => (
                <span key={option.id} className="hidden">
                    <input
                        type="hidden"
                        name={`${name}[${index}][label]`}
                        value={option.label}
                    />
                    {option.allowSecondaryText && (
                        <input
                            type="hidden"
                            name={`${name}[${index}][allowSecondaryText]`}
                            value="on"
                        />
                    )}
                    {option.secondaryTextRequired && (
                        <input
                            type="hidden"
                            name={`${name}[${index}][secondaryTextRequired]`}
                            value="on"
                        />
                    )}
                </span>
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
                        Options{' '}
                        <span className="text-muted-foreground">({value.length})</span>
                    </span>
                    <ChevronsUpDownIcon className="text-muted-foreground" />
                </PopoverTrigger>
                <PopoverContent
                    align="start"
                    className="w-lg max-w-(--available-width) p-3"
                >
                    <div className="space-y-3">
                        <div className="flex gap-2">
                            <Input
                                value={draft}
                                placeholder="New option"
                                onChange={(event) => setDraft(event.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                            <Button
                                type="button"
                                size="icon"
                                disabled={!draft.trim()}
                                aria-label="Add option"
                                onClick={addOption}
                            >
                                <PlusIcon />
                            </Button>
                        </div>
                        {value.length > 0 ? (
                            <DndContext
                                id={`${id}-options-dnd`}
                                sensors={sensors}
                                collisionDetection={closestCenter}
                                modifiers={[
                                    restrictToVerticalAxis,
                                    restrictToParentElement,
                                ]}
                                onDragEnd={reorderOptions}
                            >
                                <SortableContext
                                    items={value.map((option) => option.id)}
                                    strategy={verticalListSortingStrategy}
                                >
                                    <div className="max-h-80 space-y-1 overflow-y-auto">
                                        {value.map((option) => (
                                            <SortableOption
                                                key={option.id}
                                                option={option}
                                                onUpdate={(updates) =>
                                                    updateOption(option.id, updates)
                                                }
                                                onRemove={() =>
                                                    onValueChange(
                                                        value.filter(
                                                            (item) =>
                                                                item.id !== option.id,
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
                                No options added yet.
                            </p>
                        )}
                    </div>
                </PopoverContent>
            </Popover>
        </>
    )
}

function SortableOption({
    option,
    onUpdate,
    onRemove,
}: {
    option: SelectionOption
    onUpdate: (updates: Partial<SelectionOption>) => void
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
    } = useSortable({ id: option.id })

    return (
        <div
            ref={setNodeRef}
            style={{ transform: CSS.Transform.toString(transform), transition }}
            className={cn(
                'bg-muted/60 flex h-9 items-center gap-1 rounded-md px-1',
                isDragging && 'relative z-10 opacity-90 shadow-md',
            )}
        >
            <Button
                ref={setActivatorNodeRef}
                type="button"
                variant="ghost"
                size="icon-xs"
                className="text-muted-foreground cursor-grab touch-none active:cursor-grabbing"
                aria-label={`Move ${option.label}`}
                {...attributes}
                {...listeners}
            >
                <GripVerticalIcon />
            </Button>
            <span className="min-w-0 flex-1 truncate px-1 text-sm">{option.label}</span>
            <Popover>
                <PopoverTrigger
                    render={
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon-xs"
                            className="text-muted-foreground"
                            aria-label={`Settings for ${option.label}`}
                        />
                    }
                >
                    <EllipsisIcon />
                </PopoverTrigger>
                <PopoverContent align="end" className="w-72 p-3">
                    <div className="space-y-3">
                        <label className="flex items-center justify-between gap-3 text-xs">
                            <span>User can write in secondary text field</span>
                            <Switch
                                checked={option.allowSecondaryText}
                                onCheckedChange={(allowSecondaryText) =>
                                    onUpdate({
                                        allowSecondaryText,
                                        ...(!allowSecondaryText && {
                                            secondaryTextRequired: false,
                                        }),
                                    })
                                }
                            />
                        </label>
                        {option.allowSecondaryText && (
                            <label className="flex items-center justify-between gap-3 text-xs">
                                <span>Writing in text is required</span>
                                <Switch
                                    checked={option.secondaryTextRequired}
                                    onCheckedChange={(secondaryTextRequired) =>
                                        onUpdate({ secondaryTextRequired })
                                    }
                                />
                            </label>
                        )}
                    </div>
                </PopoverContent>
            </Popover>
            <Button
                type="button"
                variant="ghost"
                size="icon-xs"
                className="text-muted-foreground hover:text-destructive"
                aria-label={`Remove ${option.label}`}
                onClick={onRemove}
            >
                <Trash2Icon />
            </Button>
        </div>
    )
}
