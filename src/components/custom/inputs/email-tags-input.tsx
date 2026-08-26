'use client'

import { useState, type KeyboardEvent } from 'react'
import { ChevronsUpDownIcon, MailIcon, PlusIcon, XIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export type EmailTagsInputProps = {
    id?: string
    name?: string
    value?: string[]
    defaultValue?: string[]
    placeholder?: string
    disabled?: boolean
    required?: boolean
    className?: string
    onValueChange?: (emails: string[]) => void
}

export function EmailTagsInput({
    id,
    name = 'emails',
    value: controlledValue,
    defaultValue = [],
    placeholder = 'email@example.com',
    disabled,
    required,
    className,
    onValueChange,
}: EmailTagsInputProps) {
    const [uncontrolledEmails, setUncontrolledEmails] = useState(() =>
        uniqueEmails(defaultValue),
    )
    const emails = controlledValue ? uniqueEmails(controlledValue) : uncontrolledEmails
    const [draft, setDraft] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [open, setOpen] = useState(false)

    function updateEmails(nextEmails: string[]) {
        if (!controlledValue) setUncontrolledEmails(nextEmails)
        onValueChange?.(nextEmails)
    }

    function addEmails(value: string) {
        const candidates = value
            .split(/[,;\s]+/)
            .map((email) => email.trim().toLowerCase())
            .filter(Boolean)

        if (candidates.length === 0) return

        const invalidEmail = candidates.find((email) => !EMAIL_PATTERN.test(email))
        if (invalidEmail) {
            setError(`“${invalidEmail}” is not a valid email address.`)
            return
        }

        updateEmails(uniqueEmails([...emails, ...candidates]))
        setDraft('')
        setError(null)
    }

    function removeEmail(email: string) {
        updateEmails(emails.filter((item) => item !== email))
        setError(null)
    }

    function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter' || event.key === ',' || event.key === ';') {
            event.preventDefault()
            addEmails(draft)
            return
        }

        if (event.key === 'Backspace' && !draft && emails.length > 0) {
            removeEmail(emails[emails.length - 1])
        }
    }

    return (
        <div className={className}>
            {emails.map((email) => (
                <input key={email} type="hidden" name={`${name}[]`} value={email} />
            ))}
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger
                    render={
                        <Button
                            id={id}
                            type="button"
                            variant="outline"
                            disabled={disabled}
                            aria-invalid={Boolean(error)}
                            className={cn(
                                'w-full justify-between font-normal',
                                emails.length === 0 && 'text-muted-foreground',
                            )}
                        />
                    }
                >
                    <span className="flex min-w-0 items-center gap-2">
                        <MailIcon className="size-4 shrink-0" />
                        <span className="truncate">
                            {emails.length === 0
                                ? 'Add email addresses'
                                : emails.length === 1
                                  ? emails[0]
                                  : `${emails.length} email addresses`}
                        </span>
                    </span>
                    <ChevronsUpDownIcon className="text-muted-foreground size-4" />
                </PopoverTrigger>
                <PopoverContent align="start" className="w-(--anchor-width) p-3">
                    <div className="space-y-3">
                        <div className="flex gap-2">
                            <Input
                                id={id ? `${id}-input` : undefined}
                                type="email"
                                value={draft}
                                disabled={disabled}
                                required={required && emails.length === 0}
                                placeholder={placeholder}
                                aria-invalid={Boolean(error)}
                                aria-describedby={error && id ? `${id}-error` : undefined}
                                onChange={(event) => {
                                    setDraft(event.target.value)
                                    if (error) setError(null)
                                }}
                                onKeyDown={handleKeyDown}
                            />
                            <Button
                                type="button"
                                size="icon"
                                disabled={!draft.trim() || disabled}
                                aria-label="Add email address"
                                onClick={() => addEmails(draft)}
                            >
                                <PlusIcon />
                            </Button>
                        </div>

                        {error && (
                            <p
                                id={id ? `${id}-error` : undefined}
                                role="alert"
                                className="text-destructive text-xs"
                            >
                                {error}
                            </p>
                        )}

                        {emails.length > 0 ? (
                            <div className="max-h-48 space-y-1 overflow-y-auto">
                                {emails.map((email) => (
                                    <div
                                        key={email}
                                        className="bg-muted/60 flex items-center justify-between gap-2 rounded-md px-2 py-1.5"
                                    >
                                        <span className="min-w-0 truncate text-sm">
                                            {email}
                                        </span>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon-xs"
                                            disabled={disabled}
                                            aria-label={`Remove ${email}`}
                                            onClick={() => removeEmail(email)}
                                        >
                                            <XIcon />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-muted-foreground py-2 text-center text-xs">
                                No email addresses added yet.
                            </p>
                        )}
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}

function uniqueEmails(emails: string[]) {
    return [...new Set(emails.map((email) => email.trim().toLowerCase()))].filter(Boolean)
}
