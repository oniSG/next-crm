Here's a comprehensive walkthrough of the table-page template — a Svelte 5 + shadcn-svelte data-grid component living at src/lib/components/custom/table-page/.

Purpose

A production-grade table page that bundles URL state, localStorage prefs, saved views, advanced filtering, pagination, selection, and column customization into a single <TablePage> component. Designed for admin/CRM screens with bookmarkable state.

Public API

```jsx
<TablePage
  queryKey="segments"                         // unique key for URL + localStorage
  columns={cols}                              // TableColumn<Row>[]
  fetcher={fetchSegments}                     // (args) => Promise<{ rows, total }>
  search={{ placeholder: '…', fields: [...] }}
  shortcuts={[                                // quick filters
    { kind: 'multi-select', field: 'tags', ... },
    { kind: 'date-range',   field: 'updated_at', ... }
  ]}
  defaultSort={{ id: 'updated_at', desc: true }}
  defaultLimit={30}
  pageSizes={[30, 50, 100, 200, Infinity]}
  click={{ onClick, href, sheet, menu }}
  rowActions={snippet}
  selectable
  onDeleteSelected={(ids) => …}
/>
```

Architecture (layered)

1. table-page.svelte — root orchestrator. Builds a TanStack Table, wires URL ↔ prefs ↔ query, renders Toolbar + Body + BottomBar.
2. context.ts / types.ts — Svelte context for row actions; discriminated TableColumn<Row> types (text | number | date | bool | select), Shortcut, TableFetcher.
3. url-state.svelte.ts — wraps sveltekit-search-params to encode page, limit, sort, dir, q, as_of. Provides patchAndResetPage, goToPage, clampPage.
4. preferences.ts — localStorage under tablepage:${queryKey} for column visibility/order/sizing, limit, search fields.
5. saved-views.svelte.ts — named snapshots of query + column state + sort + limit; handles Infinity ↔ 'all' serialization.
6. query.ts — createTableQuery (paginated) and createTableInfiniteQuery (infinite scroll) via @tanstack/svelte-query, staleTime: 30s, keepPreviousData.
7. columns.ts — toTanstackColumns() maps TableColumn → TanStack ColumnDef; deriveQueryFields() auto-generates filter defs.
8. query-builder/ — recursive AND/OR filter AST (fields.ts), sheet UI (query-builder.svelte, group.svelte), one filter component per type (filter-text/number/date/select/bool.svelte).
9. toolbar.svelte — search input with multi-field selector (debounced 350ms), shortcut popovers, query-builder sheet trigger with active-filter count, column-visibility button, saved-views dropdown.
10. body.svelte — sticky-header scroller; skeleton loaders on first fetch; empty state with reset-filters; IntersectionObserver at 1200px margin for infinite scroll.
11. row-wrapper.svelte — wraps rows in click/href/sheet/context-menu handlers with proper a11y roles.
12. pagination.svelte + goto-page.svelte + bottom-bar.svelte — prev/next + jump-to-page, page-size dropdown ("All" = Infinity switches to infinite mode), total count, selection actions.
13. shortcut-date-range.svelte — 8 presets (today, last 7, month, quarter, YTD…) + custom range calendar; auto-detects active preset.
14. shortcut-multi-select.svelte — searchable command list (bits-ui) with selected-count badge.
15. col-visibility.svelte — dropdown with svelte-dnd-action drag reordering + visibility toggles (pinned __select/__actions excluded).
16. column-header.svelte — sort-toggle button with directional icons, alignment-aware.
17. cells/ — one component per type: text, number, date (Intl-formatted with localeState), bool, select, badge, tags (colored via tag-color.ts), actions, select-cell/header (row checkbox). highlight.svelte + search-highlight.ts wrap matches in <mark> using a SEARCH_CTX_KEY context.

Cross-cutting features

- Sorting (URL-synced), simple search (multi-field, debounced), shortcut filters, advanced query builder (nested AND/OR, type-aware operators), column show/hide + reorder + resize, row selection + bulk actions, paginated and infinite modes, jump-to-page, saved views, URL bookmarkability, localStorage prefs, search highlighting, i18n via @inlang/paraglide-js, keyboard shortcuts (Enter/Esc in inputs).

State flow (source-of-truth hierarchy)

1. URL — page, sort, limit, query, as_of (bookmarkable).
2. TanStack Table — visibility, order, sizing, selection (session).
3. localStorage — column prefs + saved views (persist across sessions).
4. Query filter — hydrated from URL on mount, then synced both ways.

Dependencies

@tanstack/table-core, @tanstack/svelte-query, sveltekit-search-params, svelte-dnd-action, @internationalized/date, bits-ui, lucide-svelte, svelte-sonner, @inlang/paraglide-js. shadcn primitives: button, input, badge, empty, skeleton, table, sheet, dialog, popover, context-menu, dropdown-menu, button-group, input-group, tooltip, separator, command, range-calendar.

Replication checklist

1. Copy the entire src/lib/components/custom/table-page/ folder (including cells/ and query-builder/).
2. Install deps above.
3. pnpm dlx shadcn-svelte@latest add the primitives listed.
4. Either wire @inlang/paraglide-js messages for all m.tp__() / m.qb__() calls, or replace them with plain strings.
5. Confirm sveltekit-search-params works with your SvelteKit version.
6. Per page: define columns, write a fetcher(args), drop in <TablePage>.
