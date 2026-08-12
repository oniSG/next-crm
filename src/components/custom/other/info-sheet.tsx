'use client'

import type { ReactNode } from 'react'
import { InfoIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'

type InfoSheetProps = {
    title?: string
    children?: ReactNode
}

export default function InfoSheet({ title, children }: InfoSheetProps) {
    return (
        <Sheet>
            <SheetTrigger render={<Button size="icon" variant="ghost" />}>
                <InfoIcon />
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col overflow-hidden">
                {title && (
                    <SheetHeader>
                        <SheetTitle>{title}</SheetTitle>
                    </SheetHeader>
                )}
                {children ? (
                    <div className="prose prose-sm dark:prose-invert max-w-none flex-1 overflow-y-auto px-6 pb-6 prose-p:leading-relaxed prose-ol:list-decimal prose-ul:list-disc [&_ol>li>ul]:mt-2 [&_ol>li>ul]:mb-0">
                        {children}
                    </div>
                ) : null}
            </SheetContent>
        </Sheet>
    )
}
