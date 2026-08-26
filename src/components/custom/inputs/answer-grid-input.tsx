'use client'

import { useState } from 'react'

import { cn } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

export type AnswerGridValue = Record<string, string[]>

export function AnswerGridInput({
    name,
    rows,
    columns,
    multiple = false,
    defaultValue = {},
    disabled,
    required,
    className,
    onValueChange,
}: {
    name: string
    rows: string[]
    columns: string[]
    multiple?: boolean
    defaultValue?: AnswerGridValue
    disabled?: boolean
    required?: boolean
    className?: string
    onValueChange?: (value: AnswerGridValue) => void
}) {
    const [value, setValue] = useState<AnswerGridValue>(defaultValue)

    function changeValue(row: string, column: string, checked: boolean) {
        const currentRowValue = value[row] ?? []
        const nextRowValue = multiple
            ? checked
                ? [...currentRowValue, column]
                : currentRowValue.filter((item) => item !== column)
            : checked
              ? [column]
              : []
        const nextValue = { ...value, [row]: nextRowValue }

        setValue(nextValue)
        onValueChange?.(nextValue)
    }

    return (
        <div className={cn('w-full overflow-x-auto', className)}>
            <table
                className="w-full table-fixed border-collapse [&_tbody_tr:last-child>*]:border-b-0"
                style={{ minWidth: `${96 + columns.length * 72}px` }}
            >
                <thead>
                    <tr>
                        <th
                            scope="col"
                            className="border-border/50 sticky left-0 z-20 w-24 overflow-hidden border-b"
                        >
                            <StickyGridBackground />
                        </th>
                        {columns.map((column, columnIndex) => (
                            <th
                                key={column}
                                scope="col"
                                className={cn(
                                    'text-muted-foreground border-border/50 overflow-hidden border-b border-l px-1 py-2 text-center text-xs font-medium',
                                    columnIndex === 0 && 'border-l-0',
                                )}
                            >
                                <GridLabel value={column} />
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, rowIndex) => (
                        <tr key={row}>
                            <th
                                scope="row"
                                className="text-muted-foreground border-border/40 sticky left-0 z-10 overflow-hidden border-b py-2 pr-2 text-left text-xs font-medium"
                            >
                                <StickyGridBackground />
                                <GridLabel value={row} align="start" />
                            </th>
                            {columns.map((column, columnIndex) => {
                                const checked = (value[row] ?? []).includes(column)
                                const inputId = `${name}-${rowIndex}-${columnIndex}`

                                return (
                                    <td
                                        key={column}
                                        className={cn(
                                            'border-border/40 border-b border-l p-0 text-center',
                                            columnIndex === 0 && 'border-l-0',
                                        )}
                                    >
                                        <label
                                            htmlFor={inputId}
                                            className={cn(
                                                'flex min-h-10 w-full cursor-pointer items-center justify-center',
                                                disabled &&
                                                    'cursor-not-allowed opacity-50',
                                            )}
                                        >
                                            <input
                                                id={inputId}
                                                type={multiple ? 'checkbox' : 'radio'}
                                                name={
                                                    multiple
                                                        ? `${name}[${row}][]`
                                                        : `${name}[${row}]`
                                                }
                                                value={column}
                                                checked={checked}
                                                disabled={disabled}
                                                required={!multiple && required}
                                                aria-label={`${row}: ${column}`}
                                                style={{
                                                    accentColor:
                                                        'var(--survey-color, var(--primary))',
                                                }}
                                                className="size-4 cursor-pointer disabled:cursor-not-allowed"
                                                onClick={() => {
                                                    if (!multiple) {
                                                        changeValue(
                                                            row,
                                                            column,
                                                            required && checked
                                                                ? true
                                                                : !checked,
                                                        )
                                                    }
                                                }}
                                                onChange={(event) => {
                                                    if (multiple) {
                                                        changeValue(
                                                            row,
                                                            column,
                                                            event.target.checked,
                                                        )
                                                    }
                                                }}
                                            />
                                        </label>
                                    </td>
                                )
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

function GridLabel({
    value,
    align = 'center',
}: {
    value: string
    align?: 'start' | 'center'
}) {
    const [open, setOpen] = useState(false)

    return (
        <Tooltip open={open} onOpenChange={setOpen}>
            <TooltipTrigger
                closeOnClick={false}
                render={
                    <span
                        className={cn(
                            'relative z-10 block w-full truncate',
                            align === 'start' ? 'text-left' : 'text-center',
                        )}
                        onClick={(event) => {
                            event.stopPropagation()
                            setOpen(true)
                        }}
                    />
                }
            >
                {value}
            </TooltipTrigger>
            <TooltipContent>{value}</TooltipContent>
        </Tooltip>
    )
}

function StickyGridBackground() {
    return (
        <span aria-hidden className="absolute inset-0 z-0 bg-white">
            <span className="bg-border/40 absolute inset-y-0 right-0 w-px" />
        </span>
    )
}
