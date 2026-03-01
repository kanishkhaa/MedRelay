import React from 'react'

const baseClasses =
  'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

const variants = {
  primary:
    'bg-sky-700 text-white hover:bg-sky-800 focus-visible:ring-sky-600 focus-visible:ring-offset-slate-100',
  ghost:
    'bg-transparent text-slate-800 hover:bg-slate-100 focus-visible:ring-slate-300 focus-visible:ring-offset-slate-100',
  outline:
    'border border-slate-300 bg-white text-slate-900 hover:bg-slate-50 focus-visible:ring-sky-600 focus-visible:ring-offset-slate-100',
  subtle:
    'bg-slate-100 text-slate-900 hover:bg-slate-200 focus-visible:ring-slate-300 focus-visible:ring-offset-slate-100',
  destructive:
    'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600 focus-visible:ring-offset-slate-100',
}

const sizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-5 py-2.5 text-base',
  icon: 'p-2 text-sm',
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) {
  const variantClasses = variants[variant] ?? variants.primary
  const sizeClasses = sizes[size] ?? sizes.md

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

