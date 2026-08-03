import type {
    PermissionMask,
    PermissionModuleVisibility,
    UserEditData,
    UserEditTag,
} from './temp'

export const USER_EDIT_TAGS = [
    { id: 'sales', name: 'Sales' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'management', name: 'Management' },
    { id: 'support', name: 'Support' },
    { id: 'vip', name: 'VIP' },
] satisfies UserEditTag[]

export const USER_EDIT_PERMISSION_MASKS = [
    {
        id: 'viewer',
        name: 'Viewer',
        description: 'Read-only access to available areas.',
        permissions: [
            'viewUsers',
            'detailUser',
            'viewPrivileges',
            'detailPrivilege',
            'viewTags',
            'detailTag',
            'viewCurrencies',
            'detailCurrency',
            'viewReportManagement',
            'viewAnalytic',
            'viewCompanies',
            'detailCompany',
            'viewSeasons',
            'detailSeason',
            'viewFans',
            'detailFan',
            'viewBusinessCases',
            'detailBusinessCase',
            'viewMobileAlert',
            'viewMobileCalendar',
            'viewMobileNotification',
            'viewMobileBanners',
        ],
    },
    {
        id: 'editor',
        name: 'Editor',
        description: 'Read and write access without destructive actions.',
        permissions: [
            'viewUsers',
            'insertUser',
            'editUser',
            'detailUser',
            'viewPrivileges',
            'editPrivilege',
            'detailPrivilege',
            'viewTags',
            'insertTag',
            'editTag',
            'detailTag',
            'viewCurrencies',
            'insertCurrency',
            'editCurrency',
            'detailCurrency',
            'viewReportManagement',
            'viewAnalytic',
            'viewCompanies',
            'insertCompany',
            'editCompany',
            'detailCompany',
            'viewSeasons',
            'insertSeason',
            'editSeason',
            'detailSeason',
            'viewFans',
            'insertFan',
            'editFan',
            'detailFan',
            'viewBusinessCases',
            'insertBusinessCase',
            'editBusinessCase',
            'detailBusinessCase',
            'viewMobileAlert',
            'viewMobileCalendar',
            'insertMobileCalendar',
            'editMobileCalendar',
            'viewMobileNotification',
            'insertMobileNotification',
            'editMobileNotification',
            'viewMobileBanners',
            'insertMobileBanner',
            'editMobileBanner',
        ],
    },
    {
        id: 'administrator',
        name: 'Administrator',
        description: 'Full access to all available permissions.',
        permissions: ['*'],
    },
] satisfies PermissionMask[]

export const DEFAULT_PERMISSION_MODULE_VISIBILITY = {
    fans: true,
    business: true,
    mobile: true,
} satisfies PermissionModuleVisibility

export const USER_EDIT_DATA = {
    id: 'USR-2026-001',
    name: 'Petr',
    surname: 'Novák',
    email: 'petr.novak@relatoo.cz',
    phoneNumber: '+420 777 123 456',
    bannerUrl: null,
    salesRepresentative: false,
    active: true,
    receiveManagerialReport: true,
    tagIds: ['sales', 'management'],
    security: {
        twoFactorAuthenticationStatus: true,
        twoFactorAuthenticationRequired: false,
        passwordChangeRequired: false,
    },
    permissionMaskId: 'viewer',
    permissions: {
        viewUsers: true,
        detailUser: true,
        viewPrivileges: true,
        detailPrivilege: true,
        viewTags: true,
        detailTag: true,
        viewCurrencies: true,
        detailCurrency: true,
        viewReportManagement: true,
        viewAnalytic: true,
        viewCompanies: true,
        detailCompany: true,
        viewSeasons: true,
        detailSeason: true,
        viewFans: true,
        detailFan: true,
        viewBusinessCases: true,
        detailBusinessCase: true,
        viewMobileAlert: true,
        viewMobileCalendar: true,
        viewMobileNotification: true,
        viewMobileBanners: true,
    },
} satisfies UserEditData

