import type { NavItem } from '@/components/nav-main'

export type NavGroup = {
    label?: string
    items: NavItem[]
}

function pathMatches(itemUrl: string, currentPath: string): boolean {
    if (!itemUrl || itemUrl === '#') return false
    if (itemUrl === currentPath) return true
    return currentPath.startsWith(itemUrl + '/')
}

export function markActive(groups: NavGroup[], pathname: string): NavGroup[] {
    return groups.map((group) => ({
        ...group,
        items: group.items.map((item) => {
            if (item.items && item.items.length > 0) {
                const markedSubs = item.items.map((sub) => ({
                    ...sub,
                    isActive: pathMatches(sub.url, pathname),
                }))
                return {
                    ...item,
                    items: markedSubs,
                    isActive: markedSubs.some((s) => s.isActive),
                }
            }
            return { ...item, isActive: pathMatches(item.url, pathname) }
        }),
    }))
}
