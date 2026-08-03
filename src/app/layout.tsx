import './globals.css'
import { Inter } from 'next/font/google'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { cn } from '@/lib/utils'
import { QueryClientProvider } from '@/components/query-client-provider'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" className={cn('font-sans', inter.variable)} suppressHydrationWarning>
            <body>
                <NuqsAdapter>
                    <QueryClientProvider>
                        <ThemeProvider>{children}</ThemeProvider>
                    </QueryClientProvider>
                </NuqsAdapter>
            </body>
        </html>
    )
}
