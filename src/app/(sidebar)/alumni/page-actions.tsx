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
    getAlumniSchoolOptionsForTeams,
    getAlumniTeamOptionsForSchools,
    pruneAlumniFacultySelection,
    pruneAlumniFieldSelection,
    pruneAlumniSchoolSelection,
    pruneAlumniTeamSelection,
} from '@/lib/alumni/filter-options'
import { ALUMNI_DEGREE_OPTIONS, ALUMNI_SEASON_OPTIONS } from '@/lib/alumni/filters'
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
        schools,
        setSchools,
        faculties,
        setFaculties,
        fields,
        setFields,
        degrees,
        setDegrees,
    } = useFilters()

    const teamOptions = useMemo(
        () => getAlumniTeamOptionsForSchools(schools),
        [schools],
    )

    const schoolOptions = useMemo(
        () => getAlumniSchoolOptionsForTeams(teams),
        [teams],
    )

    const facultyOptions = useMemo(
        () => getAlumniFacultyOptionsForSelection(teams, schools),
        [teams, schools],
    )

    const fieldOptions = useMemo(
        () => getAlumniFieldOptionsForSelection(teams, schools, faculties),
        [teams, schools, faculties],
    )

    const handleTeamsChange = (nextTeams: string[]) => {
        void setTeams(nextTeams)

        const nextSchools = pruneAlumniSchoolSelection(schools, nextTeams)
        const nextFaculties = pruneAlumniFacultySelection(
            faculties,
            nextTeams,
            nextSchools,
        )
        const nextFields = pruneAlumniFieldSelection(
            fields,
            nextTeams,
            nextSchools,
            nextFaculties,
        )

        if (selectionChanged(schools, nextSchools)) void setSchools([...nextSchools])
        if (selectionChanged(faculties, nextFaculties)) {
            void setFaculties([...nextFaculties])
        }
        if (selectionChanged(fields, nextFields)) void setFields([...nextFields])
    }

    const handleSchoolsChange = (nextSchools: string[]) => {
        void setSchools(nextSchools)

        const nextTeams = pruneAlumniTeamSelection(teams, nextSchools)
        const nextFaculties = pruneAlumniFacultySelection(
            faculties,
            nextTeams,
            nextSchools,
        )
        const nextFields = pruneAlumniFieldSelection(
            fields,
            nextTeams,
            nextSchools,
            nextFaculties,
        )

        if (selectionChanged(teams, nextTeams)) void setTeams([...nextTeams])
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
            schools,
            nextFaculties,
        )
        if (selectionChanged(fields, nextFields)) void setFields([...nextFields])
    }

    const studyActiveCount = [
        schools.length > 0,
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
                options={teamOptions}
                value={teams}
                onChange={handleTeamsChange}
                leadingLabel="Tým"
                placeholder="Vše"
                className="w-52"
            />
            <FiltersPopover activeCount={studyActiveCount} label="Studium" icon={School}>
                <MultiSelectFilter
                    label="Škola"
                    options={schoolOptions}
                    value={schools}
                    onChange={handleSchoolsChange}
                    placeholder="Vše"
                    className="w-full"
                />
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
                    onChange={(next) => {
                        void setFields(next)
                    }}
                    placeholder="Vše"
                    className="w-full"
                />
                <MultiSelectFilter
                    label="Stupeň"
                    options={ALUMNI_DEGREE_OPTIONS}
                    value={degrees}
                    onChange={(next) => {
                        void setDegrees(next)
                    }}
                    placeholder="Vše"
                    searchable={false}
                    className="w-full"
                />
            </FiltersPopover>
            <ExportButton dashboard="alumni" filename="alumni.pdf" />
        </>
    )
}
