'use client'

import type { ColumnDef } from '@tanstack/react-table'

import { HeadingCell } from '@/components/custom/table-page-template/table-topbar/heading-cell'

import type { Template } from './types'

export const columns: ColumnDef<Template>[] = [
    { accessorKey: 'id', header: () => <HeadingCell field="id" label="id" /> },
    { accessorKey: 'name', header: () => <HeadingCell field="name" label="name" /> },
    {
        accessorKey: 'createdBy',
        header: () => <HeadingCell field="createdBy" label="createdBy" />,
    },
    { accessorKey: 'tags', header: 'tags' },
    {
        accessorKey: 'createdAt',
        header: () => <HeadingCell field="createdAt" label="createdAt" />,
    },
    {
        accessorKey: 'description',
        header: () => <HeadingCell field="description" label="description" />,
    },
    {
        accessorKey: 'translationState',
        header: () => (
            <HeadingCell field="translationState" label="translationState" />
        ),
    },
    {
        accessorKey: 'active',
        header: () => <HeadingCell field="active" label="active" />,
    },
]
