import React from 'react'
import { Badge } from '../ui/Badge'

export function TranscriptBubble({ message }) {
  const isOutgoing = message.speaker === 'Outgoing Nurse'
  const alignment = isOutgoing ? 'items-start' : 'items-end'
  const bubbleBg = isOutgoing ? 'bg-slate-50' : 'bg-sky-50'
  const bubbleBorder = isOutgoing ? 'border-slate-200' : 'border-sky-100'
  const labelVariant = isOutgoing ? 'neutral' : 'info'

  return (
    <div className={`flex flex-col gap-1 ${alignment}`}>
      <div className="flex items-center gap-2 text-xs text-slate-500">
        {isOutgoing && (
          <Badge variant={labelVariant}>
            Outgoing nurse
          </Badge>
        )}
        {!isOutgoing && (
          <Badge variant={labelVariant}>
            Incoming nurse
          </Badge>
        )}
        <span>{message.timestamp}</span>
      </div>
      <div
        className={`max-w-[90%] rounded-2xl border px-3 py-2 text-sm leading-relaxed text-slate-800 shadow-sm ${bubbleBg} ${bubbleBorder}`}
      >
        {message.text}
      </div>
    </div>
  )
}

