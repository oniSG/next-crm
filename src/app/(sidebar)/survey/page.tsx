import Link from 'next/link'
import PageHeader from '@/components/custom/layout/page-header'
import { Button, buttonVariants } from '@/components/ui/button'

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

                <div className="flex gap-1">
                    {/* TODO */}
                    <Button variant={'outline'}>Preview survey</Button>
                    <Button variant={'outline'}>Delete survey</Button>
                    <Button variant={'outline'}>Duplicate survey</Button>
                    <Button variant={'outline'}>Share survey</Button>
                </div>
            </div>
        </>
    )
}
