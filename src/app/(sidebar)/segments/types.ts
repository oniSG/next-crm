
export type SegmentRecalculation = 'manual' | 'automatic' | 'regular'
export type SegmentState = 'calculated' | 'calculating' | 'pending' | 'failed'

export type SegmentTag = {
    id: string
    label: string
    color: 'orange' | 'gray' | 'red' | 'green' | 'blue' | 'purple' | 'yellow' | 'pink'
}

export type Segment = {
    id: string
    name: string
    tags: SegmentTag[]
    description: string
    createdBy: string
    recalculation: SegmentRecalculation
    state: SegmentState
    updatedAt: string
    lastRecalculatedAt: string | null
}