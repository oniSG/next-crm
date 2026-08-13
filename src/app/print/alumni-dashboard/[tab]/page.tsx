import { notFound } from 'next/navigation'

import { ActivePlayersTab } from '@/app/(sidebar)/alumni-dashboard/aktivni-hraci/active-players-tab'
import { AlumniTab } from '@/app/(sidebar)/alumni-dashboard/alumni/alumni-tab'
import { GraduationRateTab } from '@/app/(sidebar)/alumni-dashboard/graduation-rate/graduation-rate-tab'
import { OverviewTab } from '@/app/(sidebar)/alumni-dashboard/prehled/overview-tab'
import { ReportHeaderCard } from '@/components/custom/statistics/report-header-card'

import { PrintShell, type PrintPageSettings } from '../../components/print-shell'

const TAB_CONTENT = {
    prehled: {
        title: 'Přehled',
        body: <OverviewTab />,
    },
    'graduation-rate': {
        title: 'Graduation rate',
        body: <GraduationRateTab />,
    },
    alumni: { title: 'Alumni', body: <AlumniTab /> },
    'aktivni-hraci': {
        title: 'Aktivní hráči',
        body: <ActivePlayersTab />,
    },
} as const

type AlumniPrintTab = keyof typeof TAB_CONTENT

export default async function PrintAlumniDashboardPage({
    params,
}: {
    params: Promise<{ tab: string }>
}) {
    const { tab } = await params
    const content = TAB_CONTENT[tab as AlumniPrintTab]
    if (!content) notFound()

    const printPageSettings: PrintPageSettings = {
        title: `Alumni dashboard – ${content.title}`,
        description: 'Alumni dashboard.',
        body: (
            <div className="flex w-full max-w-6xl flex-col gap-4">
                <ReportHeaderCard title="Alumni dashboard" />
                {content.body}
            </div>
        ),
    }

    return <PrintShell {...printPageSettings} />
}
