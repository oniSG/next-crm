import PageHeader from '@/components/custom/layout/page-header'

import { columns } from './columns'
import { segments } from './data'
import { SegmentsTable } from './segments-table'

export default function Page() {
    return (
        <>
            <PageHeader breadcrumbs={[{ label: 'Segmenty' }]} />
            <SegmentsTable data={segments} columns={columns} />
        </>
    )
}
