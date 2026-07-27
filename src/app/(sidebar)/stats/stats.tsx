import { SURVEY_QUESTIONS } from './data'
import { SurveyChart } from './survey-chart'

export function Stats() {
    return (
        <div className="flex w-full max-w-6xl flex-col gap-3">
            <section className="grid grid-cols-1 gap-4">
                {SURVEY_QUESTIONS.map((question, index) => (
                    <SurveyChart
                        key={question.id}
                        question={question}
                        title={`${index + 1}. ${question.question}`}
                    />
                ))}
            </section>
        </div>
    )
}
