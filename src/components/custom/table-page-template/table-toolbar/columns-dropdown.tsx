'use client'

import * as React from 'react'
import {
    DndContext,
    KeyboardSensor,
    PointerSensor,
    closestCenter,
    useSensor,
    useSensors,
    type DragEndEvent,
} from '@dnd-kit/core'
import { restrictToParentElement, restrictToVerticalAxis } from '@dnd-kit/modifiers'
import {
    SortableContext,
    arrayMove,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { CheckIcon, Columns3Icon, GripVerticalIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
    Popover,
    PopoverContent,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

import { useTablePage } from '../context'
import { getColumnLabel } from '../types'

export function ColumnsDropdown() {
    const { table, columnOrder } = useTablePage()
    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    )

    const columns = table.getAllLeafColumns()

    const orderedIds = React.useMemo(() => {
        const ids = columns.map((c) => c.id)
        if (columnOrder.length === 0) return ids
        const set = new Set(columnOrder)
        const missing = ids.filter((id) => !set.has(id))
        return [...columnOrder.filter((id) => ids.includes(id)), ...missing]
    }, [columns, columnOrder])

    const byId = React.useMemo(
        () => new Map(columns.map((c) => [c.id, c])),
        [columns],
    )

    const handleDragEnd = ({ active, over }: DragEndEvent) => {
        if (!over || active.id === over.id) return
        const from = orderedIds.indexOf(String(active.id))
        const to = orderedIds.indexOf(String(over.id))
        if (from === -1 || to === -1) return
        table.setColumnOrder(arrayMove(orderedIds, from, to))
    }

    return (
        <Popover>
            <PopoverTrigger
                render={
                    <Button variant="outline" size="sm" className="rounded-full" />
                }
            >
                <Columns3Icon />
                Sloupce
            </PopoverTrigger>
            <PopoverContent align="start" className="w-60 gap-1 p-1.5">
                <PopoverHeader className="px-1.5 pt-1 pb-0.5">
                    <PopoverTitle className="text-muted-foreground text-xs font-medium">
                        Sloupce
                    </PopoverTitle>
                </PopoverHeader>
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    modifiers={[restrictToVerticalAxis, restrictToParentElement]}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext
                        items={orderedIds}
                        strategy={verticalListSortingStrategy}
                    >
                        <ul className="flex flex-col">
                            {orderedIds.map((id) => {
                                const column = byId.get(id)
                                if (!column) return null
                                return (
                                    <SortableRow
                                        key={id}
                                        id={id}
                                        label={getColumnLabel(column)}
                                        visible={column.getIsVisible()}
                                        onToggle={() => column.toggleVisibility()}
                                    />
                                )
                            })}
                        </ul>
                    </SortableContext>
                </DndContext>
            </PopoverContent>
        </Popover>
    )
}

type SortableRowProps = {
    id: string
    label: string
    visible: boolean
    onToggle: () => void
}

function SortableRow({ id, label, visible, onToggle }: SortableRowProps) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
        useSortable({ id })

    return (
        <li
            ref={setNodeRef}
            style={{ transform: CSS.Transform.toString(transform), transition }}
            className={cn(
                'relative flex items-center rounded-md',
                isDragging &&
                    'bg-popover ring-border z-10 shadow-md ring-1 [&_button]:hover:bg-transparent',
            )}
        >
            <button
                type="button"
                aria-label="Přesunout"
                {...attributes}
                {...listeners}
                className="text-muted-foreground/60 hover:text-muted-foreground focus-visible:ring-ring/50 flex h-7 w-6 shrink-0 cursor-grab items-center justify-center rounded-md outline-none focus-visible:ring-2 active:cursor-grabbing"
            >
                <GripVerticalIcon className="size-3.5" />
            </button>
            <button
                type="button"
                onClick={onToggle}
                className="hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground flex h-7 flex-1 cursor-pointer items-center justify-between rounded-md pr-2 pl-1 text-sm outline-none"
            >
                <span className="font-medium">{label}</span>
                <CheckIcon
                    className={cn(
                        'text-foreground size-4 shrink-0 transition-opacity',
                        visible ? 'opacity-100' : 'opacity-0',
                    )}
                />
            </button>
        </li>
    )
}
