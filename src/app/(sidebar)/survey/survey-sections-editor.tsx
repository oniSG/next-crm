'use client'

import { PlusIcon } from 'lucide-react'
import {
    closestCenter,
    DndContext,
    KeyboardSensor,
    MeasuringStrategy,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core'
import { restrictToParentElement, restrictToVerticalAxis } from '@dnd-kit/modifiers'
import {
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable'

import { Button } from '@/components/ui/button'

import { SurveySectionCard } from './survey-section-card'
import type { SurveySection } from './temp'

export function SurveySectionsEditor({
    sections,
    openSectionIds,
    surveyColor,
    lockQuestionType,
    onAdd,
    onRemove,
    onOpenChange,
    onDragStart,
    onDragEnd,
}: {
    sections: SurveySection[]
    openSectionIds: Set<string>
    surveyColor: string
    lockQuestionType: boolean
    onAdd: () => void
    onRemove: (sectionId: string) => void
    onOpenChange: (sectionId: string, open: boolean) => void
    onDragStart: () => void
    onDragEnd: React.ComponentProps<typeof DndContext>['onDragEnd']
}) {
    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
    )

    return (
        <div className="flex w-full flex-col gap-5">
            <DndContext
                id="survey-sections-dnd"
                sensors={sensors}
                collisionDetection={closestCenter}
                measuring={{
                    droppable: { strategy: MeasuringStrategy.Always },
                }}
                modifiers={[restrictToVerticalAxis, restrictToParentElement]}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
            >
                <SortableContext
                    items={sections.map((section) => section.id)}
                    strategy={verticalListSortingStrategy}
                >
                    <div className="flex flex-col gap-3">
                        {sections.map((section, index) => (
                            <SurveySectionCard
                                key={section.id}
                                section={section}
                                index={index}
                                sectionCount={sections.length}
                                surveyColor={surveyColor}
                                lockQuestionType={lockQuestionType}
                                open={openSectionIds.has(section.id)}
                                onOpenChange={(open) => onOpenChange(section.id, open)}
                                onRemove={onRemove}
                            />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>
            <Button type="button" variant="outline" className="w-fit" onClick={onAdd}>
                <PlusIcon />
                Add section
            </Button>
        </div>
    )
}
