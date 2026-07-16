export type TemplateTranslation = 'translated' | 'untranslated' | 'outdated' | null

export type TemplateTag = {
    id: string
    label: string
    color: 'orange' | 'gray' | 'red' | 'green' | 'blue' | 'purple' | 'yellow' | 'pink'
}

export type Template = {
    id: string
    name: string
    createdBy: string
    tags: TemplateTag[]
    createdAt: string
    description: string
    translationState: TemplateTranslation
    active: boolean
}
