'use client'

import { CheckCheckIcon, RotateCcwIcon, SearchIcon, XIcon } from 'lucide-react'

import {
    BASIC_PERMISSION_CATEGORIES,
    BUSINESS_PERMISSION_CATEGORIES,
    FANS_PERMISSION_CATEGORIES,
    MOBILE_PERMISSION_CATEGORIES,
} from './data'
import {
    createPermissionDefinition,
    filterPermissionCategories,
    getPermissionIds,
    splitPermissionsIntoColumns,
    type PermissionSettingsCategory,
} from './temp'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

export function PermissionTabs({
    activeTab,
    query,
    permissions,
    showFans,
    showBusiness,
    showMobile,
    canUndoBulkChange,
    onTabChange,
    onQueryChange,
    onPermissionChange,
    onSetAll,
    onUndoBulkChange,
}: {
    activeTab: string
    query: string
    permissions: Record<string, boolean>
    showFans: boolean
    showBusiness: boolean
    showMobile: boolean
    canUndoBulkChange: boolean
    onTabChange: (tab: string) => void
    onQueryChange: (query: string) => void
    onPermissionChange: (id: string, checked: boolean) => void
    onSetAll: (checked: boolean) => void
    onUndoBulkChange: () => void
}) {
    const activePermissionIds = getPermissionIds(activeTab)
    const allSelected = activePermissionIds.every((id) => permissions[id])
    const someSelected = activePermissionIds.some((id) => permissions[id])

    return (
        <Tabs className="pt-3" value={activeTab} onValueChange={onTabChange}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <TabsList>
                    <TabsTrigger value="basic">Basic</TabsTrigger>
                    {showFans && <TabsTrigger value="fans">Fans</TabsTrigger>}
                    {showBusiness && <TabsTrigger value="business">Business</TabsTrigger>}
                    {showMobile && <TabsTrigger value="mobile">Mobile</TabsTrigger>}
                </TabsList>

                <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:justify-end">
                    <div className="relative min-w-56 flex-1 sm:w-72 sm:flex-none">
                        <SearchIcon className="text-muted-foreground pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2" />
                        <Input
                            type="search"
                            value={query}
                            onChange={(event) => onQueryChange(event.target.value)}
                            placeholder={`Search ${activeTab} permissions…`}
                            aria-label={`Search ${activeTab} permissions`}
                            className="pl-8"
                        />
                    </div>
                    <Button
                        type="button"
                        variant="outline"
                        disabled={allSelected}
                        onClick={() => onSetAll(true)}
                    >
                        <CheckCheckIcon />
                        Select all
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        disabled={!someSelected}
                        onClick={() => onSetAll(false)}
                    >
                        <XIcon />
                        Clear all
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        disabled={!canUndoBulkChange}
                        onClick={onUndoBulkChange}
                    >
                        <RotateCcwIcon />
                        Undo
                    </Button>
                </div>
            </div>

            <TabsContent value="basic">
                <PermissionsPanel
                    categories={BASIC_PERMISSION_CATEGORIES.map((category) => ({
                        title: category.title,
                        permissions: category.permissions,
                    }))}
                    query={query}
                    values={permissions}
                    onPermissionChange={onPermissionChange}
                />
            </TabsContent>
            {showFans && (
                <TabsContent value="fans">
                    <PermissionsPanel
                        categories={FANS_PERMISSION_CATEGORIES.map(([title, ids]) => ({
                            title,
                            permissions: ids.map(createPermissionDefinition),
                        }))}
                        query={query}
                        values={permissions}
                        onPermissionChange={onPermissionChange}
                    />
                </TabsContent>
            )}
            {showBusiness && (
                <TabsContent value="business">
                    <PermissionsPanel
                        categories={BUSINESS_PERMISSION_CATEGORIES.map(
                            ([title, ids]) => ({
                                title,
                                permissions: ids.map(createPermissionDefinition),
                            }),
                        )}
                        query={query}
                        values={permissions}
                        onPermissionChange={onPermissionChange}
                    />
                </TabsContent>
            )}
            {showMobile && (
                <TabsContent value="mobile">
                    <PermissionsPanel
                        categories={MOBILE_PERMISSION_CATEGORIES.map(([title, ids]) => ({
                            title,
                            permissions: ids.map(createPermissionDefinition),
                        }))}
                        query={query}
                        values={permissions}
                        onPermissionChange={onPermissionChange}
                    />
                </TabsContent>
            )}
        </Tabs>
    )
}

