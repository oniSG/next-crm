import { EmailSend } from '@/app/(sidebar)/email-send/email-send'

import { PrintShell, type PrintPageSettings } from '../components/print-shell'

const printPageSettings: PrintPageSettings = {
    title: 'Email send',
    description: 'Míra prokliků od pondělí do neděle.',
    body: <EmailSend />,
}

export default function PrintEmailSendPage() {
    return <PrintShell {...printPageSettings} />
}
