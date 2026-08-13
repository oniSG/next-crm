'use client'

import { FiltersPopover } from '@/components/custom/filters/filters-popover'
import { SelectFilter } from '@/components/custom/filters/select-filter'
import { ExportButton } from '@/components/custom/statistics/export-button'

import {
    ALUMNI_FILTER_DEFAULTS,
    DEGREE_FILTER_OPTIONS,
    FACULTY_FILTER_OPTIONS,
    FIELD_FILTER_OPTIONS,
    TEAM_FILTER_OPTIONS,
    useAlumniDegreeFilter,
    useAlumniFacultyFilter,
    useAlumniFieldFilter,
    useAlumniTeamFilter,
} from '../alumni-filters'

export function PageActions() {
    const [team, setTeam] = useAlumniTeamFilter()
    const [faculty, setFaculty] = useAlumniFacultyFilter()
    const [field, setField] = useAlumniFieldFilter()
    const [degree, setDegree] = useAlumniDegreeFilter()

    const activeCount = [
        team !== ALUMNI_FILTER_DEFAULTS.team,
        faculty !== ALUMNI_FILTER_DEFAULTS.faculty,
        field !== ALUMNI_FILTER_DEFAULTS.field,
        degree !== ALUMNI_FILTER_DEFAULTS.degree,
    ].filter(Boolean).length

    return (
        <>
            <FiltersPopover activeCount={activeCount}>
                <SelectFilter
                    label="Tým"
                    options={TEAM_FILTER_OPTIONS}
                    value={team}
                    onChange={(value) => void setTeam(value as typeof team)}
                />
                <SelectFilter
                    label="Fakulta"
                    options={FACULTY_FILTER_OPTIONS}
                    value={faculty}
                    onChange={(value) => void setFaculty(value as typeof faculty)}
                />
                <SelectFilter
                    label="Obor"
                    options={FIELD_FILTER_OPTIONS}
                    value={field}
                    onChange={(value) => void setField(value as typeof field)}
                />
                <SelectFilter
                    label="Stupeň"
                    options={DEGREE_FILTER_OPTIONS}
                    value={degree}
                    onChange={(value) => void setDegree(value as typeof degree)}
                />
            </FiltersPopover>
            <ExportButton
                dashboard="alumni-dashboard"
                filename="alumni-dashboard-aktivni-hraci.pdf"
            />
        </>
    )
}
