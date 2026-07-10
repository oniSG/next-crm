'use client'

import * as React from 'react'
import Link from 'next/link'

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import { ChevronRightIcon } from 'lucide-react'

export type NavSubItem = {
    title: string
    url: string
    isActive?: boolean
}

export type NavItem = {
    title: string
    url: string
    icon?: React.ReactNode
    isActive?: boolean
    items?: NavSubItem[]
}

function CollapsibleNavItem({ item }: { item: NavItem }) {
    const [userOpen, setUserOpen] = React.useState(false)
    const open = item.isActive || userOpen

    return (
        <Collapsible
            open={open}
            onOpenChange={setUserOpen}
            className="group/collapsible"
            render={<SidebarMenuItem />}
        >
            <CollapsibleTrigger
                render={
                    <SidebarMenuButton
                        tooltip={item.title}
                        isActive={item.isActive}
                    />
                }
            >
                {item.icon}
                <span>{item.title}</span>
                <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-open/collapsible:rotate-90" />
            </CollapsibleTrigger>
            <CollapsibleContent>
                <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton
                                isActive={subItem.isActive}
                                render={<Link href={subItem.url} />}
                            >
                                <span>{subItem.title}</span>
                            </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                    ))}
                </SidebarMenuSub>
            </CollapsibleContent>
        </Collapsible>
    )
}

export function NavMain({
    label,
    items,
}: {
    label?: string
    items: NavItem[]
}) {
    return (
        <SidebarGroup>
            {label ? <SidebarGroupLabel>{label}</SidebarGroupLabel> : null}
            <SidebarMenu>
                {items.map((item) => {
                    const hasChildren = !!item.items && item.items.length > 0

                    if (hasChildren) {
                        return <CollapsibleNavItem key={item.title} item={item} />
                    }

                    return (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                tooltip={item.title}
                                isActive={item.isActive}
                                render={<Link href={item.url} />}
                            >
                                {item.icon}
                                <span>{item.title}</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    )
                })}
            </SidebarMenu>
        </SidebarGroup>
    )
}
