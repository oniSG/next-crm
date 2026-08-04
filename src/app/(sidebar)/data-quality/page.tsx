import PageHeader from '@/components/custom/layout/page-header'

import { DataQuality } from './data-quality'
import { PageActions } from './page-actions'

export default function Page() {
    return (
        <>
            <PageHeader breadcrumbs={[{ label: 'Data quality' }]}>
                <PageActions />
            </PageHeader>
            <div className="flex w-full justify-center p-3">
                <DataQuality />
            </div>
        </>
    )
}
