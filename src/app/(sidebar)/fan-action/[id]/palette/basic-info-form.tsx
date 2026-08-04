'use client'

import * as React from 'react'
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

import { useFanActionEditor } from '../context'
import { FAN_ACTION_OPTIONS } from '../data'

function TagsMultiSelect({
    value,
    onChange,
    options,
}: {
    value: string[]
    onChange: (next: string[]) => void
    options: string[]
}) {
    const [open, setOpen] = React.useState(false)

    function toggle(tag: string) {
        if (value.includes(tag)) {
            onChange(value.filter((item) => item !== tag))
            return
        }
        onChange([...value, tag])
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger
                render={
                    <Button
                        type="button"
                        variant="outline"
                        className="h-auto min-h-8 w-full justify-between px-2.5 py-1.5 font-normal"
                    />
                }
            >
                <span className="min-w-0 flex-1 truncate text-left">
                    {value.length > 0
                        ? value.join(', ')
                        : 'Štítky pro označení akce'}
                </span>
                <ChevronsUpDownIcon className="size-4 shrink-0 opacity-50" />
            </PopoverTrigger>
            <PopoverContent align="start" className="w-(--anchor-width) p-1">
                <ul className="max-h-56 space-y-0.5 overflow-y-auto">
                    {options.map((tag) => {
                        const selected = value.includes(tag)
                        return (
                            <li key={tag}>
                                <button
                                    type="button"
                                    className={cn(
                                        'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-accent',
                                        selected && 'bg-accent/60',
                                    )}
                                    onClick={() => toggle(tag)}
                                >
                                    <CheckIcon
                                        className={cn(
                                            'size-3.5 shrink-0',
                                            selected
                                                ? 'opacity-100'
                                                : 'opacity-0',
                                        )}
                                    />
                                    <span className="truncate">{tag}</span>
                                </button>
                            </li>
                        )
                    })}
                </ul>
            </PopoverContent>
        </Popover>
    )
}

export function BasicInfoForm() {
    const { action, updateAction, registerSaveHandler, unregisterSaveHandler } =
        useFanActionEditor()
    const [name, setName] = React.useState(action.event)
    const [description, setDescription] = React.useState(action.description)
    const [transactionActions, setTransactionActions] = React.useState(
        action.transactionActions,
    )
    const [tags, setTags] = React.useState(action.tags)
    const [errors, setErrors] = React.useState<{
        name?: string
        description?: string
    }>({})

    React.useEffect(() => {
        setName(action.event)
        setDescription(action.description)
        setTransactionActions(action.transactionActions)
        setTags(action.tags)
        setErrors({})
    }, [action.id])

    React.useEffect(() => {
        registerSaveHandler('basicInfo', async () => {
            const nextErrors: { name?: string; description?: string } = {}
            const trimmedName = name.trim()
            const trimmedDescription = description.trim()

            if (trimmedName.length < 2) {
                nextErrors.name = 'Název musí mít alespoň 2 znaky'
            } else if (trimmedName.length > 50) {
                nextErrors.name = 'Název smí mít nejvýše 50 znaků'
            }

            if (trimmedDescription.length < 2) {
                nextErrors.description = 'Popis musí mít alespoň 2 znaky'
            } else if (trimmedDescription.length > 250) {
                nextErrors.description = 'Popis smí mít nejvýše 250 znaků'
            }

            setErrors(nextErrors)
            if (Object.keys(nextErrors).length > 0) return false

            updateAction({
                event: trimmedName,
                description: trimmedDescription,
                transactionActions,
                tags: [...tags],
            })
            return true
        })

        return () => unregisterSaveHandler('basicInfo')
    }, [
        name,
        description,
        transactionActions,
        tags,
        registerSaveHandler,
        unregisterSaveHandler,
        updateAction,
    ])

    return (
        <form
            className="space-y-3 px-4"
            onSubmit={(event) => event.preventDefault()}
            noValidate
        >
            <div className="space-y-1.5">
                <Label htmlFor="action-name">
                    Název
                </Label>
                <Input
                    id="action-name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Název události"
                    maxLength={50}
                    aria-invalid={Boolean(errors.name)}
                />
                {errors.name ? (
                    <p className="text-destructive text-xs">{errors.name}</p>
                ) : null}
            </div>

            <div className="space-y-1.5">
                <Label htmlFor="action-description">
                    Popis
                </Label>
                <Textarea
                    id="action-description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    rows={3}
                    maxLength={250}
                    aria-invalid={Boolean(errors.description)}
                />
                {errors.description ? (
                    <p className="text-destructive text-xs">
                        {errors.description}
                    </p>
                ) : null}
            </div>

            <div className="flex items-center justify-between gap-2">
                <Label htmlFor="transaction-actions">
                    Transakční akce
                </Label>
                <Switch
                    id="transaction-actions"
                    checked={transactionActions}
                    onCheckedChange={setTransactionActions}
                />
            </div>

            <div className="space-y-1.5">
                <Label>Štítky</Label>
                <TagsMultiSelect
                    value={tags}
                    onChange={setTags}
                    options={FAN_ACTION_OPTIONS.allTags}
                />
            </div>
        </form>
    )
}
