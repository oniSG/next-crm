import { DataQuality } from '@/app/(sidebar)/data-quality/data-quality'

import { PrintShell, type PrintPageSettings } from '../components/print-shell'

const printPageSettings: PrintPageSettings = {
    title: 'Data quality',
    description: 'Přehled kvality dat fanoušků.',
    body: <DataQuality />,
}

export default function PrintDataQualityPage() {
    return <PrintShell {...printPageSettings} />
}
