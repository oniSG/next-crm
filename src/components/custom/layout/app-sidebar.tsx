'use client'

import * as React from 'react'
import { usePathname } from 'next/navigation'

import { NavMain, type NavItem } from '@/components/nav-main'
import { NavUser } from '@/components/nav-user'
import { TeamSwitcher, type Team } from '@/components/team-switcher'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from '@/components/ui/sidebar'
import { markActive, type NavGroup } from '@/components/custom/layout/nav-data'
import {
    BookUserIcon,
    BriefcaseBusinessIcon,
    BriefcaseIcon,
    CalendarIcon,
    CalendarDaysIcon,
    ChartBarIcon,
    ClipboardCheckIcon,
    ClipboardListIcon,
    DollarSignIcon,
    FileIcon,
    FileTextIcon,
    LayersIcon,
    LayoutDashboardIcon,
    MonitorIcon,
    Settings2Icon,
    SettingsIcon,
    ShieldIcon,
    StarIcon,
    TargetIcon,
    TvIcon,
    UsersIcon,
    UsersRoundIcon,
    WaypointsIcon,
    ZapIcon,
} from 'lucide-react'

const user = {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
}

const teams: Team[] = [
    { name: 'Fans', logo: <UsersRoundIcon /> },
    { name: 'Business', logo: <BriefcaseBusinessIcon /> },
    { name: 'Settings', logo: <SettingsIcon /> },
]

const fansGroups: NavGroup[] = [
    {
        items: [
            { title: 'Dashboard', url: '/fans', icon: <TargetIcon /> },
            { title: 'Visitors', url: '/fan', icon: <ZapIcon /> },
            { title: 'Segments', url: '/segment', icon: <LayersIcon /> },
            { title: 'Templates', url: '/template', icon: <LayoutDashboardIcon /> },
            { title: 'Campaigns', url: '/fan-action', icon: <WaypointsIcon /> },
            { title: 'Surveys', url: '/survey', icon: <FileTextIcon /> },
            { title: 'Event lists', url: '/event-list', icon: <CalendarDaysIcon /> },
            { title: 'Web forms', url: '/custom-web-form', icon: <ClipboardListIcon /> },
        ],
    },
    {
        items: [
            {
                title: 'Overviews',
                url: '#',
                icon: <TvIcon />,
                items: [
                    { title: 'Tickets', url: '/ticket' },
                    { title: 'Season tickets', url: '/season-ticket' },
                    { title: 'Events', url: '/events' },
                    { title: 'Visits', url: '/visit' },
                    { title: 'Memberships', url: '/fan-memberships' },
                    { title: 'Football schools', url: '/football-class' },
                    { title: 'Products', url: '/ticketing-products' },
                ],
            },
            {
                title: 'Reports',
                url: '#',
                icon: <ChartBarIcon />,
                items: [
                    { title: 'Global analytics', url: '/report-fan-general' },
                    { title: 'Expert insights', url: '/report-expert' },
                    { title: 'Loyalty program', url: '/report-loyalty-program' },
                    { title: 'Fan history', url: '/report-history-fan' },
                    { title: 'GDPR changes', url: '/report-gdpr-change' },
                    { title: 'Event report', url: '/report-event' },
                    { title: 'Management report', url: '/report-management' },
                ],
            },
        ],
    },
]

