import React from 'react'
import { Badge } from '../ui/Badge'

const steps = [
  {
    id: 1,
    name: 'Relay',
    label: 'Listener agent',
    description: 'Detects bedside handoff and streams Whisper transcript with speakers labeled.',
  },
  {
    id: 2,
    name: 'Extract',
    label: 'Extraction agent',
    description: 'Parses the raw transcript into structured SBAR and key clinical fields.',
  },
  {
    id: 3,
    name: 'Sentinel',
    label: 'Risk agent',
    description: 'Checks vitals, meds, and allergies for unsafe patterns and open risks.',
  },
  {
    id: 4,
    name: 'Bridge',
    label: 'Summary agent',
    description: 'Synthesizes a signable handoff report for both clinicians.',
  },
]

export function AgentPipeline({ phase }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-sky-800">
            Multi-agent pipeline
          </p>
          <p className="text-xs text-slate-700">
            MedRelay chains four focused agents from raw audio to verified SBAR.
          </p>
        </div>
        <Badge variant="info">
          NeoVerse · Team Prompt Engineers
        </Badge>
      </div>

      <div className="mt-1 grid gap-2 md:grid-cols-4">
        {steps.map((step) => {
          const isDone = step.id < phase
          const isActive = step.id === phase
          const ringColor = isDone
            ? 'ring-emerald-400 bg-emerald-50'
            : isActive
              ? 'ring-sky-400 bg-sky-50'
              : 'ring-slate-200 bg-white/80'

          const dotColor = isDone
            ? 'bg-emerald-500'
            : isActive
              ? 'bg-sky-600'
              : 'bg-slate-300'

          const label =
            isDone
              ? 'Completed'
              : isActive
                ? 'Running…'
                : 'Queued'

          return (
            <div
              key={step.id}
              className={`relative flex flex-col gap-1 rounded-2xl p-3 text-xs shadow-sm ring-1 ${ringColor}`}
            >
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900/80 text-[11px] font-semibold text-sky-50 shadow-sm">
                  {step.name[0]}
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-900">
                    {step.name}
                    <span className="ml-1 text-[10px] font-medium text-slate-500">
                      {step.label}
                    </span>
                  </p>
                  <div className="mt-0.5 flex items-center gap-1 text-[10px] text-slate-600">
                    <span className={`h-1.5 w-1.5 rounded-full ${dotColor}`} />
                    <span>{label}</span>
                  </div>
                </div>
              </div>
              <p className="mt-1 line-clamp-2 text-[11px] text-slate-700">
                {step.description}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

