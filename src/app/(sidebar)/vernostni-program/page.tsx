import PageHeader from '@/components/custom/layout/page-header'

import { PageActions } from './page-actions'
import { VernostniProgram } from './vernostni-program'

export default function Page() {
    return (
        <>
            <PageHeader breadcrumbs={[{ label: 'Věrnostní program' }]}>
                <PageActions />
            </PageHeader>
            <div className="flex w-full justify-center p-3">
                <VernostniProgram />
            </div>
        </>
    )
}
