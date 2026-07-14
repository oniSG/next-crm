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
        name: 'Stats Push',
        path: '/stats-push',
        status: 'progress',
        by: 'Tomas',
    },
    {
        name: 'Stats SMS',
        path: '/stats-sms',
        status: 'progress',
        by: 'Tomas',
    },
    {
        name: 'Stats Popup',
        path: '/stats-popup',
        status: 'progress',
        by: 'Tomas',
    },
    {
        name: 'Stats Email',
        path: '/stats-email',
        status: 'progress',
        by: 'Tomas',
    },
    {
        name: 'Přehled emailu',
        path: '/prehled-emailu',
        status: 'progress',
        by: 'Tomas',
    },
    {
        name: 'Stats Notification Bar',
        path: '/stats-notify-listy',
        status: 'progress',
        by: 'Denis',
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
