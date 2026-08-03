'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { FileIcon, UploadIcon, XIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export type FileInputProps = {
    id?: string
    name?: string
    accept?: string
    disabled?: boolean
    className?: string
    onFileChange?: (file: File | null) => void
}

export function FileInput({
    id,
    name = 'file',
    accept,
    disabled,
    className,
    onFileChange,
}: FileInputProps) {
    const inputRef = useRef<HTMLInputElement>(null)
    const removalTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const [file, setFile] = useState<File | null>(null)
    const [isRemoving, setIsRemoving] = useState(false)
    const previewUrl = useMemo(
        () => (file?.type.startsWith('image/') ? URL.createObjectURL(file) : null),
        [file],
    )

    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl)
        }
    }, [previewUrl])

    useEffect(() => {
        return () => {
            if (removalTimeoutRef.current) clearTimeout(removalTimeoutRef.current)
        }
    }, [])

    function changeFile(nextFile: File | null) {
        if (removalTimeoutRef.current) clearTimeout(removalTimeoutRef.current)
        setIsRemoving(false)
        setFile(nextFile)
        onFileChange?.(nextFile)
    }

    function clearFile() {
        if (inputRef.current) inputRef.current.value = ''
        setIsRemoving(true)
        removalTimeoutRef.current = setTimeout(() => {
            setFile(null)
            setIsRemoving(false)
            onFileChange?.(null)
            removalTimeoutRef.current = null
        }, 200)
    }

    return (
        <div className={cn('space-y-2', className)}>
            <input
                ref={inputRef}
                id={id}
                name={name}
                type="file"
                accept={accept}
                disabled={disabled}
                className="sr-only"
                onChange={(event) => changeFile(event.target.files?.[0] ?? null)}
            />

            {!file ? (
                <Button
                    type="button"
                    variant="outline"
                    disabled={disabled}
                    onClick={() => inputRef.current?.click()}
                >
                    <UploadIcon />
                    Choose file
                </Button>
            ) : (
                <div
                    className={cn(
                        'flex items-center gap-3 rounded-xl border p-2 duration-200',
                        isRemoving
                            ? 'animate-out fade-out-0 zoom-out-95'
                            : 'animate-in fade-in-0 zoom-in-95',
                    )}
                >
                    {previewUrl ? (
                        <div className="group relative shrink-0">
                            <div
                                role="img"
                                aria-label={`Preview of ${file.name}`}
                                className="size-9 rounded-md border bg-cover bg-center"
                                style={{ backgroundImage: `url(${previewUrl})` }}
                            />
                            <div
                                aria-hidden="true"
                                className="bg-background pointer-events-none absolute bottom-full left-0 z-50 mb-2 size-40 scale-95 rounded-xl border bg-cover bg-center opacity-0 shadow-lg transition-[opacity,transform] duration-200 ease-out group-hover:scale-100 group-hover:opacity-100"
                                style={{ backgroundImage: `url(${previewUrl})` }}
                            />
                        </div>
                    ) : (
                        <div className="bg-muted flex size-9 shrink-0 items-center justify-center rounded-md border">
                            <FileIcon className="text-muted-foreground size-4" />
                        </div>
                    )}

                    <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{file.name}</p>
                        <p className="text-muted-foreground text-xs">
                            {formatFileSize(file.size)}
                        </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-1">
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            disabled={disabled}
                            onClick={() => inputRef.current?.click()}
                        >
                            Change
                        </Button>
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon-sm"
                            disabled={disabled}
                            aria-label="Remove selected file"
                            onClick={clearFile}
                        >
                            <XIcon />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}

function formatFileSize(bytes: number) {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
