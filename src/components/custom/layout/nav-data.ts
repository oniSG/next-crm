import type { NavItem, NavSection, NavSubItem } from '@/components/nav-main'

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

function markSections(sections: NavSection[], pathname: string): NavSection[] {
    return sections.map((section) => ({
        ...section,
        items: markSubItems(section.items, pathname),
    }))
}

export function markActive(groups: NavGroup[], pathname: string): NavGroup[] {
    return groups.map((group) => ({
        ...group,
        items: group.items.map((item) => {
            if (item.sections && item.sections.length > 0) {
                const markedSections = markSections(item.sections, pathname)
                return {
                    ...item,
                    sections: markedSections,
                    isActive: markedSections.some((section) =>
                        section.items.some((sub) => sub.isActive),
                    ),
                }
            }
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