export const TAG_OPTIONS = ['Sales', 'Marketing', 'Management', 'Support', 'VIP'] as const

export const BASIC_PERMISSION_CATEGORIES = [
    {
        id: 'users',
        title: 'Users',
        permissions: [
            ['viewUsers', 'View users', 'Access the user list.'],
            ['insertUser', 'Create users', 'Add new user accounts.'],
            ['editUser', 'Edit users', 'Change user profile and account settings.'],
            ['detailUser', 'View user detail', 'Open complete user information.'],
            ['viewLogs', 'View logs', 'Access user and system activity logs.'],
        ],
    },
    {
        id: 'privilege-masks',
        title: 'Privilege masks',
        permissions: [
            ['viewPrivileges', 'View privilege masks', 'Access the privilege mask list.'],
            [
                'insertPrivilege',
                'Create privilege masks',
                'Create new permission presets.',
            ],
            [
                'editPrivilege',
                'Edit privilege masks',
                'Change existing permission presets.',
            ],
            [
                'detailPrivilege',
                'View privilege detail',
                'Open complete privilege mask information.',
            ],
            [
                'deletePrivilege',
                'Delete privilege masks',
                'Remove existing permission presets.',
            ],
        ],
    },
    {
        id: 'tags',
        title: 'Tags',
        permissions: [
            ['viewTags', 'View tags', 'Access the tag list.'],
            ['insertTag', 'Create tags', 'Add new tags.'],
            ['editTag', 'Edit tags', 'Change existing tags.'],
            ['detailTag', 'View tag detail', 'Open complete tag information.'],
            ['deleteTag', 'Delete tags', 'Remove existing tags.'],
        ],
    },
    {
        id: 'currencies',
        title: 'Currencies',
        permissions: [
            ['viewCurrencies', 'View currencies', 'Access the currency list.'],
            ['insertCurrency', 'Create currencies', 'Add new currencies.'],
            ['editCurrency', 'Edit currencies', 'Change existing currencies.'],
            [
                'detailCurrency',
                'View currency detail',
                'Open complete currency information.',
            ],
        ],
    },
    {
        id: 'reports-and-system-access',
        title: 'Reports and system access',
        permissions: [
            [
                'viewReportManagement',
                'View management report',
                'Access managerial reporting and its metrics.',
            ],
            [
                'editSecurity',
                'Edit security',
                'Manage authentication and account security settings.',
            ],
            [
                'viewAnalytic',
                'View analytics',
                'Access analytics dashboards and reports.',
            ],
        ],
    },
    {
        id: 'companies',
        title: 'Companies',
        permissions: [
            ['viewCompanies', 'View companies', 'Access the company list.'],
            ['insertCompany', 'Create companies', 'Add new companies.'],
            ['editCompany', 'Edit companies', 'Change existing companies.'],
            [
                'detailCompany',
                'View company detail',
                'Open complete company information.',
            ],
            ['deleteCompany', 'Delete companies', 'Remove existing companies.'],
        ],
    },
    {
        id: 'seasons',
        title: 'Seasons',
        permissions: [
            ['viewSeasons', 'View seasons', 'Access the season list.'],
            ['insertSeason', 'Create seasons', 'Add new seasons.'],
            ['editSeason', 'Edit seasons', 'Change existing seasons.'],
            ['detailSeason', 'View season detail', 'Open complete season information.'],
            ['deleteSeason', 'Delete seasons', 'Remove existing seasons.'],
        ],
    },
] as const

