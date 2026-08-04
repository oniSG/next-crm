import type { NavItem, NavSubItem } from '@/components/nav-main'

export type NavGroup = {
    label?: string
    items: NavItem[]
}

function pathMatches(itemUrl: string, currentPath: string): boolean {
    if (!itemUrl || itemUrl === '#') return false
    if (itemUrl === currentPath) return true
    return currentPath.startsWith(itemUrl + '/')
}

function markSubItems(items: NavSubItem[], pathname: string): NavSubItem[] {
    return items.map((item) => {
        if (item.items && item.items.length > 0) {
            const markedChildren = markSubItems(item.items, pathname)
            return {
                ...item,
                items: markedChildren,
                isActive: markedChildren.some((child) => child.isActive),
            }
        }
        return { ...item, isActive: pathMatches(item.url, pathname) }
    })
}

export function markActive(groups: NavGroup[], pathname: string): NavGroup[] {
    return groups.map((group) => ({
        ...group,
        items: group.items.map((item) => {
            if (item.items && item.items.length > 0) {
                const markedSubs = markSubItems(item.items, pathname)
                return {
                    ...item,
                    items: markedSubs,
                    isActive: markedSubs.some((sub) => sub.isActive),
                }
            }
            return { ...item, isActive: pathMatches(item.url, pathname) }
        }),
    }))
}
