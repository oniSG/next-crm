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
    tagChipClass,
    uploadButtonClass,
    workflowMergeTags,
} from '../shared/constants'
import { FieldLabel, FieldLabelWithInfo } from '../shared/form-components'
import {
    stringConfig,
    useNodeConfigSave,
} from '../shared/use-node-config-save'

function releaseBrowserInteractionLocks() {
    document.body.style.removeProperty('pointer-events')
    document.body.style.removeProperty('user-select')
    document.body.style.removeProperty('-webkit-user-select')
    document.body.style.removeProperty('overflow')
}

export function PushContent({
    nodeId,
    data,
    syncNodeConfig,
}: WorkflowDrawerContentProps) {
    const [note, setNote] = React.useState(() =>
        stringConfig(data.config, 'note'),
    )
    const [title, setTitle] = React.useState(() =>
        stringConfig(data.config, 'title'),
    )
    const [subtitle, setSubtitle] = React.useState(() =>
        stringConfig(data.config, 'subtitle'),
    )
    const [link, setLink] = React.useState(() =>
        stringConfig(data.config, 'link'),
    )
    const [body, setBody] = React.useState(() =>
        stringConfig(data.config, 'body'),
    )
    const [smallIcon, setSmallIcon] = React.useState(() =>
        stringConfig(data.config, 'smallIcon', 'ic_icon_notification'),
    )
    const [iosSound, setIosSound] = React.useState(() =>
        stringConfig(data.config, 'iosSound'),
    )
    const [androidChannel, setAndroidChannel] = React.useState(() =>
        stringConfig(data.config, 'androidChannel'),
    )
    const [androidGroup, setAndroidGroup] = React.useState(() =>
        stringConfig(data.config, 'androidGroup'),
    )
    const [iosGroup, setIosGroup] = React.useState(() =>
        stringConfig(data.config, 'iosGroup'),
    )
    const [previewImage, setPreviewImage] = React.useState(() =>
        stringConfig(data.config, 'previewImage'),
    )
    const [largeIcon, setLargeIcon] = React.useState(() =>
        stringConfig(data.config, 'largeIcon'),
    )

    const previewImageInputRef = React.useRef<HTMLInputElement>(null)
    const largeIconInputRef = React.useRef<HTMLInputElement>(null)

    React.useEffect(() => {
        setNote(stringConfig(data.config, 'note'))
        setTitle(stringConfig(data.config, 'title'))
        setSubtitle(stringConfig(data.config, 'subtitle'))
        setLink(stringConfig(data.config, 'link'))
        setBody(stringConfig(data.config, 'body'))
        setSmallIcon(
            stringConfig(data.config, 'smallIcon', 'ic_icon_notification'),
        )
        setIosSound(stringConfig(data.config, 'iosSound'))
        setAndroidChannel(stringConfig(data.config, 'androidChannel'))
        setAndroidGroup(stringConfig(data.config, 'androidGroup'))
        setIosGroup(stringConfig(data.config, 'iosGroup'))
        setPreviewImage(stringConfig(data.config, 'previewImage'))
        setLargeIcon(stringConfig(data.config, 'largeIcon'))
    }, [nodeId])

    useNodeConfigSave({
        nodeId,
        syncNodeConfig,
        getPayload: () => ({
            note,
            title,
            subtitle,
            link,
            body,
            smallIcon,
            iosSound,
            androidChannel,
            androidGroup,
            iosGroup,
            previewImage,
            largeIcon,
        }),
    })

    function onFileSelected(
        event: React.ChangeEvent<HTMLInputElement>,
        setName: (name: string) => void,
    ) {
        releaseBrowserInteractionLocks()
        setName(event.target.files?.[0]?.name ?? '')
    }

    const mergeTags = workflowMergeTags()

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
                            onClick={() => setBody((current) => current + tag.token)}
                        >
                            {tag.label}
                        </Button>
                    ))}
                </div>
            </section>

            <div className="space-y-2">
                <FieldLabel htmlFor="push-note">
                    Poznámka pod názvem v diagramu
                </FieldLabel>
                <Input
                    id="push-note"
                    className={roundedFieldClass}
                    value={note}
                    onChange={(event) => setNote(event.target.value)}
                    placeholder="Poznámka"
                />
            </div>

            <div className="space-y-2">
                <FieldLabel htmlFor="push-title" required>
                    Titulek
                </FieldLabel>
                <Input
                    id="push-title"
                    className={roundedFieldClass}
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="Titulek"
                />
            </div>

            <div className="space-y-2">
                <FieldLabel htmlFor="push-subtitle">Podtitulek</FieldLabel>
                <Input
                    id="push-subtitle"
                    className={roundedFieldClass}
                    value={subtitle}
                    onChange={(event) => setSubtitle(event.target.value)}
                    placeholder="Podtitulek"
                />
            </div>

            <div className="space-y-2">
                <FieldLabel htmlFor="push-link">Odkaz</FieldLabel>
                <Input
                    id="push-link"
                    type="url"
                    className={roundedFieldClass}
                    value={link}
                    onChange={(event) => setLink(event.target.value)}
                    placeholder="https://relatoo.cz"
                />
            </div>

            <div className="space-y-2">
                <FieldLabel htmlFor="push-body" required>
                    Text notifikace
                </FieldLabel>
                <Textarea
                    id="push-body"
                    className={cn('min-h-28 resize-y', roundedFieldClass)}
                    value={body}
                    onChange={(event) => setBody(event.target.value)}
                    placeholder="Text notifikace"
                />
            </div>

            <div className="space-y-2">
                <FieldLabelWithInfo
                    label="Náhledový obrázek"
                    description="Obrázek, který se zobrazí v rozšířeném zobrazení."
                />
                <input
                    ref={previewImageInputRef}
                    id="push-image"
                    type="file"
                    accept=".jpg,.jpeg,.png,.svg,image/jpeg,image/png,image/svg+xml"
                    className="sr-only"
                    tabIndex={-1}
                    onChange={(event) => onFileSelected(event, setPreviewImage)}
                />
                <button
                    type="button"
                    className={uploadButtonClass}
                    onClick={() => {
                        releaseBrowserInteractionLocks()
                        previewImageInputRef.current?.click()
                    }}
                >
                    {previewImage ? (
                        <span className="font-medium text-foreground">
                            {previewImage}
                        </span>
                    ) : (
                        'Vyberte náhledový obrázek notifikace. (Formát jpg/jpeg, png, svg. Maximální velikost 2MB)'
                    )}
                </button>
            </div>

            <div className="space-y-2">
                <FieldLabelWithInfo
                    label="Malá ikona"
                    description="Android - ikona zobrazená ve stavovém řádku a v levém horním rohu oznámení. Nastavte název ikony bez přípony souboru. Pokud není nastaveno, použije se ikona zvonku nebo ic_stat_onesignal_default, pokud jste tento název prostředku nastavili."
                    htmlFor="push-small-icon"
                />
                <Input
                    id="push-small-icon"
                    className={roundedFieldClass}
                    value={smallIcon}
                    onChange={(event) => setSmallIcon(event.target.value)}
                    placeholder="ic_icon_notification"
                />
            </div>

            <div className="space-y-2">
                <FieldLabelWithInfo
                    label="Velká ikona"
                    description="Android - Ikona zobrazená ve stavovém řádku vpravo."
                />
                <input
                    ref={largeIconInputRef}
                    id="push-large-icon"
                    type="file"
                    accept=".jpg,.jpeg,.png,.svg,image/jpeg,image/png,image/svg+xml"
                    className="sr-only"
                    tabIndex={-1}
                    onChange={(event) => onFileSelected(event, setLargeIcon)}
                />
                <button
                    type="button"
                    className={uploadButtonClass}
                    onClick={() => {
                        releaseBrowserInteractionLocks()
                        largeIconInputRef.current?.click()
                    }}
                >
                    {largeIcon ? (
                        <span className="font-medium text-foreground">
                            {largeIcon}
                        </span>
                    ) : (
                        'Vyberte velkou ikonu notifikace. (Formát jpg/jpeg, png, svg. Maximální velikost 2MB)'
                    )}
                </button>
            </div>

            <div className="space-y-2">
                <FieldLabelWithInfo
                    label="Zvuk notifikace iOS"
                    description="iOS - Zvukový soubor iOS, který je součástí vaší aplikace a který se přehrává místo výchozího zvuku oznámení zařízení. Předejte nil pro vypnutí vibrací a zvuku pro oznámení. Příklad: notification.wav"
                    htmlFor="push-ios-sound"
                />
                <Input
                    id="push-ios-sound"
                    className={roundedFieldClass}
                    value={iosSound}
                    onChange={(event) => setIosSound(event.target.value)}
                    placeholder="notification.wav"
                />
            </div>

            <div className="space-y-2">
                <FieldLabelWithInfo
                    label="Android kanál"
                    description="Android - Kategorie oznámení, pod kterou chcete oznámení odeslat."
                    htmlFor="push-android-channel"
                />
                <Input
                    id="push-android-channel"
                    className={roundedFieldClass}
                    value={androidChannel}
                    onChange={(event) => setAndroidChannel(event.target.value)}
                    placeholder="Novinky"
                />
            </div>

            <div className="space-y-2">
                <FieldLabelWithInfo
                    label="Android skupina"
                    description="Android - Oznámení se stejnou skupinou budou poskládána na sebe pomocí funkce seskupování oznámení systému Android."
                    htmlFor="push-android-group"
                />
                <Input
                    id="push-android-group"
                    className={roundedFieldClass}
                    value={androidGroup}
                    onChange={(event) => setAndroidGroup(event.target.value)}
                    placeholder="Novinky"
                />
            </div>

            <div className="space-y-2">
                <FieldLabelWithInfo
                    label="iOS skupina"
                    description="iOS 12+ - Tento parametr je podporován v systému iOS 12 a novějším. Umožňuje seskupovat související oznámení dohromady. Pokud mají dvě oznámení stejné thread-id, budou obě přidána do stejné skupiny."
                    htmlFor="push-ios-group"
                />
                <Input
                    id="push-ios-group"
                    className={roundedFieldClass}
                    value={iosGroup}
                    onChange={(event) => setIosGroup(event.target.value)}
                    placeholder="Novinky"
                />
            </div>
        </div>
    )
}
