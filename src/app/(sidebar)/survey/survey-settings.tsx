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

export function SurveySettings({
    expireDate,
    sharePublicly,
    onExpireDateChange,
    onSharePubliclyChange,
    onSurveyColorChange,
}: {
    expireDate: string
    sharePublicly: boolean
    onExpireDateChange: (value: string) => void
    onSharePubliclyChange: (value: boolean) => void
    onSurveyColorChange: (value: string) => void
}) {
    return (
        <div className="grid grid-cols-3 gap-5">
            <BasicSettingsCard />
            <ExpirationSettingsCard
                expireDate={expireDate}
                sharePublicly={sharePublicly}
                onExpireDateChange={onExpireDateChange}
                onSharePubliclyChange={onSharePubliclyChange}
            />
            <ThemeSettingsCard onSurveyColorChange={onSurveyColorChange} />
        </div>
    )
}

function BasicSettingsCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Basic settings</CardTitle>
                <CardDescription>Fill out basic survey settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
                <Field>
                    <FieldLabel htmlFor="survey-name">Name</FieldLabel>
                    <Input id="survey-name" name="name" defaultValue="Untitled survey" />
                </Field>
                <Field>
                    <FieldLabel htmlFor="survey-description">Description</FieldLabel>
                    <Textarea
                        id="survey-description"
                        name="description"
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
                        placeholder="Message shown after the survey is submitted"
                    />
                </Field>
            </CardContent>
        </Card>
    )
}

function ExpirationSettingsCard({
    expireDate,
    sharePublicly,
    onExpireDateChange,
    onSharePubliclyChange,
}: {
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
                                placeholder="30"
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="survey-share-emails">
                                Share with email addresses
                            </FieldLabel>
                            <EmailTagsInput
                                id="survey-share-emails"
                                name="share-emails"
                            />
                        </Field>
                    </>
                )}
            </CardContent>
        </Card>
    )
}

function ThemeSettingsCard({
    onSurveyColorChange,
}: {
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
                        defaultValue="#7EC71E"
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
                    />
                </Field>
                <Field orientation="horizontal">
                    <FieldLabel htmlFor="survey-show-logo">Show logo</FieldLabel>
                    <Switch
                        id="survey-show-logo"
                        name="show-logo"
                        aria-label="Show logo"
                    />
                </Field>
            </CardContent>
        </Card>
    )
}
