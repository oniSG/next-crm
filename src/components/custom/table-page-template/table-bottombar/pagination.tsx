'use client'

import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { ButtonGroup } from '@/components/ui/button-group'

import { useTablePage } from '../context'
import { GotoPage } from './goto-page'

export function Pagination() {
    const { page, totalPages, total, loading, nextPage, prevPage } = useTablePage()

    const isFirst = page <= 1
    const isLast = page >= totalPages
    const initialLoad = loading && total === 0

    if (initialLoad) {
        return (
            <ButtonGroup>
                <Button
                    variant="outline"
                    size="sm"
                    disabled
                    aria-label="Předchozí stránka"
                    className="px-2"
                >
                    <ChevronLeftIcon />
                </Button>
                <Button variant="outline" size="sm" disabled className="tabular-nums">
                    0 / 0
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    disabled
                    aria-label="Další stránka"
                    className="px-2"
                >
                    <ChevronRightIcon />
                </Button>
            </ButtonGroup>
        )
    }

    return (
        <ButtonGroup>
            <Button
                variant="outline"
                size="sm"
                disabled={isFirst || loading}
                aria-label="Předchozí stránka"
                onClick={prevPage}
                className="px-2"
            >
                <ChevronLeftIcon />
            </Button>
            <GotoPage />
            <Button
                variant="outline"
                size="sm"
                disabled={isLast || loading}
                aria-label="Další stránka"
                onClick={nextPage}
                className="px-2"
            >
                <ChevronRightIcon />
            </Button>
        </ButtonGroup>
    )
}
