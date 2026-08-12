import PageHeader from '@/components/custom/layout/page-header'

import { ReportEventList } from './report-event'

export default function Page() {
    return (
        <>
            <PageHeader breadcrumbs={[{ label: 'Report události' }]} />
            <div className="flex w-full justify-center p-3">
                <ReportEventList />
            </div>
        </>
    )
}
