import Link from 'next/link';
import PageHeader from '@/components/custom/layout/page-header';

export default function Page() {
    return (
        <>
            <PageHeader breadcrumbs={[{ label: 'Users' }]}></PageHeader>
            <div className="flex w-full p-3">
                <Link href={"/user/edit"}>Edit user</Link>
            </div>
        </>
    )
}