export const FANS_PERMISSION_CATEGORIES = [
    [
        'Fans',
        [
            'viewFans',
            'insertFan',
            'editFan',
            'detailFan',
            'deleteFan',
            'deleteFanHistory',
            'importFan',
            'exportFan',
            'removeFanTags',
        ],
    ],
    [
        'Attendance and ticketing',
        [
            'viewTickets',
            'viewEvents',
            'viewCasinoVisits',
            'viewFanMemberships',
            'viewFootballClasses',
            'viewTicketingProducts',
            'viewWaitingList',
        ],
    ],
    [
        'Templates',
        [
            'viewTemplates',
            'insertTemplate',
            'editTemplate',
            'detailTemplate',
            'duplicateTemplate',
            'deleteTemplate',
        ],
    ],
    [
        'Segments',
        [
            'viewSegments',
            'insertSegment',
            'editSegment',
            'detailSegment',
            'duplicateSegment',
            'deleteSegment',
            'recalculateSegments',
            'exportSegment',
        ],
    ],
    [
        'Fan actions',
        [
            'viewFanActions',
            'insertFanAction',
            'editFanAction',
            'detailFanAction',
            'duplicateFanAction',
            'deleteFanAction',
        ],
    ],
    [
        'Loyalty and communication',
        ['viewTouchpoints', 'viewNewsletter', 'viewFrequencyCap'],
    ],
    [
        'Fan reports',
        [
            'viewGlobalFanReport',
            'viewExpertInsightsReport',
            'viewFanLeaderboard',
            'viewReportHistoryFan',
            'viewReportGDPRChange',
            'viewReportEvent',
        ],
    ],
    [
        'Surveys',
        [
            'viewSurveys',
            'insertSurvey',
            'editSurvey',
            'duplicateSurvey',
            'shareSurveyStatistics',
            'deleteSurvey',
        ],
    ],
    [
        'Custom fonts',
        ['viewCustomFonts', 'insertCustomFont', 'editCustomFont', 'deleteCustomFont'],
    ],
    [
        'Custom blocks',
        ['viewCustomBlocks', 'insertCustomBlock', 'editCustomBlock', 'deleteCustomBlock'],
    ],
    [
        'Sending domains',
        [
            'viewSendingDomains',
            'insertSendingDomains',
            'editSendingDomains',
            'deleteSendingDomains',
            'verificationSendingDomains',
        ],
    ],
    [
        'Custom attributes',
        [
            'viewCustomAttributes',
            'insertCustomAttribute',
            'editCustomAttribute',
            'deleteCustomAttribute',
            'duplicateCustomAttribute',
            'releaseEditLocks',
        ],
    ],
    ['Marketing consent texts', ['viewGDPRTexts', 'editGDPRTexts']],
    [
        'Event lists',
        [
            'viewEventLists',
            'insertEventList',
            'editEventList',
            'detailEventList',
            'deleteEventList',
        ],
    ],
    [
        'Custom web forms',
        [
            'viewCustomWebForms',
            'insertCustomWebForm',
            'editCustomWebForm',
            'detailCustomWebForm',
            'deleteCustomWebForm',
        ],
    ],
] as const

