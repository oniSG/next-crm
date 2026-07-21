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
    {
        name: 'Přehled notifikační lišty',
        path: '/prehled-notifikacni-listy',
        status: 'progress',
        by: 'Tomas',
    },
    {
        name: 'Přehled popup',
        path: '/prehled-popup',
        status: 'progress',
        by: 'Tomas',
    },
    {
        name: 'Přehled push',
        path: '/prehled-push',
        status: 'progress',
        by: 'Tomas',
    },
    {
        name: 'Přehled SMS',
        path: '/prehled-sms',
        status: 'progress',
        by: 'Tomas',
    },
    {
        name: 'Věrnostní program',
        path: '/vernostni-program',
        status: 'progress',
        by: 'Tomas',
    },
    {
        name: 'Stats',
        path: '/stats',
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
