'use client'

import * as React from 'react'
import { useNodes } from '@xyflow/react'
import { XIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import { useFanActionEditor, type WorkflowNode } from '../context'
import {
    workflowDrawerTitle,
    workflowItemDescription,
} from '../shared/workflow-catalog'
import type { SyncNodeConfig } from '../shared/types'
import { workflowDrawerContent } from './sheet-registry'

export function NodeConfigPanel() {
    const {
        action,
        activeNodeId,
        drawerOpen,
        configureNode,
        setNodes,
    } = useFanActionEditor()
    // Subscribe to xyflow store for renders; mutations go through context.
    const nodes = useNodes<WorkflowNode>()

    const node =
        activeNodeId != null
            ? (nodes.find((item) => item.id === activeNodeId) ?? null)
            : null
    const panelOpen = Boolean(drawerOpen && node)
    const DrawerContent = node
        ? workflowDrawerContent(node.data.itemId)
        : null

    React.useEffect(() => {
        if (drawerOpen && !node) {
            configureNode(null)
        }
    }, [drawerOpen, node, configureNode])

    const syncNodeConfig = React.useEffectEvent<SyncNodeConfig>(
        (nodeId, config) => {
            setNodes((current) => {
                const existing = current.find((item) => item.id === nodeId)
                if (
                    existing &&
                    existing.data.incomplete === false &&
                    existing.data.config === config
                ) {
                    return current
                }
                if (
                    existing &&
                    existing.data.incomplete === false &&
                    JSON.stringify(existing.data.config) ===
                        JSON.stringify(config)
                ) {
                    return current
                }
                return current.map((item) =>
                    item.id === nodeId
                        ? {
                              ...item,
                              data: {
                                  ...item.data,
                                  config,
                                  incomplete: false,
                              },
                          }
                        : item,
                )
            })
        },
    )

    const title = node ? workflowDrawerTitle(node.data.itemId) : ''
    const description = node
        ? workflowItemDescription(node.data.itemId)
        : ''

    return (
        <div
            className={cn(
                'relative h-full shrink-0 overflow-hidden transition-[width] duration-200 ease-linear',
                panelOpen ? 'w-96' : 'w-0',
            )}
        >
            {node && DrawerContent ? (
                <div
                    className={cn(
                        'absolute inset-y-0 right-0 flex h-full w-96 flex-col border-s bg-background transition-transform duration-200 ease-linear',
                        panelOpen ? 'translate-x-0' : 'translate-x-full',
                    )}
                    aria-hidden={!panelOpen}
                >
                    {panelOpen ? (
                        <div className="flex h-full w-full flex-col overflow-hidden">
                            <div className="relative flex shrink-0 flex-col gap-0.5 border-b p-4 pr-12">
                                <h2 className="font-heading text-base font-medium text-foreground">
                                    {title}
                                </h2>
                                {description ? (
                                    <p className="text-sm text-muted-foreground">
                                        {description}
                                    </p>
                                ) : null}
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon-sm"
                                    className="absolute top-3 right-3"
                                    onClick={() => configureNode(null)}
                                >
                                    <XIcon />
                                    <span className="sr-only">Zavřít</span>
                                </Button>
                            </div>

                            <div className="min-h-0 flex-1 space-y-6 overflow-y-auto px-6 py-2 pb-6">
                                <DrawerContent
                                    key={`${node.id}:${node.data.itemId}`}
                                    actionId={action.id}
                                    nodeId={node.id}
                                    data={node.data}
                                    syncNodeConfig={syncNodeConfig}
                                />
                            </div>
                        </div>
                    ) : null}
                </div>
            ) : null}
        </div>
    )
}
