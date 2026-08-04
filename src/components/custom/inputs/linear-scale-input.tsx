'use client'

import { useState } from 'react'

import { cn } from '@/lib/utils'

export function LinearScaleInput({
    name,
    count = 5,
    startLabel,
    endLabel,
    defaultValue,
    disabled,
    required,
    className,
    onValueChange,
}: {
    name: string
    count?: number
    startLabel?: string
    endLabel?: string
    defaultValue?: number
    disabled?: boolean
    required?: boolean
    className?: string
    onValueChange?: (value: number) => void
}) {
    const safeCount = Math.min(8, Math.max(3, count))
    const [value, setValue] = useState(defaultValue)

    function changeValue(nextValue: number) {
        setValue(nextValue)
        onValueChange?.(nextValue)
    }

    return (
        <div className={cn('w-full max-w-lg space-y-2', className)}>
            <div
                role="radiogroup"
                aria-label="Linear scale"
                className="grid gap-2"
                style={{
                    gridTemplateColumns: `repeat(${safeCount}, minmax(0, 1fr))`,
                }}
            >
                {Array.from({ length: safeCount }, (_, index) => {
                    const rateValue = index + 1
                    const selected = value === rateValue

                    return (
                        <label
                            key={rateValue}
                            className={cn(
                                'cursor-pointer text-center',
                                disabled && 'cursor-not-allowed opacity-50',
                            )}
                        >
                            <input
                                type="radio"
                                name={name}
                                value={rateValue}
                                checked={value === rateValue}
                                disabled={disabled}
                                required={required}
                                aria-label={`${rateValue} of ${safeCount}`}
                                className="peer sr-only"
                                onChange={() => changeValue(rateValue)}
                            />
                            <span
                                style={
                                    selected
                                        ? {
                                              borderColor:
                                                  'var(--survey-color, var(--primary))',
                                              backgroundColor:
                                                  'var(--survey-color, var(--primary))',
                                          }
                                        : undefined
                                }
                                className={cn(
                                    'border-input peer-focus-visible:ring-ring bg-background mx-auto flex size-9 items-center justify-center rounded-full border text-sm font-medium transition-colors peer-focus-visible:ring-3',
                                    selected && 'text-white',
                                )}
                            >
                                {rateValue}
                            </span>
                        </label>
                    )
                })}
            </div>
            {(startLabel || endLabel) && (
                <div className="text-muted-foreground flex justify-between gap-4 text-xs">
                    <span>{startLabel}</span>
                    <span className="text-right">{endLabel}</span>
                </div>
            )}
        </div>
    )
}
