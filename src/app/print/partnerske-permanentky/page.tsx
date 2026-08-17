import { PartnerSeasonTickets } from '@/app/(sidebar)/partnerske-permanentky/partnerske-permanentky'

import { PrintShell, type PrintPageSettings } from '../components/print-shell'

const printPageSettings: PrintPageSettings = {
    title: 'Partnerské permanentky',
    description:
        'Využití partnerských permanentek na událostech, podle kategorií a partnerů.',
    body: <PartnerSeasonTickets />,
}

export default function PrintPartnerSeasonTicketsPage() {
    return <PrintShell {...printPageSettings} />
}
