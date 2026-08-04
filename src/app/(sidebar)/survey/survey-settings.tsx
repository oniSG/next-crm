'use client'

import { EmailTagsInput } from '@/components/custom/inputs/email-tags-input'
import {
    HexColorInput,
    normalizeHexColor,
} from '@/components/custom/inputs/hex-color-input'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import type { SurveyFormData } from './temp'

export function SurveySettings({
    initialData,
    expireDate,
    sharePublicly,
    onExpireDateChange,
    onSharePubliclyChange,
    onSurveyColorChange,
}: {
    initialData: SurveyFormData
    expireDate: string
    sharePublicly: boolean
    onExpireDateChange: (value: string) => void
    onSharePubliclyChange: (value: boolean) => void
    onSurveyColorChange: (value: string) => void
}) {
    return (
        <div className="grid grid-cols-3 gap-5">
            <BasicSettingsCard initialData={initialData} />
            <ExpirationSettingsCard
                initialData={initialData}
                expireDate={expireDate}
                sharePublicly={sharePublicly}
                onExpireDateChange={onExpireDateChange}
                onSharePubliclyChange={onSharePubliclyChange}
            />
            <ThemeSettingsCard
                initialData={initialData}
                onSurveyColorChange={onSurveyColorChange}
            />
        </div>
    )
}

function BasicSettingsCard({ initialData }: { initialData: SurveyFormData }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Basic settings</CardTitle>
                <CardDescription>Fill out basic survey settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
                <Field>
                    <FieldLabel htmlFor="survey-name">Name</FieldLabel>
                    <Input id="survey-name" name="name" defaultValue={initialData.name} />
                </Field>
                <Field>
                    <FieldLabel htmlFor="survey-description">Description</FieldLabel>
                    <Textarea
                        id="survey-description"
                        name="description"
                        defaultValue={initialData.description}
                        placeholder="Survey description"
                    />
                </Field>
                <Field>
                    <FieldLabel htmlFor="survey-thank-you-message">
                        Thank you message
                    </FieldLabel>
                    <Textarea
                        id="survey-thank-you-message"
                        name="thank-you-message"
                        defaultValue={initialData.thankYouMessage}
                        placeholder="Message shown after the survey is submitted"
                    />
                </Field>
            </CardContent>
        </Card>
    )
}

function ExpirationSettingsCard({
    initialData,
    expireDate,
    sharePublicly,
    onExpireDateChange,
    onSharePubliclyChange,
}: {
    initialData: SurveyFormData
    expireDate: string
    sharePublicly: boolean
    onExpireDateChange: (value: string) => void
    onSharePubliclyChange: (value: boolean) => void
}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Expiration settings</CardTitle>
                <CardDescription>
                    Fill out expiration settings of this survey
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
                <Field>
                    <FieldLabel htmlFor="survey-expire-date">Expire date</FieldLabel>
                    <Input
                        id="survey-expire-date"
                        name="expire-date"
                        type="date"
                        defaultValue={initialData.expireDate}
                        onChange={(event) => onExpireDateChange(event.target.value)}
                    />
                </Field>
                <Field orientation="horizontal" aria-disabled>
                    <FieldLabel htmlFor="survey-share-publicly-after-expiration-date">
                        Share publicly after expiration
                    </FieldLabel>
                    <Switch
                        id="survey-share-publicly-after-expiration-date"
                        name="share-publicly-after-expiration-date"
                        aria-label="Share publicly after expiration"
                        checked={sharePublicly}
                        onCheckedChange={onSharePubliclyChange}
                        disabled={!expireDate}
                    />
                </Field>
                {expireDate && sharePublicly && (
                    <>
                        <Separator />
                        <Field>
                            <FieldLabel htmlFor="survey-link-validity">
                                Link validity (number of days)
                            </FieldLabel>
                            <Input
                                id="survey-link-validity"
                                name="link-validity"
                                type="number"
                                defaultValue={initialData.linkValidity}
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="survey-share-emails">
                                Share with email addresses
                            </FieldLabel>
                            <EmailTagsInput
                                id="survey-share-emails"
                                name="share-emails"
                                defaultValue={initialData.shareEmails}
                            />
                        </Field>
                    </>
                )}
            </CardContent>
        </Card>
    )
}

function ThemeSettingsCard({
    initialData,
    onSurveyColorChange,
}: {
    initialData: SurveyFormData
    onSurveyColorChange: (value: string) => void
}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Theme settings</CardTitle>
                <CardDescription>Fill out theme settings of this survey</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
                <Field>
                    <FieldLabel htmlFor="survey-color">Survey color</FieldLabel>
                    <HexColorInput
                        id="survey-color"
                        name="customColor"
                        defaultValue={initialData.color}
                        onValueChange={(value) => {
                            const normalizedColor = normalizeHexColor(value)
                            if (normalizedColor) onSurveyColorChange(normalizedColor)
                        }}
                    />
                </Field>
                <Field orientation="horizontal">
                    <FieldLabel htmlFor="survey-multiple">
                        Multiple filling possible
                    </FieldLabel>
                    <Switch
                        id="survey-multiple"
                        name="multiple"
                        aria-label="Multiple filling possible"
                        defaultChecked={initialData.multiple}
                    />
                </Field>
                <Field orientation="horizontal">
                    <FieldLabel htmlFor="survey-show-logo">Show logo</FieldLabel>
                    <Switch
                        id="survey-show-logo"
                        name="show-logo"
                        aria-label="Show logo"
                        defaultChecked={initialData.showLogo}
                    />
                </Field>
            </CardContent>
        </Card>
    )
}
