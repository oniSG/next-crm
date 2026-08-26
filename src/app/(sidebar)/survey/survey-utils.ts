import type { SurveyFormData, SurveyQuestion, SurveySection } from './temp'

export function getTodayDateInputValue() {
    const parts = new Intl.DateTimeFormat('en', {
        timeZone: 'Europe/Prague',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).formatToParts(new Date())
    const values = Object.fromEntries(parts.map((part) => [part.type, part.value]))

    return `${values.year}-${values.month}-${values.day}`
}

export function createDefaultSelectionOptions(): SurveyQuestion['selectionOptions'] {
    return [
        {
            id: 'option-1',
            label: 'Option 1',
            allowSecondaryText: false,
            secondaryTextRequired: false,
        },
        {
            id: 'option-2',
            label: 'Option 2',
            allowSecondaryText: false,
            secondaryTextRequired: false,
        },
    ]
}

export function createDefaultQuestion(id = 'question-1', isNew = false): SurveyQuestion {
    return {
        id,
        isNew,
        name: '',
        description: '',
        type: 'text',
        required: false,
        starCount: 5,
        rateCount: 5,
        textStart: '',
        textEnd: '',
        rows: ['Row 1'],
        columns: ['Column 1', 'Column 2'],
        checkMoreOptions: false,
        selectionOptions: createDefaultSelectionOptions(),
        multipleSelection: false,
    }
}

export function createDefaultSection(id = 'section-1'): SurveySection {
    return {
        id,
        name: '',
        questions: [createDefaultQuestion()],
    }
}

export function createDefaultSurveyData(): SurveyFormData {
    const firstSection = createDefaultSection()
    firstSection.name = 'Untitled section'
    firstSection.questions[0].name = 'Untitled question'
    firstSection.questions[0].description = 'Optional question description'

    return {
        name: 'Untitled survey',
        description: '',
        thankYouMessage: '',
        expireDate: '',
        sharePublicly: false,
        linkValidity: 30,
        shareEmails: [],
        color: '#7EC71E',
        multiple: false,
        showLogo: false,
        sections: [firstSection],
    }
}
