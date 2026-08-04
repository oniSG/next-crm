'use client'

import { useState } from 'react'

import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { cn } from '@/lib/utils'

const HEX_COLOR_PATTERN = /^#[0-9A-Fa-f]{6}$/

export type HexColorInputProps = {
    id?: string
    name?: string
    defaultValue?: string
    disabled?: boolean
    required?: boolean
    className?: string
    onValueChange?: (value: string) => void
}

export function HexColorInput({
    id,
    name = 'color',
    defaultValue = '#7EC71E',
    disabled,
    required,
    className,
    onValueChange,
}: HexColorInputProps) {
    const initialColor = normalizeHexColor(defaultValue) ?? '#7EC71E'
    const [value, setValue] = useState(initialColor)
    const isValid = HEX_COLOR_PATTERN.test(value)
    const previewColor = isValid ? value : initialColor

    function changeValue(nextValue: string) {
        const trimmedValue = nextValue.trim().slice(0, 7)
        setValue(trimmedValue)
        onValueChange?.(trimmedValue)
    }

    function normalizeValue() {
        const normalizedValue = normalizeHexColor(value)
        if (!normalizedValue) return

        setValue(normalizedValue)
        onValueChange?.(normalizedValue)
    }

    return (
        <InputGroup className={className} aria-invalid={!isValid}>
            <InputGroupAddon className="pl-2">
                <span
                    className="relative size-5 overflow-hidden rounded-md border shadow-xs"
                    style={{ backgroundColor: previewColor }}
                >
                    <input
                        type="color"
                        value={previewColor}
                        disabled={disabled}
                        aria-label="Choose color"
                        className="absolute inset-0 size-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
                        onChange={(event) =>
                            changeValue(event.target.value.toUpperCase())
                        }
                    />
                </span>
            </InputGroupAddon>
            <InputGroupInput
                id={id}
                name={name}
                value={value}
                disabled={disabled}
                required={required}
                aria-invalid={!isValid}
                aria-describedby={!isValid && id ? `${id}-error` : undefined}
                placeholder="#7EC71E"
                autoComplete="off"
                spellCheck={false}
                className={cn('font-mono uppercase')}
                onChange={(event) => changeValue(event.target.value)}
                onBlur={normalizeValue}
            />
            {!isValid && id && (
                <span id={`${id}-error`} className="sr-only">
                    Enter a valid HEX color in #RRGGBB format.
                </span>
            )}
        </InputGroup>
    )
}

export function normalizeHexColor(value: string) {
    const color = value.trim().startsWith('#') ? value.trim() : `#${value.trim()}`
    return HEX_COLOR_PATTERN.test(color) ? color.toUpperCase() : null
}
