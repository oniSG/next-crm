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
    icon?: React.ReactNode
    isActive?: boolean
    items?: NavSubItem[]
}

export type NavSection = {
    label: string
    items: NavSubItem[]
}

export type NavItem = {
    title: string
    url: string
    icon?: React.ReactNode
    isActive?: boolean
    items?: NavSubItem[]
    sections?: NavSection[]
}

function SubNavLink({ item }: { item: NavSubItem }) {
    return (
        <SidebarMenuSubItem>
            <SidebarMenuSubButton
                isActive={item.isActive}
                render={<Link href={item.url} />}
            >
                {item.icon}
                <span>{item.title}</span>
            </SidebarMenuSubButton>
        </SidebarMenuSubItem>
    )
}

function useCollapsibleOpen(isActive?: boolean) {
    const [open, setOpen] = React.useState(!!isActive)

    React.useEffect(() => {
        if (isActive) setOpen(true)
    }, [isActive])

    return [open, setOpen] as const
}

function NestedCollapsibleSubItem({ item }: { item: NavSubItem }) {
    const [open, setOpen] = useCollapsibleOpen(item.isActive)

    return (
        <Collapsible
            open={open}
            onOpenChange={setOpen}
            className="group/nested-collapsible"
            render={<SidebarMenuSubItem />}
        >
            <CollapsibleTrigger
                nativeButton={false}
                render={
                    <SidebarMenuSubButton isActive={item.isActive} />
                }
            >
                {item.icon}
                <span>{item.title}</span>
                <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-open/nested-collapsible:rotate-90" />
            </CollapsibleTrigger>
            <CollapsibleContent>
                <SidebarMenuSub className="mr-0 border-l-0 px-0">
                    {item.items?.map((child) => (
                        <SubNavLink key={child.title} item={child} />
                    ))}
                </SidebarMenuSub>
            </CollapsibleContent>
        </Collapsible>
    )
}

function renderSubItems(items: NavSubItem[]) {
    return items.map((subItem) =>
        subItem.items && subItem.items.length > 0 ? (
            <NestedCollapsibleSubItem key={subItem.title} item={subItem} />
        ) : (
            <SubNavLink key={subItem.title} item={subItem} />
        ),
    )
}

function CollapsibleNavItem({ item }: { item: NavItem }) {
    const [open, setOpen] = useCollapsibleOpen(item.isActive)

    return (
        <Collapsible
            open={open}
            onOpenChange={setOpen}
            className="group/collapsible"
            render={<SidebarMenuItem />}
        >
            <CollapsibleTrigger
                render={
                    <SidebarMenuButton tooltip={item.title} isActive={item.isActive} />
                }
            >
                {item.icon}
                <span>{item.title}</span>
                <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-open/collapsible:rotate-90" />
            </CollapsibleTrigger>
            <CollapsibleContent>
                {item.sections ? (
                    <div className="ml-3.5 flex translate-x-px flex-col gap-2 border-l border-sidebar-border px-2.5 py-1">
                        {item.sections.map((section) => (
                            <div key={section.label} className="flex flex-col gap-0.5">
                                <span className="text-muted-foreground px-2 pt-1 pb-0.5 text-xs font-medium">
                                    {section.label}
                                </span>
                                <SidebarMenuSub className="mx-0 translate-x-0 border-l-0 px-0 py-0">
                                    {renderSubItems(section.items)}
                                </SidebarMenuSub>
                            </div>
                        ))}
                    </div>
                ) : (
                    <SidebarMenuSub>{renderSubItems(item.items ?? [])}</SidebarMenuSub>
                )}
            </CollapsibleContent>
        </Collapsible>
    )
}

export function NavMain({ label, items }: { label?: string; items: NavItem[] }) {
    return (
        <SidebarGroup>
            {label ? <SidebarGroupLabel>{label}</SidebarGroupLabel> : null}
            <SidebarMenu>
                {items.map((item) => {
                    const hasChildren =
                        (!!item.items && item.items.length > 0) ||
                        (!!item.sections && item.sections.length > 0)

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
