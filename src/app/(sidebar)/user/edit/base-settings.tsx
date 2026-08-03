'use client'

import { useState } from 'react'
import {
    ChevronsUpDownIcon,
    KeyRoundIcon,
    Loader2Icon,
    ShieldCheckIcon,
} from 'lucide-react'

import { TAG_OPTIONS } from './data'

import { FileInput } from '@/components/custom/inputs/file-input'
import { PhoneNumberInput } from '@/components/custom/inputs/phone-number-input'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    Command,
    CommandEmpty,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'

export function BaseSettings() {
    return (
        <div className="grid items-stretch gap-4 lg:grid-cols-3">
            <ContactInformationCard />
            <RoleAppearanceCard />
            <SecurityCard />
        </div>
    )
}

function ContactInformationCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Contact information</CardTitle>
                <CardDescription>
                    Basic identification and contact details.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
                <Field>
                    <FieldLabel htmlFor="user-name">Name</FieldLabel>
                    <Input id="user-name" name="name" defaultValue="Petr" />
                </Field>
                <Field>
                    <FieldLabel htmlFor="user-surname">Surname</FieldLabel>
                    <Input id="user-surname" name="surname" defaultValue="Novák" />
                </Field>
                <Field>
                    <FieldLabel htmlFor="user-email">Email</FieldLabel>
                    <Input
                        id="user-email"
                        name="email"
                        type="email"
                        defaultValue="petr.novak@relatoo.cz"
                    />
                </Field>
                <Field>
                    <FieldLabel htmlFor="user-phone">Phone number</FieldLabel>
                    <PhoneNumberInput
                        id="user-phone"
                        name="phoneNumber"
                        defaultValue="+420 777 123 456"
                    />
                </Field>
            </CardContent>
        </Card>
    )
}

function RoleAppearanceCard() {
    const [tags, setTags] = useState<string[]>(['Sales', 'Management'])
    const [tagsOpen, setTagsOpen] = useState(false)

    function toggleTag(tag: string) {
        setTags((current) =>
            current.includes(tag)
                ? current.filter((item) => item !== tag)
                : [...current, tag],
        )
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Role and appearance</CardTitle>
                <CardDescription>
                    Banner, account state and assigned tags.
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
                <div className="space-y-3">
                    <Field orientation="horizontal" className="py-1">
                        <FieldLabel htmlFor="sales-representative">
                            Sales representative
                        </FieldLabel>
                        <Switch
                            id="sales-representative"
                            name="sales-representative"
                            aria-label="Sales representative"
                        />
                    </Field>
                    <Field orientation="horizontal" className="py-1">
                        <FieldLabel htmlFor="active">Active</FieldLabel>
                        <Switch
                            id="active"
                            name="active"
                            aria-label="Active"
                            defaultChecked
                        />
                    </Field>
                    <Field orientation="horizontal" className="py-1">
                        <FieldLabel htmlFor="managerial-report">
                            Receive a managerial report
                        </FieldLabel>
                        <Switch
                            id="managerial-report"
                            name="managerial-report"
                            aria-label="Receive a managerial report"
                            defaultChecked
                        />
                    </Field>
                </div>

                <Separator />

                <Field>
                    <FieldLabel htmlFor="user-tags">Tags</FieldLabel>
                    <Popover open={tagsOpen} onOpenChange={setTagsOpen}>
                        <PopoverTrigger
                            render={
                                <Button
                                    id="user-tags"
                                    type="button"
                                    variant="outline"
                                    className="h-auto min-h-8 w-full justify-between whitespace-normal"
                                />
                            }
                        >
                            <span className="flex flex-wrap gap-1">
                                {tags.length > 0 ? (
                                    tags.map((tag) => (
                                        <Badge key={tag} variant="secondary">
                                            {tag}
                                        </Badge>
                                    ))
                                ) : (
                                    <span className="text-muted-foreground">
                                        Select tags
                                    </span>
                                )}
                            </span>
                            <ChevronsUpDownIcon className="text-muted-foreground size-4" />
                        </PopoverTrigger>
                        <PopoverContent align="start" className="w-(--anchor-width) p-0">
                            <Command>
                                <CommandInput placeholder="Search tags…" />
                                <CommandList>
                                    <CommandEmpty>No tags found.</CommandEmpty>
                                    {TAG_OPTIONS.map((tag) => {
                                        const selected = tags.includes(tag)
                                        return (
                                            <CommandItem
                                                key={tag}
                                                value={tag}
                                                data-checked={selected}
                                                onSelect={() => toggleTag(tag)}
                                            >
                                                {tag}
                                            </CommandItem>
                                        )
                                    })}
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </Field>

                <Separator />

                <Field>
                    <FieldLabel htmlFor="user-banner">Banner</FieldLabel>
                    <FileInput
                        id="user-banner"
                        name="banner"
                        accept="image/png,image/jpeg,image/webp"
                    />
                </Field>
            </CardContent>
        </Card>
    )
}

function SecurityCard() {
    const [loadingActions, setLoadingActions] = useState({
        enforce: false,
        cancelAuthentication: false,
        enforcePasswordChange: false,
    })

    async function runSecurityAction(action: keyof typeof loadingActions) {
        setLoadingActions((current) => ({ ...current, [action]: true }))
        await new Promise((resolve) => setTimeout(resolve, 500))
        setLoadingActions((current) => ({ ...current, [action]: false }))
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Security</CardTitle>
                <CardDescription>
                    Two-factor authentication and password policies.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-3">
                    <Field orientation="horizontal" className="py-1">
                        <FieldLabel htmlFor="two-factor-status">
                            Two-factor authentication status
                        </FieldLabel>
                        <Switch
                            id="two-factor-status"
                            name="two-factor-status"
                            aria-label="Two-factor authentication status"
                            defaultChecked
                        />
                    </Field>
                    <Field orientation="horizontal" className="py-1">
                        <FieldLabel htmlFor="two-factor-required">
                            Two-factor authentication required
                        </FieldLabel>
                        <Switch
                            id="two-factor-required"
                            name="two-factor-required"
                            aria-label="Two-factor authentication required"
                        />
                    </Field>
                </div>

                <div className="flex flex-wrap gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        disabled={loadingActions.enforce}
                        aria-busy={loadingActions.enforce}
                        onClick={() => runSecurityAction('enforce')}
                    >
                        {loadingActions.enforce ? (
                            <Loader2Icon className="animate-spin" />
                        ) : (
                            <ShieldCheckIcon />
                        )}
                        Enforce
                    </Button>
                    <Button
                        type="button"
                        variant="destructive"
                        disabled={loadingActions.cancelAuthentication}
                        aria-busy={loadingActions.cancelAuthentication}
                        onClick={() => runSecurityAction('cancelAuthentication')}
                    >
                        {loadingActions.cancelAuthentication && (
                            <Loader2Icon className="animate-spin" />
                        )}
                        Cancel authentication
                    </Button>
                </div>

                <Separator />

                <div className="space-y-3">
                    <div>
                        <h2 className="text-sm font-medium">Change password</h2>
                        <p className="text-muted-foreground mt-1 text-xs">
                            Require the user to choose a new password at the next sign-in.
                        </p>
                    </div>
                    <Button
                        type="button"
                        variant="outline"
                        disabled={loadingActions.enforcePasswordChange}
                        aria-busy={loadingActions.enforcePasswordChange}
                        onClick={() => runSecurityAction('enforcePasswordChange')}
                    >
                        {loadingActions.enforcePasswordChange ? (
                            <Loader2Icon className="animate-spin" />
                        ) : (
                            <KeyRoundIcon />
                        )}
                        Enforce password change
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
