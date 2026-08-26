'use client'

import { useRef, useState, type PointerEvent, type ReactNode } from 'react'

import { EmailTagsInput } from '@/components/custom/inputs/email-tags-input'
import { FileInput } from '@/components/custom/inputs/file-input'
import {
    HexColorInput,
    normalizeHexColor,
} from '@/components/custom/inputs/hex-color-input'
import { RequiredIndicator } from '@/components/custom/other/required-indicator'
import { TagsSelect } from '@/components/custom/inputs/tags-select'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'

import type { SurveyFormData } from './temp'

type Props = {
    survey: SurveyFormData
    minExpireDate: string
    onChange: (values: Partial<SurveyFormData>) => void
}

const MIN_SETTINGS_WIDTH = 250
const SURVEY_TAG_OPTIONS = [
    'Customer feedback',
    'Matchday',
    'Internal',
    'Priority',
    'Marketing',
    'Event',
] as const

export function ResizableSettingsColumn({ children }: { children: ReactNode }) {
    const [width, setWidth] = useState(432)
    const panelRef = useRef<HTMLElement>(null)

    function startResize(event: PointerEvent<HTMLDivElement>) {
        const panel = panelRef.current
        if (!panel) return

        event.preventDefault()
        event.currentTarget.setPointerCapture(event.pointerId)
        const startX = event.clientX
        const startWidth = panel.getBoundingClientRect().width
        const maxWidth = window.matchMedia('(min-width: 1280px)').matches ? 432 : 384

        function resize(moveEvent: globalThis.PointerEvent) {
            setWidth(
                Math.min(
                    maxWidth,
                    Math.max(MIN_SETTINGS_WIDTH, startWidth + startX - moveEvent.clientX),
                ),
            )
        }

        function stopResize() {
            window.removeEventListener('pointermove', resize)
            window.removeEventListener('pointerup', stopResize)
            document.body.style.removeProperty('cursor')
            document.body.style.removeProperty('user-select')
        }

        document.body.style.cursor = 'col-resize'
        document.body.style.userSelect = 'none'
        window.addEventListener('pointermove', resize)
        window.addEventListener('pointerup', stopResize)
    }

    function resizeWithKeyboard(event: React.KeyboardEvent<HTMLDivElement>) {
        if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return

        event.preventDefault()
        const maxWidth = window.matchMedia('(min-width: 1280px)').matches ? 432 : 384
        const change = event.key === 'ArrowLeft' ? 16 : -16
        const currentWidth = panelRef.current?.getBoundingClientRect().width ?? width
        setWidth(Math.min(maxWidth, Math.max(MIN_SETTINGS_WIDTH, currentWidth + change)))
    }

    return (
        <aside
            ref={panelRef}
            style={{ width }}
            className="bg-background relative hidden max-w-96 scroll-mt-12 lg:sticky lg:top-12 lg:col-start-2 lg:row-start-1 lg:block lg:h-[calc(100dvh-3rem)] lg:border-l xl:max-w-[27rem]"
        >
            <div
                role="separator"
                aria-label="Resize settings panel"
                aria-orientation="vertical"
                aria-valuemin={MIN_SETTINGS_WIDTH}
                aria-valuemax={432}
                aria-valuenow={Math.round(width)}
                tabIndex={0}
                className="group absolute inset-y-0 -left-1 z-20 w-2 cursor-col-resize touch-none outline-none"
                onPointerDown={startResize}
                onKeyDown={resizeWithKeyboard}
            >
                <span className="bg-border group-hover:bg-muted-foreground/60 group-focus-visible:bg-muted-foreground/60 absolute inset-y-0 left-1/2 w-px -translate-x-1/2 transition-colors" />
            </div>
            <div className="h-full overflow-y-auto">{children}</div>
        </aside>
    )
}

export function BasicSettingsColumn({ survey, minExpireDate, onChange }: Props) {
    return (
        <div id="survey-basic-settings">
            <SettingsHeader />
            <div className="p-4 pb-24">
                <GeneralSettings
                    survey={survey}
                    panelId="column"
                    minExpireDate={minExpireDate}
                    onChange={onChange}
                />
            </div>
        </div>
    )
}

export function BasicSettingsSheet({
    survey,
    open,
    onOpenChange,
    minExpireDate,
    onChange,
}: Props & { open: boolean; onOpenChange: (open: boolean) => void }) {
    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="w-full sm:max-w-md lg:hidden">
                <SheetHeader className="border-b">
                    <SheetTitle>Basic settings</SheetTitle>
                    <SheetDescription>
                        Edit the survey, expiration and theme settings.
                    </SheetDescription>
                </SheetHeader>
                <div className="min-h-0 flex-1 overflow-y-auto p-4 pb-24">
                    <GeneralSettings
                        survey={survey}
                        panelId="mobile-settings"
                        minExpireDate={minExpireDate}
                        onChange={onChange}
                    />
                </div>
            </SheetContent>
        </Sheet>
    )
}

function SettingsHeader() {
    return (
        <div className="border-b p-4">
            <h2 className="font-heading text-base font-medium">Basic settings</h2>
            <p className="text-muted-foreground text-sm">
                Edit the survey, expiration and theme settings.
            </p>
        </div>
    )
}

