import PageHeader from '@/components/custom/layout/page-header'

import { PrehledEmailu } from './prehled_emailu'

export default function Page() {
    return (
        <>
            <PageHeader breadcrumbs={[{ label: 'Přehled e-mailů' }]} />
            <div className="flex w-full justify-center p-3">
                <PrehledEmailu />
            </div>
        </>
    )
}
