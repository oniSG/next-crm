import type { LucideIcon } from 'lucide-react'
import {
    CalendarIcon,
    CircleDotIcon,
    Grid3X3Icon,
    ListOrderedIcon,
    StarIcon,
    TypeIcon,
} from 'lucide-react'

export type QuestionType =
    'text' | 'selection' | 'rating' | 'date' | 'linear-scale' | 'answer-grid'

export type QuestionTypeOption = {
    value: QuestionType
    label: string
    icon: LucideIcon
}

export type SelectionOption = {
    id: string
    label: string
    allowSecondaryText: boolean
    secondaryTextRequired: boolean
}

export type SurveyQuestion = {
    id: string
    isNew?: boolean
    name: string
    description: string
    type: QuestionType
    required: boolean
    starCount: number
    rateCount: number
    textStart: string
    textEnd: string
    rows: string[]
    columns: string[]
    checkMoreOptions: boolean
    selectionOptions: SelectionOption[]
}

export type SurveySection = {
    id: string
    name: string
    questions: SurveyQuestion[]
}

export type SurveyFormData = {
    name: string
    description: string
    thankYouMessage: string
    expireDate: string
    sharePublicly: boolean
    linkValidity: number
    shareEmails: string[]
    color: string
    multiple: boolean
    showLogo: boolean
    sections: SurveySection[]
}

export const QUESTION_TYPE_OPTIONS: QuestionTypeOption[] = [
    { value: 'text', label: 'Text', icon: TypeIcon },
    { value: 'selection', label: 'Selection', icon: CircleDotIcon },
    { value: 'rating', label: 'Rating', icon: StarIcon },
    { value: 'date', label: 'Date', icon: CalendarIcon },
    { value: 'linear-scale', label: 'Linear scale', icon: ListOrderedIcon },
    { value: 'answer-grid', label: 'Answer grid', icon: Grid3X3Icon },
]
