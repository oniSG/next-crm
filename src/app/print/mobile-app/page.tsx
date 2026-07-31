import { MobileApp } from '@/app/(sidebar)/mobile-app/mobile-app'

import { PrintShell, type PrintPageSettings } from '../components/print-shell'

const printPageSettings: PrintPageSettings = {
    title: 'Mobile app',
    description: 'Přehled push notifikací a aktivity v mobilní aplikaci.',
    body: <MobileApp />,
}

export default function PrintMobileAppPage() {
    return <PrintShell {...printPageSettings} />
}
