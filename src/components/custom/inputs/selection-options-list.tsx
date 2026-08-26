'use client'

import {
    EllipsisVerticalIcon,
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
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'

export function SelectionOptionsList({
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
    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
    )

    function updateOption(optionId: string, updates: Partial<SelectionOption>) {
        onValueChange(
            value.map((option) =>
                option.id === optionId ? { ...option, ...updates } : option,
            ),
        )
    }

    function addOption() {
        onValueChange([
            ...value,
            {
                id: `option-${crypto.randomUUID()}`,
                label: `Option ${value.length + 1}`,
                allowSecondaryText: false,
                secondaryTextRequired: false,
            },
        ])
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
        <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-medium">Options</h3>
                <Button type="button" variant="ghost" size="sm" onClick={addOption}>
                    <PlusIcon />
                    Add option
                </Button>
            </div>
            <DndContext
                id={`${id}-dnd`}
                sensors={sensors}
                collisionDetection={closestCenter}
                modifiers={[restrictToVerticalAxis, restrictToParentElement]}
                onDragEnd={reorderOptions}
            >
                <SortableContext
                    items={value.map((option) => option.id)}
                    strategy={verticalListSortingStrategy}
                >
                    <div className="space-y-2">
                        {value.map((option, index) => (
                            <SortableOption
                                key={option.id}
                                id={id}
                                name={name}
                                option={option}
                                index={index}
                                onUpdate={(updates) => updateOption(option.id, updates)}
                                onRemove={() =>
                                    onValueChange(
                                        value.filter((item) => item.id !== option.id),
                                    )
                                }
                            />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>
            <Separator />
        </div>
    )
}

function SortableOption({
    id,
    name,
    option,
    index,
    onUpdate,
    onRemove,
}: {
    id: string
    name: string
    option: SelectionOption
    index: number
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
                'bg-background flex items-center gap-2',
                isDragging && 'relative z-20',
            )}
        >
            <Button
                ref={setActivatorNodeRef}
                type="button"
                variant="ghost"
                size="icon"
                className="text-muted-foreground shrink-0 cursor-grab touch-none active:cursor-grabbing"
                aria-label={`Move ${option.label}`}
                {...attributes}
                {...listeners}
            >
                <GripVerticalIcon />
            </Button>
            <Input
                id={`${id}-${option.id}`}
                name={`${name}[${index}][label]`}
                value={option.label}
                aria-label={`Option ${index + 1}`}
                onChange={(event) => onUpdate({ label: event.target.value })}
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
            <Popover>
                <PopoverTrigger
                    render={
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="text-muted-foreground shrink-0"
                            aria-label={`Settings for ${option.label}`}
                        />
                    }
                >
                    <EllipsisVerticalIcon />
                </PopoverTrigger>
                <PopoverContent align="end" className="w-72 p-3">
                    <div className="space-y-3">
                        <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="h-9 w-full justify-center"
                            onClick={onRemove}
                        >
                            <Trash2Icon />
                            Delete option
                        </Button>
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
                                        onUpdate({
                                            secondaryTextRequired,
                                        })
                                    }
                                />
                            </label>
                        )}
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}
