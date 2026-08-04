'use client'

import * as React from 'react'
import { InfoIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from '@/components/ui/hover-card'
import { cn } from '@/lib/utils'

import type { WorkflowDrawerContentProps } from '../../shared/types'
import {
    roundedFieldClass,
    sectionTitleClass,
    tagChipClass,
    uploadButtonClass,
    workflowMergeTags,
} from '../shared/constants'
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
                <Label htmlFor="push-note">
                    Poznámka pod názvem v diagramu
                </Label>
                <Input
                    id="push-note"
                    className={roundedFieldClass}
                    value={note}
                    onChange={(event) => setNote(event.target.value)}
                    placeholder="Poznámka"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="push-title">
                    Titulek
                </Label>
                <Input
                    id="push-title"
                    className={roundedFieldClass}
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="Titulek"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="push-subtitle">Podtitulek</Label>
                <Input
                    id="push-subtitle"
                    className={roundedFieldClass}
                    value={subtitle}
                    onChange={(event) => setSubtitle(event.target.value)}
                    placeholder="Podtitulek"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="push-link">Odkaz</Label>
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
                <Label htmlFor="push-body">
                    Text notifikace
                </Label>
                <Textarea
                    id="push-body"
                    className={cn('min-h-28 resize-y', roundedFieldClass)}
                    value={body}
                    onChange={(event) => setBody(event.target.value)}
                    placeholder="Text notifikace"
                />
            </div>

            <div className="space-y-2">
                <div className="flex items-center gap-1.5">
                    <Label>Náhledový obrázek</Label>
                    <HoverCard>
                        <HoverCardTrigger
                            render={
                                <button
                                    type="button"
                                    className="inline-flex shrink-0 cursor-pointer rounded-sm p-0.5 text-muted-foreground hover:text-foreground"
                                />
                            }
                        >
                            <InfoIcon className="size-3.5" />
                            <span className="sr-only">Náhledový obrázek</span>
                        </HoverCardTrigger>
                        <HoverCardContent side="left" className="w-56">
                            <div className="space-y-1">
                                <h4 className="text-sm font-semibold">Náhledový obrázek</h4>
                                <p className="text-sm text-muted-foreground">
                                    Obrázek, který se zobrazí v rozšířeném zobrazení.
                                </p>
                            </div>
                        </HoverCardContent>
                    </HoverCard>
                </div>
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
                <div className="flex items-center gap-1.5">
                    <Label htmlFor={"push-small-icon"}>Malá ikona</Label>
                    <HoverCard>
                        <HoverCardTrigger
                            render={
                                <button
                                    type="button"
                                    className="inline-flex shrink-0 cursor-pointer rounded-sm p-0.5 text-muted-foreground hover:text-foreground"
                                />
                            }
                        >
                            <InfoIcon className="size-3.5" />
                            <span className="sr-only">Malá ikona</span>
                        </HoverCardTrigger>
                        <HoverCardContent side="left" className="w-56">
                            <div className="space-y-1">
                                <h4 className="text-sm font-semibold">Malá ikona</h4>
                                <p className="text-sm text-muted-foreground">
                                    Android - ikona zobrazená ve stavovém řádku a v levém horním rohu oznámení. Nastavte název ikony bez přípony souboru. Pokud není nastaveno, použije se ikona zvonku nebo ic_stat_onesignal_default, pokud jste tento název prostředku nastavili.
                                </p>
                            </div>
                        </HoverCardContent>
                    </HoverCard>
                </div>
                <Input
                    id="push-small-icon"
                    className={roundedFieldClass}
                    value={smallIcon}
                    onChange={(event) => setSmallIcon(event.target.value)}
                    placeholder="ic_icon_notification"
                />
            </div>

            <div className="space-y-2">
                <div className="flex items-center gap-1.5">
                    <Label>Velká ikona</Label>
                    <HoverCard>
                        <HoverCardTrigger
                            render={
                                <button
                                    type="button"
                                    className="inline-flex shrink-0 cursor-pointer rounded-sm p-0.5 text-muted-foreground hover:text-foreground"
                                />
                            }
                        >
                            <InfoIcon className="size-3.5" />
                            <span className="sr-only">Velká ikona</span>
                        </HoverCardTrigger>
                        <HoverCardContent side="left" className="w-56">
                            <div className="space-y-1">
                                <h4 className="text-sm font-semibold">Velká ikona</h4>
                                <p className="text-sm text-muted-foreground">
                                    Android - Ikona zobrazená ve stavovém řádku vpravo.
                                </p>
                            </div>
                        </HoverCardContent>
                    </HoverCard>
                </div>
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
                <div className="flex items-center gap-1.5">
                    <Label htmlFor={"push-ios-sound"}>Zvuk notifikace iOS</Label>
                    <HoverCard>
                        <HoverCardTrigger
                            render={
                                <button
                                    type="button"
                                    className="inline-flex shrink-0 cursor-pointer rounded-sm p-0.5 text-muted-foreground hover:text-foreground"
                                />
                            }
                        >
                            <InfoIcon className="size-3.5" />
                            <span className="sr-only">Zvuk notifikace iOS</span>
                        </HoverCardTrigger>
                        <HoverCardContent side="left" className="w-56">
                            <div className="space-y-1">
                                <h4 className="text-sm font-semibold">Zvuk notifikace iOS</h4>
                                <p className="text-sm text-muted-foreground">
                                    iOS - Zvukový soubor iOS, který je součástí vaší aplikace a který se přehrává místo výchozího zvuku oznámení zařízení. Předejte nil pro vypnutí vibrací a zvuku pro oznámení. Příklad: notification.wav
                                </p>
                            </div>
                        </HoverCardContent>
                    </HoverCard>
                </div>
                <Input
                    id="push-ios-sound"
                    className={roundedFieldClass}
                    value={iosSound}
                    onChange={(event) => setIosSound(event.target.value)}
                    placeholder="notification.wav"
                />
            </div>

            <div className="space-y-2">
                <div className="flex items-center gap-1.5">
                    <Label htmlFor={"push-android-channel"}>Android kanál</Label>
                    <HoverCard>
                        <HoverCardTrigger
                            render={
                                <button
                                    type="button"
                                    className="inline-flex shrink-0 cursor-pointer rounded-sm p-0.5 text-muted-foreground hover:text-foreground"
                                />
                            }
                        >
                            <InfoIcon className="size-3.5" />
                            <span className="sr-only">Android kanál</span>
                        </HoverCardTrigger>
                        <HoverCardContent side="left" className="w-56">
                            <div className="space-y-1">
                                <h4 className="text-sm font-semibold">Android kanál</h4>
                                <p className="text-sm text-muted-foreground">
                                    Android - Kategorie oznámení, pod kterou chcete oznámení odeslat.
                                </p>
                            </div>
                        </HoverCardContent>
                    </HoverCard>
                </div>
                <Input
                    id="push-android-channel"
                    className={roundedFieldClass}
                    value={androidChannel}
                    onChange={(event) => setAndroidChannel(event.target.value)}
                    placeholder="Novinky"
                />
            </div>

            <div className="space-y-2">
                <div className="flex items-center gap-1.5">
                    <Label htmlFor={"push-android-group"}>Android skupina</Label>
                    <HoverCard>
                        <HoverCardTrigger
                            render={
                                <button
                                    type="button"
                                    className="inline-flex shrink-0 cursor-pointer rounded-sm p-0.5 text-muted-foreground hover:text-foreground"
                                />
                            }
                        >
                            <InfoIcon className="size-3.5" />
                            <span className="sr-only">Android skupina</span>
                        </HoverCardTrigger>
                        <HoverCardContent side="left" className="w-56">
                            <div className="space-y-1">
                                <h4 className="text-sm font-semibold">Android skupina</h4>
                                <p className="text-sm text-muted-foreground">
                                    Android - Oznámení se stejnou skupinou budou poskládána na sebe pomocí funkce seskupování oznámení systému Android.
                                </p>
                            </div>
                        </HoverCardContent>
                    </HoverCard>
                </div>
                <Input
                    id="push-android-group"
                    className={roundedFieldClass}
                    value={androidGroup}
                    onChange={(event) => setAndroidGroup(event.target.value)}
                    placeholder="Novinky"
                />
            </div>

            <div className="space-y-2">
                <div className="flex items-center gap-1.5">
                    <Label htmlFor={"push-ios-group"}>iOS skupina</Label>
                    <HoverCard>
                        <HoverCardTrigger
                            render={
                                <button
                                    type="button"
                                    className="inline-flex shrink-0 cursor-pointer rounded-sm p-0.5 text-muted-foreground hover:text-foreground"
                                />
                            }
                        >
                            <InfoIcon className="size-3.5" />
                            <span className="sr-only">iOS skupina</span>
                        </HoverCardTrigger>
                        <HoverCardContent side="left" className="w-56">
                            <div className="space-y-1">
                                <h4 className="text-sm font-semibold">iOS skupina</h4>
                                <p className="text-sm text-muted-foreground">
                                    iOS 12+ - Tento parametr je podporován v systému iOS 12 a novějším. Umožňuje seskupovat související oznámení dohromady. Pokud mají dvě oznámení stejné thread-id, budou obě přidána do stejné skupiny.
                                </p>
                            </div>
                        </HoverCardContent>
                    </HoverCard>
                </div>
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
