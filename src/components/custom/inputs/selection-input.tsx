'use client'

import { useState } from 'react'

import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export type SelectionInputOption = {
    value: string
    label: string
    allowSecondaryText?: boolean
    secondaryTextRequired?: boolean
}

export function SelectionInput({
    name,
    options,
    multiple = false,
    defaultValue = [],
    disabled,
    required,
    className,
    onValueChange,
}: {
    name: string
    options: SelectionInputOption[]
    multiple?: boolean
    defaultValue?: string[]
    disabled?: boolean
    required?: boolean
    className?: string
    onValueChange?: (value: string[]) => void
}) {
    const [value, setValue] = useState(defaultValue)

    function changeValue(optionValue: string, checked: boolean) {
        const nextValue = multiple
            ? checked
                ? [...value, optionValue]
                : value.filter((item) => item !== optionValue)
            : checked
              ? [optionValue]
              : []

        setValue(nextValue)
        onValueChange?.(nextValue)
    }

    return (
        <div
            role={multiple ? 'group' : 'radiogroup'}
            aria-label="Selection"
            aria-required={required}
            className={cn('space-y-2', className)}
        >
            {options.map((option) => {
                const checked = value.includes(option.value)
                const inputId = `${name}-${option.value}`

                return (
                    <div key={option.value} className="space-y-2">
                        <label
                            htmlFor={inputId}
                            style={
                                checked
                                    ? {
                                          borderColor:
                                              'var(--survey-color, var(--primary))',
                                          backgroundColor:
                                              'color-mix(in srgb, var(--survey-color, var(--primary)) 5%, transparent)',
                                      }
                                    : undefined
                            }
                            className={cn(
                                'border-input bg-background flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-2.5 text-sm transition-colors',
                                disabled && 'cursor-not-allowed opacity-50',
                            )}
                        >
                            <input
                                id={inputId}
                                type={multiple ? 'checkbox' : 'radio'}
                                name={multiple ? `${name}[]` : name}
                                value={option.value}
                                checked={checked}
                                disabled={disabled}
                                required={!multiple && required}
                                style={{
                                    accentColor: 'var(--survey-color, var(--primary))',
                                }}
                                className="size-4"
                                onClick={() => {
                                    if (!multiple) {
                                        changeValue(
                                            option.value,
                                            required && checked ? true : !checked,
                                        )
                                    }
                                }}
                                onChange={(event) => {
                                    if (multiple) {
                                        changeValue(option.value, event.target.checked)
                                    }
                                }}
                            />
                            <span>{option.label}</span>
                        </label>
                        {checked && option.allowSecondaryText && (
                            <Input
                                name={`${name}Secondary[${option.value}]`}
                                placeholder={`Specify ${option.label.toLowerCase()}`}
                                disabled={disabled}
                                required={option.secondaryTextRequired}
                                className="ml-7 w-[calc(100%-1.75rem)]"
                            />
                        )}
                    </div>
                )
            })}
        </div>
    )
}
