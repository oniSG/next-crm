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
    ActivityIcon,
    AtSignIcon,
    BadgeIcon,
    BlocksIcon,
    BookUserIcon,
    BriefcaseBusinessIcon,
    BriefcaseIcon,
    Building2Icon,
    CalendarCheckIcon,
    CalendarDaysIcon,
    CalendarIcon,
    CalendarRangeIcon,
    ChartBarIcon,
    CircleDotIcon,
    ClipboardCheckIcon,
    ClipboardListIcon,
    CoinsIcon,
    CreditCardIcon,
    DollarSignIcon,
    FileIcon,
    FileSignatureIcon,
    FileTextIcon,
    FilterIcon,
    FolderIcon,
    FootprintsIcon,
    GaugeIcon,
    GiftIcon,
    GlobeIcon,
    GraduationCapIcon,
    HandshakeIcon,
    HashIcon,
    HeartHandshakeIcon,
    HistoryIcon,
    HourglassIcon,
    KeyIcon,
    LayersIcon,
    LayoutDashboardIcon,
    LightbulbIcon,
    LineChartIcon,
    LockIcon,
    MailIcon,
    MapIcon,
    MapPinIcon,
    MegaphoneIcon,
    MonitorIcon,
    PackageIcon,
    PercentIcon,
    ReceiptIcon,
    ReplyIcon,
    ScreenShareIcon,
    ScrollIcon,
    ScrollTextIcon,
    Settings2Icon,
    SettingsIcon,
    ShieldCheckIcon,
    ShieldIcon,
    SlidersHorizontalIcon,
    SlidersIcon,
    SquareStackIcon,
    StarIcon,
    StoreIcon,
    TagIcon,
    TargetIcon,
    TicketIcon,
    TicketsIcon,
    TrendingUpIcon,
    TrophyIcon,
    TvIcon,
    TypeIcon,
    UserIcon,
    UserSquareIcon,
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
            { title: 'Segments', url: '/segments', icon: <LayersIcon /> },
            { title: 'Templates', url: '/templates', icon: <LayoutDashboardIcon /> },
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
                    { title: 'Tickets', url: '/ticket', icon: <TicketIcon /> },
                    { title: 'Season tickets', url: '/season-ticket', icon: <TicketsIcon /> },
                    { title: 'Events', url: '/events', icon: <CalendarIcon /> },
                    { title: 'Visits', url: '/visit', icon: <FootprintsIcon /> },
                    { title: 'Memberships', url: '/fan-memberships', icon: <CreditCardIcon /> },
                    { title: 'Football schools', url: '/football-class', icon: <GraduationCapIcon /> },
                    { title: 'Products', url: '/ticketing-products', icon: <PackageIcon /> },
                ],
            },
            {
                title: 'Reports',
                url: '#',
                icon: <ChartBarIcon />,
                items: [
                    { title: 'Global analytics', url: '/report-fan-general', icon: <GlobeIcon /> },
                    { title: 'Expert insights', url: '/report-expert', icon: <LightbulbIcon /> },
                    { title: 'Loyalty program', url: '/report-loyalty-program', icon: <StarIcon /> },
                    { title: 'Fan history', url: '/report-history-fan', icon: <HistoryIcon /> },
                    { title: 'GDPR changes', url: '/report-gdpr-change', icon: <ShieldCheckIcon /> },
                    { title: 'Event report', url: '/report-event', icon: <CalendarCheckIcon /> },
                    { title: 'Management report', url: '/report-management', icon: <BriefcaseIcon /> },
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
                    { title: 'Partners', url: '/partner', icon: <HandshakeIcon /> },
                    { title: 'Contacts', url: '/contact', icon: <UserIcon /> },
                ],
            },
            {
                title: 'Sales',
                url: '#',
                icon: <DollarSignIcon />,
                items: [
                    { title: 'Sales dashboard', url: '/business-board', icon: <LayoutDashboardIcon /> },
                    { title: 'Business cases', url: '/business-case', icon: <FolderIcon /> },
                    { title: 'Advertising board', url: '/advertising-space-board', icon: <ClipboardListIcon /> },
                    { title: 'Offers', url: '/offer', icon: <TagIcon /> },
                    { title: 'Contracts', url: '/contract', icon: <FileSignatureIcon /> },
                    { title: 'Advertising rentals', url: '/advertising-space', icon: <MegaphoneIcon /> },
                    { title: 'Price lists', url: '/price-list', icon: <DollarSignIcon /> },
                    { title: 'Bonuses', url: '/bonus', icon: <GiftIcon /> },
                    { title: 'Discounts', url: '/bonus-guideline', icon: <PercentIcon /> },
                ],
            },
            {
                title: 'Visualization',
                url: '#',
                icon: <MonitorIcon />,
                items: [
                    { title: 'Advertising spaces', url: '/advertising-space-arena', icon: <MapIcon /> },
                    { title: 'LED', url: '/advertising-space-led', icon: <ScreenShareIcon /> },
                    { title: 'Arena spaces', url: '/advertising-space-arena-2', icon: <MapPinIcon /> },
                    { title: 'Player', url: '/advertising-space-player', icon: <UserIcon /> },
                    { title: 'Season pass', url: '/advertising-space-card', icon: <CreditCardIcon /> },
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
                    {
                        title: 'Opportunities filter',
                        url: '/report-filter-business-case',
                        icon: <FilterIcon />,
                    },
                    {
                        title: 'Free spaces filter',
                        url: '/report-free-advertising-spaces',
                        icon: <FilterIcon />,
                    },
                    {
                        title: 'Occupied spaces filter',
                        url: '/report-occupied-advertising-spaces',
                        icon: <FilterIcon />,
                    },
                    { title: 'Sales funnel', url: '/report-sales-funnel', icon: <FilterIcon /> },
                    { title: 'Sales development', url: '/report-sales-development', icon: <TrendingUpIcon /> },
                    { title: 'Sales by product', url: '/report-sales-by-product', icon: <PackageIcon /> },
                    { title: 'Sales by merchant', url: '/report-sales-by-merchant', icon: <StoreIcon /> },
                    { title: 'Success by merchant', url: '/report-success-by-merchant', icon: <TrophyIcon /> },
                    { title: 'Number of cases', url: '/report-number-of-cases', icon: <HashIcon /> },
                    {
                        title: 'Number of activities',
                        url: '/report-number-of-activities',
                        icon: <ActivityIcon />,
                    },
                    {
                        title: 'Profitability of cases',
                        url: '/report-profitability-of-cases',
                        icon: <CoinsIcon />,
                    },
                    { title: 'Profit development', url: '/report-profit-development', icon: <LineChartIcon /> },
                    { title: 'Invoicing', url: '/report-invoice', icon: <ReceiptIcon /> },
                    { title: 'Management report', url: '/report-management', icon: <BriefcaseIcon /> },
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
                items: [{ title: 'Sales plan', url: '/business-plan', icon: <CalendarCheckIcon /> }],
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
                    { title: 'Tags', url: '/tag', icon: <TagIcon /> },
                    { title: 'Currencies', url: '/currency', icon: <DollarSignIcon /> },
                    { title: 'Companies', url: '/company', icon: <Building2Icon /> },
                    { title: 'Seasons', url: '/season', icon: <CalendarRangeIcon /> },
                ],
            },
            {
                title: 'Business',
                url: '#',
                icon: <BriefcaseIcon />,
                items: [
                    { title: 'Case states', url: '/business-case-state', icon: <CircleDotIcon /> },
                    { title: 'Case types', url: '/business-case-type', icon: <LayersIcon /> },
                    { title: 'Offer states', url: '/offer-state', icon: <BadgeIcon /> },
                    { title: 'Ad space states', url: '/advertising-space-item-state', icon: <SquareStackIcon /> },
                    { title: 'Business settings', url: '/business-settings', icon: <SlidersHorizontalIcon /> },
                    { title: 'Email assistant', url: '/mail-assistant', icon: <MailIcon /> },
                    { title: 'Contact types', url: '/contact-person-types', icon: <UserSquareIcon /> },
                ],
            },
            {
                title: 'Fans',
                url: '#',
                icon: <StarIcon />,
                items: [
                    { title: 'Newsletter form', url: '/newsletter', icon: <MailIcon /> },
                    { title: 'Loyalty touchpoints', url: '/touchpoint', icon: <HeartHandshakeIcon /> },
                    { title: 'Custom fonts', url: '/custom-font', icon: <TypeIcon /> },
                    { title: 'Custom blocks', url: '/custom-block', icon: <BlocksIcon /> },
                    { title: 'Sending domains', url: '/sending-domain', icon: <GlobeIcon /> },
                    { title: 'Domain prefixes', url: '/sending-domain-prefix', icon: <AtSignIcon /> },
                    { title: 'Reply-to emails', url: '/email-for-reply', icon: <ReplyIcon /> },
                    { title: 'Custom visitor fields', url: '/custom-attribute', icon: <SlidersIcon /> },
                    { title: 'Waiting list', url: '/waiting-list', icon: <HourglassIcon /> },
                    { title: 'GDPR texts', url: '/gdpr-texts', icon: <ScrollTextIcon /> },
                    { title: 'Frequency cap', url: '/frequency-cap', icon: <GaugeIcon /> },
                ],
            },
            {
                title: 'Users & access',
                url: '#',
                icon: <UsersIcon />,
                items: [
                    { title: 'Privileges', url: '/privilege', icon: <KeyIcon /> },
                    { title: 'User groups', url: '/user-group', icon: <UsersRoundIcon /> },
                    { title: 'Users', url: '/user', icon: <UserIcon /> },
                ],
            },
            {
                title: 'Security & logs',
                url: '#',
                icon: <ShieldIcon />,
                items: [
                    { title: 'Security', url: '/settings/security', icon: <LockIcon /> },
                    { title: 'Logs', url: '/log', icon: <ScrollIcon /> },
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
