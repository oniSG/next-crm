'use client'

import * as React from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

import type { WorkflowDrawerContentProps } from '../../shared/types'
import {
    roundedFieldClass,
    sectionTitleClass,
    SMS_SPECIAL_LINKS,
    tagChipClass,
    workflowMergeTags,
} from '../shared/constants'
import { FieldLabel } from '../shared/form-components'
import {
    stringConfig,
    useNodeConfigSave,
} from '../shared/use-node-config-save'

const SMS_CHAR_LIMIT = 255

export function SmsContent({
    nodeId,
    data,
    syncNodeConfig,
}: WorkflowDrawerContentProps) {
    const [note, setNote] = React.useState(() =>
        stringConfig(data.config, 'note'),
    )
    const [sender, setSender] = React.useState(() =>
        stringConfig(data.config, 'sender'),
    )
    const [messageText, setMessageText] = React.useState(() =>
        stringConfig(data.config, 'messageText'),
    )

    React.useEffect(() => {
        setNote(stringConfig(data.config, 'note'))
        setSender(stringConfig(data.config, 'sender'))
        setMessageText(stringConfig(data.config, 'messageText'))
    }, [nodeId])

    useNodeConfigSave({
        nodeId,
        syncNodeConfig,
        getPayload: () => ({ note, sender, messageText }),
    })

    function insertToken(token: string) {
        setMessageText((current) => {
            if (current.length >= SMS_CHAR_LIMIT) return current
            const remaining = SMS_CHAR_LIMIT - current.length
            return current + token.slice(0, remaining)
        })
    }

    const mergeTags = workflowMergeTags()
    const messageLength = messageText.length

    return (
        <div className="space-y-6">
            <section className="space-y-3">
                <h3 className={sectionTitleClass}>Merge tagy</h3>
                <div className="flex flex-wrap gap-2">
                    {mergeTags.map((tag) => (
                        <Button
                            key={tag.token}
                            type="button"
                            variant="outline"
                            size="sm"
                            className={tagChipClass}
                            onClick={() => insertToken(tag.token)}
                        >
                            {tag.label}
                        </Button>
                    ))}
                </div>
            </section>

            <section className="space-y-3">
                <h3 className={sectionTitleClass}>Speciální linky</h3>
                <div className="flex flex-wrap gap-2">
                    {SMS_SPECIAL_LINKS.map((link) => (
                        <Button
                            key={link.token}
                            type="button"
                            variant="outline"
                            size="sm"
                            className={tagChipClass}
                            onClick={() => insertToken(link.token)}
                        >
                            {link.label}
                        </Button>
                    ))}
                </div>
            </section>

            <div className="space-y-2">
                <FieldLabel htmlFor="sms-note">
                    Poznámka pod názvem v diagramu
                </FieldLabel>
                <Input
                    id="sms-note"
                    className={roundedFieldClass}
                    value={note}
                    onChange={(event) => setNote(event.target.value)}
                    placeholder="Poznámka"
                />
            </div>

            <div className="space-y-2">
                <FieldLabel htmlFor="sms-sender">Odesílatel zprávy</FieldLabel>
                <Input
                    id="sms-sender"
                    className={roundedFieldClass}
                    value={sender}
                    onChange={(event) => setSender(event.target.value)}
                    placeholder="Odesílatel zprávy"
                />
            </div>

            <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                    <FieldLabel htmlFor="sms-message" required>
                        Text zprávy
                    </FieldLabel>
                    <span
                        className={cn(
                            'text-xs tabular-nums',
                            messageLength > SMS_CHAR_LIMIT
                                ? 'text-destructive'
                                : 'text-muted-foreground',
                        )}
                    >
                        {messageLength} / {SMS_CHAR_LIMIT}
                    </span>
                </div>
                <Textarea
                    id="sms-message"
                    className={cn('min-h-28', roundedFieldClass)}
                    value={messageText}
                    onChange={(event) => setMessageText(event.target.value)}
                    maxLength={SMS_CHAR_LIMIT}
                    placeholder="Text zprávy"
                />
            </div>
        </div>
    )
}
