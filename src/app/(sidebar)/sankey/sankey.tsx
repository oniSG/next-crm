'use client'

import { SankeyChart } from '@/components/custom/statistics/sankey-chart'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

import { SANKEY_DATA } from './data'

export function SankeyPage() {
    return (
        <div className="flex w-full max-w-6xl flex-col gap-3">
            <section className="grid grid-cols-1 gap-4">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Sankey</CardTitle>
                        <CardDescription>
                            Tok kampaně od odeslání po konverzi.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <SankeyChart data={SANKEY_DATA} />
                    </CardContent>
                </Card>
            </section>
        </div>
    )
}
