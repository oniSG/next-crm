import { Button } from '@/components/ui/button'
import { SheetTrigger, SheetContent, Sheet } from '@/components/ui/sheet'
import { InfoIcon } from 'lucide-react'

export default function InfoSheet({ children }: { children: React.ReactNode }) {
    return (
        <Sheet>
            <SheetTrigger render={<Button size="icon" variant="ghost" />}>
                <InfoIcon />
            </SheetTrigger>
            <SheetContent>
                <div className="prose prose-sm dark:prose-invert max-w-none overflow-y-auto p-6">
                    {children}
                </div>
            </SheetContent>
        </Sheet>
    )
}
