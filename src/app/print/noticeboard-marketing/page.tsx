import { NoticeboardMarketing } from '@/app/(sidebar)/noticeboard-marketing/noticeboard-marketing'

import { PrintShell, type PrintPageSettings } from '../components/print-shell'

const printPageSettings: PrintPageSettings = {
    title: 'Noticeboard marketing',
    description: 'Přehled noticeboard marketingu.',
    body: <NoticeboardMarketing />,
}

export default function PrintNoticeboardMarketingPage() {
    return <PrintShell {...printPageSettings} />
}
