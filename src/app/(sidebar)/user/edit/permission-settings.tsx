'use client'

import { useState } from 'react'
import { ChevronDownIcon, RotateCcwIcon } from 'lucide-react'

import {
    ALL_PERMISSION_IDS,
    BASIC_PERMISSION_CATEGORIES,
    BUSINESS_PERMISSION_CATEGORIES,
    FANS_PERMISSION_CATEGORIES,
    MOBILE_PERMISSION_CATEGORIES,
    PERMISSION_MASKS,
} from './data'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'

function createPermissionState(mask: string) {
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

export function PermissionSettings() {
    const [selectedMask, setSelectedMask] = useState('viewer')
    const [permissions, setPermissions] = useState(() => createPermissionState('viewer'))
    const [previousPermissions, setPreviousPermissions] = useState<Record<
        string,
        boolean
    > | null>(null)
    const [previousMask, setPreviousMask] = useState<string | null>(null)
    const [showFansPermissions, setShowFansPermissions] = useState(true)
    const [showBusinessPermissions, setShowBusinessPermissions] = useState(true)
    const [showMobilePermissions, setShowMobilePermissions] = useState(true)

    function applyPermissionMask(mask: string | null) {
        if (!mask) return

        setPreviousPermissions(permissions)
        setPreviousMask(selectedMask)
        setPermissions(createPermissionState(mask))
        setSelectedMask(mask)
    }

    function undoPermissionMask() {
        if (!previousPermissions) return

        setPermissions(previousPermissions)
        if (previousMask) setSelectedMask(previousMask)
        setPreviousPermissions(null)
        setPreviousMask(null)
    }

    function setPermission(id: string, checked: boolean) {
        setPermissions((current) => ({ ...current, [id]: checked }))
    }

    return (
        <div className="flex flex-col gap-4">
            <Card>
                <CardContent className="flex flex-col gap-4 py-4 lg:flex-row lg:justify-between">
                    <div className="space-y-2">
                        <div className="space-y-0.5">
                            <label
                                className="block text-sm font-medium"
                                htmlFor="permission-mask"
                            >
                                Permission mask
                            </label>
                            <p className="text-muted-foreground text-xs">
                                Apply a predefined set of permissions. You can undo the
                                last applied mask.
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                            <Select
                                value={selectedMask}
                                onValueChange={applyPermissionMask}
                            >
                                <SelectTrigger id="permission-mask" className="w-48">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent alignItemWithTrigger={false} align="start">
                                    {PERMISSION_MASKS.map((mask) => (
                                        <SelectItem key={mask.value} value={mask.value}>
                                            {mask.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Button
                                type="button"
                                variant="outline"
                                disabled={!previousPermissions}
                                onClick={undoPermissionMask}
                            >
                                <RotateCcwIcon />
                                Undo
                            </Button>
                        </div>
                    </div>

                    <div className="flex w-full max-w-sm flex-col gap-3">
                        <VisibilitySwitch
                            id="show-fans-permissions"
                            label="Fans"
                            description="Show permissions for fan data and engagement."
                            checked={showFansPermissions}
                            onCheckedChange={setShowFansPermissions}
                        />
                        <VisibilitySwitch
                            id="show-business-permissions"
                            label="Business"
                            description="Show permissions for sales and business tools."
                            checked={showBusinessPermissions}
                            onCheckedChange={setShowBusinessPermissions}
                        />
                        <VisibilitySwitch
                            id="show-mobile-permissions"
                            label="Mobile"
                            description="Show permissions for the mobile application."
                            checked={showMobilePermissions}
                            onCheckedChange={setShowMobilePermissions}
                        />
                    </div>
                </CardContent>
            </Card>

            <PermissionsAccordion
                title="Basic permissions"
                description="Manage access to the core administration areas."
                categories={BASIC_PERMISSION_CATEGORIES.map((category) => ({
                    title: category.title,
                    permissions: category.permissions,
                }))}
                values={permissions}
                onPermissionChange={setPermission}
            />
            {showFansPermissions && (
                <PermissionsAccordion
                    title="Fans permissions"
                    description="Manage access to fan data, communication and engagement tools."
                    categories={FANS_PERMISSION_CATEGORIES.map(([title, ids]) => ({
                        title,
                        permissions: ids.map(createPermissionDefinition),
                    }))}
                    values={permissions}
                    onPermissionChange={setPermission}
                />
            )}
            {showBusinessPermissions && (
                <PermissionsAccordion
                    title="Business permissions"
                    description="Manage access to sales, partners, advertising and business tools."
                    categories={BUSINESS_PERMISSION_CATEGORIES.map(([title, ids]) => ({
                        title,
                        permissions: ids.map(createPermissionDefinition),
                    }))}
                    values={permissions}
                    onPermissionChange={setPermission}
                />
            )}
            {showMobilePermissions && (
                <PermissionsAccordion
                    title="Mobile permissions"
                    description="Manage access to mobile alerts, calendars, notifications and banners."
                    categories={MOBILE_PERMISSION_CATEGORIES.map(([title, ids]) => ({
                        title,
                        permissions: ids.map(createPermissionDefinition),
                    }))}
                    values={permissions}
                    onPermissionChange={setPermission}
                />
            )}
        </div>
    )
}

type PermissionCategory = {
    title: string
    permissions: ReadonlyArray<readonly [string, string, string]>
}

function PermissionsAccordion({
    title,
    description,
    categories,
    values,
    onPermissionChange,
}: {
    title: string
    description: string
    categories: PermissionCategory[]
    values: Record<string, boolean>
    onPermissionChange: (id: string, checked: boolean) => void
}) {
    return (
        <Collapsible className="group/permissions">
            <Card>
                <CollapsibleTrigger className="flex w-full cursor-pointer items-center justify-between gap-4 px-4 text-left outline-none">
                    <div className="space-y-1">
                        <CardTitle>{title}</CardTitle>
                        <CardDescription>{description}</CardDescription>
                    </div>
                    <ChevronDownIcon className="text-muted-foreground size-5 shrink-0 transition-transform duration-200 group-data-open/permissions:rotate-180" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <CardContent className="grid items-start gap-5 border-t pt-4 md:grid-cols-2 lg:grid-cols-4">
                        {categories.map((category) => (
                            <section key={category.title} className="space-y-2">
                                <h2 className="text-muted-foreground px-1 text-[11px] font-semibold tracking-wide uppercase">
                                    {category.title}
                                </h2>
                                <div className="divide-y overflow-hidden rounded-xl border">
                                    {category.permissions.map(
                                        ([id, itemTitle, itemDescription]) => (
                                            <PermissionItem
                                                key={id}
                                                id={id}
                                                title={itemTitle}
                                                description={itemDescription}
                                                checked={values[id] ?? false}
                                                onCheckedChange={(checked) =>
                                                    onPermissionChange(id, checked)
                                                }
                                            />
                                        ),
                                    )}
                                </div>
                            </section>
                        ))}
                    </CardContent>
                </CollapsibleContent>
            </Card>
        </Collapsible>
    )
}

function createPermissionDefinition(id: string) {
    const title = id
        .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
        .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
        .replace(/^./, (character) => character.toUpperCase())

    return [id, title, `Allow this user to ${title.toLowerCase()}.`] as const
}

function VisibilitySwitch({
    id,
    label,
    description,
    checked,
    onCheckedChange,
}: {
    id: string
    label: string
    description: string
    checked: boolean
    onCheckedChange: (checked: boolean) => void
}) {
    return (
        <div className="flex items-center justify-between gap-4">
            <label htmlFor={id} className="cursor-pointer space-y-0.5">
                <span className="block text-sm font-medium">{label}</span>
                <span className="text-muted-foreground block text-xs">{description}</span>
            </label>
            <Switch id={id} checked={checked} onCheckedChange={onCheckedChange} />
        </div>
    )
}

function PermissionItem({
    id,
    title,
    description,
    checked,
    onCheckedChange,
}: {
    id: string
    title: string
    description: string
    checked: boolean
    onCheckedChange: (checked: boolean) => void
}) {
    return (
        <div className="flex items-center justify-between gap-3 p-3">
            <div className="space-y-0.5">
                <label htmlFor={id} className="cursor-pointer text-xs font-medium">
                    {title}
                </label>
                <p className="text-muted-foreground text-[11px] leading-snug">
                    {description}
                </p>
            </div>
            <Switch
                id={id}
                name={id}
                aria-label={title}
                checked={checked}
                onCheckedChange={onCheckedChange}
            />
        </div>
    )
}
