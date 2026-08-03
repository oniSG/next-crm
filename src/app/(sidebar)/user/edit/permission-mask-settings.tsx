'use client'

import { RotateCcwIcon } from 'lucide-react'

import { PERMISSION_MASKS } from './data'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'

type OptionalPermissionModule = 'fans' | 'business' | 'mobile'

export function PermissionMaskSettings({
    selectedMask,
    canUndo,
    showFans,
    showBusiness,
    showMobile,
    onMaskChange,
    onUndo,
    onModuleVisibilityChange,
}: {
    selectedMask: string
    canUndo: boolean
    showFans: boolean
    showBusiness: boolean
    showMobile: boolean
    onMaskChange: (mask: string | null) => void
    onUndo: () => void
    onModuleVisibilityChange: (module: OptionalPermissionModule, checked: boolean) => void
}) {
    return (
        <Card>
            <CardContent className="flex flex-col gap-4 py-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="space-y-2">
                    <div className="space-y-0.5">
                        <label
                            className="block text-sm font-medium"
                            htmlFor="permission-mask"
                        >
                            Permission mask
                        </label>
                        <p className="text-muted-foreground text-xs">
                            Apply a predefined set of permissions. You can undo the last
                            applied mask.
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                        <Select value={selectedMask} onValueChange={onMaskChange}>
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
                            disabled={!canUndo}
                            onClick={onUndo}
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
                        checked={showFans}
                        onCheckedChange={(checked) =>
                            onModuleVisibilityChange('fans', checked)
                        }
                    />
                    <VisibilitySwitch
                        id="show-business-permissions"
                        label="Business"
                        description="Show permissions for sales and business tools."
                        checked={showBusiness}
                        onCheckedChange={(checked) =>
                            onModuleVisibilityChange('business', checked)
                        }
                    />
                    <VisibilitySwitch
                        id="show-mobile-permissions"
                        label="Mobile"
                        description="Show permissions for the mobile application."
                        checked={showMobile}
                        onCheckedChange={(checked) =>
                            onModuleVisibilityChange('mobile', checked)
                        }
                    />
                </div>
            </CardContent>
        </Card>
    )
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