const businessGroups: NavGroup[] = [
    {
        items: [
            { title: 'Dashboard', url: '/business', icon: <TargetIcon /> },
            { title: 'Calendar', url: '/calendar', icon: <CalendarIcon /> },
        ],
    },
    {
        items: [
            {
                title: 'Address book',
                url: '#',
                icon: <BookUserIcon />,
                items: [
                    { title: 'Partners', url: '/partner' },
                    { title: 'Contacts', url: '/contact' },
                ],
            },
            {
                title: 'Sales',
                url: '#',
                icon: <DollarSignIcon />,
                items: [
                    { title: 'Sales dashboard', url: '/business-board' },
                    { title: 'Business cases', url: '/business-case' },
                    { title: 'Advertising board', url: '/advertising-space-board' },
                    { title: 'Offers', url: '/offer' },
                    { title: 'Contracts', url: '/contract' },
                    { title: 'Advertising rentals', url: '/advertising-space' },
                    { title: 'Price lists', url: '/price-list' },
                    { title: 'Bonuses', url: '/bonus' },
                    { title: 'Discounts', url: '/bonus-guideline' },
                ],
            },
            {
                title: 'Visualization',
                url: '#',
                icon: <MonitorIcon />,
                items: [
                    { title: 'Advertising spaces', url: '/advertising-space-arena' },
                    { title: 'LED', url: '/advertising-space-led' },
                    { title: 'Arena spaces', url: '/advertising-space-arena-2' },
                    { title: 'Player', url: '/advertising-space-player' },
                    { title: 'Season pass', url: '/advertising-space-card' },
                ],
            },
            { title: 'Documents', url: '/document', icon: <FileIcon /> },
        ],
    },
    {
        items: [
            {
                title: 'Reports',
                url: '#',
                icon: <ChartBarIcon />,
                items: [
                    { title: 'Opportunities filter', url: '/report-filter-business-case' },
                    { title: 'Free spaces filter', url: '/report-free-advertising-spaces' },
                    { title: 'Occupied spaces filter', url: '/report-occupied-advertising-spaces' },
                    { title: 'Sales funnel', url: '/report-sales-funnel' },
                    { title: 'Sales development', url: '/report-sales-development' },
                    { title: 'Sales by product', url: '/report-sales-by-product' },
                    { title: 'Sales by merchant', url: '/report-sales-by-merchant' },
                    { title: 'Success by merchant', url: '/report-success-by-merchant' },
                    { title: 'Number of cases', url: '/report-number-of-cases' },
                    { title: 'Number of activities', url: '/report-number-of-activities' },
                    { title: 'Profitability of cases', url: '/report-profitability-of-cases' },
                    { title: 'Profit development', url: '/report-profit-development' },
                    { title: 'Invoicing', url: '/report-invoice' },
                    { title: 'Management report', url: '/report-management' },
                ],
            },
        ],
    },
    {
        items: [
            {
                title: 'Planning',
                url: '#',
                icon: <ClipboardCheckIcon />,
                items: [{ title: 'Sales plan', url: '/business-plan' }],
            },
        ],
    },
]

const settingsGroups: NavGroup[] = [
    {
        items: [
            {
                title: 'General',
                url: '#',
                icon: <Settings2Icon />,
                items: [
                    { title: 'Tags', url: '/tag' },
                    { title: 'Currencies', url: '/currency' },
                    { title: 'Companies', url: '/company' },
                    { title: 'Seasons', url: '/season' },
                ],
            },
            {
                title: 'Business',
                url: '#',
                icon: <BriefcaseIcon />,
                items: [
                    { title: 'Case states', url: '/business-case-state' },
                    { title: 'Case types', url: '/business-case-type' },
                    { title: 'Offer states', url: '/offer-state' },
                    { title: 'Ad space states', url: '/advertising-space-item-state' },
                    { title: 'Business settings', url: '/business-settings' },
                    { title: 'Email assistant', url: '/mail-assistant' },
                    { title: 'Contact types', url: '/contact-person-types' },
                ],
            },
            {
                title: 'Fans',
                url: '#',
                icon: <StarIcon />,
                items: [
                    { title: 'Newsletter form', url: '/newsletter' },
                    { title: 'Loyalty touchpoints', url: '/touchpoint' },
                    { title: 'Custom fonts', url: '/custom-font' },
                    { title: 'Custom blocks', url: '/custom-block' },
                    { title: 'Sending domains', url: '/sending-domain' },
                    { title: 'Domain prefixes', url: '/sending-domain-prefix' },
                    { title: 'Reply-to emails', url: '/email-for-reply' },
                    { title: 'Custom visitor fields', url: '/custom-attribute' },
                    { title: 'Waiting list', url: '/waiting-list' },
                    { title: 'GDPR texts', url: '/gdpr-texts' },
                    { title: 'Frequency cap', url: '/frequency-cap' },
                ],
            },
            {
                title: 'Users & access',
                url: '#',
                icon: <UsersIcon />,
                items: [
                    { title: 'Privileges', url: '/privilege' },
                    { title: 'User groups', url: '/user-group' },
                    { title: 'Users', url: '/user' },
                ],
            },
            {
                title: 'Security & logs',
                url: '#',
                icon: <ShieldIcon />,
                items: [
                    { title: 'Security', url: '/settings/security' },
                    { title: 'Logs', url: '/log' },
                ],
            },
        ],
    },
]

const groupsByTeam: Record<string, NavGroup[]> = {
    Fans: fansGroups,
    Business: businessGroups,
    Settings: settingsGroups,
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const [activeTeam, setActiveTeam] = React.useState<Team>(teams[0]!)
    const pathname = usePathname() ?? ''

    const groups = React.useMemo(
        () => markActive(groupsByTeam[activeTeam.name] ?? [], pathname),
        [activeTeam, pathname],
    ) satisfies NavGroup[]

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher
                    teams={teams}
                    activeTeam={activeTeam}
                    onTeamChange={setActiveTeam}
                />
            </SidebarHeader>
            <SidebarContent>
                {groups.map((group, index) => (
                    <NavMain
                        key={`${activeTeam.name}-${index}`}
                        label={group.label}
                        items={group.items as NavItem[]}
                    />
                ))}
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
