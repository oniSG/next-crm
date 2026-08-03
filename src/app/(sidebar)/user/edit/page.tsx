import PageHeader from '@/components/custom/layout/page-header'

import { UserEditForm } from './user-edit-form'

export default function Page() {
    return (
        <>
            <PageHeader
                breadcrumbs={[{ label: 'Users', href: '/user' }, { label: 'Edit user' }]}
            />
            <div className="flex w-full justify-center p-3">
                <UserEditForm />
            </div>
        </>
    )
}
