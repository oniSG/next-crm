'use client'

import { Button } from '@/components/ui/button'
import { ButtonGroup } from '@/components/ui/button-group'
import { cn } from '@/lib/utils'

export function SaveCancelActions({
    open,
    onCancel,
    onSave,
    saveLabel = 'Save changes',
    className,
}: {
    open: boolean
    onCancel: () => void
    onSave: () => void
    saveLabel?: string
    className?: string
}) {
    return (
        <div
            aria-hidden={!open}
            className={cn(
                'fixed inset-x-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[opacity,transform] motion-reduce:transition-none md:right-4 md:bottom-4 md:left-auto md:z-60',
                open
                    ? 'translate-y-0 opacity-100'
                    : 'pointer-events-none translate-y-2 opacity-0',
                className,
            )}
        >
            <ButtonGroup className="bg-background w-full rounded-lg shadow-[0_12px_56px_12px_rgba(255,255,255,0.96)] md:w-fit dark:shadow-[0_12px_56px_12px_rgba(0,0,0,0.8)]">
                <Button
                    type="button"
                    variant="outline"
                    className="flex-1 md:flex-none"
                    tabIndex={open ? undefined : -1}
                    onClick={onCancel}
                >
                    Cancel
                </Button>
                <Button
                    type="button"
                    className="flex-1 md:flex-none"
                    tabIndex={open ? undefined : -1}
                    onClick={onSave}
                >
                    {saveLabel}
                </Button>
            </ButtonGroup>
        </div>
    )
}
