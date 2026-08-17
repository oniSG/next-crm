/** Adapt nuqs literal setters to SelectFilter / MultiSelectFilter string APIs. */

export function setLiteralParam(
    set: (value: never) => unknown,
): (value: string) => void {
    return (value) => {
        void (set as (value: string) => unknown)(value)
    }
}

export function setLiteralParams(
    set: (value: never[]) => unknown,
): (value: string[]) => void {
    return (value) => {
        void (set as (value: string[]) => unknown)(value)
    }
}
