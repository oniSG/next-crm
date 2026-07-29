'use client'

import * as React from 'react'
import { QueryClient, QueryClientProvider as TanstackQueryClientProvider } from '@tanstack/react-query'

function createQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 30_000,
                refetchOnWindowFocus: false,
            },
        },
    })
}

export function QueryClientProvider({ children }: { children: React.ReactNode }) {
    const [client] = React.useState(createQueryClient)
    return (
        <TanstackQueryClientProvider client={client}>{children}</TanstackQueryClientProvider>
    )
}
