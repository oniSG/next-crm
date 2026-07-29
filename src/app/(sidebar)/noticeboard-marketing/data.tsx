import emailCampaignFlow from './data/email-campaign-flow.json'

export type NoticeboardMetric = {
    title: string
    value: string
}

export type NoticeboardDetail = {
    title: string
    rows: { label: string; value: string }[]
}

export const NOTICEBOARD_METRICS: NoticeboardMetric[] = [
    { title: 'Úspěšnost e-mailů', value: '5,76 %' },
]

export const NOTICEBOARD_DETAILS: NoticeboardDetail[] = [
    {
        title: 'Relatoo index',
        rows: [
            { label: 'Relatoo index', value: '3,65' },
            { label: 'Stav', value: 'Dobrý' },
        ],
    },
]

export const EMAIL_CAMPAIGN_FLOW = emailCampaignFlow
