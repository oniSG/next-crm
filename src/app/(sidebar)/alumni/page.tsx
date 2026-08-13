import PageHeader from '@/components/custom/layout/page-header'

import { Alumni } from './alumni'
import { PageActions } from './page-actions'

export default function Page() {
    return (
        <>
            <PageHeader breadcrumbs={[{ label: 'Alumni' }]}>
                <PageActions />
            </PageHeader>
            <div className="flex w-full justify-center p-3">
                <Alumni />
            </div>
        </>
    )
}
