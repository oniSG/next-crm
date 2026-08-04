import { NoticeboardMarketing } from '@/app/(sidebar)/noticeboard-marketing/noticeboard-marketing'

import { PrintShell } from '../components/print-shell'

export default async function PrintNoticeboardMarketingPage({
    searchParams,
}: {
    searchParams: Promise<{ headerVisible?: string }>
}) {
    const { headerVisible } = await searchParams
    const showReportHeader = headerVisible === 'true'

    return (
        <PrintShell
            title="Noticeboard marketing"
            description="Přehled noticeboard marketingu."
            showHeading={!showReportHeader}
            body={<NoticeboardMarketing />}
        />
    )
}
