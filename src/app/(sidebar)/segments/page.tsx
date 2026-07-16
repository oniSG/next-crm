import PageHeader from '@/components/custom/layout/page-header'
import { DataTable } from '@/components/custom/data-table/data-table'

import { columns } from './columns'
import { segments } from './data'

export default function Page() {
    return (
        <div className="flex h-svh flex-col">
            <PageHeader breadcrumbs={[{ label: 'Segmenty' }]} />
            <DataTable data={segments} columns={columns} />
        </div>
    )
}
