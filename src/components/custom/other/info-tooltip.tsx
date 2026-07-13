import { Button } from '@/components/ui/button'
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card'
import { InfoIcon } from 'lucide-react'

export default function InfoTooltip({ children }: { children: React.ReactNode }) {
    return (
        <HoverCard>
            <HoverCardTrigger
                delay={0}
                closeDelay={0}
                render={<Button size="icon" variant="ghost" />}
            >
                <InfoIcon />
            </HoverCardTrigger>

            <HoverCardContent>{children}</HoverCardContent>
        </HoverCard>
    )
}
