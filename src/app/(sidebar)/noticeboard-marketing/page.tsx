import PageHeader from '@/components/custom/layout/page-header'

import { NoticeboardMarketing } from './noticeboard-marketing'
import { PageActions } from './page-actions'

export default function Page() {
    return (
        <>
            <PageHeader breadcrumbs={[{ label: 'Komunikace a akce' }]}>
                <PageActions />
            </PageHeader>
            <div className="flex w-full justify-center p-3">
                <NoticeboardMarketing />
            </div>
        </>
    )
}
