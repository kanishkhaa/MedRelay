import React, { useState } from 'react'
import { Badge } from '../ui/Badge'

export function SBARCard({
  title,
  fieldKey,
  value,
  onChange,
  locked,
}) {
  const [open, setOpen] = useState(true)
  const isCompleted = value.trim().length > 0

  return (
    <section className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm">
      <header className="flex items-center justify-between gap-2">
        <button
          type="button"
          className="flex flex-1 items-center gap-3 text-left"
          onClick={() => setOpen(!open)}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-50 text-sm font-semibold text-sky-700 ring-1 ring-sky-100">
            {title[0]}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              {title}
            </h3>
            <p className="text-xs text-slate-500">
              {fieldKey === 'situation' && 'Why the patient is here now.'}
              {fieldKey === 'background' && 'Relevant clinical history and context.'}
              {fieldKey === 'assessment' && 'Your clinical assessment and concerns.'}
              {fieldKey === 'recommendation' && 'What you recommend should happen next.'}
            </p>
          </div>
        </button>
        <div className="flex flex-col items-end gap-1">
          {isCompleted ? (
            <Badge variant="success">
              Completed
            </Badge>
          ) : (
            <Badge variant="warning">
              Pending
            </Badge>
          )}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
            aria-label={open ? 'Collapse section' : 'Expand section'}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className={`h-4 w-4 transition-transform ${
                open ? 'rotate-0' : '-rotate-90'
              }`}
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 0 1 1.08 1.04l-4.25 4.25a.75.75 0 0 1-1.08 0L5.21 8.27a.75.75 0 0 1 .02-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </header>

      {open && (
        <div className="mt-3">
          <textarea
            className={`min-h-28 w-full resize-none rounded-xl border px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition-colors ${
              isCompleted
                ? 'border-slate-200 bg-white focus:border-sky-400 focus:ring-2 focus:ring-sky-100'
                : 'border-amber-300 bg-amber-50/40 placeholder:text-amber-400 focus:border-amber-400 focus:ring-2 focus:ring-amber-100'
            } ${locked ? 'cursor-not-allowed opacity-60' : ''}`}
            placeholder="Type concise, clinically relevant details. Avoid copy-pasting entire notes."
            value={value}
            onChange={(e) => onChange(fieldKey, e.target.value)}
            disabled={locked}
          />
          {!isCompleted && (
            <p className="mt-1 text-[11px] font-medium uppercase tracking-wide text-amber-500">
              Missing information – please complete this section.
            </p>
          )}
        </div>
      )}
    </section>
  )
}

