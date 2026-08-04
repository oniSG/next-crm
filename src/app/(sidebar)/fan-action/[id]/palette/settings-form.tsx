'use client'

import * as React from 'react'
import { InfoIcon } from 'lucide-react'

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from '@/components/ui/hover-card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

import { useFanActionEditor } from '../context'

export function SettingsForm() {
    const { action, updateAction, registerSaveHandler, unregisterSaveHandler } =
        useFanActionEditor()
    const [automaticStop, setAutomaticStop] = React.useState(
        action.automaticStop,
    )
    const [plannedRunOut, setPlannedRunOut] = React.useState(
        action.plannedRunOut,
    )

    React.useEffect(() => {
        setAutomaticStop(action.automaticStop)
        setPlannedRunOut(action.plannedRunOut)
    }, [action.id])

    React.useEffect(() => {
        registerSaveHandler('settings', async () => {
            updateAction({ automaticStop, plannedRunOut })
            return true
        })
        return () => unregisterSaveHandler('settings')
    }, [
        automaticStop,
        plannedRunOut,
        registerSaveHandler,
        unregisterSaveHandler,
        updateAction,
    ])

    return (
        <form
            className="space-y-4 px-4"
            onSubmit={(event) => event.preventDefault()}
            noValidate
        >
            <div className="flex items-center justify-between gap-2">
                <Label htmlFor="automatic-stop">
                    Automatické zastavení akce
                </Label>
                <Switch
                    id="automatic-stop"
                    checked={automaticStop}
                    onCheckedChange={setAutomaticStop}
                />
            </div>

            <div className="flex items-center justify-between gap-2">
                <div className="flex min-w-0 items-center gap-2">
                    <Label htmlFor="planned-run-out">
                        Nechat doběhnout naplánované
                    </Label>
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
                            <span className="sr-only">
                                Nechat doběhnout naplánované
                            </span>
                        </HoverCardTrigger>
                        <HoverCardContent side="right" className="w-56">
                            <div className="space-y-1">
                                <h4 className="text-sm font-semibold">
                                    Nechat doběhnout naplánované
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                    Umožní dokončit aktuálně naplánované běhy
                                    před zastavením akce.
                                </p>
                            </div>
                        </HoverCardContent>
                    </HoverCard>
                </div>
                <Switch
                    id="planned-run-out"
                    checked={plannedRunOut}
                    onCheckedChange={setPlannedRunOut}
                />
            </div>
        </form>
    )
}
