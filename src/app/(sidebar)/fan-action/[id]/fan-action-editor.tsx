'use client'

import PageHeader from '@/components/custom/layout/page-header'

import { Canvas } from './canvas/canvas'
import type { FanAction } from './data'
import { FanActionEditorProvider } from './context'
import { NodeConfigPanel } from './node-config/node-config-panel'
import { PageActions } from './page-actions'
import { PalettePanel } from './palette/palette-panel'

/** Three-pane editor chrome (palette | canvas | node config). */
function FanActionEditorLayout() {
    return (
        <div className="flex h-full min-h-0 w-full overflow-hidden">
            <PalettePanel />
            <div className="relative min-h-0 min-w-0 flex-1 overflow-hidden">
                <Canvas />
            </div>
            <NodeConfigPanel />
        </div>
    )
}

/** Sidebar page: Provider wraps header actions + editor so Save can call `saveAll`. */
export function FanActionPage({ action }: { action: FanAction }) {
    return (
        <FanActionEditorProvider action={action}>
            <div className="flex h-svh flex-col overflow-hidden">
                <PageHeader
                    breadcrumbs={[
                        { label: 'Campaigns', href: '/fan-action' },
                        { label: action.event },
                    ]}
                >
                    <PageActions />
                </PageHeader>
                <div className="min-h-0 flex-1 overflow-hidden">
                    <FanActionEditorLayout />
                </div>
            </div>
        </FanActionEditorProvider>
    )
}

/** Print route (and any embed): editor only, still inside Provider. */
export function FanActionEditor({ action }: { action: FanAction }) {
    return (
        <FanActionEditorProvider action={action}>
            <FanActionEditorLayout />
        </FanActionEditorProvider>
    )
}
