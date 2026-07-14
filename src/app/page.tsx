const pages: {
    name: string
    path: string
    status: 'pending' | 'progress' | 'completed'
    by?: string
}[] = [
    {
        name: 'Example Page',
        path: '/example',
        status: 'progress',
        by: 'Denis',
    },
    {
        name: 'Přehled popup',
        path: '/prehled_popup',
        status: 'progress',
        by: 'Tomas',
    },
]

export default function Page() {
    return (
        <div>
            <h1>Dashboard in Next.js!</h1>
            <ul>
                {pages.map((page) => (
                    <li key={page.path}>
                        <a href={page.path}>{page.name}</a>
                        <span> - {page.status}</span>
                        {page.by && <span> - By {page.by}</span>}
                    </li>
                ))}
            </ul>
        </div>
    )
}
