import React from 'react'

const colorMap = {
  stable: 'bg-emerald-500',
  critical: 'bg-red-600',
  observation: 'bg-amber-400',
  info: 'bg-sky-500',
}

export function StatusIndicator({ status, label }) {
  const key = status?.toLowerCase() ?? 'info'
  const colorClass = colorMap[key] ?? colorMap.info

  return (
    <div className="inline-flex items-center gap-2">
      <span className={`h-2.5 w-2.5 rounded-full ${colorClass}`} />
      <span className="text-xs font-medium text-slate-700">
        {label ?? status}
      </span>
    </div>
  )
}

