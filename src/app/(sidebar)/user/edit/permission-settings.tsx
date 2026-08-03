'use client'

import { useState } from 'react'

import { PermissionMaskSettings } from './permission-mask-settings'
import { PermissionTabs } from './permission-tabs'
import { createPermissionState, getPermissionIds } from './temp'

type OptionalPermissionModule = 'fans' | 'business' | 'mobile'

export function PermissionSettings() {
    const [activeTab, setActiveTab] = useState('basic')
    const [permissionSearch, setPermissionSearch] = useState('')
    const [selectedMask, setSelectedMask] = useState('viewer')
    const [permissions, setPermissions] = useState(() => createPermissionState('viewer'))
    const [previousMaskPermissions, setPreviousMaskPermissions] = useState<Record<
        string,
        boolean
    > | null>(null)
    const [previousMask, setPreviousMask] = useState<string | null>(null)
    const [previousBulkPermissions, setPreviousBulkPermissions] = useState<Record<
        string,
        boolean
    > | null>(null)
    const [showFansPermissions, setShowFansPermissions] = useState(true)
    const [showBusinessPermissions, setShowBusinessPermissions] = useState(true)
    const [showMobilePermissions, setShowMobilePermissions] = useState(true)

    function applyPermissionMask(mask: string | null) {
        if (!mask) return

        setPreviousMaskPermissions(permissions)
        setPreviousMask(selectedMask)
        setPermissions(createPermissionState(mask))
        setSelectedMask(mask)
    }

    function undoPermissionMask() {
        if (!previousMaskPermissions) return

        setPermissions(previousMaskPermissions)
        if (previousMask) setSelectedMask(previousMask)
        setPreviousMaskPermissions(null)
        setPreviousMask(null)
    }

    function setPermission(id: string, checked: boolean) {
        setPermissions((current) => ({ ...current, [id]: checked }))
    }

    function setAllActivePermissions(checked: boolean) {
        const activePermissionIds = getPermissionIds(activeTab)
        setPreviousBulkPermissions((checkpoint) => checkpoint ?? permissions)
        setPermissions((current) => {
            const next = { ...current }
            activePermissionIds.forEach((id) => {
                next[id] = checked
            })
            return next
        })
    }

    function undoBulkPermissionChange() {
        if (!previousBulkPermissions) return

        setPermissions(previousBulkPermissions)
        setPreviousBulkPermissions(null)
    }

    function changeActiveTab(tab: string) {
        setActiveTab(tab)
        setPermissionSearch('')
    }

    function changeModuleVisibility(module: OptionalPermissionModule, checked: boolean) {
        if (!checked && activeTab === module) changeActiveTab('basic')

        if (module === 'fans') setShowFansPermissions(checked)
        if (module === 'business') setShowBusinessPermissions(checked)
        if (module === 'mobile') setShowMobilePermissions(checked)
    }

    return (
        <div className="flex flex-col gap-4">
            <PermissionMaskSettings
                selectedMask={selectedMask}
                canUndo={Boolean(previousMaskPermissions)}
                showFans={showFansPermissions}
                showBusiness={showBusinessPermissions}
                showMobile={showMobilePermissions}
                onMaskChange={applyPermissionMask}
                onUndo={undoPermissionMask}
                onModuleVisibilityChange={changeModuleVisibility}
            />
            <PermissionTabs
                activeTab={activeTab}
                query={permissionSearch}
                permissions={permissions}
                showFans={showFansPermissions}
                showBusiness={showBusinessPermissions}
                showMobile={showMobilePermissions}
                canUndoBulkChange={Boolean(previousBulkPermissions)}
                onTabChange={changeActiveTab}
                onQueryChange={setPermissionSearch}
                onPermissionChange={setPermission}
                onSetAll={setAllActivePermissions}
                onUndoBulkChange={undoBulkPermissionChange}
            />
        </div>
    )
}