function PermissionsPanel({
    categories,
    values,
    onPermissionChange,
    query,
}: {
    categories: PermissionSettingsCategory[]
    values: Record<string, boolean>
    onPermissionChange: (id: string, checked: boolean) => void
    query: string
}) {
    const visibleCategories = filterPermissionCategories(categories, query)

    if (visibleCategories.length === 0) {
        return (
            <div className="text-muted-foreground rounded-xl border border-dashed p-8 text-center text-sm">
                No permissions match “{query}”.
            </div>
        )
    }

    return (
        <div className="grid items-start gap-5 pt-2 md:grid-cols-2 lg:grid-cols-4">
            {visibleCategories.map((category) => (
                <PermissionCategorySection
                    key={category.title}
                    category={category}
                    values={values}
                    onPermissionChange={onPermissionChange}
                />
            ))}
        </div>
    )
}

function PermissionCategorySection({
    category,
    values,
    onPermissionChange,
}: {
    category: PermissionSettingsCategory
    values: Record<string, boolean>
    onPermissionChange: (id: string, checked: boolean) => void
}) {
    const { columnCount, columns } = splitPermissionsIntoColumns(category.permissions)
    const rowCount = columns[0]?.length ?? 1
    const cells = columns.flatMap((column) =>
        Array.from({ length: rowCount }, (_, rowIndex) => column[rowIndex] ?? null),
    )
    const gridStartsAt = columnCount === 3 ? 'lg' : columnCount === 2 ? 'md' : null

    return (
        <section
            className={cn(
                'space-y-2',
                columnCount === 2 && 'md:col-span-2',
                columnCount === 3 && 'md:col-span-2 lg:col-span-3',
            )}
        >
            <h2 className="text-muted-foreground px-1 text-[11px] font-semibold tracking-wide uppercase">
                {category.title}
            </h2>
            <div
                className={cn(
                    'divide-y overflow-hidden rounded-xl border',
                    columnCount === 2 && 'md:grid md:divide-y-0',
                    columnCount === 3 && 'lg:grid lg:divide-y-0',
                )}
                style={
                    columnCount > 1
                        ? {
                              gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
                              gridTemplateRows: `repeat(${rowCount}, auto)`,
                              gridAutoFlow: 'column',
                          }
                        : undefined
                }
            >
                {cells.map((permission, index) => {
                    const columnIndex = Math.floor(index / rowCount)
                    const rowIndex = index % rowCount
                    const borderClasses = cn(
                        gridStartsAt === 'md' && rowIndex > 0 && 'md:border-t',
                        gridStartsAt === 'md' && columnIndex > 0 && 'md:border-l',
                        gridStartsAt === 'lg' && rowIndex > 0 && 'lg:border-t',
                        gridStartsAt === 'lg' && columnIndex > 0 && 'lg:border-l',
                    )

                    if (!permission) {
                        return (
                            <div
                                key={`empty-${columnIndex}-${rowIndex}`}
                                aria-hidden="true"
                                className={cn(
                                    borderClasses,
                                    gridStartsAt === 'md' && 'hidden md:block',
                                    gridStartsAt === 'lg' && 'hidden lg:block',
                                )}
                            />
                        )
                    }

                    const [id, title, description] = permission

                    return (
                        <div key={id} className={borderClasses}>
                            <PermissionItem
                                id={id}
                                title={title}
                                description={description}
                                checked={values[id] ?? false}
                                onCheckedChange={(checked) =>
                                    onPermissionChange(id, checked)
                                }
                            />
                        </div>
                    )
                })}
            </div>
        </section>
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
        <div className="flex h-full items-center justify-between gap-3 p-3">
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
