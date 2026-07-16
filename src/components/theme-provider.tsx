'use client'

import * as React from 'react'

export type Theme = 'light' | 'dark' | 'system'

const STORAGE_KEY = 'theme'

type ThemeContextValue = {
    theme: Theme
    resolvedTheme: 'light' | 'dark'
    setTheme: (theme: Theme) => void
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null)

function getSystemTheme(): 'light' | 'dark' {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyTheme(theme: Theme): 'light' | 'dark' {
    const resolved = theme === 'system' ? getSystemTheme() : theme
    document.documentElement.classList.toggle('dark', resolved === 'dark')
    return resolved
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setThemeState] = React.useState<Theme>('system')
    const [resolvedTheme, setResolvedTheme] = React.useState<'light' | 'dark'>('light')

    React.useEffect(() => {
        const stored = (localStorage.getItem(STORAGE_KEY) as Theme | null) ?? 'system'
        setThemeState(stored)
        setResolvedTheme(applyTheme(stored))
    }, [])

    React.useEffect(() => {
        if (theme !== 'system') return
        const media = window.matchMedia('(prefers-color-scheme: dark)')
        const onChange = () => setResolvedTheme(applyTheme('system'))
        media.addEventListener('change', onChange)
        return () => media.removeEventListener('change', onChange)
    }, [theme])

    const setTheme = React.useCallback((next: Theme) => {
        setThemeState(next)
        setResolvedTheme(applyTheme(next))
        localStorage.setItem(STORAGE_KEY, next)
    }, [])

    const value = React.useMemo(
        () => ({ theme, resolvedTheme, setTheme }),
        [theme, resolvedTheme, setTheme],
    )

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme(): ThemeContextValue {
    const ctx = React.useContext(ThemeContext)
    if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
    return ctx
}
