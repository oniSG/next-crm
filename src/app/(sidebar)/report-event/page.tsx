import { EventPageHeader } from './event-page-header'
import { EventReport } from './event-report'

export default function Page() {
    return (
        <>
            <EventPageHeader />
            <div className="flex w-full justify-center p-3">
                <EventReport />
            </div>
        </>
    )
}
