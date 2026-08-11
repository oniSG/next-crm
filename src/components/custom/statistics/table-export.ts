import * as XLSX from 'xlsx'

export type TableExportCell = string | number | null | undefined

export type TableExportable = {
    filename: string
    headers: string[]
    rows: TableExportCell[][]
}

function downloadBlob(blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = filename
    document.body.appendChild(anchor)
    anchor.click()
    anchor.remove()
    URL.revokeObjectURL(url)
}

function cellToString(value: TableExportCell) {
    if (value == null) return ''
    return String(value)
}

function escapeCsvCell(value: TableExportCell) {
    const text = cellToString(value)
    if (/[";\n\r]/.test(text)) {
        return `"${text.replace(/"/g, '""')}"`
    }
    return text
}

function toSheetMatrix(headers: string[], rows: TableExportCell[][]) {
    return [
        headers,
        ...rows.map((row) =>
            row.map((cell) => (cell == null ? '' : cell)),
        ),
    ]
}

export function toCsvContent(headers: string[], rows: TableExportCell[][]) {
    const lines = [headers, ...rows].map((row) =>
        row.map(escapeCsvCell).join(';'),
    )
    return `\uFEFF${lines.join('\n')}`
}

export function exportTableAsCsv(exportable: TableExportable) {
    const content = toCsvContent(exportable.headers, exportable.rows)
    downloadBlob(
        new Blob([content], { type: 'text/csv;charset=utf-8' }),
        `${exportable.filename}.csv`,
    )
}

export function exportTableAsExcel(exportable: TableExportable) {
    const worksheet = XLSX.utils.aoa_to_sheet(
        toSheetMatrix(exportable.headers, exportable.rows),
    )
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
    const buffer = XLSX.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
    }) as ArrayBuffer
    downloadBlob(
        new Blob([buffer], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        }),
        `${exportable.filename}.xlsx`,
    )
}
