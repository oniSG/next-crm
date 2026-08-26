'use client'

import { useState } from 'react'
import { StarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

export function StarRatingInput({
    name,
    count = 5,
    defaultValue = 0,
    disabled,
    required,
    className,
    onValueChange,
}: {
    name: string
    count?: number
    defaultValue?: number
    disabled?: boolean
    required?: boolean
    className?: string
    onValueChange?: (value: number) => void
}) {
    const [value, setValue] = useState(defaultValue)
    const [hoveredValue, setHoveredValue] = useState<number | null>(null)
    const visibleValue = hoveredValue ?? value

    function changeValue(nextValue: number) {
        setValue(nextValue)
        onValueChange?.(nextValue)
    }

    return (
        <div
            role="radiogroup"
            aria-label="Rating"
            className={cn('flex w-fit items-center gap-0.5 sm:gap-1', className)}
            onMouseLeave={() => setHoveredValue(null)}
        >
            {Array.from({ length: count }, (_, index) => {
                const starValue = index + 1
                const selected = starValue <= visibleValue

                return (
                    <label
                        key={starValue}
                        className={cn(
                            'relative cursor-pointer rounded-md p-0 transition-transform hover:scale-110 sm:p-0.5',
                            disabled && 'cursor-not-allowed opacity-50 hover:scale-100',
                        )}
                        onMouseEnter={() => {
                            if (!disabled) setHoveredValue(starValue)
                        }}
                    >
                        <input
                            type="radio"
                            name={name}
                            value={starValue}
                            checked={value === starValue}
                            disabled={disabled}
                            required={required}
                            aria-label={`${starValue} of ${count} stars`}
                            className="peer sr-only"
                            onClick={() =>
                                changeValue(
                                    !required && value === starValue ? 0 : starValue,
                                )
                            }
                            onChange={() => undefined}
                        />
                        <span className="peer-focus-visible:ring-ring block rounded-md peer-focus-visible:ring-3">
                            <StarIcon
                                strokeWidth={1.25}
                                style={
                                    selected
                                        ? {
                                              color: 'var(--survey-color, #fbbf24)',
                                              fill: 'var(--survey-color, #fbbf24)',
                                          }
                                        : undefined
                                }
                                className={cn(
                                    'size-5 transition-colors sm:size-8',
                                    !selected && 'text-muted-foreground/35',
                                )}
                            />
                        </span>
                    </label>
                )
            })}
        </div>
    )
}
