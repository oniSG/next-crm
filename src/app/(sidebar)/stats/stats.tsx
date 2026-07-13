'use client'

import { useState } from 'react'
import { ChevronDownIcon } from 'lucide-react'

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { cn } from '@/lib/utils'

import { SURVEY_QUESTIONS } from './data'
import { SurveyChart } from './survey-chart'

type StatsProps = {
    expanded?: boolean
}

export function Stats({ expanded = false }: StatsProps) {
    const [openItems, setOpenItems] = useState<string[]>(
        SURVEY_QUESTIONS.map((question) => question.id),
    )

    if (expanded) {
        return (
            <div className="flex w-full max-w-6xl flex-col gap-8">
                {SURVEY_QUESTIONS.map((question, index) => (
                    <section key={question.id} className="flex flex-col gap-3">
                        <h2 className="text-base font-medium">
                            {index + 1}. {question.question}
                        </h2>
                        <SurveyChart question={question} />
                    </section>
                ))}
            </div>
        )
    }

    return (
        <div className="flex w-full max-w-6xl flex-col gap-2">
            {SURVEY_QUESTIONS.map((question, index) => {
                const isOpen = openItems.includes(question.id)

                return (
                    <Collapsible
                        key={question.id}
                        open={isOpen}
                        onOpenChange={(open) =>
                            setOpenItems((current) =>
                                open
                                    ? [...current, question.id]
                                    : current.filter((id) => id !== question.id),
                            )
                        }
                    >
                        <CollapsibleTrigger className="flex w-full items-center justify-between py-2.5 text-left text-base font-medium hover:underline">
                            {index + 1}. {question.question}
                            <ChevronDownIcon
                                className={cn(
                                    'size-4 shrink-0 text-muted-foreground transition-transform',
                                    isOpen && 'rotate-180',
                                )}
                            />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="pb-4">
                            <SurveyChart question={question} />
                        </CollapsibleContent>
                    </Collapsible>
                )
            })}
        </div>
    )
}
