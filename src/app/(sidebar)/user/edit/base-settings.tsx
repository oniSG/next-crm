'use client'

import { useRef, useState } from 'react'
import {
    ChevronsUpDownIcon,
    KeyRoundIcon,
    ShieldCheckIcon,
    UploadIcon,
} from 'lucide-react'

import { TAG_OPTIONS } from './data'

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

export function ContactInformationCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Contact information</CardTitle>
                <CardDescription>
                    Basic identification and contact details.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
                <FormField label="Name" htmlFor="user-name">
                    <Input id="user-name" name="name" defaultValue="Petr" />
                </FormField>
                <FormField label="Surname" htmlFor="user-surname">
                    <Input id="user-surname" name="surname" defaultValue="Novák" />
                </FormField>
                <FormField label="Email" htmlFor="user-email">
                    <Input
                        id="user-email"
                        name="email"
                        type="email"
                        defaultValue="petr.novak@relatoo.cz"
                    />
                </FormField>
                <FormField label="Phone number" htmlFor="user-phone">
                    <Input
                        id="user-phone"
                        name="phoneNumber"
                        type="tel"
                        defaultValue="+420 777 123 456"
                    />
                </FormField>
            </CardContent>
        </Card>
    )
}

export function RoleAppearanceCard() {
    const fileInputRef = useRef<HTMLInputElement>(null)
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
                    <SwitchField id="sales-representative" label="Sales representative" />
                    <SwitchField id="active" label="Active" defaultChecked />
                    <SwitchField
                        id="managerial-report"
                        label="Receive a managerial report"
                        defaultChecked
                    />
                </div>

                <Separator />

                <FormField label="Tags" htmlFor="user-tags">
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
                </FormField>

                <Separator />

                <FormField label="Banner" htmlFor="user-banner">
                    <input
                        ref={fileInputRef}
                        id="user-banner"
                        name="banner"
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        className="sr-only"
                    />
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <UploadIcon />
                        Choose file
                    </Button>
                </FormField>
            </CardContent>
        </Card>
    )
}

export function SecurityCard() {
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
                    <SwitchField
                        id="two-factor-status"
                        label="Two-factor authentication status"
                        defaultChecked
                    />
                    <SwitchField
                        id="two-factor-required"
                        label="Two-factor authentication required"
                    />
                </div>

                <div className="flex flex-wrap gap-2">
                    <Button type="button" variant="outline">
                        <ShieldCheckIcon />
                        Enforce
                    </Button>
                    <Button type="button" variant="destructive">
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
                    <Button type="button" variant="outline">
                        <KeyRoundIcon />
                        Enforce password change
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

function FormField({
    label,
    htmlFor,
    children,
}: {
    label: string
    htmlFor: string
    children: React.ReactNode
}) {
    return (
        <div className="space-y-2">
            <label htmlFor={htmlFor} className="block text-sm font-medium">
                {label}
            </label>
            {children}
        </div>
    )
}

function SwitchField({
    id,
    label,
    defaultChecked = false,
}: {
    id: string
    label: string
    defaultChecked?: boolean
}) {
    return (
        <div className="flex items-center justify-between gap-4 py-1">
            <label htmlFor={id} className="cursor-pointer text-sm font-medium">
                {label}
            </label>
            <Switch
                id={id}
                name={id}
                aria-label={label}
                defaultChecked={defaultChecked}
            />
        </div>
    )
}
