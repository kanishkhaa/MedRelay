import React from 'react'
import { useHandoff } from '../../context/HandoffContext'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'

export function Header() {
  const {
    user,
    handoffProgress,
    darkMode,
    setDarkMode,
    riskCounts,
  } = useHandoff()

  const initials = user?.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase() ?? 'MR'

  const isProcessing = handoffProgress > 0 && handoffProgress < 100

  return (
    <header className="flex items-center justify-between gap-4 border-b border-slate-200 bg-white/60 px-5 py-3 backdrop-blur-sm">
      <div className="flex flex-1 items-center gap-6">
        <div>
          <h1 className="text-lg font-semibold text-slate-900">
            {user ? 'Live Clinical Handoff' : 'Welcome to MedRelay'}
          </h1>
          <p className="mt-0.5 text-xs text-slate-500">
            Structured, AI-assisted patient handoffs for safer care transitions.
          </p>
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-500">
              Handoff completion
            </span>
            <div className="h-1.5 w-36 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-sky-700 transition-all"
                style={{ width: `${handoffProgress}%` }}
              />
            </div>
            <span className="text-xs font-semibold text-slate-700">
              {handoffProgress}%
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant={riskCounts.high > 0 ? 'danger' : 'neutral'}>
              High risk: {riskCounts.high}
            </Badge>
            <Badge variant={riskCounts.medium > 0 ? 'warning' : 'neutral'}>
              Medium: {riskCounts.medium}
            </Badge>
            <Badge variant="info">
              Low: {riskCounts.low}
            </Badge>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {isProcessing && (
          <div className="flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-800 ring-1 ring-sky-100">
            <span className="h-2 w-2 animate-pulse rounded-full bg-sky-500" />
            <span>AI processing handoff…</span>
          </div>
        )}

        <Button
          variant="ghost"
          size="icon"
          aria-label="Toggle dark mode"
          onClick={() => setDarkMode(!darkMode)}
          className="rounded-full text-slate-500 hover:bg-slate-100"
        >
          {darkMode ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4 w-4"
            >
              <path d="M10 2a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 2ZM4.227 4.227a.75.75 0 0 1 1.06 0L6.35 5.29a.75.75 0 1 1-1.06 1.06L4.227 5.287a.75.75 0 0 1 0-1.06ZM2.75 10a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5A.75.75 0 0 1 2.75 10Zm10.25-4.71a.75.75 0 0 1 1.06-1.06l1.06 1.06a.75.75 0 1 1-1.06 1.06l-1.06-1.06ZM10 6.25a3.75 3.75 0 1 1 0 7.5 3.75 3.75 0 0 1 0-7.5ZM4.227 14.713a.75.75 0 0 1 1.06 0l1.06 1.06a.75.75 0 1 1-1.06 1.06l-1.06-1.06a.75.75 0 0 1 0-1.06Zm10.546 0a.75.75 0 0 1 1.06 0 4.5 4.5 0 1 1-6.566-6.152.75.75 0 0 1 .79 1.264 3 3 0 1 0 4.386 4.386.75.75 0 0 1 .33-.498Z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4 w-4"
            >
              <path
                fillRule="evenodd"
                d="M9.598 2.004a.75.75 0 0 1 .785.174 5.5 5.5 0 0 0 7.438 7.438.75.75 0 0 1 .95 1.137 7 7 0 1 1-8.59-8.59.75.75 0 0 1 .417-.159Z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </Button>

        <button
          type="button"
          className="relative rounded-full p-2 text-slate-500 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
          aria-label="Notifications"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-4 w-4"
          >
            <path d="M10 2a4 4 0 0 0-4 4v1.154c0 .34-.09.674-.26.968L4.2 9.887C3.44 11.2 4.39 13 5.93 13H14.07c1.54 0 2.49-1.8 1.73-3.113l-1.54-2.765A2 2 0 0 1 14 7.154V6a4 4 0 0 0-4-4Z" />
            <path d="M8.5 14.75a1.5 1.5 0 0 0 3 0h-3Z" />
          </svg>
          <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-red-500" />
        </button>

        <div className="flex items-center gap-2 rounded-full bg-slate-50 px-2.5 py-1.5 ring-1 ring-slate-200">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-700 text-xs font-semibold text-white">
            {initials}
          </div>
          <div className="hidden text-right text-xs leading-tight sm:block">
            <div className="font-medium text-slate-900">
              {user?.name ?? 'Not signed in'}
            </div>
            <div className="text-[11px] uppercase tracking-wide text-slate-500">
              {user?.role ?? 'Role not set'}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

