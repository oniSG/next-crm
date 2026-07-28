import PageHeader from '@/components/custom/layout/page-header'

import { ReportFanGeneral } from './report-fan-general'

export default function Page() {
    return (
        <>
            <PageHeader breadcrumbs={[{ label: 'Global analytics' }]} />
            <div className="flex w-full justify-center p-3">
                <ReportFanGeneral />
            </div>
        </>
    )
}
