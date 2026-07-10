import { Fragment, type ReactNode } from 'react'

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'

export type Crumb = {
    label: string
    href?: string
}

type PageHeaderProps = {
    breadcrumbs?: Crumb[]
    children?: ReactNode
}

export default function PageHeader({ breadcrumbs = [], children }: PageHeaderProps) {
    return (
        <header className="sticky top-0 z-10 flex h-12 shrink-0 items-center gap-2 border-b bg-background">
            <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                {breadcrumbs.length > 0 && (
                    <>
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-vertical:h-4 data-vertical:self-auto"
                        />
                        <Breadcrumb>
                            <BreadcrumbList>
                                {breadcrumbs.map((crumb, i) => {
                                    const isLast = i === breadcrumbs.length - 1
                                    return (
                                        <Fragment key={i}>
                                            <BreadcrumbItem
                                                className={cn(
                                                    !isLast && 'hidden md:block',
                                                )}
                                            >
                                                {crumb.href ? (
                                                    <BreadcrumbLink href={crumb.href}>
                                                        {crumb.label}
                                                    </BreadcrumbLink>
                                                ) : (
                                                    <BreadcrumbPage>
                                                        {crumb.label}
                                                    </BreadcrumbPage>
                                                )}
                                            </BreadcrumbItem>
                                            {!isLast && (
                                                <BreadcrumbSeparator className="hidden md:block" />
                                            )}
                                        </Fragment>
                                    )
                                })}
                            </BreadcrumbList>
                        </Breadcrumb>
                    </>
                )}
            </div>
            {children && (
                <div className="ml-auto flex items-center gap-2 px-4">{children}</div>
            )}
        </header>
    )
}
