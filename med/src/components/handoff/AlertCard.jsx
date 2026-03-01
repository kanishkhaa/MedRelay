import React from 'react'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'

const levelStyles = {
  High: {
    border: 'border-red-400',
    badge: 'danger',
    label: 'High risk',
  },
  Medium: {
    border: 'border-amber-400',
    badge: 'warning',
    label: 'Medium risk',
  },
  Low: {
    border: 'border-sky-400',
    badge: 'info',
    label: 'Low risk',
  },
}

export function AlertCard({ alert, onAcknowledge, disabled }) {
  const styles = levelStyles[alert.level] ?? levelStyles.Low

  return (
    <article
      className={`relative rounded-2xl border-l-4 ${styles.border} bg-white/90 p-4 shadow-sm ring-1 ring-slate-100`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-slate-900">
              {alert.title}
            </h3>
            <Badge variant={styles.badge}>
              {styles.label}
            </Badge>
          </div>
          <p className="mt-1 text-xs text-slate-600">
            {alert.description}
          </p>
        </div>
        <Button
          variant={alert.acknowledged ? 'subtle' : 'outline'}
          size="sm"
          onClick={() => onAcknowledge(alert.id)}
          disabled={alert.acknowledged || disabled}
        >
          {alert.acknowledged ? 'Acknowledged' : 'Acknowledge'}
        </Button>
      </div>
    </article>
  )
}

