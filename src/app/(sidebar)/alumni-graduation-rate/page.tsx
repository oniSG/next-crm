import PageHeader from '@/components/custom/layout/page-header'

import { AlumniGraduationRate } from './alumni-graduation-rate'
import { PageActions } from './page-actions'

export default function Page() {
    return (
        <>
            <PageHeader breadcrumbs={[{ label: 'Graduation rate' }]}>
                <PageActions />
            </PageHeader>
            <div className="flex w-full justify-center p-3">
                <AlumniGraduationRate />
            </div>
        </>
    )
}
