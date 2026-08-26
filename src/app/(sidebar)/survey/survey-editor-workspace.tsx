'use client'

import { useState } from 'react'
import { Settings2Icon } from 'lucide-react'
import { arrayMove } from '@dnd-kit/sortable'

import PageHeader from '@/components/custom/layout/page-header'
import { SaveCancelActions } from '@/components/custom/other/save-cancel-actions'
import { SurveyPreview } from '@/components/custom/survey/survey-preview'
import { Button } from '@/components/ui/button'

import {
    DetailSettingsColumn,
    DetailSettingsSheet,
    type QuestionSelection,
} from './survey-editor-details'
import {
    BasicSettingsColumn,
    BasicSettingsSheet,
    ResizableSettingsColumn,
} from './survey-editor-settings'
import { createDefaultQuestion, createDefaultSection } from './survey-utils'
import type { SurveyFormData, SurveyQuestion } from './temp'

type SelectedQuestion = { sectionId: string; questionId: string }

export function SurveyEditorWorkspace({
    initialData,
    mode,
    previewDate,
}: {
    initialData: SurveyFormData
    mode: 'create' | 'edit'
    previewDate: string
}) {
    const [savedSurvey, setSavedSurvey] = useState(initialData)
    const [survey, setSurvey] = useState(initialData)
    const [selectedQuestion, setSelectedQuestion] = useState<SelectedQuestion | null>(
        null,
    )
    const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null)
    const [mobileSettingsOpen, setMobileSettingsOpen] = useState(false)
    const [mobileDetailsOpen, setMobileDetailsOpen] = useState(false)
    const dirty = JSON.stringify(survey) !== JSON.stringify(savedSurvey)
    const questionSelection = selectedQuestion
        ? findQuestion(survey, selectedQuestion)
        : undefined
    const sectionSelection = selectedSectionId
        ? survey.sections.find((section) => section.id === selectedSectionId)
        : undefined

    function changeSurvey(values: Partial<SurveyFormData>) {
        setSurvey((current) => ({ ...current, ...values }))
    }

    function changeQuestion(values: Partial<SurveyQuestion>) {
        if (!selectedQuestion) return
        setSurvey((current) => ({
            ...current,
            sections: current.sections.map((section) =>
                section.id !== selectedQuestion.sectionId
                    ? section
                    : {
                          ...section,
                          questions: section.questions.map((question) =>
                              question.id === selectedQuestion.questionId
                                  ? { ...question, ...values }
                                  : question,
                          ),
                      },
            ),
        }))
    }

    function changeSectionName(sectionId: string, name: string) {
        setSurvey((current) => ({
            ...current,
            sections: current.sections.map((section) =>
                section.id === sectionId ? { ...section, name } : section,
            ),
        }))
    }

    function addSection() {
        const sectionId = `section-${crypto.randomUUID()}`
        const questionId = `question-${crypto.randomUUID()}`
        const section = createDefaultSection(sectionId)
        section.name = 'Untitled section'
        const question = createDefaultQuestion(questionId, true)
        question.name = 'Untitled question'
        question.description = 'Optional question description'
        section.questions = [question]
        setSurvey((current) => ({ ...current, sections: [...current.sections, section] }))
        selectQuestion(sectionId, questionId)
    }

    function addQuestion(sectionId: string, afterQuestionId?: string) {
        const question = createDefaultQuestion(`question-${crypto.randomUUID()}`, true)
        question.name = 'Untitled question'
        question.description = 'Optional question description'
        setSurvey((current) => ({
            ...current,
            sections: current.sections.map((section) =>
                section.id === sectionId
                    ? {
                          ...section,
                          questions: insertQuestionAfter(
                              section.questions,
                              question,
                              afterQuestionId,
                          ),
                      }
                    : section,
            ),
        }))
        selectQuestion(sectionId, question.id)
    }

    function removeSection(sectionId: string) {
        if (survey.sections.length === 1) return
        setSurvey((current) => ({
            ...current,
            sections: current.sections.filter((section) => section.id !== sectionId),
        }))
        if (selectedQuestion?.sectionId === sectionId) setSelectedQuestion(null)
        if (selectedSectionId === sectionId) setSelectedSectionId(null)
        if (
            selectedQuestion?.sectionId === sectionId ||
            selectedSectionId === sectionId
        ) {
            setMobileDetailsOpen(false)
        }
    }

    function removeQuestion(sectionId: string, questionId: string) {
        const section = survey.sections.find((item) => item.id === sectionId)
        if (!section || section.questions.length === 1) return
        setSurvey((current) => ({
            ...current,
            sections: current.sections.map((item) =>
                item.id === sectionId
                    ? {
                          ...item,
                          questions: item.questions.filter(
                              (question) => question.id !== questionId,
                          ),
                      }
                    : item,
            ),
        }))
        if (
            selectedQuestion?.sectionId === sectionId &&
            selectedQuestion.questionId === questionId
        ) {
            setSelectedQuestion(null)
            setMobileDetailsOpen(false)
        }
    }

    function reorderSections(activeId: string, overId: string) {
        setSurvey((current) => {
            const oldIndex = current.sections.findIndex(
                (section) => section.id === activeId,
            )
            const newIndex = current.sections.findIndex(
                (section) => section.id === overId,
            )
            return oldIndex === -1 || newIndex === -1
                ? current
                : {
                      ...current,
                      sections: arrayMove(current.sections, oldIndex, newIndex),
                  }
        })
    }

    function reorderQuestions(sectionId: string, activeId: string, overId: string) {
        setSurvey((current) => ({
            ...current,
            sections: current.sections.map((section) => {
                if (section.id !== sectionId) return section
                const oldIndex = section.questions.findIndex(
                    (question) => question.id === activeId,
                )
                const newIndex = section.questions.findIndex(
                    (question) => question.id === overId,
                )
                return oldIndex === -1 || newIndex === -1
                    ? section
                    : {
                          ...section,
                          questions: arrayMove(section.questions, oldIndex, newIndex),
                      }
            }),
        }))
    }

    function selectQuestion(sectionId: string, questionId: string) {
        setSelectedSectionId(null)
        setSelectedQuestion({ sectionId, questionId })
        setMobileDetailsOpen(window.matchMedia('(max-width: 1023px)').matches)
    }

    function selectSection(sectionId: string) {
        setSelectedQuestion(null)
        setSelectedSectionId(sectionId)
        setMobileDetailsOpen(window.matchMedia('(max-width: 1023px)').matches)
    }

    function showGeneralSettings() {
        setSelectedQuestion(null)
        setSelectedSectionId(null)
        setMobileDetailsOpen(false)
        if (window.matchMedia('(max-width: 1023px)').matches) {
            setMobileSettingsOpen(true)
        }
    }

    function closeDetails(open: boolean) {
        if (open) return
        setMobileDetailsOpen(false)
        setSelectedQuestion(null)
        setSelectedSectionId(null)
    }

    return (
        <>
            <PageHeader
                breadcrumbs={[
                    { label: 'Surveys', href: '/survey' },
                    { label: mode === 'create' ? 'Create survey' : savedSurvey.name },
                ]}
            >
                <Button
                    type="button"
                    variant="ghost"
                    className="lg:hidden"
                    onClick={showGeneralSettings}
                >
                    <Settings2Icon />
                    Settings
                </Button>
            </PageHeader>
            <div className="bg-muted/25 min-h-[calc(100dvh-3rem)] lg:grid lg:grid-cols-[minmax(0,1fr)_auto]">
                <div className="mx-auto flex w-full max-w-4xl min-w-0 justify-center p-4 lg:col-start-1 lg:row-start-1 xl:p-8">
                    <SurveyPreview
                        survey={survey}
                        readOnly
                        showSubmit={false}
                        sampleAnswerDate={previewDate}
                        selectedQuestion={selectedQuestion}
                        onSelectSurvey={showGeneralSettings}
                        onSelectSection={selectSection}
                        onSelectQuestion={selectQuestion}
                        onAddSection={addSection}
                        onAddQuestion={addQuestion}
                        onRemoveSection={removeSection}
                        onRemoveQuestion={removeQuestion}
                        onReorderSections={reorderSections}
                        onReorderQuestions={reorderQuestions}
                    />
                </div>
                <ResizableSettingsColumn>
                    {questionSelection || sectionSelection ? (
                        <DetailSettingsColumn
                            selection={questionSelection}
                            sectionSelection={sectionSelection}
                            onClose={() => closeDetails(false)}
                            onQuestionChange={changeQuestion}
                            onSectionNameChange={changeSectionName}
                        />
                    ) : (
                        <BasicSettingsColumn
                            survey={survey}
                            minExpireDate={previewDate}
                            onChange={changeSurvey}
                        />
                    )}
                </ResizableSettingsColumn>
                <BasicSettingsSheet
                    survey={survey}
                    minExpireDate={previewDate}
                    open={mobileSettingsOpen}
                    onOpenChange={setMobileSettingsOpen}
                    onChange={changeSurvey}
                />
                <DetailSettingsSheet
                    open={mobileDetailsOpen}
                    selection={questionSelection}
                    sectionSelection={sectionSelection}
                    onOpenChange={closeDetails}
                    onQuestionChange={changeQuestion}
                    onSectionNameChange={changeSectionName}
                />
                <SaveCancelActions
                    open={dirty}
                    onCancel={() => {
                        setSurvey(savedSurvey)
                        closeDetails(false)
                    }}
                    onSave={() => setSavedSurvey(survey)}
                />
            </div>
        </>
    )
}

function findQuestion(
    survey: SurveyFormData,
    selected: SelectedQuestion,
): QuestionSelection | undefined {
    const section = survey.sections.find((item) => item.id === selected.sectionId)
    const question = section?.questions.find((item) => item.id === selected.questionId)
    return section && question
        ? {
              sectionId: section.id,
              questionId: question.id,
              sectionName: section.name,
              question,
          }
        : undefined
}

function insertQuestionAfter(
    questions: SurveyQuestion[],
    question: SurveyQuestion,
    afterQuestionId?: string,
) {
    if (!afterQuestionId) return [...questions, question]
    const index = questions.findIndex((item) => item.id === afterQuestionId)
    return index === -1
        ? [...questions, question]
        : [...questions.slice(0, index + 1), question, ...questions.slice(index + 1)]
}
