import { FanActionEditor } from '@/app/(sidebar)/fan-action/[id]/fan-action-editor'
import { FAN_ACTIONS } from '@/app/(sidebar)/fan-action/[id]/data'

import { PrintShell, type PrintPageSettings } from '../components/print-shell'

const action = FAN_ACTIONS[0]

const printPageSettings: PrintPageSettings = {
    title: 'Campaign',
    description: 'Fan action workflow editor.',
    body: action ? <FanActionEditor action={action} /> : null,
}

export default function PrintFanActionPage() {
    return <PrintShell {...printPageSettings} />
}
