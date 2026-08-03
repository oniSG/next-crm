export type PermissionModule = 'basic' | 'fans' | 'business' | 'mobile'

export type PermissionDefinition = {
    id: string
    title: string
    description: string
}

export type PermissionCategory = {
    id: string
    title: string
    module: PermissionModule
    permissions: PermissionDefinition[]
}

export type PermissionMask = {
    id: string
    name: string
    description: string
    permissions: string[]
}

export type UserEditData = {
    id: string
    name: string
    surname: string
    email: string
    phoneNumber: string
    bannerUrl: string | null
    salesRepresentative: boolean
    active: boolean
    receiveManagerialReport: boolean
    tagIds: string[]
    security: {
        twoFactorAuthenticationStatus: boolean
        twoFactorAuthenticationRequired: boolean
        passwordChangeRequired: boolean
    }
    permissionMaskId: string | null
    permissions: Record<string, boolean>
}

export type UserEditTag = {
    id: string
    name: string
}

export type PermissionModuleVisibility = Record<
    Exclude<PermissionModule, 'basic'>,
    boolean
>

export type PermissionSettingsCategory = {
    title: string
    permissions: ReadonlyArray<readonly [string, string, string]>
}

export function getPermissionIds(module: string): string[] {
    if (module === 'basic') {
        return BASIC_PERMISSION_CATEGORIES.flatMap((category) =>
            category.permissions.map(([id]) => id),
        )
    }

    const categories =
        module === 'fans'
            ? FANS_PERMISSION_CATEGORIES
            : module === 'business'
              ? BUSINESS_PERMISSION_CATEGORIES
              : MOBILE_PERMISSION_CATEGORIES

    return categories.flatMap(([, permissionIds]) => [...permissionIds])
}

export function createPermissionState(mask: string) {
    return Object.fromEntries(
        ALL_PERMISSION_IDS.map((id) => {
            const isReadable = id.startsWith('view') || id.startsWith('detail')
            const isEditable =
                isReadable || id.startsWith('edit') || id.startsWith('insert')

            return [
                id,
                mask === 'administrator' || (mask === 'editor' ? isEditable : isReadable),
            ]
        }),
    ) as Record<string, boolean>
}

export function createPermissionDefinition(id: string) {
    const title = id
        .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
        .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
        .replace(/^./, (character) => character.toUpperCase())

    return [id, title, `Allow this user to ${title.toLowerCase()}.`] as const
}

export function filterPermissionCategories(
    categories: PermissionSettingsCategory[],
    query: string,
) {
    const normalizedQuery = query.trim().toLowerCase()
    if (!normalizedQuery) return categories

    return categories
        .map((category) => {
            if (category.title.toLowerCase().includes(normalizedQuery)) {
                return category
            }

            return {
                ...category,
                permissions: category.permissions.filter(
                    ([id, title, description]) =>
                        id.toLowerCase().includes(normalizedQuery) ||
                        title.toLowerCase().includes(normalizedQuery) ||
                        description.toLowerCase().includes(normalizedQuery),
                ),
            }
        })
        .filter((category) => category.permissions.length > 0)
}
import {
    ALL_PERMISSION_IDS,
    BASIC_PERMISSION_CATEGORIES,
    BUSINESS_PERMISSION_CATEGORIES,
    FANS_PERMISSION_CATEGORIES,
    MOBILE_PERMISSION_CATEGORIES,
} from './data'
