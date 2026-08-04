'use client'

import * as React from 'react'

import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

import type { WorkflowDrawerContentProps } from '../../shared/types'
import { EMAIL_TEMPLATES, toSelectItems } from '../shared/constants'
import {
    boolConfig,
    stringConfig,
    useNodeConfigSave,
} from '../shared/use-node-config-save'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const CONSENT_FIELDS = [
    {
        key: 'marketing' as const,
        label: 'Marketingové účely',
    },
    {
        key: 'organizer' as const,
        label: 'Oznámení organizátora (např. organizační info, přesuny apod.)',
    },
    {
        key: 'events' as const,
        label: 'Oznámení o akcích (např. pozvánky na zápasy či koncerty, nabídky vstupenek apod.)',
    },
    {
        key: 'special' as const,
        label: 'Speciální nabídky',
    },
]

function consentConfig(
    config: Record<string, unknown> | undefined,
    key: string,
): boolean {
    const prefs = config?.consentPreferences
    if (prefs && typeof prefs === 'object' && !Array.isArray(prefs)) {
        const value = (prefs as Record<string, unknown>)[key]
        if (typeof value === 'boolean') return value
    }
    return true
}

export function EmailContent({
    nodeId,
    data,
    syncNodeConfig,
}: WorkflowDrawerContentProps) {
    const [note, setNote] = React.useState(() =>
        stringConfig(data.config, 'note'),
    )
    const [senderEmail, setSenderEmail] = React.useState(() =>
        stringConfig(data.config, 'senderEmail'),
    )
    const [replyEmail, setReplyEmail] = React.useState(() =>
        stringConfig(data.config, 'replyEmail'),
    )
    const [subject, setSubject] = React.useState(() =>
        stringConfig(data.config, 'subject'),
    )
    const [emailTemplate, setEmailTemplate] = React.useState(() =>
        stringConfig(data.config, 'emailTemplate'),
    )
    const [sendCopyToVisitors, setSendCopyToVisitors] = React.useState(() =>
        boolConfig(data.config, 'sendCopyToVisitors'),
    )
    const [consentMarketing, setConsentMarketing] = React.useState(() =>
        consentConfig(data.config, 'marketing'),
    )
    const [consentOrganizer, setConsentOrganizer] = React.useState(() =>
        consentConfig(data.config, 'organizer'),
    )
    const [consentEvents, setConsentEvents] = React.useState(() =>
        consentConfig(data.config, 'events'),
    )
    const [consentSpecial, setConsentSpecial] = React.useState(() =>
        consentConfig(data.config, 'special'),
    )

    React.useEffect(() => {
        setNote(stringConfig(data.config, 'note'))
        setSenderEmail(stringConfig(data.config, 'senderEmail'))
        setReplyEmail(stringConfig(data.config, 'replyEmail'))
        setSubject(stringConfig(data.config, 'subject'))
        setEmailTemplate(stringConfig(data.config, 'emailTemplate'))
        setSendCopyToVisitors(boolConfig(data.config, 'sendCopyToVisitors'))
        setConsentMarketing(consentConfig(data.config, 'marketing'))
        setConsentOrganizer(consentConfig(data.config, 'organizer'))
        setConsentEvents(consentConfig(data.config, 'events'))
        setConsentSpecial(consentConfig(data.config, 'special'))
    }, [nodeId])

    const consentSetters = {
        marketing: setConsentMarketing,
        organizer: setConsentOrganizer,
        events: setConsentEvents,
        special: setConsentSpecial,
    } as const

    const consentValues = {
        marketing: consentMarketing,
        organizer: consentOrganizer,
        events: consentEvents,
        special: consentSpecial,
    }

    const { errors } = useNodeConfigSave({
        nodeId,
        syncNodeConfig,
        getPayload: () => ({
            note,
            senderEmail,
            replyEmail,
            subject,
            emailTemplate,
            sendCopyToVisitors,
            consentPreferences: { ...consentValues },
        }),
        validate: () => {
            const next: Record<string, string> = {}
            const trimmedNote = note.trim()
            if (trimmedNote.length > 250) {
                next.note = 'Maximálně 250 znaků'
            }
            const trimmedSender = senderEmail.trim()
            if (!trimmedSender) next.senderEmail = 'Povinný údaj'
            else if (!EMAIL_RE.test(trimmedSender))
                next.senderEmail = 'Neplatný e-mail'
            const trimmedReply = replyEmail.trim()
            if (!trimmedReply) next.replyEmail = 'Povinný údaj'
            else if (!EMAIL_RE.test(trimmedReply))
                next.replyEmail = 'Neplatný e-mail'
            const trimmedSubject = subject.trim()
            if (!trimmedSubject) next.subject = 'Povinný údaj'
            else if (trimmedSubject.length > 250)
                next.subject = 'Maximálně 250 znaků'
            if (!emailTemplate.trim()) next.emailTemplate = 'Povinný údaj'
            return Object.keys(next).length > 0 ? next : null
        },
    })

    return (
        <div className="space-y-3">
            <div className="space-y-2">
                <Label htmlFor="email-note">
                    Poznámka pod názvem v diagramu
                </Label>
                <Input
                    id="email-note"
                    value={note}
                    onChange={(event) => setNote(event.target.value)}
                    placeholder="Poznámka"
                    maxLength={250}
                />
                {errors.note ? (
                    <p className="text-destructive text-sm">{errors.note}</p>
                ) : null}
            </div>

            <div className="space-y-2">
                <Label htmlFor="sender-email">
                    Odesílací e-mail
                </Label>
                <Input
                    id="sender-email"
                    type="email"
                    value={senderEmail}
                    onChange={(event) => setSenderEmail(event.target.value)}
                    placeholder="info@relatoo.cz"
                    autoComplete="email"
                />
                {errors.senderEmail ? (
                    <p className="text-destructive text-sm">{errors.senderEmail}</p>
                ) : null}
            </div>

            <div className="space-y-2">
                <Label htmlFor="email-reply">
                    E-mail pro odpověď
                </Label>
                <Input
                    id="email-reply"
                    type="email"
                    value={replyEmail}
                    onChange={(event) => setReplyEmail(event.target.value)}
                    placeholder="E-mail pro odpověď"
                />
                {errors.replyEmail ? (
                    <p className="text-destructive text-sm">{errors.replyEmail}</p>
                ) : null}
            </div>

            <div className="space-y-2">
                <Label htmlFor="email-subject">
                    Předmět e-mailu
                </Label>
                <Input
                    id="email-subject"
                    value={subject}
                    onChange={(event) => setSubject(event.target.value)}
                    placeholder="Předmět e-mailu"
                    maxLength={250}
                />
                {errors.subject ? (
                    <p className="text-destructive text-sm">{errors.subject}</p>
                ) : null}
            </div>

            <div className="space-y-2">
                <Label>Šablona e-mailu</Label>
                <Select
                    items={toSelectItems(EMAIL_TEMPLATES)}
                    value={emailTemplate || null}
                    onValueChange={(next) => {
                        if (typeof next === 'string' && next !== emailTemplate) {
                            setEmailTemplate(next)
                        }
                    }}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder={"Šablona e-mailu"} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {toSelectItems(EMAIL_TEMPLATES).map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                    {item.label}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                {errors.emailTemplate ? (
                    <p className="text-destructive text-sm">{errors.emailTemplate}</p>
                ) : null}
            </div>

            <div className="flex items-center justify-between gap-2">
                <Label htmlFor="send-copy">
                    Odeslat kopii e-mailu připojeným návštěvníkům
                </Label>
                <Switch
                    id="send-copy"
                    checked={sendCopyToVisitors}
                    onCheckedChange={setSendCopyToVisitors}
                    className="shrink-0"
                />
            </div>

            <div className="space-y-4">
                <Separator />
                {CONSENT_FIELDS.map((field) => (
                    <div
                        key={field.key}
                        className="flex items-center justify-between gap-2"
                    >
                        <Label htmlFor={`email-consent-${field.key}`}>
                            {field.label}
                        </Label>
                        <Switch
                            id={`email-consent-${field.key}`}
                            checked={consentValues[field.key]}
                            onCheckedChange={consentSetters[field.key]}
                            className="shrink-0"
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
