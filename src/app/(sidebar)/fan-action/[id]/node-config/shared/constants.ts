/** Shared Tailwind classes for node-config form fields. */
export const labelClass = 'text-sm font-medium text-muted-foreground'
export const selectTriggerClass = 'w-full border border-border bg-background'
export const sectionTitleClass = 'text-sm font-semibold text-foreground'
export const roundedFieldClass =
    'rounded-3xl border border-border bg-background'
/** Chip used for selected tags / multi-value pills. */
export const tagChipClass =
    'h-auto min-h-8 whitespace-normal rounded-full px-3 py-1.5 text-left text-xs font-normal'
/** Dashed drop-zone button (e.g. push image upload). */
export const uploadButtonClass =
    'flex w-full cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-muted/30 px-4 py-8 text-center text-sm text-muted-foreground transition-colors hover:bg-muted/50'

/** Select options for add/remove tag sheets. */
export const TAG_OPTIONS = [
    'VIP',
    'VIP GOLD',
    'Silver',
    'PARTNER',
    'INFLUENCER',
    'onboarding',
    'newsletter opt-in',
    'churn risk',
    'season 25/26',
] as const

/** Email template ids available in the email sheet. */
export const EMAIL_TEMPLATES = [
    'welcome-email',
    'event-reminder',
    'newsletter',
] as const

/** Custom attribute field keys for the custom-attribute sheet. */
export const CUSTOM_ATTRIBUTE_FIELDS = [
    'medicalRecords',
    'dietaryRestrictions',
    'emergencyContact',
    'tshirtSize',
    'membershipLevel',
    'vipTier',
    'preferredLanguage',
    'internalNotes',
] as const

/** Wait interval unit options (value stored in config, label shown in UI). */
export const WAIT_INTERVAL_UNITS = [
    { value: 'minutes', label: 'minut' },
    { value: 'hours', label: 'hodin' },
    { value: 'days', label: 'dní' },
    { value: 'weeks', label: 'týdnů' },
] as const

/** Loyalty credit type options for loyalty-points-by-type sheet. */
export const LOYALTY_CREDIT_TYPES = [
    { value: 'app-login', label: 'Přihlášení do aplikace' },
    { value: 'eshop-payment', label: 'Eshop (zaplacení)' },
    { value: 'ticket-payment', label: 'Vstupenky (zaplacení)' },
    { value: 'membership', label: 'Členství' },
    { value: 'manual', label: 'Manuální přičtení' },
    { value: 'event', label: 'Akce' },
] as const

/** Date property options for exact-date / event-date-occurs triggers. */
export const DATE_PROPERTIES = [
    { value: 'holiday', label: 'Datum svátku' },
    { value: 'birthday', label: 'Datum narození' },
    { value: 'membership-expiry', label: 'Konec platnosti členství' },
] as const

/** Offset direction relative to a date property (+/− days). */
export const DAY_OFFSET_OPERATORS = [
    { value: '+', label: '+' },
    { value: '-', label: '−' },
] as const

/** Profile fields watched by the data-change trigger. */
export const DATA_CHANGE_FIELDS = [
    { value: 'last-name', label: 'Příjmení' },
    { value: 'first-name', label: 'Jméno' },
    { value: 'email', label: 'E-mail' },
    { value: 'phone', label: 'Telefon' },
    { value: 'city', label: 'Město' },
] as const

/** Reward transfer type options for reward-conversion sheet. */
export const REWARD_TRANSFER_TYPES = [
    { value: 'points', label: 'Věrnostní body' },
    { value: 'credit', label: 'Kredit' },
    { value: 'voucher', label: 'Voucher' },
] as const

/** Merge-tag token insertable into SMS / push / email body. */
export type WorkflowMergeTag = {
    token: string
    label: string
}

/** Extra SMS-only links shown alongside general merge tags. */
export const SMS_SPECIAL_LINKS: WorkflowMergeTag[] = [
    { token: '{{unsubscribe_link}}', label: 'Odkaz pro odhlášení' },
]

/** Visitor / company / event merge tags for message body editors. */
export function workflowMergeTags(): WorkflowMergeTag[] {
    return [
        { token: '{{visitor_email}}', label: 'E-mail návštěvníka' },
        { token: '{{visitor_title}}', label: 'Titul návštěvníka' },
        { token: '{{first_name}}', label: 'Jméno' },
        { token: '{{last_name}}', label: 'Příjmení' },
        {
            token: '{{salutation_first_name}}',
            label: 'Oslovení jménem (pro ČJ)',
        },
        {
            token: '{{salutation_last_name}}',
            label: 'Oslovení příjmením (pro ČJ)',
        },
        {
            token: '{{salutation_informal}}',
            label: 'Oslovení (neformální)',
        },
        {
            token: '{{salutation_formal}}',
            label: 'Oslovení (formální, pokud je vyplněno pohlaví)',
        },
        { token: '{{company_name}}', label: 'Jméno společnosti' },
        { token: '{{company_address}}', label: 'Adresa společnosti' },
        { token: '{{company_id}}', label: 'IČO společnosti' },
        {
            token: '{{next_home_event_date}}',
            label: 'Datum následující domácí události',
        },
        {
            token: '{{next_home_event_time}}',
            label: 'Čas následující domácí události',
        },
        {
            token: '{{next_home_event_name}}',
            label: 'Název příští domácí události',
        },
        { token: '{{current_points}}', label: 'Aktuální počet bodů' },
        { token: '{{credited_points}}', label: 'Počet připsaných bodů' },
    ]
}
