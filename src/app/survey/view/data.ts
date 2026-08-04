import { createDefaultQuestion } from '@/app/(sidebar)/survey/survey-utils'
import type {
    SelectionOption,
    SurveyFormData,
    SurveyQuestion,
} from '@/app/(sidebar)/survey/temp'

function question(id: string, values: Partial<SurveyQuestion>): SurveyQuestion {
    return { ...createDefaultQuestion(id), ...values }
}

function option(
    id: string,
    label: string,
    values: Partial<SelectionOption> = {},
): SelectionOption {
    return {
        id,
        label,
        allowSecondaryText: false,
        secondaryTextRequired: false,
        ...values,
    }
}

export const SURVEY_VIEW_DATA: SurveyFormData = {
    name: 'Matchday experience survey',
    description:
        'Help us improve your stadium visit. Completing the survey takes only a few minutes.',
    thankYouMessage: 'Thank you for sharing your feedback.',
    expireDate: '2026-09-30',
    sharePublicly: true,
    linkValidity: 30,
    shareEmails: [],
    color: '#c71eb3',
    multiple: true,
    showLogo: true,
    sections: [
        {
            id: 'section-1',
            name: 'Basic information',
            questions: [
                question('question-1', {
                    name: 'What did you enjoy most about your visit?',
                    description: 'Share your experience in your own words.',
                    type: 'text',
                    required: true,
                }),
                question('question-2', {
                    name: 'When did you attend the event?',
                    description: 'Select the date of your visit.',
                    type: 'date',
                    required: false,
                }),
                question('question-3', {
                    name: 'How would you rate the overall experience?',
                    description: 'Choose from one to five stars.',
                    type: 'rating',
                    required: true,
                    starCount: 5,
                }),
                question('question-4', {
                    name: 'How would you rate the atmosphere?',
                    description: 'This question demonstrates a ten-star rating.',
                    type: 'rating',
                    required: false,
                    starCount: 10,
                }),
            ],
        },
        {
            id: 'section-2',
            name: 'Services and preferences',
            questions: [
                question('question-1', {
                    name: 'Which service did you use most?',
                    description: 'Select one option.',
                    type: 'selection',
                    required: true,
                    multipleSelection: false,
                    selectionOptions: [
                        option('option-1', 'Refreshments'),
                        option('option-2', 'Fan shop'),
                        option('option-3', 'Parking'),
                        option('option-4', 'Other', {
                            allowSecondaryText: true,
                        }),
                    ],
                }),
                question('question-2', {
                    name: 'Which areas should we improve?',
                    description: 'Select all applicable options.',
                    type: 'selection',
                    required: false,
                    multipleSelection: true,
                    selectionOptions: [
                        option('option-1', 'Queue times'),
                        option('option-2', 'Food selection'),
                        option('option-3', 'Signage'),
                        option('option-4', 'Other', {
                            allowSecondaryText: true,
                            secondaryTextRequired: true,
                        }),
                    ],
                }),
            ],
        },
        {
            id: 'section-3',
            name: 'Detailed evaluation',
            questions: [
                question('question-1', {
                    name: 'Would you recommend the event?',
                    description: 'A compact three-point linear scale.',
                    type: 'linear-scale',
                    required: true,
                    rateCount: 3,
                    textStart: 'Definitely not',
                    textEnd: 'Definitely yes',
                }),
                question('question-2', {
                    name: 'How likely are you to visit again?',
                    description: 'A detailed eight-point linear scale.',
                    type: 'linear-scale',
                    required: false,
                    rateCount: 8,
                    textStart: 'Not likely',
                    textEnd: 'Very likely',
                }),
                question('question-3', {
                    name: 'Rate each part of your visit',
                    description: 'Choose one answer in every row.',
                    type: 'answer-grid',
                    required: true,
                    rows: ['Venue', 'Staff', 'Refreshments', 'Atmosphere'],
                    columns: ['Poor', 'Fair', 'Good', 'Excellent'],
                    checkMoreOptions: false,
                }),
                question('question-4', {
                    name: 'Detailed 10 × 10 evaluation grid',
                    description:
                        'This maximum-size grid allows multiple answers in every row.',
                    type: 'answer-grid',
                    required: false,
                    rows: Array.from({ length: 10 }, (_, index) => `Area ${index + 1}`),
                    columns: Array.from(
                        { length: 10 },
                        (_, index) => `Option ${index + 1}`,
                    ),
                    checkMoreOptions: true,
                }),
            ],
        },
    ],
}
