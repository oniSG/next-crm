'use client'

import type { ColumnDef } from '@tanstack/react-table'

import type { Template } from './types'

export const columns: ColumnDef<Template>[] = [
    { accessorKey: 'id', header: 'id' },
    { accessorKey: 'name', header: 'name' },
    { accessorKey: 'createdBy', header: 'createdBy' },
    { accessorKey: 'tags', header: 'tags' },
    { accessorKey: 'createdAt', header: 'createdAt' },
    { accessorKey: 'description', header: 'description' },
    { accessorKey: 'translationState', header: 'translationState' },
    { accessorKey: 'active', header: 'active' },
]
