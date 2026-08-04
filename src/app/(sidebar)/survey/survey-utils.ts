import type { SurveyFormData, SurveyQuestion, SurveySection } from './temp'

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
        sections: [createDefaultSection()],
    }
}
