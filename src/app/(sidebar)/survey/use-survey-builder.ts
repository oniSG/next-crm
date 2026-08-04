'use client'

import { useRef, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import type { DragEndEvent } from '@dnd-kit/core'

import { createDefaultSection } from './survey-utils'
import type { SurveySection } from './temp'

export function useSurveyBuilder(initialSections: SurveySection[]) {
    const sectionId = useRef(initialSections.length)
    const [sections, setSections] = useState<SurveySection[]>(initialSections)
    const [openSectionIds, setOpenSectionIds] = useState<Set<string>>(
        () => new Set(initialSections.map((section) => section.id)),
    )

    function addSection() {
        sectionId.current += 1
        const newSectionId = `section-${sectionId.current}`

        setSections((current) => [...current, createDefaultSection(newSectionId)])
        setOpenSectionIds((current) => new Set(current).add(newSectionId))
    }

    function removeSection(sectionId: string) {
        setSections((current) => current.filter((section) => section.id !== sectionId))
        setOpenSectionIds((current) => {
            const next = new Set(current)
            next.delete(sectionId)
            return next
        })
    }

    function setSectionOpen(sectionId: string, open: boolean) {
        setOpenSectionIds((current) => {
            const next = new Set(current)

            if (open) next.add(sectionId)
            else next.delete(sectionId)

            return next
        })
    }

    function closeSections() {
        setOpenSectionIds(new Set())
    }

    function reorderSections(event: DragEndEvent) {
        const { active, over } = event

        if (!over || active.id === over.id) return

        setSections((current) => {
            const oldIndex = current.findIndex((section) => section.id === active.id)
            const newIndex = current.findIndex((section) => section.id === over.id)

            if (oldIndex === -1 || newIndex === -1) return current

            return arrayMove(current, oldIndex, newIndex)
        })
    }

    return {
        sections,
        openSectionIds,
        addSection,
        removeSection,
        setSectionOpen,
        closeSections,
        reorderSections,
    }
}
