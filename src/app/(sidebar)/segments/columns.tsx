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
        size: 80,
        minSize: 60,
    },
    {
        accessorKey: 'name',
        header: () => <HeadingCell field="name" label="name" />,
        cell: ({ row }) => <TextCell value={row.original.name} />,
        size: 220,
    },
    {
        accessorKey: 'tags',
        header: 'tags',
        cell: ({ row }) => <TagCell value={row.original.tags} />,
        size: 200,
    },
    {
        accessorKey: 'description',
        header: () => <HeadingCell field="description" label="description" />,
        cell: ({ row }) => <TextCell value={row.original.description} />,
        size: 320,
    },
    {
        accessorKey: 'createdBy',
        header: () => <HeadingCell field="createdBy" label="createdBy" />,
        cell: ({ row }) => <PersonCell value={row.original.createdBy} />,
        size: 180,
    },
    {
        accessorKey: 'recalculation',
        header: () => <HeadingCell field="recalculation" label="recalculation" />,
        cell: ({ row }) => <TextCell value={row.original.recalculation} />,
        size: 160,
    },
    {
        accessorKey: 'state',
        header: () => <HeadingCell field="state" label="state" />,
        cell: ({ row }) => <TextCell value={row.original.state} />,
        size: 120,
    },
    {
        accessorKey: 'updatedAt',
        header: () => <HeadingCell field="updatedAt" label="updatedAt" />,
        cell: ({ row }) => <DateCell value={row.original.updatedAt} />,
        size: 170,
    },
    {
        accessorKey: 'lastRecalculatedAt',
        header: () => (
            <HeadingCell field="lastRecalculatedAt" label="lastRecalculatedAt" />
        ),
        cell: ({ row }) => <DateCell value={row.original.lastRecalculatedAt} />,
        size: 170,
        meta: { fill: true },
    },
]
