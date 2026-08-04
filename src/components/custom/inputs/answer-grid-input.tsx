'use client'

import { useState } from 'react'

import { cn } from '@/lib/utils'

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
            : [column]
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
                        <th scope="col" className="border-border/50 w-24 border-b" />
                        {columns.map((column) => (
                            <th
                                key={column}
                                scope="col"
                                className="text-muted-foreground border-border/50 border-b border-l px-1 py-2 text-center text-xs font-medium break-words"
                            >
                                {column}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, rowIndex) => (
                        <tr key={row}>
                            <th
                                scope="row"
                                className="text-muted-foreground border-border/40 border-b py-2 pr-2 text-left text-xs font-medium break-words"
                            >
                                {row}
                            </th>
                            {columns.map((column, columnIndex) => {
                                const checked = (value[row] ?? []).includes(column)
                                const inputId = `${name}-${rowIndex}-${columnIndex}`

                                return (
                                    <td
                                        key={column}
                                        className="border-border/40 border-b border-l px-1 py-2 text-center"
                                    >
                                        <label
                                            htmlFor={inputId}
                                            className={cn(
                                                'inline-flex cursor-pointer rounded-full p-1',
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
                                                className="size-4"
                                                onChange={(event) =>
                                                    changeValue(
                                                        row,
                                                        column,
                                                        event.target.checked,
                                                    )
                                                }
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
