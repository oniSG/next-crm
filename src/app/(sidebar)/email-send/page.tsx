import PageHeader from '@/components/custom/layout/page-header'

import { EmailSend } from './email-send'
import { PageActions } from './page-actions'

export default function Page() {
    return (
        <>
            <PageHeader breadcrumbs={[{ label: 'Email send' }]}>
                <PageActions />
            </PageHeader>
            <div className="flex w-full justify-center p-3">
                <EmailSend />
            </div>
        </>
    )
}
