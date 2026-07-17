'use client'

import { TablePageProvider } from '@/components/custom/table-page-template/context'
import { Table } from '@/components/custom/table-page-template/table'
import { TableBody } from '@/components/custom/table-page-template/table-body/table-body'
import { TableBottombar } from '@/components/custom/table-page-template/table-bottombar/table-bottombar'
import { TableTopbar } from '@/components/custom/table-page-template/table-topbar/table-topbar'

import { columns } from './columns'
import { templatesQueryOptions } from './queries'
import type { Template } from './types'

export function TemplatesTable() {
    return (
        <TablePageProvider<Template> queryOptions={templatesQueryOptions} columns={columns}>
            <Table>
                <TableTopbar />
                <TableBody />
            </Table>
            <TableBottombar />
        </TablePageProvider>
    )
}
