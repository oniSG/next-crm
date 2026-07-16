'use client'

import type { ColumnDef } from '@tanstack/react-table'

import { DateCell } from '@/components/custom/data-table/cells/date-cell'
import { PersonCell } from '@/components/custom/data-table/cells/person-cell'
import { TagCell } from '@/components/custom/data-table/cells/tag-cell'
import { TextCell } from '@/components/custom/data-table/cells/text-cell'

import type { Segment } from './types'

export const columns: ColumnDef<Segment>[] = [
    {
        accessorKey: 'id',
        header: 'id',
        cell: ({ row }) => <TextCell value={row.original.id} />,
    },
    {
        accessorKey: 'name',
        header: 'name',
        cell: ({ row }) => <TextCell value={row.original.name} />,
    },
    {
        accessorKey: 'tags',
        header: 'tags',
        cell: ({ row }) => <TagCell value={row.original.tags} />,
    },
    {
        accessorKey: 'description',
        header: 'description',
        cell: ({ row }) => <TextCell value={row.original.description} />,
    },
    {
        accessorKey: 'createdBy',
        header: 'createdBy',
        cell: ({ row }) => <PersonCell value={row.original.createdBy} />,
    },
    {
        accessorKey: 'recalculation',
        header: 'recalculation',
        cell: ({ row }) => <TextCell value={row.original.recalculation} />,
    },
    {
        accessorKey: 'state',
        header: 'state',
        cell: ({ row }) => <TextCell value={row.original.state} />,
    },
    {
        accessorKey: 'updatedAt',
        header: 'updatedAt',
        cell: ({ row }) => <DateCell value={row.original.updatedAt} />,
    },
    {
        accessorKey: 'lastRecalculatedAt',
        header: 'lastRecalculatedAt',
        cell: ({ row }) => <DateCell value={row.original.lastRecalculatedAt} />,
    },
]
