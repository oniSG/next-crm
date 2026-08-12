'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

export type NavTabItem = {
    label: string
    href: string
}

type NavTabsProps = {
    items: NavTabItem[]
    className?: string
}

export function NavTabs({ items, className }: NavTabsProps) {
    const pathname = usePathname()
    const value =
        items.find((item) => item.href === pathname)?.href ?? items[0]?.href

    return (
        <Tabs value={value} className={cn(className)}>
            <TabsList variant="line">
                {items.map((item) => (
                    <TabsTrigger
                        key={item.href}
                        value={item.href}
                        nativeButton={false}
                        render={<Link href={item.href} />}
                    >
                        {item.label}
                    </TabsTrigger>
                ))}
            </TabsList>
        </Tabs>
    )
}
