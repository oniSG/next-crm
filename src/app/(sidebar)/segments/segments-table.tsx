'use client'

import { TablePageProvider } from '@/components/custom/table-page-template/context'
import { Table } from '@/components/custom/table-page-template/table'
import { TableBody } from '@/components/custom/table-page-template/table-body/table-body'
import { TableBottombar } from '@/components/custom/table-page-template/table-bottombar/table-bottombar'
import { TableTopbar } from '@/components/custom/table-page-template/table-topbar/table-topbar'

import { columns } from './columns'
import { segmentsQueryOptions } from './queries'
import type { Segment } from './types'

export function SegmentsTable() {
    return (
        <TablePageProvider<Segment> queryOptions={segmentsQueryOptions} columns={columns}>
            <Table>
                <TableTopbar />
                <TableBody />
            </Table>
            <TableBottombar />
        </TablePageProvider>
    )
}
