'use client'

import { useMemo } from 'react'
import { School } from 'lucide-react'

import { FiltersPopover } from '@/components/custom/filters/filters-popover'
import { MultiSelectFilter } from '@/components/custom/filters/multi-select-filter'
import { SelectFilter } from '@/components/custom/filters/select-filter'
import { ExportButton } from '@/components/custom/statistics/export-button'

import {
    getAlumniFacultyOptionsForSelection,
    getAlumniFieldOptionsForSelection,
    pruneAlumniFacultySelection,
    pruneAlumniFieldSelection,
} from '@/lib/alumni/filter-options'
import {
    ALUMNI_DEGREE_OPTIONS,
    ALUMNI_SEASON_OPTIONS,
    ALUMNI_TEAM_OPTIONS,
} from '@/lib/alumni/filters'
import { useFilters } from './use-filters'

function selectionChanged(current: readonly string[], next: readonly string[]) {
    return (
        current.length !== next.length ||
        current.some((value) => !next.includes(value)) ||
        next.some((value) => !current.includes(value))
    )
}

export function PageActions() {
    const {
        seasonFrom,
        setSeasonFrom,
        seasonTo,
        setSeasonTo,
        teams,
        setTeams,
        faculties,
        setFaculties,
        fields,
        setFields,
        degrees,
        setDegrees,
    } = useFilters()

    const facultyOptions = useMemo(
        () => getAlumniFacultyOptionsForSelection(teams, []),
        [teams],
    )

    const fieldOptions = useMemo(
        () => getAlumniFieldOptionsForSelection(teams, [], faculties),
        [teams, faculties],
    )

    const handleTeamsChange = (nextTeams: typeof teams) => {
        void setTeams(nextTeams)

        const nextFaculties = pruneAlumniFacultySelection(faculties, nextTeams, [])
        const nextFields = pruneAlumniFieldSelection(
            fields,
            nextTeams,
            [],
            nextFaculties,
        )

        if (selectionChanged(faculties, nextFaculties)) {
            void setFaculties([...nextFaculties])
        }
        if (selectionChanged(fields, nextFields)) void setFields([...nextFields])
    }

    const handleFacultiesChange = (nextFaculties: string[]) => {
        void setFaculties(nextFaculties)

        const nextFields = pruneAlumniFieldSelection(
            fields,
            teams,
            [],
            nextFaculties,
        )
        if (selectionChanged(fields, nextFields)) void setFields([...nextFields])
    }

    const studyActiveCount = [
        faculties.length > 0,
        fields.length > 0,
        degrees.length > 0,
    ].filter(Boolean).length

    return (
        <>
            <SelectFilter
                options={ALUMNI_SEASON_OPTIONS}
                value={seasonFrom}
                onChange={setSeasonFrom}
                leadingLabel="Sezóna od"
            />
            <SelectFilter
                options={ALUMNI_SEASON_OPTIONS}
                value={seasonTo}
                onChange={setSeasonTo}
                leadingLabel="Sezóna do"
            />
            <MultiSelectFilter
                options={ALUMNI_TEAM_OPTIONS}
                value={teams}
                onChange={handleTeamsChange}
                leadingLabel="Tým"
                placeholder="Vše"
                className="w-52"
            />
            <FiltersPopover activeCount={studyActiveCount} label="Studium" icon={School}>
                <MultiSelectFilter
                    label="Fakulta"
                    options={facultyOptions}
                    value={faculties}
                    onChange={handleFacultiesChange}
                    placeholder="Vše"
                    className="w-full"
                />
                <MultiSelectFilter
                    label="Obor"
                    options={fieldOptions}
                    value={fields}
                    onChange={setFields}
                    placeholder="Vše"
                    className="w-full"
                />
                <MultiSelectFilter
                    label="Stupeň"
                    options={ALUMNI_DEGREE_OPTIONS}
                    value={degrees}
                    onChange={setDegrees}
                    placeholder="Vše"
                    searchable={false}
                    className="w-full"
                />
            </FiltersPopover>
            <ExportButton
                dashboard="alumni-aktivni-hraci"
                filename="alumni-aktivni-hraci.pdf"
            />
        </>
    )
}
