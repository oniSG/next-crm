'use client'

import type { ColumnDef } from '@tanstack/react-table'

import type { Segment } from './types'

export const columns: ColumnDef<Segment>[] = [
    { accessorKey: 'id', header: 'id' },
    { accessorKey: 'name', header: 'name' },
    { accessorKey: 'tags', header: 'tags' },
    { accessorKey: 'description', header: 'description' },
    { accessorKey: 'createdBy', header: 'createdBy' },
    { accessorKey: 'recalculation', header: 'recalculation' },
    { accessorKey: 'state', header: 'state' },
    { accessorKey: 'updatedAt', header: 'updatedAt' },
    { accessorKey: 'lastRecalculatedAt', header: 'lastRecalculatedAt' },
]
