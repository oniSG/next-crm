import PageHeader from '@/components/custom/layout/page-header'
import { DataTable } from '@/components/custom/data-table/data-table'

import { columns } from './columns'
import { templates } from './data'

export default function Page() {
    return (
        <div className="flex h-svh flex-col">
            <PageHeader breadcrumbs={[{ label: 'Šablony' }]} />
            <DataTable data={templates} columns={columns} />
        </div>
    )
}
