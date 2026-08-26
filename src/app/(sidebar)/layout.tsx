import { Suspense } from 'react'

import { AppSidebar } from '@/components/custom/layout/app-sidebar'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <Suspense fallback={null}>{children}</Suspense>
            </SidebarInset>
        </SidebarProvider>
    )
}
