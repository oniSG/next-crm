import Link from 'next/link'
import PageHeader from '@/components/custom/layout/page-header'
import { buttonVariants } from '@/components/ui/button'

export default function Page() {
    return (
        <>
            <PageHeader breadcrumbs={[{ label: 'Surveys' }]}>
                <Link href={'/survey/create'} className={buttonVariants()}>
                    Create survey
                </Link>
            </PageHeader>

            <div className="flex w-full flex-col items-start gap-2 p-3">
                <Link href={'/survey/edit'}>Edit survey</Link>
                <Link href={'/survey/view'}>View survey</Link>
            </div>
        </>
    )
}