function GeneralSettings({
    survey,
    panelId,
    minExpireDate,
    onChange,
}: Props & { panelId: string }) {
    function changeBackgroundImage(file: File | null) {
        if (!file) {
            onChange({ backgroundImage: null })
            return
        }

        const reader = new FileReader()
        reader.addEventListener('load', () => {
            if (typeof reader.result !== 'string') return

            onChange({
                backgroundImage: {
                    name: file.name,
                    size: file.size,
                    url: reader.result,
                },
            })
        })
        reader.readAsDataURL(file)
    }

    return (
        <div className="space-y-7">
            <SettingsGroup title="Survey">
                <Field>
                    <FieldLabel htmlFor={`${panelId}-survey-name`}>
                        Name <RequiredIndicator />
                    </FieldLabel>
                    <Input
                        id={`${panelId}-survey-name`}
                        value={survey.name}
                        required
                        onChange={(event) => onChange({ name: event.target.value })}
                    />
                </Field>
                <Field>
                    <FieldLabel htmlFor={`${panelId}-survey-description`}>
                        Description
                    </FieldLabel>
                    <Textarea
                        id={`${panelId}-survey-description`}
                        value={survey.description}
                        onChange={(event) =>
                            onChange({ description: event.target.value })
                        }
                    />
                </Field>
                <Field orientation="horizontal">
                    <FieldLabel htmlFor={`${panelId}-survey-multiple`}>
                        Multiple filling possible
                    </FieldLabel>
                    <Switch
                        id={`${panelId}-survey-multiple`}
                        checked={survey.multiple}
                        onCheckedChange={(multiple) => onChange({ multiple })}
                    />
                </Field>
            </SettingsGroup>
            <Separator />
            <Field>
                <FieldLabel htmlFor={`${panelId}-survey-tags`}>Tags</FieldLabel>
                <TagsSelect
                    id={`${panelId}-survey-tags`}
                    options={SURVEY_TAG_OPTIONS}
                    value={survey.tags}
                    onValueChange={(tags) => onChange({ tags })}
                />
            </Field>
            <Separator />
            <SettingsGroup title="Expiration">
                <Field>
                    <FieldLabel htmlFor={`${panelId}-survey-expire`}>
                        Expire date
                    </FieldLabel>
                    <Input
                        id={`${panelId}-survey-expire`}
                        type="date"
                        min={minExpireDate}
                        value={survey.expireDate}
                        onChange={(event) => {
                            const expireDate = event.target.value
                            if (expireDate && expireDate < minExpireDate) return
                            onChange({
                                expireDate,
                                ...(!expireDate && { sharePublicly: false }),
                            })
                        }}
                    />
                </Field>
                <Field orientation="horizontal">
                    <FieldLabel htmlFor={`${panelId}-survey-public`}>
                        Share publicly after expiration
                    </FieldLabel>
                    <Switch
                        id={`${panelId}-survey-public`}
                        checked={survey.sharePublicly}
                        disabled={!survey.expireDate}
                        onCheckedChange={(sharePublicly) => onChange({ sharePublicly })}
                    />
                </Field>
                {survey.expireDate && survey.sharePublicly && (
                    <>
                        <Field>
                            <FieldLabel htmlFor={`${panelId}-survey-validity`}>
                                Link validity (days)
                            </FieldLabel>
                            <Input
                                id={`${panelId}-survey-validity`}
                                type="number"
                                min={1}
                                value={survey.linkValidity}
                                onChange={(event) =>
                                    onChange({ linkValidity: event.target.valueAsNumber })
                                }
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor={`${panelId}-survey-emails`}>
                                Share with email addresses
                            </FieldLabel>
                            <EmailTagsInput
                                id={`${panelId}-survey-emails`}
                                value={survey.shareEmails}
                                onValueChange={(shareEmails) => onChange({ shareEmails })}
                            />
                        </Field>
                    </>
                )}
            </SettingsGroup>
            <Separator />
            <SettingsGroup title="Theme">
                <Field>
                    <FieldLabel htmlFor={`${panelId}-survey-color`}>
                        Survey color
                    </FieldLabel>
                    <HexColorInput
                        id={`${panelId}-survey-color`}
                        defaultValue={survey.color}
                        onValueChange={(value) => {
                            const color = normalizeHexColor(value)
                            if (color) onChange({ color })
                        }}
                    />
                </Field>
                <Field>
                    <FieldLabel htmlFor={`${panelId}-survey-background-image`}>
                        Background image
                    </FieldLabel>
                    <FileInput
                        id={`${panelId}-survey-background-image`}
                        accept="image/*"
                        value={survey.backgroundImage}
                        onFileChange={changeBackgroundImage}
                    />
                </Field>
                <Field orientation="horizontal">
                    <FieldLabel htmlFor={`${panelId}-survey-logo`}>Show logo</FieldLabel>
                    <Switch
                        id={`${panelId}-survey-logo`}
                        checked={survey.showLogo}
                        onCheckedChange={(showLogo) => onChange({ showLogo })}
                    />
                </Field>
            </SettingsGroup>
        </div>
    )
}

function SettingsGroup({
    title,
    children,
}: {
    title: string
    children: React.ReactNode
}) {
    return (
        <section className="space-y-4">
            <h3 className="text-sm font-semibold">{title}</h3>
            <div className="space-y-4">{children}</div>
        </section>
    )
}
