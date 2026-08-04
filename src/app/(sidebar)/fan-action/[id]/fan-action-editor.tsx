'use client'

import { Canvas } from './canvas/canvas'
import type { FanAction } from './data'
import { FanActionEditorProvider } from './context'
import { NodeConfigPanel } from './node-config/node-config-panel'
import { PalettePanel } from './palette/palette-panel'

/** Used by print route; sidebar page uses FanActionPage instead. */
export function FanActionEditor({ action }: { action: FanAction }) {
    return (
        <FanActionEditorProvider action={action}>
            <div className="flex h-full min-h-0 w-full overflow-hidden">
                <PalettePanel />
                <div className="relative min-h-0 min-w-0 flex-1 overflow-hidden">
                    <Canvas />
                </div>
                <NodeConfigPanel />
            </div>
        </FanActionEditorProvider>
    )
}
