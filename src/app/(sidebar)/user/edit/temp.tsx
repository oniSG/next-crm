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