export const BUSINESS_PERMISSION_CATEGORIES = [
    [
        'Business access',
        ['viewBusinessCaseBoard', 'businessModuleSettings', 'viewOtherUsersCalendar'],
    ],
    [
        'Business cases',
        [
            'viewBusinessCases',
            'insertBusinessCase',
            'editBusinessCase',
            'detailBusinessCase',
            'editBusinessCaseLock',
            'insertHistoricData',
            'deleteBusinessCase',
            'importBusinessCase',
        ],
    ],
    [
        'Business case states',
        [
            'viewBusinessCaseStates',
            'insertBusinessCaseState',
            'editBusinessCaseState',
            'deleteBusinessCaseState',
        ],
    ],
    [
        'Business case types',
        [
            'viewBusinessCaseTypes',
            'insertBusinessCaseType',
            'editBusinessCaseType',
            'deleteBusinessCaseType',
        ],
    ],
    [
        'Advertising space states',
        [
            'viewAdvertisingSpaceItemStates',
            'insertAdvertisingSpaceItemState',
            'editAdvertisingSpaceItemState',
            'deleteAdvertisingSpaceItemState',
        ],
    ],
    [
        'Price lists',
        [
            'viewPriceLists',
            'insertPriceList',
            'editPriceList',
            'detailPriceList',
            'deletePriceList',
        ],
    ],
    ['Bonuses', ['viewBonuses', 'insertBonus', 'editBonus', 'deleteBonus']],
    [
        'Bonus guidelines',
        [
            'viewBonusGuidelines',
            'insertBonusGuideline',
            'editBonusGuideline',
            'detailBonusGuideline',
            'deleteBonusGuideline',
            'bonusGuidelineApproval',
        ],
    ],
    [
        'Partners',
        [
            'viewPartners',
            'insertPartner',
            'editPartner',
            'detailPartner',
            'deletePartner',
        ],
    ],
    [
        'Contact people',
        [
            'viewPartnerContacts',
            'insertPartnerContact',
            'editPartnerContact',
            'detailPartnerContact',
            'deletePartnerContact',
        ],
    ],
    [
        'Advertising',
        [
            'viewAdvertisingSpaces',
            'insertAdvertisingSpace',
            'editAdvertisingSpace',
            'detailAdvertisingSpace',
            'deleteAdvertisingSpace',
            'visualizationAdvertisingSpace',
            'visualizationEditAdvertisingSpace',
            'viewAdvertisingSpaceBoard',
        ],
    ],
    ['Offers', ['viewOffers', 'insertOffer', 'editOffer', 'detailOffer']],
    [
        'Offer states',
        ['viewOfferStates', 'insertOfferState', 'editOfferState', 'deleteOfferState'],
    ],
    [
        'Documents and folders',
        [
            'insertFolder',
            'viewDocuments',
            'viewFile',
            'insertFile',
            'editFile',
            'detailFile',
            'deleteFile',
        ],
    ],
    ['Contracts', ['viewContracts', 'insertContract', 'editContract', 'detailContract']],
    [
        'Business reports',
        [
            'viewReportSalesFunnel',
            'viewReportSalesDevelopment',
            'viewReportSalesByProduct',
            'viewReportSalesByMerchant',
            'viewReportSuccessByMerchant',
            'viewReportNumberOfCases',
            'viewReportNumberOfActivities',
            'viewReportProfitabilityOfCases',
            'viewReportProfitDevelopment',
            'viewReportFilterBusinessCase',
            'viewReportOccupiedAdvertisingSpaces',
            'viewReportFreeAdvertisingSpaces',
            'viewReportInvoice',
            'viewAquarium',
        ],
    ],
    [
        'Business plan',
        [
            'viewBusinessPlan',
            'insertBusinessPlan',
            'editBusinessPlan',
            'deleteBusinessPlan',
        ],
    ],
    [
        'Contact person types',
        [
            'viewContactPersonTypes',
            'insertContactPersonType',
            'editContactPersonType',
            'deleteContactPersonType',
        ],
    ],
] as const

export const MOBILE_PERMISSION_CATEGORIES = [
    [
        'Alerts and notifications',
        [
            'viewMobileAlert',
            'viewMobileNotification',
            'insertMobileNotification',
            'editMobileNotification',
            'deleteMobileNotification',
        ],
    ],
    [
        'Calendar',
        [
            'viewMobileCalendar',
            'insertMobileCalendar',
            'editMobileCalendar',
            'deleteMobileCalendar',
        ],
    ],
    [
        'Banners',
        [
            'viewMobileBanners',
            'insertMobileBanner',
            'editMobileBanner',
            'deleteMobileBanner',
        ],
    ],
] as const

export const ALL_PERMISSION_IDS = [
    ...BASIC_PERMISSION_CATEGORIES.flatMap((category) =>
        category.permissions.map(([id]) => id),
    ),
    ...FANS_PERMISSION_CATEGORIES.flatMap(([, permissions]) => permissions),
    ...BUSINESS_PERMISSION_CATEGORIES.flatMap(([, permissions]) => permissions),
    ...MOBILE_PERMISSION_CATEGORIES.flatMap(([, permissions]) => permissions),
]

export const PERMISSION_MASKS = [
    { value: 'viewer', label: 'Viewer' },
    { value: 'editor', label: 'Editor' },
    { value: 'administrator', label: 'Administrator' },
] as const
