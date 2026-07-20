'use client'

import type { ColumnDef } from '@tanstack/react-table'

import { DateCell } from '@/components/custom/table-page-template/table-body/cells/date-cell'
import { PersonCell } from '@/components/custom/table-page-template/table-body/cells/person-cell'
import { TagCell } from '@/components/custom/table-page-template/table-body/cells/tag-cell'
import { TextCell } from '@/components/custom/table-page-template/table-body/cells/text-cell'
import { HeadingCell } from '@/components/custom/table-page-template/table-topbar/heading-cell'

import type { Segment } from './types'

export const columns: ColumnDef<Segment>[] = [
    {
        accessorKey: 'id',
        header: () => <HeadingCell field="id" label="id" />,
        cell: ({ row }) => <TextCell value={row.original.id} />,
    },
    {
        accessorKey: 'name',
        header: () => <HeadingCell field="name" label="name" />,
        cell: ({ row }) => <TextCell value={row.original.name} />,
    },
    {
        accessorKey: 'tags',
        header: 'tags',
        cell: ({ row }) => <TagCell value={row.original.tags} />,
    },
    {
        accessorKey: 'description',
        header: () => <HeadingCell field="description" label="description" />,
        cell: ({ row }) => <TextCell value={row.original.description} />,
    },
    {
        accessorKey: 'createdBy',
        header: () => <HeadingCell field="createdBy" label="createdBy" />,
        cell: ({ row }) => <PersonCell value={row.original.createdBy} />,
    },
    {
        accessorKey: 'recalculation',
        header: () => <HeadingCell field="recalculation" label="recalculation" />,
        cell: ({ row }) => <TextCell value={row.original.recalculation} />,
    },
    {
        accessorKey: 'state',
        header: () => <HeadingCell field="state" label="state" />,
        cell: ({ row }) => <TextCell value={row.original.state} />,
    },
    {
        accessorKey: 'updatedAt',
        header: () => <HeadingCell field="updatedAt" label="updatedAt" />,
        cell: ({ row }) => <DateCell value={row.original.updatedAt} />,
    },
    {
        accessorKey: 'lastRecalculatedAt',
        header: () => (
            <HeadingCell field="lastRecalculatedAt" label="lastRecalculatedAt" />
        ),
        cell: ({ row }) => <DateCell value={row.original.lastRecalculatedAt} />,
    },
]
