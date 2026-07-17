import { Segment } from '@/app/(sidebar)/segments/types'

export const segments: Segment[] = [
    {
        "id": "seg_0001",
        "name": "test",
        "tags": [],
        "description": "ddddd",
        "createdBy": "Zaoral Denis",
        "recalculation": "manual",
        "state": "calculated",
        "updatedAt": "2026-07-15T12:33:00.000Z",
        "lastRecalculatedAt": "2026-07-15T12:33:00.000Z"
    },
    {
        "id": "seg_0002",
        "name": "Test 13.7.",
        "tags": [],
        "description": "ztpeeeeee",
        "createdBy": "Novák Jan",
        "recalculation": "automatic",
        "state": "calculated",
        "updatedAt": "2026-07-13T11:56:00.000Z",
        "lastRecalculatedAt": "2026-07-13T11:03:00.000Z"
    },
    {
        "id": "seg_0003",
        "name": "test auto segment",
        "tags": [],
        "description": "Segment zahrnuje zákazníky, kteří provedli nákup v posledních 30 dnech.",
        "createdBy": "Krejčí Adam",
        "recalculation": "manual",
        "state": "calculating",
        "updatedAt": "2026-07-11T11:19:00.000Z",
        "lastRecalculatedAt": "2026-07-11T09:33:00.000Z"
    },
    {
        "id": "seg_0004",
        "name": "test nove kopirovani",
        "tags": [
            {
                "id": "tag-test-zuza",
                "label": "TEST - ZUZA",
                "color": "orange"
            }
        ],
        "description": "VIP zákazníci s roční útratou nad 50 000 Kč.",
        "createdBy": "Zaoral Denis",
        "recalculation": "manual",
        "state": "calculated",
        "updatedAt": "2026-07-09T10:42:00.000Z",
        "lastRecalculatedAt": null
    },
    {
        "id": "seg_0005",
        "name": "ZTP Denisovo",
        "tags": [
            {
                "id": "tag-b2b",
                "label": "B2B",
                "color": "pink"
            }
        ],
        "description": "Onboarding flow pro nové registrace.",
        "createdBy": "Novák Jan",
        "recalculation": "regular",
        "state": "pending",
        "updatedAt": "2026-07-06T10:05:00.000Z",
        "lastRecalculatedAt": "2026-07-06T06:33:00.000Z"
    },
    {
        "id": "seg_0006",
        "name": "seznamovani nika heh",
        "tags": [
            {
                "id": "tag-habarta-testuje",
                "label": "HABARTA TESTUJE",
                "color": "red"
            }
        ],
        "description": "B2B partneři s vlastní obchodní podmínkou.",
        "createdBy": "Krejčí Adam",
        "recalculation": "manual",
        "state": "calculated",
        "updatedAt": "2026-07-09T09:28:00.000Z",
        "lastRecalculatedAt": "2026-07-09T09:03:00.000Z"
    },
    {
        "id": "seg_0007",
        "name": "nika testik",
        "tags": [
            {
                "id": "tag-onboarding",
                "label": "ONBOARDING",
                "color": "green"
            }
        ],
        "description": "Segment pro A/B test nové landing page.",
        "createdBy": "Zaoral Denis",
        "recalculation": "automatic",
        "state": "failed",
        "updatedAt": "2026-07-07T08:51:00.000Z",
        "lastRecalculatedAt": "2026-07-07T07:33:00.000Z"
    },
    {
        "id": "seg_0008",
        "name": "habarta+test",
        "tags": [
            {
                "id": "tag-newsletter",
                "label": "NEWSLETTER",
                "color": "blue"
            }
        ],
        "description": "GDPR compliant segment se souhlasem k marketingu.",
        "createdBy": "Novák Jan",
        "recalculation": "manual",
        "state": "calculated",
        "updatedAt": "2026-07-04T08:14:00.000Z",
        "lastRecalculatedAt": "2026-07-04T06:03:00.000Z"
    },
    {
        "id": "seg_0009",
        "name": "relátko",
        "tags": [
            {
                "id": "tag-loyalty",
                "label": "LOYALTY",
                "color": "purple"
            }
        ],
        "description": "-",
        "createdBy": "Krejčí Adam",
        "recalculation": "manual",
        "state": "calculated",
        "updatedAt": "2026-07-02T07:37:00.000Z",
        "lastRecalculatedAt": "2026-07-02T04:33:00.000Z"
    },
    {
        "id": "seg_0010",
        "name": "ztp",
        "tags": [
            {
                "id": "tag-archiv",
                "label": "ARCHIV",
                "color": "yellow"
            }
        ],
        "description": "test test task",
        "createdBy": "Zaoral Denis",
        "recalculation": "regular",
        "state": "calculating",
        "updatedAt": "2026-06-30T07:00:00.000Z",
        "lastRecalculatedAt": "2026-06-30T03:03:00.000Z"
    },
    {
        "id": "seg_0011",
        "name": "nikca testovani",
        "tags": [
            {
                "id": "tag-test-smazat",
                "label": "TEST - SMAZAT",
                "color": "gray"
            }
        ],
        "description": "test testovaci test test",
        "createdBy": "Novák Jan",
        "recalculation": "manual",
        "state": "calculated",
        "updatedAt": "2026-07-02T06:23:00.000Z",
        "lastRecalculatedAt": "2026-07-02T05:33:00.000Z"
    },
    {
        "id": "seg_0012",
        "name": "Aktivní zákazníci Q3",
        "tags": [
            {
                "id": "tag-b2c",
                "label": "B2C",
                "color": "blue"
            }
        ],
        "description": "Aktivní newsletter odběratelé s vysokou mírou otevírání.",
        "createdBy": "Krejčí Adam",
        "recalculation": "automatic",
        "state": "pending",
        "updatedAt": "2026-06-30T05:46:00.000Z",
        "lastRecalculatedAt": null
    },
    {
        "id": "seg_0013",
        "name": "Neaktivní > 90 dní",
        "tags": [
            {
                "id": "tag-vip",
                "label": "VIP",
                "color": "purple"
            }
        ],
        "description": "Segment pro testování nové kampaně, po testu smazat.",
        "createdBy": "Zaoral Denis",
        "recalculation": "manual",
        "state": "calculated",
        "updatedAt": "2026-06-28T05:09:00.000Z",
        "lastRecalculatedAt": "2026-06-28T02:33:00.000Z"
    },
    {
        "id": "seg_0014",
        "name": "VIP klienti CZ",
        "tags": [
            {
                "id": "tag-reaktivace",
                "label": "REAKTIVACE",
                "color": "orange"
            }
        ],
        "description": "Push notifikace pro mobilní aplikaci.",
        "createdBy": "Novák Jan",
        "recalculation": "manual",
        "state": "failed",
        "updatedAt": "2026-06-26T04:32:00.000Z",
        "lastRecalculatedAt": "2026-06-26T01:03:00.000Z"
    },
    {
        "id": "seg_0015",
        "name": "Nákup nad 5000 Kč",
        "tags": [
            {
                "id": "tag-produkce",
                "label": "PRODUKCE",
                "color": "green"
            }
        ],
        "description": "Loajální zákazníci s dlouhodobou historií nákupů.",
        "createdBy": "Krejčí Adam",
        "recalculation": "regular",
        "state": "calculated",
        "updatedAt": "2026-06-23T03:55:00.000Z",
        "lastRecalculatedAt": "2026-06-23T03:33:00.000Z"
    },
    {
        "id": "seg_0016",
        "name": "Opuštěný košík 7 dní",
        "tags": [
            {
                "id": "tag-test-zuza",
                "label": "TEST - ZUZA",
                "color": "orange"
            }
        ],
        "description": "Ke smazání – historický pokus, již nepoužívané.",
        "createdBy": "Zaoral Denis",
        "recalculation": "manual",
        "state": "calculated",
        "updatedAt": "2026-06-26T03:18:00.000Z",
        "lastRecalculatedAt": "2026-06-26T02:03:00.000Z"
    },
    {
        "id": "seg_0017",
        "name": "Newsletter opt-in",
        "tags": [
            {
                "id": "tag-test-smazat",
                "label": "TEST - SMAZAT",
                "color": "gray"
            },
            {
                "id": "tag-onboarding",
                "label": "ONBOARDING",
                "color": "green"
            }
        ],
        "description": "",
        "createdBy": "Novák Jan",
        "recalculation": "automatic",
        "state": "calculating",
        "updatedAt": "2026-06-24T02:41:00.000Z",
        "lastRecalculatedAt": "2026-06-24T00:33:00.000Z"
    },
    {
        "id": "seg_0018",
        "name": "Praha + okolí",
        "tags": [
            {
                "id": "tag-test-zuza",
                "label": "TEST - ZUZA",
                "color": "orange"
            },
            {
                "id": "tag-reaktivace",
                "label": "REAKTIVACE",
                "color": "orange"
            }
        ],
        "description": "test",
        "createdBy": "Krejčí Adam",
        "recalculation": "manual",
        "state": "calculated",
        "updatedAt": "2026-06-21T02:04:00.000Z",
        "lastRecalculatedAt": "2026-06-20T23:03:00.000Z"
    },
    {
        "id": "seg_0019",
        "name": "Brněnská pobočka",
        "tags": [
            {
                "id": "tag-loyalty",
                "label": "LOYALTY",
                "color": "purple"
            }
        ],
        "description": "test test test",
        "createdBy": "Zaoral Denis",
        "recalculation": "manual",
        "state": "pending",
        "updatedAt": "2026-06-19T01:27:00.000Z",
        "lastRecalculatedAt": "2026-06-18T21:33:00.000Z"
    },
    {
        "id": "seg_0020",
        "name": "Reaktivace 2026",
        "tags": [
            {
                "id": "tag-reaktivace",
                "label": "REAKTIVACE",
                "color": "orange"
            },
            {
                "id": "tag-test-zuza",
                "label": "TEST - ZUZA",
                "color": "orange"
            }
        ],
        "description": "...",
        "createdBy": "Novák Jan",
        "recalculation": "regular",
        "state": "calculated",
        "updatedAt": "2026-06-17T00:50:00.000Z",
        "lastRecalculatedAt": null
    },
    {
        "id": "seg_0021",
        "name": "Onboarding nedokončen",
        "tags": [],
        "description": "Neaktivní účty bez přihlášení více než 3 měsíce.",
        "createdBy": "Krejčí Adam",
        "recalculation": "manual",
        "state": "failed",
        "updatedAt": "2026-06-19T00:13:00.000Z",
        "lastRecalculatedAt": "2026-06-18T22:33:00.000Z"
    },
    {
        "id": "seg_0022",
        "name": "Sleva 20% - klik",
        "tags": [],
        "description": "Reaktivace bývalých zákazníků skrze e-mail.",
        "createdBy": "Zaoral Denis",
        "recalculation": "automatic",
        "state": "calculated",
        "updatedAt": "2026-06-16T23:36:00.000Z",
        "lastRecalculatedAt": "2026-06-16T21:03:00.000Z"
    },
    {
        "id": "seg_0023",
        "name": "Push notifikace on",
        "tags": [],
        "description": "Zákazníci s opuštěným košíkem – automatický přepočet.",
        "createdBy": "Novák Jan",
        "recalculation": "manual",
        "state": "calculated",
        "updatedAt": "2026-06-14T22:59:00.000Z",
        "lastRecalculatedAt": "2026-06-14T19:33:00.000Z"
    },
    {
        "id": "seg_0024",
        "name": "SMS opt-out",
        "tags": [
            {
                "id": "tag-b2c",
                "label": "B2C",
                "color": "blue"
            }
        ],
        "description": "Cross-sell doplňkových produktů k hlavní kategorii.",
        "createdBy": "Krejčí Adam",
        "recalculation": "manual",
        "state": "calculating",
        "updatedAt": "2026-06-12T22:22:00.000Z",
        "lastRecalculatedAt": "2026-06-12T22:03:00.000Z"
    },
    {
        "id": "seg_0025",
        "name": "Test segmentu A/B",
        "tags": [
            {
                "id": "tag-vip",
                "label": "VIP",
                "color": "purple"
            }
        ],
        "description": "Import ze starého systému, čeká na revizi.",
        "createdBy": "Zaoral Denis",
        "recalculation": "regular",
        "state": "calculated",
        "updatedAt": "2026-06-09T21:45:00.000Z",
        "lastRecalculatedAt": "2026-06-09T20:33:00.000Z"
    },
    {
        "id": "seg_0026",
        "name": "Velkoobchod plátci",
        "tags": [
            {
                "id": "tag-reaktivace",
                "label": "REAKTIVACE",
                "color": "orange"
            }
        ],
        "description": "test",
        "createdBy": "Novák Jan",
        "recalculation": "manual",
        "state": "pending",
        "updatedAt": "2026-06-12T21:08:00.000Z",
        "lastRecalculatedAt": "2026-06-12T19:03:00.000Z"
    },
    {
        "id": "seg_0027",
        "name": "Retail zákazníci",
        "tags": [
            {
                "id": "tag-produkce",
                "label": "PRODUKCE",
                "color": "green"
            }
        ],
        "description": "ddddd",
        "createdBy": "Krejčí Adam",
        "recalculation": "automatic",
        "state": "calculated",
        "updatedAt": "2026-06-10T20:31:00.000Z",
        "lastRecalculatedAt": "2026-06-10T17:33:00.000Z"
    },
    {
        "id": "seg_0028",
        "name": "Loajální > 3 roky",
        "tags": [
            {
                "id": "tag-test-zuza",
                "label": "TEST - ZUZA",
                "color": "orange"
            }
        ],
        "description": "ztpeeeeee",
        "createdBy": "Zaoral Denis",
        "recalculation": "manual",
        "state": "failed",
        "updatedAt": "2026-06-07T19:54:00.000Z",
        "lastRecalculatedAt": null
    },
    {
        "id": "seg_0029",
        "name": "První nákup 30 dní",
        "tags": [
            {
                "id": "tag-b2b",
                "label": "B2B",
                "color": "pink"
            }
        ],
        "description": "Segment zahrnuje zákazníky, kteří provedli nákup v posledních 30 dnech.",
        "createdBy": "Novák Jan",
        "recalculation": "manual",
        "state": "calculated",
        "updatedAt": "2026-06-05T19:17:00.000Z",
        "lastRecalculatedAt": "2026-06-05T18:33:00.000Z"
    },
    {
        "id": "seg_0030",
        "name": "Kampaň Vánoce 2025",
        "tags": [
            {
                "id": "tag-habarta-testuje",
                "label": "HABARTA TESTUJE",
                "color": "red"
            }
        ],
        "description": "VIP zákazníci s roční útratou nad 50 000 Kč.",
        "createdBy": "Krejčí Adam",
        "recalculation": "regular",
        "state": "calculated",
        "updatedAt": "2026-06-03T18:40:00.000Z",
        "lastRecalculatedAt": "2026-06-03T17:03:00.000Z"
    },
    {
        "id": "seg_0031",
        "name": "Black Friday cílovka",
        "tags": [
            {
                "id": "tag-onboarding",
                "label": "ONBOARDING",
                "color": "green"
            }
        ],
        "description": "Onboarding flow pro nové registrace.",
        "createdBy": "Zaoral Denis",
        "recalculation": "manual",
        "state": "calculating",
        "updatedAt": "2026-06-05T18:03:00.000Z",
        "lastRecalculatedAt": "2026-06-05T15:33:00.000Z"
    },
    {
        "id": "seg_0032",
        "name": "Nákup mobilní aplikace",
        "tags": [
            {
                "id": "tag-newsletter",
                "label": "NEWSLETTER",
                "color": "blue"
            }
        ],
        "description": "B2B partneři s vlastní obchodní podmínkou.",
        "createdBy": "Novák Jan",
        "recalculation": "automatic",
        "state": "calculated",
        "updatedAt": "2026-06-03T17:26:00.000Z",
        "lastRecalculatedAt": "2026-06-03T14:03:00.000Z"
    },
    {
        "id": "seg_0033",
        "name": "Web pouze prohlížeči",
        "tags": [
            {
                "id": "tag-loyalty",
                "label": "LOYALTY",
                "color": "purple"
            }
        ],
        "description": "Segment pro A/B test nové landing page.",
        "createdBy": "Krejčí Adam",
        "recalculation": "manual",
        "state": "pending",
        "updatedAt": "2026-06-01T16:49:00.000Z",
        "lastRecalculatedAt": "2026-06-01T16:33:00.000Z"
    },
    {
        "id": "seg_0034",
        "name": "Slevové kupóny použité",
        "tags": [
            {
                "id": "tag-archiv",
                "label": "ARCHIV",
                "color": "yellow"
            }
        ],
        "description": "GDPR compliant segment se souhlasem k marketingu.",
        "createdBy": "Zaoral Denis",
        "recalculation": "manual",
        "state": "calculated",
        "updatedAt": "2026-05-30T16:12:00.000Z",
        "lastRecalculatedAt": "2026-05-30T15:03:00.000Z"
    },
    {
        "id": "seg_0035",
        "name": "Refundace řešeny",
        "tags": [
            {
                "id": "tag-test-smazat",
                "label": "TEST - SMAZAT",
                "color": "gray"
            }
        ],
        "description": "-",
        "createdBy": "Novák Jan",
        "recalculation": "regular",
        "state": "failed",
        "updatedAt": "2026-05-27T15:35:00.000Z",
        "lastRecalculatedAt": "2026-05-27T13:33:00.000Z"
    },
    {
        "id": "seg_0036",
        "name": "Cross-sell doplňky",
        "tags": [
            {
                "id": "tag-b2c",
                "label": "B2C",
                "color": "blue"
            }
        ],
        "description": "test test task",
        "createdBy": "Krejčí Adam",
        "recalculation": "manual",
        "state": "calculated",
        "updatedAt": "2026-05-30T14:58:00.000Z",
        "lastRecalculatedAt": null
    },
    {
        "id": "seg_0037",
        "name": "Upsell prémium",
        "tags": [
            {
                "id": "tag-produkce",
                "label": "PRODUKCE",
                "color": "green"
            }
        ],
        "description": "test testovaci test test",
        "createdBy": "Zaoral Denis",
        "recalculation": "automatic",
        "state": "calculated",
        "updatedAt": "2026-05-28T14:21:00.000Z",
        "lastRecalculatedAt": "2026-05-28T10:33:00.000Z"
    },
    {
        "id": "seg_0038",
        "name": "Testovací data QA",
        "tags": [
            {
                "id": "tag-newsletter",
                "label": "NEWSLETTER",
                "color": "blue"
            },
            {
                "id": "tag-archiv",
                "label": "ARCHIV",
                "color": "yellow"
            }
        ],
        "description": "Aktivní newsletter odběratelé s vysokou mírou otevírání.",
        "createdBy": "Novák Jan",
        "recalculation": "manual",
        "state": "calculating",
        "updatedAt": "2026-05-25T13:44:00.000Z",
        "lastRecalculatedAt": "2026-05-25T13:03:00.000Z"
    },
    {
        "id": "seg_0039",
        "name": "Interní tým",
        "tags": [
            {
                "id": "tag-vip",
                "label": "VIP",
                "color": "purple"
            },
            {
                "id": "tag-b2b",
                "label": "B2B",
                "color": "pink"
            }
        ],
        "description": "Segment pro testování nové kampaně, po testu smazat.",
        "createdBy": "Krejčí Adam",
        "recalculation": "manual",
        "state": "calculated",
        "updatedAt": "2026-05-23T13:07:00.000Z",
        "lastRecalculatedAt": "2026-05-23T11:33:00.000Z"
    },
    {
        "id": "seg_0040",
        "name": "Beta program",
        "tags": [
            {
                "id": "tag-habarta-testuje",
                "label": "HABARTA TESTUJE",
                "color": "red"
            },
            {
                "id": "tag-b2c",
                "label": "B2C",
                "color": "blue"
            }
        ],
        "description": "Push notifikace pro mobilní aplikaci.",
        "createdBy": "Zaoral Denis",
        "recalculation": "regular",
        "state": "pending",
        "updatedAt": "2026-05-22T12:30:00.000Z",
        "lastRecalculatedAt": "2026-05-22T10:03:00.000Z"
    },
    {
        "id": "seg_0041",
        "name": "Zákazník + partner",
        "tags": [],
        "description": "Loajální zákazníci s dlouhodobou historií nákupů.",
        "createdBy": "Novák Jan",
        "recalculation": "manual",
        "state": "calculated",
        "updatedAt": "2026-05-24T11:53:00.000Z",
        "lastRecalculatedAt": "2026-05-24T08:33:00.000Z"
    },
    {
        "id": "seg_0042",
        "name": "Segment bez štítků",
        "tags": [],
        "description": "Ke smazání – historický pokus, již nepoužívané.",
        "createdBy": "Krejčí Adam",
        "recalculation": "automatic",
        "state": "failed",
        "updatedAt": "2026-05-22T11:16:00.000Z",
        "lastRecalculatedAt": "2026-05-22T11:03:00.000Z"
    },
    {
        "id": "seg_0043",
        "name": "Pravidelný přepočet denní",
        "tags": [],
        "description": "",
        "createdBy": "Zaoral Denis",
        "recalculation": "manual",
        "state": "calculated",
        "updatedAt": "2026-05-20T10:39:00.000Z",
        "lastRecalculatedAt": "2026-05-20T09:33:00.000Z"
    },
    {
        "id": "seg_0044",
        "name": "Automatická aktualizace",
        "tags": [
            {
                "id": "tag-newsletter",
                "label": "NEWSLETTER",
                "color": "blue"
            }
        ],
        "description": "test",
        "createdBy": "Novák Jan",
        "recalculation": "manual",
        "state": "calculated",
        "updatedAt": "2026-05-18T10:02:00.000Z",
        "lastRecalculatedAt": null
    },
    {
        "id": "seg_0045",
        "name": "Manuální kontrola",
        "tags": [
            {
                "id": "tag-loyalty",
                "label": "LOYALTY",
                "color": "purple"
            }
        ],
        "description": "test test test",
        "createdBy": "Krejčí Adam",
        "recalculation": "regular",
        "state": "calculating",
        "updatedAt": "2026-05-15T09:25:00.000Z",
        "lastRecalculatedAt": "2026-05-15T06:33:00.000Z"
    },
    {
        "id": "seg_0046",
        "name": "ZTP karta držitelé",
        "tags": [
            {
                "id": "tag-archiv",
                "label": "ARCHIV",
                "color": "yellow"
            }
        ],
        "description": "...",
        "createdBy": "Zaoral Denis",
        "recalculation": "manual",
        "state": "calculated",
        "updatedAt": "2026-05-18T08:48:00.000Z",
        "lastRecalculatedAt": "2026-05-18T05:03:00.000Z"
    },
    {
        "id": "seg_0047",
        "name": "Studenti do 26",
        "tags": [
            {
                "id": "tag-test-smazat",
                "label": "TEST - SMAZAT",
                "color": "gray"
            }
        ],
        "description": "Neaktivní účty bez přihlášení více než 3 měsíce.",
        "createdBy": "Novák Jan",
        "recalculation": "automatic",
        "state": "pending",
        "updatedAt": "2026-05-16T08:11:00.000Z",
        "lastRecalculatedAt": "2026-05-16T07:33:00.000Z"
    },
    {
        "id": "seg_0048",
        "name": "Senioři nad 65",
        "tags": [
            {
                "id": "tag-b2c",
                "label": "B2C",
                "color": "blue"
            }
        ],
        "description": "Reaktivace bývalých zákazníků skrze e-mail.",
        "createdBy": "Krejčí Adam",
        "recalculation": "manual",
        "state": "calculated",
        "updatedAt": "2026-05-13T07:34:00.000Z",
        "lastRecalculatedAt": "2026-05-13T06:03:00.000Z"
    },
    {
        "id": "seg_0049",
        "name": "Rodiče malých dětí",
        "tags": [
            {
                "id": "tag-vip",
                "label": "VIP",
                "color": "purple"
            }
        ],
        "description": "Zákazníci s opuštěným košíkem – automatický přepočet.",
        "createdBy": "Zaoral Denis",
        "recalculation": "manual",
        "state": "failed",
        "updatedAt": "2026-05-11T06:57:00.000Z",
        "lastRecalculatedAt": "2026-05-11T04:33:00.000Z"
    },
    {
        "id": "seg_0050",
        "name": "Firemní klienti IT",
        "tags": [
            {
                "id": "tag-reaktivace",
                "label": "REAKTIVACE",
                "color": "orange"
            }
        ],
        "description": "Cross-sell doplňkových produktů k hlavní kategorii.",
        "createdBy": "Novák Jan",
        "recalculation": "regular",
        "state": "calculated",
        "updatedAt": "2026-05-09T06:20:00.000Z",
        "lastRecalculatedAt": "2026-05-09T03:03:00.000Z"
    },
    {
        "id": "seg_0051",
        "name": "Startupy do 50 zaměstnanců",
        "tags": [
            {
                "id": "tag-produkce",
                "label": "PRODUKCE",
                "color": "green"
            }
        ],
        "description": "Import ze starého systému, čeká na revizi.",
        "createdBy": "Krejčí Adam",
        "recalculation": "manual",
        "state": "calculated",
        "updatedAt": "2026-05-11T05:43:00.000Z",
        "lastRecalculatedAt": "2026-05-11T05:33:00.000Z"
    },
    {
        "id": "seg_0052",
        "name": "Enterprise segment",
        "tags": [
            {
                "id": "tag-test-zuza",
                "label": "TEST - ZUZA",
                "color": "orange"
            }
        ],
        "description": "test",
        "createdBy": "Zaoral Denis",
        "recalculation": "automatic",
        "state": "calculating",
        "updatedAt": "2026-05-09T05:06:00.000Z",
        "lastRecalculatedAt": null
    },
    {
        "id": "seg_0053",
        "name": "GDPR souhlas ano",
        "tags": [
            {
                "id": "tag-b2b",
                "label": "B2B",
                "color": "pink"
            }
        ],
        "description": "ddddd",
        "createdBy": "Novák Jan",
        "recalculation": "manual",
        "state": "calculated",
        "updatedAt": "2026-05-07T04:29:00.000Z",
        "lastRecalculatedAt": "2026-05-07T02:33:00.000Z"
    },
    {
        "id": "seg_0054",
        "name": "Marketing opt-in only",
        "tags": [
            {
                "id": "tag-habarta-testuje",
                "label": "HABARTA TESTUJE",
                "color": "red"
            }
        ],
        "description": "ztpeeeeee",
        "createdBy": "Krejčí Adam",
        "recalculation": "manual",
        "state": "pending",
        "updatedAt": "2026-05-05T03:52:00.000Z",
        "lastRecalculatedAt": "2026-05-05T01:03:00.000Z"
    },
    {
        "id": "seg_0055",
        "name": "Push + SMS + email",
        "tags": [
            {
                "id": "tag-onboarding",
                "label": "ONBOARDING",
                "color": "green"
            }
        ],
        "description": "Segment zahrnuje zákazníky, kteří provedli nákup v posledních 30 dnech.",
        "createdBy": "Zaoral Denis",
        "recalculation": "regular",
        "state": "calculated",
        "updatedAt": "2026-05-02T03:15:00.000Z",
        "lastRecalculatedAt": "2026-05-01T23:33:00.000Z"
    },
    {
        "id": "seg_0056",
        "name": "Vysoká hodnota LTV",
        "tags": [
            {
                "id": "tag-newsletter",
                "label": "NEWSLETTER",
                "color": "blue"
            }
        ],
        "description": "VIP zákazníci s roční útratou nad 50 000 Kč.",
        "createdBy": "Novák Jan",
        "recalculation": "manual",
        "state": "failed",
        "updatedAt": "2026-05-05T02:38:00.000Z",
        "lastRecalculatedAt": "2026-05-05T02:03:00.000Z"
    },
    {
        "id": "seg_0057",
        "name": "Riziko odchodu",
        "tags": [
            {
                "id": "tag-onboarding",
                "label": "ONBOARDING",
                "color": "green"
            },
            {
                "id": "tag-test-smazat",
                "label": "TEST - SMAZAT",
                "color": "gray"
            }
        ],
        "description": "Onboarding flow pro nové registrace.",
        "createdBy": "Krejčí Adam",
        "recalculation": "automatic",
        "state": "calculated",
        "updatedAt": "2026-05-03T02:01:00.000Z",
        "lastRecalculatedAt": "2026-05-03T00:33:00.000Z"
    },
    {
        "id": "seg_0058",
        "name": "Nákupní frekvence 2×",
        "tags": [
            {
                "id": "tag-b2c",
                "label": "B2C",
                "color": "blue"
            },
            {
                "id": "tag-habarta-testuje",
                "label": "HABARTA TESTUJE",
                "color": "red"
            }
        ],
        "description": "B2B partneři s vlastní obchodní podmínkou.",
        "createdBy": "Zaoral Denis",
        "recalculation": "manual",
        "state": "calculated",
        "updatedAt": "2026-04-30T01:24:00.000Z",
        "lastRecalculatedAt": "2026-04-29T23:03:00.000Z"
    },
    {
        "id": "seg_0059",
        "name": "Zákazník bez objednávky 6M",
        "tags": [
            {
                "id": "tag-b2b",
                "label": "B2B",
                "color": "pink"
            },
            {
                "id": "tag-vip",
                "label": "VIP",
                "color": "purple"
            }
        ],
        "description": "Segment pro A/B test nové landing page.",
        "createdBy": "Novák Jan",
        "recalculation": "manual",
        "state": "calculating",
        "updatedAt": "2026-04-28T00:47:00.000Z",
        "lastRecalculatedAt": "2026-04-27T21:33:00.000Z"
    },
    {
        "id": "seg_0060",
        "name": "Nová registrace týden",
        "tags": [
            {
                "id": "tag-archiv",
                "label": "ARCHIV",
                "color": "yellow"
            },
            {
                "id": "tag-newsletter",
                "label": "NEWSLETTER",
                "color": "blue"
            }
        ],
        "description": "GDPR compliant segment se souhlasem k marketingu.",
        "createdBy": "Krejčí Adam",
        "recalculation": "regular",
        "state": "calculated",
        "updatedAt": "2026-04-26T00:10:00.000Z",
        "lastRecalculatedAt": null
    },
    {
        "id": "seg_0061",
        "name": "Zapomenutý košík EU",
        "tags": [],
        "description": "-",
        "createdBy": "Zaoral Denis",
        "recalculation": "manual",
        "state": "pending",
        "updatedAt": "2026-04-27T23:33:00.000Z",
        "lastRecalculatedAt": "2026-04-27T22:33:00.000Z"
    },
    {
        "id": "seg_0062",
        "name": "Doprava zdarma využili",
        "tags": [],
        "description": "test test task",
        "createdBy": "Novák Jan",
        "recalculation": "automatic",
        "state": "calculated",
        "updatedAt": "2026-04-25T22:56:00.000Z",
        "lastRecalculatedAt": "2026-04-25T21:03:00.000Z"
    },
    {
        "id": "seg_0063",
        "name": "Recenze 5 hvězd",
        "tags": [],
        "description": "test testovaci test test",
        "createdBy": "Krejčí Adam",
        "recalculation": "manual",
        "state": "failed",
        "updatedAt": "2026-04-23T22:19:00.000Z",
        "lastRecalculatedAt": "2026-04-23T19:33:00.000Z"
    },
    {
        "id": "seg_0064",
        "name": "Reklamace vyřízené",
        "tags": [
            {
                "id": "tag-test-zuza",
                "label": "TEST - ZUZA",
                "color": "orange"
            }
        ],
        "description": "Aktivní newsletter odběratelé s vysokou mírou otevírání.",
        "createdBy": "Zaoral Denis",
        "recalculation": "manual",
        "state": "calculated",
        "updatedAt": "2026-04-21T21:42:00.000Z",
        "lastRecalculatedAt": "2026-04-21T18:03:00.000Z"
    },
    {
        "id": "seg_0065",
        "name": "Doporučení přítelem",
        "tags": [
            {
                "id": "tag-b2b",
                "label": "B2B",
                "color": "pink"
            }
        ],
        "description": "Segment pro testování nové kampaně, po testu smazat.",
        "createdBy": "Novák Jan",
        "recalculation": "regular",
        "state": "calculated",
        "updatedAt": "2026-04-18T21:05:00.000Z",
        "lastRecalculatedAt": "2026-04-18T20:33:00.000Z"
    },
    {
        "id": "seg_0066",
        "name": "Affiliate partner",
        "tags": [
            {
                "id": "tag-habarta-testuje",
                "label": "HABARTA TESTUJE",
                "color": "red"
            }
        ],
        "description": "Push notifikace pro mobilní aplikaci.",
        "createdBy": "Krejčí Adam",
        "recalculation": "manual",
        "state": "calculating",
        "updatedAt": "2026-04-21T20:28:00.000Z",
        "lastRecalculatedAt": "2026-04-21T19:03:00.000Z"
    },
    {
        "id": "seg_0067",
        "name": "Loyalty úroveň gold",
        "tags": [
            {
                "id": "tag-onboarding",
                "label": "ONBOARDING",
                "color": "green"
            }
        ],
        "description": "Loajální zákazníci s dlouhodobou historií nákupů.",
        "createdBy": "Zaoral Denis",
        "recalculation": "automatic",
        "state": "calculated",
        "updatedAt": "2026-04-19T19:51:00.000Z",
        "lastRecalculatedAt": "2026-04-19T17:33:00.000Z"
    },
    {
        "id": "seg_0068",
        "name": "Loyalty úroveň silver",
        "tags": [
            {
                "id": "tag-newsletter",
                "label": "NEWSLETTER",
                "color": "blue"
            }
        ],
        "description": "Ke smazání – historický pokus, již nepoužívané.",
        "createdBy": "Novák Jan",
        "recalculation": "manual",
        "state": "pending",
        "updatedAt": "2026-04-16T19:14:00.000Z",
        "lastRecalculatedAt": null
    },
    {
        "id": "seg_0069",
        "name": "Loyalty úroveň bronze",
        "tags": [
            {
                "id": "tag-loyalty",
                "label": "LOYALTY",
                "color": "purple"
            }
        ],
        "description": "",
        "createdBy": "Krejčí Adam",
        "recalculation": "manual",
        "state": "calculated",
        "updatedAt": "2026-04-14T18:37:00.000Z",
        "lastRecalculatedAt": "2026-04-14T18:33:00.000Z"
    },
    {
        "id": "seg_0070",
        "name": "Preference kategorie A",
        "tags": [
            {
                "id": "tag-archiv",
                "label": "ARCHIV",
                "color": "yellow"
            }
        ],
        "description": "test",
        "createdBy": "Zaoral Denis",
        "recalculation": "regular",
        "state": "failed",
        "updatedAt": "2026-04-12T18:00:00.000Z",
        "lastRecalculatedAt": "2026-04-12T17:03:00.000Z"
    },
    {
        "id": "seg_0071",
        "name": "Preference kategorie B",
        "tags": [
            {
                "id": "tag-test-smazat",
                "label": "TEST - SMAZAT",
                "color": "gray"
            }
        ],
        "description": "test test test",
        "createdBy": "Novák Jan",
        "recalculation": "manual",
        "state": "calculated",
        "updatedAt": "2026-04-14T17:23:00.000Z",
        "lastRecalculatedAt": "2026-04-14T15:33:00.000Z"
    },
    {
        "id": "seg_0072",
        "name": "Preference kategorie C",
        "tags": [
            {
                "id": "tag-b2c",
                "label": "B2C",
                "color": "blue"
            }
        ],
        "description": "...",
        "createdBy": "Krejčí Adam",
        "recalculation": "automatic",
        "state": "calculated",
        "updatedAt": "2026-04-12T16:46:00.000Z",
        "lastRecalculatedAt": "2026-04-12T14:03:00.000Z"
    },
    {
        "id": "seg_0073",
        "name": "Sezonní zákazníci léto",
        "tags": [
            {
                "id": "tag-vip",
                "label": "VIP",
                "color": "purple"
            }
        ],
        "description": "Neaktivní účty bez přihlášení více než 3 měsíce.",
        "createdBy": "Zaoral Denis",
        "recalculation": "manual",
        "state": "calculating",
        "updatedAt": "2026-04-10T16:09:00.000Z",
        "lastRecalculatedAt": "2026-04-10T12:33:00.000Z"
    },
    {
        "id": "seg_0074",
        "name": "Sezonní zákazníci zima",
        "tags": [
            {
                "id": "tag-reaktivace",
                "label": "REAKTIVACE",
                "color": "orange"
            }
        ],
        "description": "Reaktivace bývalých zákazníků skrze e-mail.",
        "createdBy": "Novák Jan",
        "recalculation": "manual",
        "state": "calculated",
        "updatedAt": "2026-04-08T15:32:00.000Z",
        "lastRecalculatedAt": "2026-04-08T15:03:00.000Z"
    },
    {
        "id": "seg_0075",
        "name": "Segment kontrolní",
        "tags": [
            {
                "id": "tag-produkce",
                "label": "PRODUKCE",
                "color": "green"
            }
        ],
        "description": "Zákazníci s opuštěným košíkem – automatický přepočet.",
        "createdBy": "Krejčí Adam",
        "recalculation": "regular",
        "state": "pending",
        "updatedAt": "2026-04-05T14:55:00.000Z",
        "lastRecalculatedAt": "2026-04-05T13:33:00.000Z"
    },
    {
        "id": "seg_0076",
        "name": "Testovací prázdný",
        "tags": [
            {
                "id": "tag-test-zuza",
                "label": "TEST - ZUZA",
                "color": "orange"
            }
        ],
        "description": "Cross-sell doplňkových produktů k hlavní kategorii.",
        "createdBy": "Zaoral Denis",
        "recalculation": "manual",
        "state": "calculated",
        "updatedAt": "2026-04-08T14:18:00.000Z",
        "lastRecalculatedAt": null
    },
    {
        "id": "seg_0077",
        "name": "Import z CSV 2026",
        "tags": [
            {
                "id": "tag-test-smazat",
                "label": "TEST - SMAZAT",
                "color": "gray"
            },
            {
                "id": "tag-onboarding",
                "label": "ONBOARDING",
                "color": "green"
            }
        ],
        "description": "Import ze starého systému, čeká na revizi.",
        "createdBy": "Novák Jan",
        "recalculation": "automatic",
        "state": "failed",
        "updatedAt": "2026-04-06T13:41:00.000Z",
        "lastRecalculatedAt": "2026-04-06T10:33:00.000Z"
    },
    {
        "id": "seg_0078",
        "name": "Migrace ze starého CRM",
        "tags": [
            {
                "id": "tag-test-zuza",
                "label": "TEST - ZUZA",
                "color": "orange"
            },
            {
                "id": "tag-reaktivace",
                "label": "REAKTIVACE",
                "color": "orange"
            }
        ],
        "description": "test",
        "createdBy": "Krejčí Adam",
        "recalculation": "manual",
        "state": "calculated",
        "updatedAt": "2026-04-03T13:04:00.000Z",
        "lastRecalculatedAt": "2026-04-03T13:03:00.000Z"
    },
    {
        "id": "seg_0079",
        "name": "Duplikáty ke sloučení",
        "tags": [
            {
                "id": "tag-loyalty",
                "label": "LOYALTY",
                "color": "purple"
            }
        ],
        "description": "ddddd",
        "createdBy": "Zaoral Denis",
        "recalculation": "manual",
        "state": "calculated",
        "updatedAt": "2026-04-02T12:27:00.000Z",
        "lastRecalculatedAt": "2026-04-02T11:33:00.000Z"
    },
    {
        "id": "seg_0080",
        "name": "Špatné e-maily bounce",
        "tags": [
            {
                "id": "tag-reaktivace",
                "label": "REAKTIVACE",
                "color": "orange"
            },
            {
                "id": "tag-test-zuza",
                "label": "TEST - ZUZA",
                "color": "orange"
            }
        ],
        "description": "ztpeeeeee",
        "createdBy": "Novák Jan",
        "recalculation": "regular",
        "state": "calculating",
        "updatedAt": "2026-03-31T11:50:00.000Z",
        "lastRecalculatedAt": "2026-03-31T10:03:00.000Z"
    },
    {
        "id": "seg_0081",
        "name": "Neplatné telefony",
        "tags": [],
        "description": "Segment zahrnuje zákazníky, kteří provedli nákup v posledních 30 dnech.",
        "createdBy": "Krejčí Adam",
        "recalculation": "manual",
        "state": "calculated",
        "updatedAt": "2026-04-02T11:13:00.000Z",
        "lastRecalculatedAt": "2026-04-02T08:33:00.000Z"
    },
    {
        "id": "seg_0082",
        "name": "Regionální akce Ostrava",
        "tags": [],
        "description": "VIP zákazníci s roční útratou nad 50 000 Kč.",
        "createdBy": "Zaoral Denis",
        "recalculation": "automatic",
        "state": "pending",
        "updatedAt": "2026-03-31T10:36:00.000Z",
        "lastRecalculatedAt": "2026-03-31T07:03:00.000Z"
    },
    {
        "id": "seg_0083",
        "name": "Regionální akce Plzeň",
        "tags": [],
        "description": "Onboarding flow pro nové registrace.",
        "createdBy": "Novák Jan",
        "recalculation": "manual",
        "state": "calculated",
        "updatedAt": "2026-03-29T09:59:00.000Z",
        "lastRecalculatedAt": "2026-03-29T09:33:00.000Z"
    },
    {
        "id": "seg_0084",
        "name": "Zaměstnanci firmy",
        "tags": [
            {
                "id": "tag-b2c",
                "label": "B2C",
                "color": "blue"
            }
        ],
        "description": "B2B partneři s vlastní obchodní podmínkou.",
        "createdBy": "Krejčí Adam",
        "recalculation": "manual",
        "state": "failed",
        "updatedAt": "2026-03-27T09:22:00.000Z",
        "lastRecalculatedAt": null
    },
    {
        "id": "seg_0085",
        "name": "Rodinní příslušníci",
        "tags": [
            {
                "id": "tag-vip",
                "label": "VIP",
                "color": "purple"
            }
        ],
        "description": "Segment pro A/B test nové landing page.",
        "createdBy": "Zaoral Denis",
        "recalculation": "regular",
        "state": "calculated",
        "updatedAt": "2026-03-24T08:45:00.000Z",
        "lastRecalculatedAt": "2026-03-24T06:33:00.000Z"
    },
    {
        "id": "seg_0086",
        "name": "Tester UX skupina",
        "tags": [
            {
                "id": "tag-reaktivace",
                "label": "REAKTIVACE",
                "color": "orange"
            }
        ],
        "description": "GDPR compliant segment se souhlasem k marketingu.",
        "createdBy": "Novák Jan",
        "recalculation": "manual",
        "state": "calculated",
        "updatedAt": "2026-03-27T08:08:00.000Z",
        "lastRecalculatedAt": "2026-03-27T05:03:00.000Z"
    },
    {
        "id": "seg_0087",
        "name": "Focus group Q4",
        "tags": [
            {
                "id": "tag-produkce",
                "label": "PRODUKCE",
                "color": "green"
            }
        ],
        "description": "-",
        "createdBy": "Krejčí Adam",
        "recalculation": "automatic",
        "state": "calculating",
        "updatedAt": "2026-03-25T07:31:00.000Z",
        "lastRecalculatedAt": "2026-03-25T03:33:00.000Z"
    },
    {
        "id": "seg_0088",
        "name": "test",
        "tags": [
            {
                "id": "tag-test-zuza",
                "label": "TEST - ZUZA",
                "color": "orange"
            }
        ],
        "description": "test test task",
        "createdBy": "Zaoral Denis",
        "recalculation": "manual",
        "state": "calculated",
        "updatedAt": "2026-03-22T06:54:00.000Z",
        "lastRecalculatedAt": "2026-03-22T06:03:00.000Z"
    },
    {
        "id": "seg_0089",
        "name": "Test 13.7.",
        "tags": [
            {
                "id": "tag-b2b",
                "label": "B2B",
                "color": "pink"
            }
        ],
        "description": "test testovaci test test",
        "createdBy": "Novák Jan",
        "recalculation": "manual",
        "state": "pending",
        "updatedAt": "2026-03-20T06:17:00.000Z",
        "lastRecalculatedAt": "2026-03-20T04:33:00.000Z"
    },
    {
        "id": "seg_0090",
        "name": "test auto segment",
        "tags": [
            {
                "id": "tag-habarta-testuje",
                "label": "HABARTA TESTUJE",
                "color": "red"
            }
        ],
        "description": "Aktivní newsletter odběratelé s vysokou mírou otevírání.",
        "createdBy": "Krejčí Adam",
        "recalculation": "regular",
        "state": "calculated",
        "updatedAt": "2026-03-18T05:40:00.000Z",
        "lastRecalculatedAt": "2026-03-18T03:03:00.000Z"
    },
    {
        "id": "seg_0091",
        "name": "test nove kopirovani",
        "tags": [
            {
                "id": "tag-onboarding",
                "label": "ONBOARDING",
                "color": "green"
            }
        ],
        "description": "Segment pro testování nové kampaně, po testu smazat.",
        "createdBy": "Zaoral Denis",
        "recalculation": "manual",
        "state": "failed",
        "updatedAt": "2026-03-20T05:03:00.000Z",
        "lastRecalculatedAt": "2026-03-20T01:33:00.000Z"
    },
    {
        "id": "seg_0092",
        "name": "ZTP Denisovo",
        "tags": [
            {
                "id": "tag-newsletter",
                "label": "NEWSLETTER",
                "color": "blue"
            }
        ],
        "description": "Push notifikace pro mobilní aplikaci.",
        "createdBy": "Novák Jan",
        "recalculation": "automatic",
        "state": "calculated",
        "updatedAt": "2026-03-18T04:26:00.000Z",
        "lastRecalculatedAt": null
    },
    {
        "id": "seg_0093",
        "name": "seznamovani nika heh",
        "tags": [
            {
                "id": "tag-loyalty",
                "label": "LOYALTY",
                "color": "purple"
            }
        ],
        "description": "Loajální zákazníci s dlouhodobou historií nákupů.",
        "createdBy": "Krejčí Adam",
        "recalculation": "manual",
        "state": "calculated",
        "updatedAt": "2026-03-16T03:49:00.000Z",
        "lastRecalculatedAt": "2026-03-16T02:33:00.000Z"
    },
    {
        "id": "seg_0094",
        "name": "nika testik",
        "tags": [
            {
                "id": "tag-archiv",
                "label": "ARCHIV",
                "color": "yellow"
            }
        ],
        "description": "Ke smazání – historický pokus, již nepoužívané.",
        "createdBy": "Zaoral Denis",
        "recalculation": "manual",
        "state": "calculating",
        "updatedAt": "2026-03-14T03:12:00.000Z",
        "lastRecalculatedAt": "2026-03-14T01:03:00.000Z"
    },
    {
        "id": "seg_0095",
        "name": "habarta+test",
        "tags": [
            {
                "id": "tag-test-smazat",
                "label": "TEST - SMAZAT",
                "color": "gray"
            }
        ],
        "description": "",
        "createdBy": "Novák Jan",
        "recalculation": "regular",
        "state": "calculated",
        "updatedAt": "2026-03-11T02:35:00.000Z",
        "lastRecalculatedAt": "2026-03-10T23:33:00.000Z"
    },
    {
        "id": "seg_0096",
        "name": "relátko",
        "tags": [
            {
                "id": "tag-b2c",
                "label": "B2C",
                "color": "blue"
            }
        ],
        "description": "test",
        "createdBy": "Krejčí Adam",
        "recalculation": "manual",
        "state": "pending",
        "updatedAt": "2026-03-14T01:58:00.000Z",
        "lastRecalculatedAt": "2026-03-13T22:03:00.000Z"
    },
    {
        "id": "seg_0097",
        "name": "ztp",
        "tags": [
            {
                "id": "tag-produkce",
                "label": "PRODUKCE",
                "color": "green"
            }
        ],
        "description": "test test test",
        "createdBy": "Zaoral Denis",
        "recalculation": "automatic",
        "state": "calculated",
        "updatedAt": "2026-03-12T01:21:00.000Z",
        "lastRecalculatedAt": "2026-03-12T00:33:00.000Z"
    },
    {
        "id": "seg_0098",
        "name": "nikca testovani",
        "tags": [
            {
                "id": "tag-newsletter",
                "label": "NEWSLETTER",
                "color": "blue"
            },
            {
                "id": "tag-archiv",
                "label": "ARCHIV",
                "color": "yellow"
            }
        ],
        "description": "...",
        "createdBy": "Novák Jan",
        "recalculation": "manual",
        "state": "failed",
        "updatedAt": "2026-03-09T00:44:00.000Z",
        "lastRecalculatedAt": "2026-03-08T23:03:00.000Z"
    },
    {
        "id": "seg_0099",
        "name": "Aktivní zákazníci Q3",
        "tags": [
            {
                "id": "tag-vip",
                "label": "VIP",
                "color": "purple"
            },
            {
                "id": "tag-b2b",
                "label": "B2B",
                "color": "pink"
            }
        ],
        "description": "Neaktivní účty bez přihlášení více než 3 měsíce.",
        "createdBy": "Krejčí Adam",
        "recalculation": "manual",
        "state": "calculated",
        "updatedAt": "2026-03-07T00:07:00.000Z",
        "lastRecalculatedAt": "2026-03-06T21:33:00.000Z"
    },
    {
        "id": "seg_0100",
        "name": "Neaktivní > 90 dní",
        "tags": [
            {
                "id": "tag-habarta-testuje",
                "label": "HABARTA TESTUJE",
                "color": "red"
            },
            {
                "id": "tag-b2c",
                "label": "B2C",
                "color": "blue"
            }
        ],
        "description": "Reaktivace bývalých zákazníků skrze e-mail.",
        "createdBy": "Zaoral Denis",
        "recalculation": "regular",
        "state": "calculated",
        "updatedAt": "2026-03-04T23:30:00.000Z",
        "lastRecalculatedAt": null
    },
    {
        "id": "seg_0101",
        "name": "VIP klienti CZ",
        "tags": [],
        "description": "Zákazníci s opuštěným košíkem – automatický přepočet.",
        "createdBy": "Novák Jan",
        "recalculation": "manual",
        "state": "calculating",
        "updatedAt": "2026-03-06T22:53:00.000Z",
        "lastRecalculatedAt": "2026-03-06T22:33:00.000Z"
    },
    {
        "id": "seg_0102",
        "name": "Nákup nad 5000 Kč",
        "tags": [],
        "description": "Cross-sell doplňkových produktů k hlavní kategorii.",
        "createdBy": "Krejčí Adam",
        "recalculation": "automatic",
        "state": "calculated",
        "updatedAt": "2026-03-04T22:16:00.000Z",
        "lastRecalculatedAt": "2026-03-04T21:03:00.000Z"
    },
    {
        "id": "seg_0103",
        "name": "Opuštěný košík 7 dní",
        "tags": [],
        "description": "Import ze starého systému, čeká na revizi.",
        "createdBy": "Zaoral Denis",
        "recalculation": "manual",
        "state": "pending",
        "updatedAt": "2026-03-02T21:39:00.000Z",
        "lastRecalculatedAt": "2026-03-02T19:33:00.000Z"
    },
    {
        "id": "seg_0104",
        "name": "Newsletter opt-in",
        "tags": [
            {
                "id": "tag-newsletter",
                "label": "NEWSLETTER",
                "color": "blue"
            }
        ],
        "description": "test",
        "createdBy": "Novák Jan",
        "recalculation": "manual",
        "state": "calculated",
        "updatedAt": "2026-02-28T21:02:00.000Z",
        "lastRecalculatedAt": "2026-02-28T18:03:00.000Z"
    },
    {
        "id": "seg_0105",
        "name": "Praha + okolí",
        "tags": [
            {
                "id": "tag-loyalty",
                "label": "LOYALTY",
                "color": "purple"
            }
        ],
        "description": "ddddd",
        "createdBy": "Krejčí Adam",
        "recalculation": "regular",
        "state": "failed",
        "updatedAt": "2026-02-25T20:25:00.000Z",
        "lastRecalculatedAt": "2026-02-25T16:33:00.000Z"
    },
    {
        "id": "seg_0106",
        "name": "Brněnská pobočka",
        "tags": [
            {
                "id": "tag-archiv",
                "label": "ARCHIV",
                "color": "yellow"
            }
        ],
        "description": "ztpeeeeee",
        "createdBy": "Zaoral Denis",
        "recalculation": "manual",
        "state": "calculated",
        "updatedAt": "2026-02-28T19:48:00.000Z",
        "lastRecalculatedAt": "2026-02-28T19:03:00.000Z"
    },
    {
        "id": "seg_0107",
        "name": "Reaktivace 2026",
        "tags": [
            {
                "id": "tag-test-smazat",
                "label": "TEST - SMAZAT",
                "color": "gray"
            }
        ],
        "description": "Segment zahrnuje zákazníky, kteří provedli nákup v posledních 30 dnech.",
        "createdBy": "Novák Jan",
        "recalculation": "automatic",
        "state": "calculated",
        "updatedAt": "2026-02-26T19:11:00.000Z",
        "lastRecalculatedAt": "2026-02-26T17:33:00.000Z"
    },
    {
        "id": "seg_0108",
        "name": "Onboarding nedokončen",
        "tags": [
            {
                "id": "tag-b2c",
                "label": "B2C",
                "color": "blue"
            }
        ],
        "description": "VIP zákazníci s roční útratou nad 50 000 Kč.",
        "createdBy": "Krejčí Adam",
        "recalculation": "manual",
        "state": "calculating",
        "updatedAt": "2026-02-23T18:34:00.000Z",
        "lastRecalculatedAt": null
    },
    {
        "id": "seg_0109",
        "name": "Sleva 20% - klik",
        "tags": [
            {
                "id": "tag-vip",
                "label": "VIP",
                "color": "purple"
            }
        ],
        "description": "Onboarding flow pro nové registrace.",
        "createdBy": "Zaoral Denis",
        "recalculation": "manual",
        "state": "calculated",
        "updatedAt": "2026-02-21T17:57:00.000Z",
        "lastRecalculatedAt": "2026-02-21T14:33:00.000Z"
    },
    {
        "id": "seg_0110",
        "name": "Push notifikace on",
        "tags": [
            {
                "id": "tag-reaktivace",
                "label": "REAKTIVACE",
                "color": "orange"
            }
        ],
        "description": "B2B partneři s vlastní obchodní podmínkou.",
        "createdBy": "Novák Jan",
        "recalculation": "regular",
        "state": "pending",
        "updatedAt": "2026-02-19T17:20:00.000Z",
        "lastRecalculatedAt": "2026-02-19T17:03:00.000Z"
    },
    {
        "id": "seg_0111",
        "name": "SMS opt-out",
        "tags": [
            {
                "id": "tag-produkce",
                "label": "PRODUKCE",
                "color": "green"
            }
        ],
        "description": "Segment pro A/B test nové landing page.",
        "createdBy": "Krejčí Adam",
        "recalculation": "manual",
        "state": "calculated",
        "updatedAt": "2026-02-21T16:43:00.000Z",
        "lastRecalculatedAt": "2026-02-21T15:33:00.000Z"
    },
    {
        "id": "seg_0112",
        "name": "Test segmentu A/B",
        "tags": [
            {
                "id": "tag-test-zuza",
                "label": "TEST - ZUZA",
                "color": "orange"
            }
        ],
        "description": "GDPR compliant segment se souhlasem k marketingu.",
        "createdBy": "Zaoral Denis",
        "recalculation": "automatic",
        "state": "failed",
        "updatedAt": "2026-02-19T16:06:00.000Z",
        "lastRecalculatedAt": "2026-02-19T14:03:00.000Z"
    },
    {
        "id": "seg_0113",
        "name": "Velkoobchod plátci",
        "tags": [
            {
                "id": "tag-b2b",
                "label": "B2B",
                "color": "pink"
            }
        ],
        "description": "-",
        "createdBy": "Novák Jan",
        "recalculation": "manual",
        "state": "calculated",
        "updatedAt": "2026-02-17T15:29:00.000Z",
        "lastRecalculatedAt": "2026-02-17T12:33:00.000Z"
    },
    {
        "id": "seg_0114",
        "name": "Retail zákazníci",
        "tags": [
            {
                "id": "tag-habarta-testuje",
                "label": "HABARTA TESTUJE",
                "color": "red"
            }
        ],
        "description": "test test task",
        "createdBy": "Krejčí Adam",
        "recalculation": "manual",
        "state": "calculated",
        "updatedAt": "2026-02-15T14:52:00.000Z",
        "lastRecalculatedAt": "2026-02-15T11:03:00.000Z"
    },
    {
        "id": "seg_0115",
        "name": "Loajální > 3 roky",
        "tags": [
            {
                "id": "tag-onboarding",
                "label": "ONBOARDING",
                "color": "green"
            }
        ],
        "description": "test testovaci test test",
        "createdBy": "Zaoral Denis",
        "recalculation": "regular",
        "state": "calculating",
        "updatedAt": "2026-02-12T14:15:00.000Z",
        "lastRecalculatedAt": "2026-02-12T13:33:00.000Z"
    },
    {
        "id": "seg_0116",
        "name": "První nákup 30 dní",
        "tags": [
            {
                "id": "tag-newsletter",
                "label": "NEWSLETTER",
                "color": "blue"
            }
        ],
        "description": "Aktivní newsletter odběratelé s vysokou mírou otevírání.",
        "createdBy": "Novák Jan",
        "recalculation": "manual",
        "state": "calculated",
        "updatedAt": "2026-02-15T13:38:00.000Z",
        "lastRecalculatedAt": null
    },
    {
        "id": "seg_0117",
        "name": "Kampaň Vánoce 2025",
        "tags": [
            {
                "id": "tag-onboarding",
                "label": "ONBOARDING",
                "color": "green"
            },
            {
                "id": "tag-test-smazat",
                "label": "TEST - SMAZAT",
                "color": "gray"
            }
        ],
        "description": "Segment pro testování nové kampaně, po testu smazat.",
        "createdBy": "Krejčí Adam",
        "recalculation": "automatic",
        "state": "pending",
        "updatedAt": "2026-02-13T13:01:00.000Z",
        "lastRecalculatedAt": "2026-02-13T10:33:00.000Z"
    },
    {
        "id": "seg_0118",
        "name": "Black Friday cílovka",
        "tags": [
            {
                "id": "tag-b2c",
                "label": "B2C",
                "color": "blue"
            },
            {
                "id": "tag-habarta-testuje",
                "label": "HABARTA TESTUJE",
                "color": "red"
            }
        ],
        "description": "Push notifikace pro mobilní aplikaci.",
        "createdBy": "Zaoral Denis",
        "recalculation": "manual",
        "state": "calculated",
        "updatedAt": "2026-02-11T12:24:00.000Z",
        "lastRecalculatedAt": "2026-02-11T09:03:00.000Z"
    },
    {
        "id": "seg_0119",
        "name": "Nákup mobilní aplikace",
        "tags": [
            {
                "id": "tag-b2b",
                "label": "B2B",
                "color": "pink"
            },
            {
                "id": "tag-vip",
                "label": "VIP",
                "color": "purple"
            }
        ],
        "description": "Loajální zákazníci s dlouhodobou historií nákupů.",
        "createdBy": "Novák Jan",
        "recalculation": "manual",
        "state": "failed",
        "updatedAt": "2026-02-09T11:47:00.000Z",
        "lastRecalculatedAt": "2026-02-09T11:33:00.000Z"
    },
    {
        "id": "seg_0120",
        "name": "Web pouze prohlížeči",
        "tags": [
            {
                "id": "tag-archiv",
                "label": "ARCHIV",
                "color": "yellow"
            },
            {
                "id": "tag-newsletter",
                "label": "NEWSLETTER",
                "color": "blue"
            }
        ],
        "description": "Ke smazání – historický pokus, již nepoužívané.",
        "createdBy": "Krejčí Adam",
        "recalculation": "regular",
        "state": "calculated",
        "updatedAt": "2026-02-07T11:10:00.000Z",
        "lastRecalculatedAt": "2026-02-07T10:03:00.000Z"
    },
    {
        "id": "seg_0121",
        "name": "Slevové kupóny použité",
        "tags": [],
        "description": "",
        "createdBy": "Zaoral Denis",
        "recalculation": "manual",
        "state": "calculated",
        "updatedAt": "2026-02-09T10:33:00.000Z",
        "lastRecalculatedAt": "2026-02-09T08:33:00.000Z"
    },
    {
        "id": "seg_0122",
        "name": "Refundace řešeny",
        "tags": [],
        "description": "test",
        "createdBy": "Novák Jan",
        "recalculation": "automatic",
        "state": "calculating",
        "updatedAt": "2026-02-07T09:56:00.000Z",
        "lastRecalculatedAt": "2026-02-07T07:03:00.000Z"
    },
    {
        "id": "seg_0123",
        "name": "Cross-sell doplňky",
        "tags": [],
        "description": "test test test",
        "createdBy": "Krejčí Adam",
        "recalculation": "manual",
        "state": "calculated",
        "updatedAt": "2026-02-05T09:19:00.000Z",
        "lastRecalculatedAt": "2026-02-05T05:33:00.000Z"
    },
    {
        "id": "seg_0124",
        "name": "Upsell prémium",
        "tags": [
            {
                "id": "tag-test-zuza",
                "label": "TEST - ZUZA",
                "color": "orange"
            }
        ],
        "description": "...",
        "createdBy": "Zaoral Denis",
        "recalculation": "manual",
        "state": "pending",
        "updatedAt": "2026-02-03T08:42:00.000Z",
        "lastRecalculatedAt": null
    },
    {
        "id": "seg_0125",
        "name": "Testovací data QA",
        "tags": [
            {
                "id": "tag-b2b",
                "label": "B2B",
                "color": "pink"
            }
        ],
        "description": "Neaktivní účty bez přihlášení více než 3 měsíce.",
        "createdBy": "Novák Jan",
        "recalculation": "regular",
        "state": "calculated",
        "updatedAt": "2026-01-31T08:05:00.000Z",
        "lastRecalculatedAt": "2026-01-31T06:33:00.000Z"
    },
    {
        "id": "seg_0126",
        "name": "Interní tým",
        "tags": [
            {
                "id": "tag-habarta-testuje",
                "label": "HABARTA TESTUJE",
                "color": "red"
            }
        ],
        "description": "Reaktivace bývalých zákazníků skrze e-mail.",
        "createdBy": "Krejčí Adam",
        "recalculation": "manual",
        "state": "failed",
        "updatedAt": "2026-02-03T07:28:00.000Z",
        "lastRecalculatedAt": "2026-02-03T05:03:00.000Z"
    },
    {
        "id": "seg_0127",
        "name": "Beta program",
        "tags": [
            {
                "id": "tag-onboarding",
                "label": "ONBOARDING",
                "color": "green"
            }
        ],
        "description": "Zákazníci s opuštěným košíkem – automatický přepočet.",
        "createdBy": "Zaoral Denis",
        "recalculation": "automatic",
        "state": "calculated",
        "updatedAt": "2026-02-01T06:51:00.000Z",
        "lastRecalculatedAt": "2026-02-01T03:33:00.000Z"
    },
    {
        "id": "seg_0128",
        "name": "Zákazník + partner",
        "tags": [
            {
                "id": "tag-newsletter",
                "label": "NEWSLETTER",
                "color": "blue"
            }
        ],
        "description": "Cross-sell doplňkových produktů k hlavní kategorii.",
        "createdBy": "Novák Jan",
        "recalculation": "manual",
        "state": "calculated",
        "updatedAt": "2026-01-29T06:14:00.000Z",
        "lastRecalculatedAt": "2026-01-29T06:03:00.000Z"
    },
    {
        "id": "seg_0129",
        "name": "Segment bez štítků",
        "tags": [
            {
                "id": "tag-loyalty",
                "label": "LOYALTY",
                "color": "purple"
            }
        ],
        "description": "Import ze starého systému, čeká na revizi.",
        "createdBy": "Krejčí Adam",
        "recalculation": "manual",
        "state": "calculating",
        "updatedAt": "2026-01-27T05:37:00.000Z",
        "lastRecalculatedAt": "2026-01-27T04:33:00.000Z"
    },
    {
        "id": "seg_0130",
        "name": "Pravidelný přepočet denní",
        "tags": [
            {
                "id": "tag-archiv",
                "label": "ARCHIV",
                "color": "yellow"
            }
        ],
        "description": "test",
        "createdBy": "Zaoral Denis",
        "recalculation": "regular",
        "state": "calculated",
        "updatedAt": "2026-01-25T05:00:00.000Z",
        "lastRecalculatedAt": "2026-01-25T03:03:00.000Z"
    },
    {
        "id": "seg_0131",
        "name": "Automatická aktualizace",
        "tags": [
            {
                "id": "tag-test-smazat",
                "label": "TEST - SMAZAT",
                "color": "gray"
            }
        ],
        "description": "ddddd",
        "createdBy": "Novák Jan",
        "recalculation": "manual",
        "state": "pending",
        "updatedAt": "2026-01-27T04:23:00.000Z",
        "lastRecalculatedAt": "2026-01-27T01:33:00.000Z"
    },
    {
        "id": "seg_0132",
        "name": "Manuální kontrola",
        "tags": [
            {
                "id": "tag-b2c",
                "label": "B2C",
                "color": "blue"
            }
        ],
        "description": "ztpeeeeee",
        "createdBy": "Krejčí Adam",
        "recalculation": "automatic",
        "state": "calculated",
        "updatedAt": "2026-01-25T03:46:00.000Z",
        "lastRecalculatedAt": null
    },
    {
        "id": "seg_0133",
        "name": "ZTP karta držitelé",
        "tags": [
            {
                "id": "tag-vip",
                "label": "VIP",
                "color": "purple"
            }
        ],
        "description": "Segment zahrnuje zákazníky, kteří provedli nákup v posledních 30 dnech.",
        "createdBy": "Zaoral Denis",
        "recalculation": "manual",
        "state": "failed",
        "updatedAt": "2026-01-23T03:09:00.000Z",
        "lastRecalculatedAt": "2026-01-23T02:33:00.000Z"
    },
    {
        "id": "seg_0134",
        "name": "Studenti do 26",
        "tags": [
            {
                "id": "tag-reaktivace",
                "label": "REAKTIVACE",
                "color": "orange"
            }
        ],
        "description": "VIP zákazníci s roční útratou nad 50 000 Kč.",
        "createdBy": "Novák Jan",
        "recalculation": "manual",
        "state": "calculated",
        "updatedAt": "2026-01-21T02:32:00.000Z",
        "lastRecalculatedAt": "2026-01-21T01:03:00.000Z"
    },
    {
        "id": "seg_0135",
        "name": "Senioři nad 65",
        "tags": [
            {
                "id": "tag-produkce",
                "label": "PRODUKCE",
                "color": "green"
            }
        ],
        "description": "Onboarding flow pro nové registrace.",
        "createdBy": "Krejčí Adam",
        "recalculation": "regular",
        "state": "calculated",
        "updatedAt": "2026-01-18T01:55:00.000Z",
        "lastRecalculatedAt": "2026-01-17T23:33:00.000Z"
    },
    {
        "id": "seg_0136",
        "name": "Rodiče malých dětí",
        "tags": [
            {
                "id": "tag-test-zuza",
                "label": "TEST - ZUZA",
                "color": "orange"
            }
        ],
        "description": "B2B partneři s vlastní obchodní podmínkou.",
        "createdBy": "Zaoral Denis",
        "recalculation": "manual",
        "state": "calculating",
        "updatedAt": "2026-01-21T01:18:00.000Z",
        "lastRecalculatedAt": "2026-01-20T22:03:00.000Z"
    },
    {
        "id": "seg_0137",
        "name": "Firemní klienti IT",
        "tags": [
            {
                "id": "tag-test-smazat",
                "label": "TEST - SMAZAT",
                "color": "gray"
            },
            {
                "id": "tag-onboarding",
                "label": "ONBOARDING",
                "color": "green"
            }
        ],
        "description": "Segment pro A/B test nové landing page.",
        "createdBy": "Novák Jan",
        "recalculation": "automatic",
        "state": "calculated",
        "updatedAt": "2026-01-19T00:41:00.000Z",
        "lastRecalculatedAt": "2026-01-19T00:33:00.000Z"
    },
    {
        "id": "seg_0138",
        "name": "Startupy do 50 zaměstnanců",
        "tags": [
            {
                "id": "tag-test-zuza",
                "label": "TEST - ZUZA",
                "color": "orange"
            },
            {
                "id": "tag-reaktivace",
                "label": "REAKTIVACE",
                "color": "orange"
            }
        ],
        "description": "GDPR compliant segment se souhlasem k marketingu.",
        "createdBy": "Krejčí Adam",
        "recalculation": "manual",
        "state": "pending",
        "updatedAt": "2026-01-16T00:04:00.000Z",
        "lastRecalculatedAt": "2026-01-15T23:03:00.000Z"
    },
    {
        "id": "seg_0139",
        "name": "Enterprise segment",
        "tags": [
            {
                "id": "tag-loyalty",
                "label": "LOYALTY",
                "color": "purple"
            }
        ],
        "description": "-",
        "createdBy": "Zaoral Denis",
        "recalculation": "manual",
        "state": "calculated",
        "updatedAt": "2026-01-13T23:27:00.000Z",
        "lastRecalculatedAt": "2026-01-13T21:33:00.000Z"
    },
    {
        "id": "seg_0140",
        "name": "GDPR souhlas ano",
        "tags": [
            {
                "id": "tag-reaktivace",
                "label": "REAKTIVACE",
                "color": "orange"
            },
            {
                "id": "tag-test-zuza",
                "label": "TEST - ZUZA",
                "color": "orange"
            }
        ],
        "description": "test test task",
        "createdBy": "Novák Jan",
        "recalculation": "regular",
        "state": "failed",
        "updatedAt": "2026-01-11T22:50:00.000Z",
        "lastRecalculatedAt": null
    },
    {
        "id": "seg_0141",
        "name": "Marketing opt-in only",
        "tags": [],
        "description": "test testovaci test test",
        "createdBy": "Krejčí Adam",
        "recalculation": "manual",
        "state": "calculated",
        "updatedAt": "2026-01-13T22:13:00.000Z",
        "lastRecalculatedAt": "2026-01-13T18:33:00.000Z"
    },
    {
        "id": "seg_0142",
        "name": "Push + SMS + email",
        "tags": [],
        "description": "Aktivní newsletter odběratelé s vysokou mírou otevírání.",
        "createdBy": "Zaoral Denis",
        "recalculation": "automatic",
        "state": "calculated",
        "updatedAt": "2026-01-11T21:36:00.000Z",
        "lastRecalculatedAt": "2026-01-11T21:03:00.000Z"
    },
    {
        "id": "seg_0143",
        "name": "Vysoká hodnota LTV",
        "tags": [],
        "description": "Segment pro testování nové kampaně, po testu smazat.",
        "createdBy": "Novák Jan",
        "recalculation": "manual",
        "state": "calculating",
        "updatedAt": "2026-01-09T20:59:00.000Z",
        "lastRecalculatedAt": "2026-01-09T19:33:00.000Z"
    },
    {
        "id": "seg_0144",
        "name": "Riziko odchodu",
        "tags": [
            {
                "id": "tag-b2c",
                "label": "B2C",
                "color": "blue"
            }
        ],
        "description": "Push notifikace pro mobilní aplikaci.",
        "createdBy": "Krejčí Adam",
        "recalculation": "manual",
        "state": "calculated",
        "updatedAt": "2026-01-07T20:22:00.000Z",
        "lastRecalculatedAt": "2026-01-07T18:03:00.000Z"
    },
    {
        "id": "seg_0145",
        "name": "Nákupní frekvence 2×",
        "tags": [
            {
                "id": "tag-vip",
                "label": "VIP",
                "color": "purple"
            }
        ],
        "description": "Loajální zákazníci s dlouhodobou historií nákupů.",
        "createdBy": "Zaoral Denis",
        "recalculation": "regular",
        "state": "pending",
        "updatedAt": "2026-01-04T19:45:00.000Z",
        "lastRecalculatedAt": "2026-01-04T16:33:00.000Z"
    },
    {
        "id": "seg_0146",
        "name": "Zákazník bez objednávky 6M",
        "tags": [
            {
                "id": "tag-reaktivace",
                "label": "REAKTIVACE",
                "color": "orange"
            }
        ],
        "description": "Ke smazání – historický pokus, již nepoužívané.",
        "createdBy": "Novák Jan",
        "recalculation": "manual",
        "state": "calculated",
        "updatedAt": "2026-01-07T19:08:00.000Z",
        "lastRecalculatedAt": "2026-01-07T19:03:00.000Z"
    },
    {
        "id": "seg_0147",
        "name": "Nová registrace týden",
        "tags": [
            {
                "id": "tag-produkce",
                "label": "PRODUKCE",
                "color": "green"
            }
        ],
        "description": "",
        "createdBy": "Krejčí Adam",
        "recalculation": "automatic",
        "state": "failed",
        "updatedAt": "2026-01-05T18:31:00.000Z",
        "lastRecalculatedAt": "2026-01-05T17:33:00.000Z"
    },
    {
        "id": "seg_0148",
        "name": "Zapomenutý košík EU",
        "tags": [
            {
                "id": "tag-test-zuza",
                "label": "TEST - ZUZA",
                "color": "orange"
            }
        ],
        "description": "test",
        "createdBy": "Zaoral Denis",
        "recalculation": "manual",
        "state": "calculated",
        "updatedAt": "2026-01-02T17:54:00.000Z",
        "lastRecalculatedAt": null
    },
    {
        "id": "seg_0149",
        "name": "Doprava zdarma využili",
        "tags": [
            {
                "id": "tag-b2b",
                "label": "B2B",
                "color": "pink"
            }
        ],
        "description": "test test test",
        "createdBy": "Novák Jan",
        "recalculation": "manual",
        "state": "calculated",
        "updatedAt": "2025-12-31T17:17:00.000Z",
        "lastRecalculatedAt": "2025-12-31T14:33:00.000Z"
    },
    {
        "id": "seg_0150",
        "name": "Recenze 5 hvězd",
        "tags": [
            {
                "id": "tag-habarta-testuje",
                "label": "HABARTA TESTUJE",
                "color": "red"
            }
        ],
        "description": "...",
        "createdBy": "Krejčí Adam",
        "recalculation": "regular",
        "state": "calculating",
        "updatedAt": "2025-12-29T16:40:00.000Z",
        "lastRecalculatedAt": "2025-12-29T13:03:00.000Z"
    },
    {
        "id": "seg_0151",
        "name": "Reklamace vyřízené",
        "tags": [
            {
                "id": "tag-onboarding",
                "label": "ONBOARDING",
                "color": "green"
            }
        ],
        "description": "Neaktivní účty bez přihlášení více než 3 měsíce.",
        "createdBy": "Zaoral Denis",
        "recalculation": "manual",
        "state": "calculated",
        "updatedAt": "2025-12-31T16:03:00.000Z",
        "lastRecalculatedAt": "2025-12-31T15:33:00.000Z"
    },
    {
        "id": "seg_0152",
        "name": "Doporučení přítelem",
        "tags": [
            {
                "id": "tag-newsletter",
                "label": "NEWSLETTER",
                "color": "blue"
            }
        ],
        "description": "Reaktivace bývalých zákazníků skrze e-mail.",
        "createdBy": "Novák Jan",
        "recalculation": "automatic",
        "state": "pending",
        "updatedAt": "2025-12-29T15:26:00.000Z",
        "lastRecalculatedAt": "2025-12-29T14:03:00.000Z"
    },
    {
        "id": "seg_0153",
        "name": "Affiliate partner",
        "tags": [
            {
                "id": "tag-loyalty",
                "label": "LOYALTY",
                "color": "purple"
            }
        ],
        "description": "Zákazníci s opuštěným košíkem – automatický přepočet.",
        "createdBy": "Krejčí Adam",
        "recalculation": "manual",
        "state": "calculated",
        "updatedAt": "2025-12-27T14:49:00.000Z",
        "lastRecalculatedAt": "2025-12-27T12:33:00.000Z"
    },
    {
        "id": "seg_0154",
        "name": "Loyalty úroveň gold",
        "tags": [
            {
                "id": "tag-archiv",
                "label": "ARCHIV",
                "color": "yellow"
            }
        ],
        "description": "Cross-sell doplňkových produktů k hlavní kategorii.",
        "createdBy": "Zaoral Denis",
        "recalculation": "manual",
        "state": "failed",
        "updatedAt": "2025-12-25T14:12:00.000Z",
        "lastRecalculatedAt": "2025-12-25T11:03:00.000Z"
    },
    {
        "id": "seg_0155",
        "name": "Loyalty úroveň silver",
        "tags": [
            {
                "id": "tag-test-smazat",
                "label": "TEST - SMAZAT",
                "color": "gray"
            }
        ],
        "description": "Import ze starého systému, čeká na revizi.",
        "createdBy": "Novák Jan",
        "recalculation": "regular",
        "state": "calculated",
        "updatedAt": "2025-12-22T13:35:00.000Z",
        "lastRecalculatedAt": "2025-12-22T13:33:00.000Z"
    },
    {
        "id": "seg_0156",
        "name": "Loyalty úroveň bronze",
        "tags": [
            {
                "id": "tag-b2c",
                "label": "B2C",
                "color": "blue"
            }
        ],
        "description": "test",
        "createdBy": "Krejčí Adam",
        "recalculation": "manual",
        "state": "calculated",
        "updatedAt": "2025-12-25T12:58:00.000Z",
        "lastRecalculatedAt": null
    },
    {
        "id": "seg_0157",
        "name": "Preference kategorie A",
        "tags": [
            {
                "id": "tag-produkce",
                "label": "PRODUKCE",
                "color": "green"
            }
        ],
        "description": "ddddd",
        "createdBy": "Zaoral Denis",
        "recalculation": "automatic",
        "state": "calculating",
        "updatedAt": "2025-12-24T12:21:00.000Z",
        "lastRecalculatedAt": "2025-12-24T10:33:00.000Z"
    },
    {
        "id": "seg_0158",
        "name": "Preference kategorie B",
        "tags": [
            {
                "id": "tag-newsletter",
                "label": "NEWSLETTER",
                "color": "blue"
            },
            {
                "id": "tag-archiv",
                "label": "ARCHIV",
                "color": "yellow"
            }
        ],
        "description": "ztpeeeeee",
        "createdBy": "Novák Jan",
        "recalculation": "manual",
        "state": "calculated",
        "updatedAt": "2025-12-21T11:44:00.000Z",
        "lastRecalculatedAt": "2025-12-21T09:03:00.000Z"
    },
    {
        "id": "seg_0159",
        "name": "Preference kategorie C",
        "tags": [
            {
                "id": "tag-vip",
                "label": "VIP",
                "color": "purple"
            },
            {
                "id": "tag-b2b",
                "label": "B2B",
                "color": "pink"
            }
        ],
        "description": "Segment zahrnuje zákazníky, kteří provedli nákup v posledních 30 dnech.",
        "createdBy": "Krejčí Adam",
        "recalculation": "manual",
        "state": "pending",
        "updatedAt": "2025-12-19T11:07:00.000Z",
        "lastRecalculatedAt": "2025-12-19T07:33:00.000Z"
    },
    {
        "id": "seg_0160",
        "name": "Sezonní zákazníci léto",
        "tags": [
            {
                "id": "tag-habarta-testuje",
                "label": "HABARTA TESTUJE",
                "color": "red"
            },
            {
                "id": "tag-b2c",
                "label": "B2C",
                "color": "blue"
            }
        ],
        "description": "VIP zákazníci s roční útratou nad 50 000 Kč.",
        "createdBy": "Zaoral Denis",
        "recalculation": "regular",
        "state": "calculated",
        "updatedAt": "2025-12-17T10:30:00.000Z",
        "lastRecalculatedAt": "2025-12-17T10:03:00.000Z"
    },
    {
        "id": "seg_0161",
        "name": "Sezonní zákazníci zima",
        "tags": [],
        "description": "Onboarding flow pro nové registrace.",
        "createdBy": "Novák Jan",
        "recalculation": "manual",
        "state": "failed",
        "updatedAt": "2025-12-19T09:53:00.000Z",
        "lastRecalculatedAt": "2025-12-19T08:33:00.000Z"
    },
    {
        "id": "seg_0162",
        "name": "Segment kontrolní",
        "tags": [],
        "description": "B2B partneři s vlastní obchodní podmínkou.",
        "createdBy": "Krejčí Adam",
        "recalculation": "automatic",
        "state": "calculated",
        "updatedAt": "2025-12-17T09:16:00.000Z",
        "lastRecalculatedAt": "2025-12-17T07:03:00.000Z"
    },
    {
        "id": "seg_0163",
        "name": "Testovací prázdný",
        "tags": [],
        "description": "Segment pro A/B test nové landing page.",
        "createdBy": "Zaoral Denis",
        "recalculation": "manual",
        "state": "calculated",
        "updatedAt": "2025-12-15T08:39:00.000Z",
        "lastRecalculatedAt": "2025-12-15T05:33:00.000Z"
    },
    {
        "id": "seg_0164",
        "name": "Import z CSV 2026",
        "tags": [
            {
                "id": "tag-newsletter",
                "label": "NEWSLETTER",
                "color": "blue"
            }
        ],
        "description": "GDPR compliant segment se souhlasem k marketingu.",
        "createdBy": "Novák Jan",
        "recalculation": "manual",
        "state": "calculating",
        "updatedAt": "2025-12-13T08:02:00.000Z",
        "lastRecalculatedAt": null
    },
    {
        "id": "seg_0165",
        "name": "Migrace ze starého CRM",
        "tags": [
            {
                "id": "tag-loyalty",
                "label": "LOYALTY",
                "color": "purple"
            }
        ],
        "description": "-",
        "createdBy": "Krejčí Adam",
        "recalculation": "regular",
        "state": "calculated",
        "updatedAt": "2025-12-10T07:25:00.000Z",
        "lastRecalculatedAt": "2025-12-10T06:33:00.000Z"
    },
    {
        "id": "seg_0166",
        "name": "Duplikáty ke sloučení",
        "tags": [
            {
                "id": "tag-archiv",
                "label": "ARCHIV",
                "color": "yellow"
            }
        ],
        "description": "test test task",
        "createdBy": "Zaoral Denis",
        "recalculation": "manual",
        "state": "pending",
        "updatedAt": "2025-12-13T06:48:00.000Z",
        "lastRecalculatedAt": "2025-12-13T05:03:00.000Z"
    },
    {
        "id": "seg_0167",
        "name": "Špatné e-maily bounce",
        "tags": [
            {
                "id": "tag-test-smazat",
                "label": "TEST - SMAZAT",
                "color": "gray"
            }
        ],
        "description": "test testovaci test test",
        "createdBy": "Novák Jan",
        "recalculation": "automatic",
        "state": "calculated",
        "updatedAt": "2025-12-11T06:11:00.000Z",
        "lastRecalculatedAt": "2025-12-11T03:33:00.000Z"
    },
    {
        "id": "seg_0168",
        "name": "Neplatné telefony",
        "tags": [
            {
                "id": "tag-b2c",
                "label": "B2C",
                "color": "blue"
            }
        ],
        "description": "Aktivní newsletter odběratelé s vysokou mírou otevírání.",
        "createdBy": "Krejčí Adam",
        "recalculation": "manual",
        "state": "failed",
        "updatedAt": "2025-12-08T05:34:00.000Z",
        "lastRecalculatedAt": "2025-12-08T02:03:00.000Z"
    },
    {
        "id": "seg_0169",
        "name": "Regionální akce Ostrava",
        "tags": [
            {
                "id": "tag-vip",
                "label": "VIP",
                "color": "purple"
            }
        ],
        "description": "Segment pro testování nové kampaně, po testu smazat.",
        "createdBy": "Zaoral Denis",
        "recalculation": "manual",
        "state": "calculated",
        "updatedAt": "2025-12-06T04:57:00.000Z",
        "lastRecalculatedAt": "2025-12-06T04:33:00.000Z"
    },
    {
        "id": "seg_0170",
        "name": "Regionální akce Plzeň",
        "tags": [
            {
                "id": "tag-reaktivace",
                "label": "REAKTIVACE",
                "color": "orange"
            }
        ],
        "description": "Push notifikace pro mobilní aplikaci.",
        "createdBy": "Novák Jan",
        "recalculation": "regular",
        "state": "calculated",
        "updatedAt": "2025-12-04T04:20:00.000Z",
        "lastRecalculatedAt": "2025-12-04T03:03:00.000Z"
    },
    {
        "id": "seg_0171",
        "name": "Zaměstnanci firmy",
        "tags": [
            {
                "id": "tag-produkce",
                "label": "PRODUKCE",
                "color": "green"
            }
        ],
        "description": "Loajální zákazníci s dlouhodobou historií nákupů.",
        "createdBy": "Krejčí Adam",
        "recalculation": "manual",
        "state": "calculating",
        "updatedAt": "2025-12-06T03:43:00.000Z",
        "lastRecalculatedAt": "2025-12-06T01:33:00.000Z"
    },
    {
        "id": "seg_0172",
        "name": "Rodinní příslušníci",
        "tags": [
            {
                "id": "tag-test-zuza",
                "label": "TEST - ZUZA",
                "color": "orange"
            }
        ],
        "description": "Ke smazání – historický pokus, již nepoužívané.",
        "createdBy": "Zaoral Denis",
        "recalculation": "automatic",
        "state": "calculated",
        "updatedAt": "2025-12-04T03:06:00.000Z",
        "lastRecalculatedAt": null
    },
    {
        "id": "seg_0173",
        "name": "Tester UX skupina",
        "tags": [
            {
                "id": "tag-b2b",
                "label": "B2B",
                "color": "pink"
            }
        ],
        "description": "",
        "createdBy": "Novák Jan",
        "recalculation": "manual",
        "state": "pending",
        "updatedAt": "2025-12-02T02:29:00.000Z",
        "lastRecalculatedAt": "2025-12-01T22:33:00.000Z"
    },
    {
        "id": "seg_0174",
        "name": "Focus group Q4",
        "tags": [
            {
                "id": "tag-habarta-testuje",
                "label": "HABARTA TESTUJE",
                "color": "red"
            }
        ],
        "description": "test",
        "createdBy": "Krejčí Adam",
        "recalculation": "manual",
        "state": "calculated",
        "updatedAt": "2025-11-30T01:52:00.000Z",
        "lastRecalculatedAt": "2025-11-30T01:03:00.000Z"
    },
    {
        "id": "seg_0175",
        "name": "test",
        "tags": [
            {
                "id": "tag-onboarding",
                "label": "ONBOARDING",
                "color": "green"
            }
        ],
        "description": "test test test",
        "createdBy": "Zaoral Denis",
        "recalculation": "regular",
        "state": "failed",
        "updatedAt": "2025-11-27T01:15:00.000Z",
        "lastRecalculatedAt": "2025-11-26T23:33:00.000Z"
    },
    {
        "id": "seg_0176",
        "name": "Test 13.7.",
        "tags": [
            {
                "id": "tag-newsletter",
                "label": "NEWSLETTER",
                "color": "blue"
            }
        ],
        "description": "...",
        "createdBy": "Novák Jan",
        "recalculation": "manual",
        "state": "calculated",
        "updatedAt": "2025-11-30T00:38:00.000Z",
        "lastRecalculatedAt": "2025-11-29T22:03:00.000Z"
    },
    {
        "id": "seg_0177",
        "name": "test auto segment",
        "tags": [
            {
                "id": "tag-onboarding",
                "label": "ONBOARDING",
                "color": "green"
            },
            {
                "id": "tag-test-smazat",
                "label": "TEST - SMAZAT",
                "color": "gray"
            }
        ],
        "description": "Neaktivní účty bez přihlášení více než 3 měsíce.",
        "createdBy": "Krejčí Adam",
        "recalculation": "automatic",
        "state": "calculated",
        "updatedAt": "2025-11-28T00:01:00.000Z",
        "lastRecalculatedAt": "2025-11-27T20:33:00.000Z"
    },
    {
        "id": "seg_0178",
        "name": "test nove kopirovani",
        "tags": [
            {
                "id": "tag-b2c",
                "label": "B2C",
                "color": "blue"
            },
            {
                "id": "tag-habarta-testuje",
                "label": "HABARTA TESTUJE",
                "color": "red"
            }
        ],
        "description": "Reaktivace bývalých zákazníků skrze e-mail.",
        "createdBy": "Zaoral Denis",
        "recalculation": "manual",
        "state": "calculating",
        "updatedAt": "2025-11-24T23:24:00.000Z",
        "lastRecalculatedAt": "2025-11-24T23:03:00.000Z"
    },
    {
        "id": "seg_0179",
        "name": "ZTP Denisovo",
        "tags": [
            {
                "id": "tag-b2b",
                "label": "B2B",
                "color": "pink"
            },
            {
                "id": "tag-vip",
                "label": "VIP",
                "color": "purple"
            }
        ],
        "description": "Zákazníci s opuštěným košíkem – automatický přepočet.",
        "createdBy": "Novák Jan",
        "recalculation": "manual",
        "state": "calculated",
        "updatedAt": "2025-11-22T22:47:00.000Z",
        "lastRecalculatedAt": "2025-11-22T21:33:00.000Z"
    },
    {
        "id": "seg_0180",
        "name": "seznamovani nika heh",
        "tags": [
            {
                "id": "tag-archiv",
                "label": "ARCHIV",
                "color": "yellow"
            },
            {
                "id": "tag-newsletter",
                "label": "NEWSLETTER",
                "color": "blue"
            }
        ],
        "description": "Cross-sell doplňkových produktů k hlavní kategorii.",
        "createdBy": "Krejčí Adam",
        "recalculation": "regular",
        "state": "pending",
        "updatedAt": "2025-11-20T22:10:00.000Z",
        "lastRecalculatedAt": null
    }
]
