'use client'

import { ChevronDownIcon, InfinityIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { useTablePage } from '../context'

const ENDLESS_VALUE = '__endless__'

export function LimitSelector() {
    const { limit, endless, pageSizes, setLimit, setEndless } = useTablePage()

    const selectedValue = endless ? ENDLESS_VALUE : String(limit)

    return (
        <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-sm">Řádků na stránku</span>
            <DropdownMenu>
                <DropdownMenuTrigger
                    render={
                        <Button
                            variant="outline"
                            size="sm"
                            className="min-w-10 rounded-full px-3 tabular-nums"
                        />
                    }
                >
                    {endless ? <InfinityIcon /> : limit}
                    <ChevronDownIcon />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" sideOffset={6}>
                    <DropdownMenuRadioGroup
                        value={selectedValue}
                        onValueChange={(v) => {
                            if (v === ENDLESS_VALUE) {
                                setEndless(true)
                                return
                            }
                            if (endless) setEndless(false)
                            setLimit(parseInt(v, 10))
                        }}
                    >
                        {pageSizes.map((size) => (
                            <DropdownMenuRadioItem
                                key={size}
                                value={String(size)}
                                closeOnClick
                            >
                                {size}
                            </DropdownMenuRadioItem>
                        ))}
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioItem value={ENDLESS_VALUE} closeOnClick>
                            Nekonečné rolování
                        </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
