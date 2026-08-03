'use client'

import type { FormEvent } from 'react'

import { BaseSettings } from './base-settings'
import { PermissionSettings } from './permission-settings'

export function UserEditForm() {
    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
    }

    return (
        <form onSubmit={handleSubmit} className="flex w-full max-w-6xl flex-col gap-4">
            <div>
                <h1 className="text-xl font-semibold">Edit user</h1>
                <p className="text-muted-foreground mt-1 text-sm">
                    Update profile, permissions and authentication settings.
                </p>
            </div>

            <BaseSettings />
            <PermissionSettings />
        </form>
    )
}
