import { normalizeHexColor } from '@/components/custom/inputs/hex-color-input'

import { createDefaultQuestion } from './survey-utils'
import { QUESTION_TYPE_OPTIONS, type QuestionType, type SurveyFormData } from './temp'

function text(formData: FormData, name: string, fallback = '') {
    const value = formData.get(name)

    return typeof value === 'string' ? value : fallback
}

function checked(formData: FormData, name: string) {
    const value = formData.get(name)

    return value === 'true' || value === 'on' || value === '1'
}

function number(formData: FormData, name: string, fallback: number) {
    const value = Number(text(formData, name))

    return Number.isFinite(value) ? value : fallback
}

function questionType(value: string, fallback: QuestionType) {
    return QUESTION_TYPE_OPTIONS.some((option) => option.value === value)
        ? (value as QuestionType)
        : fallback
}

export function buildSurveyPreviewData(
    form: HTMLFormElement,
    fallback: SurveyFormData,
): SurveyFormData {
    const formData = new FormData(form)
    const sections = []

    for (let sectionIndex = 0; ; sectionIndex++) {
        const sectionPrefix = `sections[${sectionIndex}]`

        if (!formData.has(`${sectionPrefix}[name]`)) break

        const questions = []

        for (let questionIndex = 0; ; questionIndex++) {
            const questionPrefix = `${sectionPrefix}[questions][${questionIndex}]`

            if (!formData.has(`${questionPrefix}[name]`)) break

            const existingQuestion = fallback.sections
                .flatMap((section) => section.questions)
                .at(questionIndex)
            const defaults = createDefaultQuestion(
                `preview-question-${sectionIndex}-${questionIndex}`,
            )
            const type = questionType(
                text(formData, `${questionPrefix}[type]`),
                existingQuestion?.type ?? defaults.type,
            )
            const optionPrefix = `${questionPrefix}[options]`
            const selectionOptions = []

            for (let optionIndex = 0; ; optionIndex++) {
                const name = `${optionPrefix}[${optionIndex}][label]`

                if (!formData.has(name)) break

                selectionOptions.push({
                    id: `preview-option-${sectionIndex}-${questionIndex}-${optionIndex}`,
                    label: text(formData, name),
                    allowSecondaryText: checked(
                        formData,
                        `${optionPrefix}[${optionIndex}][allowSecondaryText]`,
                    ),
                    secondaryTextRequired: checked(
                        formData,
                        `${optionPrefix}[${optionIndex}][secondaryTextRequired]`,
                    ),
                })
            }

            questions.push({
                ...defaults,
                name: text(formData, `${questionPrefix}[name]`),
                description: text(formData, `${questionPrefix}[description]`),
                type,
                required: checked(formData, `${questionPrefix}[required]`),
                starCount: number(formData, `${questionPrefix}[starCount]`, 5),
                rateCount: number(formData, `${questionPrefix}[rateCount]`, 5),
                textStart: text(formData, `${questionPrefix}[textStart]`),
                textEnd: text(formData, `${questionPrefix}[textEnd]`),
                rows: formData
                    .getAll(`${questionPrefix}[rows][]`)
                    .filter((value): value is string => typeof value === 'string'),
                columns: formData
                    .getAll(`${questionPrefix}[columns][]`)
                    .filter((value): value is string => typeof value === 'string'),
                checkMoreOptions: checked(
                    formData,
                    `${questionPrefix}[checkMoreOptions]`,
                ),
                selectionOptions,
                multipleSelection: checked(
                    formData,
                    `${questionPrefix}[multipleSelection]`,
                ),
            })
        }

        sections.push({
            id: `preview-section-${sectionIndex}`,
            name: text(formData, `${sectionPrefix}[name]`),
            questions,
        })
    }

    return {
        name: text(formData, 'name', fallback.name),
        description: text(formData, 'description'),
        thankYouTitle: text(formData, 'thank-you-title', fallback.thankYouTitle),
        thankYouDescription: text(
            formData,
            'thank-you-description',
            fallback.thankYouDescription,
        ),
        showThankYouLogo: fallback.showThankYouLogo,
        thankYouLinkText: fallback.thankYouLinkText,
        thankYouLinkUrl: fallback.thankYouLinkUrl,
        expireDate: text(formData, 'expire-date'),
        sharePublicly: checked(formData, 'share-publicly-after-expiration-date'),
        linkValidity: number(formData, 'link-validity', fallback.linkValidity),
        shareEmails: formData
            .getAll('share-emails[]')
            .filter((value): value is string => typeof value === 'string'),
        tags: fallback.tags,
        color: normalizeHexColor(text(formData, 'customColor')) ?? fallback.color,
        backgroundImage: fallback.backgroundImage,
        multiple: checked(formData, 'multiple'),
        showLogo: checked(formData, 'show-logo'),
        sections,
    }
}
