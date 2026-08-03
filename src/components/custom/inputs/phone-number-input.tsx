'use client'

import { useMemo, useState } from 'react'

import {
    PHONE_COUNTRIES,
    getCountryFlag,
    parsePhoneNumber,
    type CountryCode,
} from './phone-countries'

import { Button } from '@/components/ui/button'
import {
    Command,
    CommandEmpty,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

export type PhoneNumberInputProps = {
    id?: string
    name?: string
    defaultCountry?: CountryCode
    defaultValue?: string
    disabled?: boolean
    required?: boolean
    placeholder?: string
    className?: string
}

export function PhoneNumberInput({
    id,
    name = 'phoneNumber',
    defaultCountry = 'CZ',
    defaultValue = '',
    disabled,
    required,
    placeholder = '777 123 456',
    className,
}: PhoneNumberInputProps) {
    const initialValue = parsePhoneNumber(defaultValue, defaultCountry)
    const [countryCode, setCountryCode] = useState<CountryCode>(initialValue.country)
    const [countryOpen, setCountryOpen] = useState(false)
    const [number, setNumber] = useState(initialValue.number)

    const country = useMemo(
        () =>
            PHONE_COUNTRIES.find((item) => item.code === countryCode) ??
            PHONE_COUNTRIES[0],
        [countryCode],
    )
    const fullNumber = number.trim() ? `${country.dialCode} ${number.trim()}` : ''

    return (
        <div className={cn('flex w-full', className)}>
            <input type="hidden" name={name} value={fullNumber} />
            <Popover open={countryOpen} onOpenChange={setCountryOpen}>
                <PopoverTrigger
                    render={
                        <Button
                            type="button"
                            variant="outline"
                            disabled={disabled}
                            aria-label="Select country calling code"
                            className="w-20 justify-center gap-1.5 rounded-r-none border-r-0 px-2"
                        />
                    }
                >
                    <span>{getCountryFlag(country.code)}</span>
                    <span>{country.code}</span>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-72 p-0">
                    <Command>
                        <CommandInput placeholder="Search country or calling code…" />
                        <CommandList className="max-h-72">
                            <CommandEmpty>No country found.</CommandEmpty>
                            {PHONE_COUNTRIES.map((item) => (
                                <CommandItem
                                    key={item.code}
                                    value={`${item.name} ${item.code} ${item.dialCode}`}
                                    data-checked={item.code === countryCode}
                                    onSelect={() => {
                                        setCountryCode(item.code)
                                        setCountryOpen(false)
                                    }}
                                >
                                    <span>{getCountryFlag(item.code)}</span>
                                    <span className="min-w-0 flex-1 truncate">
                                        {item.name}
                                    </span>
                                    <span className="text-muted-foreground">
                                        {item.dialCode}
                                    </span>
                                </CommandItem>
                            ))}
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
            <div
                aria-label="Country calling code"
                className="bg-muted/30 text-muted-foreground flex h-8 w-16 shrink-0 items-center justify-center border border-r-0 px-2 text-sm"
            >
                {country.dialCode}
            </div>
            <Input
                id={id}
                type="tel"
                inputMode="tel"
                autoComplete="tel-national"
                value={number}
                onChange={(event) => setNumber(event.target.value)}
                disabled={disabled}
                required={required}
                placeholder={placeholder}
                className="min-w-0 flex-1 rounded-l-none"
            />
        </div>
    )
}
