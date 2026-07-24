'use client'

import type { ColumnDef } from '@tanstack/react-table'

import { HeadingCell } from '@/components/custom/table-page-template/table-topbar/heading-cell'

import type { Template } from './types'

export const columns: ColumnDef<Template>[] = [
    {
        accessorKey: 'id',
        header: () => <HeadingCell field="id" label="id" />,
        size: 80,
        minSize: 60,
    },
    {
        accessorKey: 'name',
        header: () => <HeadingCell field="name" label="name" />,
        size: 220,
    },
    {
        accessorKey: 'createdBy',
        header: () => <HeadingCell field="createdBy" label="createdBy" />,
        size: 180,
    },
    { accessorKey: 'tags', header: 'tags', size: 200 },
    {
        accessorKey: 'createdAt',
        header: () => <HeadingCell field="createdAt" label="createdAt" />,
        size: 160,
    },
    {
        accessorKey: 'description',
        header: () => <HeadingCell field="description" label="description" />,
        size: 320,
    },
    {
        accessorKey: 'translationState',
        header: () => <HeadingCell field="translationState" label="translationState" />,
        size: 160,
    },
    {
        accessorKey: 'active',
        header: () => <HeadingCell field="active" label="active" />,
        size: 90,
        minSize: 70,
        meta: { fill: true },
    },
]
