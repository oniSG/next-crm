'use client'

import { Panel, useReactFlow, useStore } from '@xyflow/react'
import { MinusIcon, PlusIcon, ScanIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { ButtonGroup } from '@/components/ui/button-group'

/** Bottom-left zoom controls: zoom in / out / fit view (same as Svelte). */
export function ZoomControls() {
    const { zoomIn, zoomOut, fitView } = useReactFlow()
    const minZoom = useStore((state) => state.minZoom)
    const maxZoom = useStore((state) => state.maxZoom)
    const zoom = useStore((state) => state.transform[2])

    const minZoomReached = zoom <= minZoom
    const maxZoomReached = zoom >= maxZoom

    return (
        <Panel position="bottom-left" className="!m-4">
            <ButtonGroup>
                <Button
                    type="button"
                    size="icon-sm"
                    variant="outline"
                    className="px-2"
                    disabled={maxZoomReached}
                    aria-label="Zoom in"
                    onClick={() => void zoomIn()}
                >
                    <PlusIcon />
                </Button>
                <Button
                    type="button"
                    size="icon-sm"
                    variant="outline"
                    className="px-2"
                    disabled={minZoomReached}
                    aria-label="Zoom out"
                    onClick={() => void zoomOut()}
                >
                    <MinusIcon />
                </Button>
                <Button
                    type="button"
                    size="icon-sm"
                    variant="outline"
                    className="px-2"
                    aria-label="Fit view"
                    onClick={() => void fitView({ padding: 0.2 })}
                >
                    <ScanIcon />
                </Button>
            </ButtonGroup>
        </Panel>
    )
}
