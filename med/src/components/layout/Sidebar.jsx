import React from 'react'
import { useHandoff } from '../../context/HandoffContext'
import { Button } from '../ui/Button'

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: 'grid' },
  { id: 'handoff', label: 'Live Handoff', icon: 'wave' },
  { id: 'reports', label: 'Reports', icon: 'table' },
]

function Icon({ name, className = '' }) {
  if (name === 'grid') {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className={className}
      >
        <path d="M3 4.75A1.75 1.75 0 0 1 4.75 3h2.5A1.75 1.75 0 0 1 9 4.75v2.5A1.75 1.75 0 0 1 7.25 9h-2.5A1.75 1.75 0 0 1 3 7.25v-2.5ZM11 4.75A1.75 1.75 0 0 1 12.75 3h2.5A1.75 1.75 0 0 1 17 4.75v2.5A1.75 1.75 0 0 1 15.25 9h-2.5A1.75 1.75 0 0 1 11 7.25v-2.5ZM3 12.75A1.75 1.75 0 0 1 4.75 11h2.5A1.75 1.75 0 0 1 9 12.75v2.5A1.75 1.75 0 0 1 7.25 17h-2.5A1.75 1.75 0 0 1 3 15.25v-2.5ZM11 12.75A1.75 1.75 0 0 1 12.75 11h2.5A1.75 1.75 0 0 1 17 12.75v2.5A1.75 1.75 0 0 1 15.25 17h-2.5A1.75 1.75 0 0 1 11 15.25v-2.5Z" />
      </svg>
    )
  }
  if (name === 'wave') {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className={className}
      >
        <path d="M3.5 5.75A.75.75 0 0 1 4.25 5h1.5a.75.75 0 0 1 .7.48l2.6 6.7 2.8-7.7A.75.75 0 0 1 12.5 4h3a.75.75 0 0 1 0 1.5h-2.43l-3.08 8.47a.75.75 0 0 1-1.4.02L6 7.19l-1.05 2.8A.75.75 0 0 1 3 9.5v-3.75a.75.75 0 0 1 .5-.7Z" />
      </svg>
    )
  }
  if (name === 'table') {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className={className}
      >
        <path d="M4.5 4A1.5 1.5 0 0 0 3 5.5v1.75h14V5.5A1.5 1.5 0 0 0 15.5 4h-11Z" />
        <path d="M17 9.25H3v5.25A1.5 1.5 0 0 0 4.5 16h11A1.5 1.5 0 0 0 17 14.5V9.25Z" />
      </svg>
    )
  }
  if (name === 'logo') {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        className={className}
      >
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="6"
          className="fill-sky-700"
        />
        <path
          d="M8 12.5h3.25L10 9.5h3L12 6.5"
          className="stroke-white"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 11.5h-3.25L14 14.5h-3l1 3"
          className="stroke-sky-100"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }
  if (name === 'chevron') {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className={className}
      >
        <path
          fillRule="evenodd"
          d="M7.22 4.22a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06L10.94 10 7.22 6.28a.75.75 0 0 1 0-1.06Z"
          clipRule="evenodd"
        />
      </svg>
    )
  }
  return null
}

export function Sidebar({ collapsed, onToggle }) {
  const { activeView, setActiveView } = useHandoff()

  return (
    <aside
      className={`flex h-full flex-col border-r border-slate-200 bg-white/80 backdrop-blur-sm transition-all duration-200 ${
        collapsed ? 'w-16' : 'w-60'
      }`}
    >
      <div className="flex items-center justify-between gap-2 px-3 py-4">
        <div className="flex items-center gap-2">
          <Icon name="logo" className="h-7 w-7" />
          {!collapsed && (
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-slate-900">
                MedRelay
              </span>
              <span className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                Clinical Handoff
              </span>
            </div>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="rounded-full text-slate-500 hover:bg-slate-100"
        >
          <Icon
            name="chevron"
            className={`h-4 w-4 transition-transform ${
              collapsed ? 'rotate-180' : ''
            }`}
          />
        </Button>
      </div>

      <nav className="mt-2 flex-1 space-y-1 px-2">
        {navItems.map((item) => {
          const isActive = activeView === item.id || (item.id === 'handoff' && activeView === 'handoff')
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveView(item.id)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-sky-700 text-white shadow-sm'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Icon
                name={item.icon}
                className={`h-4 w-4 ${
                  isActive ? 'text-sky-50' : 'text-slate-500'
                }`}
              />
              {!collapsed && <span>{item.label}</span>}
            </button>
          )
        })}
      </nav>

      <div className="border-t border-slate-100 px-3 py-3 text-[11px] text-slate-400">
        {!collapsed && (
          <>
            <p className="font-medium uppercase tracking-wide">
              For clinical use only
            </p>
            <p className="mt-1">
              Do not rely solely on AI output. Always verify with the clinical record.
            </p>
          </>
        )}
      </div>
    </aside>
  )
}

