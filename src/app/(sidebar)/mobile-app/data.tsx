import type { ChartConfig } from '@/components/ui/chart'

import mobileAppActivity from './data/mobile-app-activity.json'
import pushNotificationFlow from './data/push-notification-flow.json'

export const PUSH_NOTIFICATION_FLOW = pushNotificationFlow

export const MOBILE_APP_ACTIVITY_SERIES = [
    'unikatniPrihlaseni',
    'prihlaseni',
] as const

export const MOBILE_APP_ACTIVITY_CONFIG = {
    unikatniPrihlaseni: {
        label: 'Unikátní přihlášení',
        color: 'var(--chart-1)',
    },
    prihlaseni: {
        label: 'Přihlášení',
        color: 'var(--chart-2)',
    },
} satisfies ChartConfig

export const MOBILE_APP_ACTIVITY = mobileAppActivity
