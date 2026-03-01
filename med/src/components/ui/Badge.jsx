import React from 'react'

const variantClasses = {
  neutral: 'bg-slate-100 text-slate-800 ring-slate-200',
  success: 'bg-emerald-50 text-emerald-800 ring-emerald-200',
  warning: 'bg-amber-50 text-amber-800 ring-amber-200',
  danger: 'bg-red-50 text-red-800 ring-red-200',
  info: 'bg-sky-50 text-sky-800 ring-sky-200',
}

export function Badge({ variant = 'neutral', className = '', children }) {
  const classes = variantClasses[variant] ?? variantClasses.neutral

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ${classes} ${className}`}
    >
      {children}
    </span>
  )
}

