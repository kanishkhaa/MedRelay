import React from 'react'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { StatusIndicator } from '../ui/StatusIndicator'

export function PatientTableRow({ patient, onStartHandoff }) {
  const riskVariant =
    patient.risk === 'High'
      ? 'danger'
      : patient.risk === 'Medium'
        ? 'warning'
        : 'info'

  return (
    <tr className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60">
      <td className="whitespace-nowrap px-3 py-3 text-sm font-medium text-slate-900">
        {patient.bed}
      </td>
      <td className="px-3 py-3">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-slate-900">
            {patient.name}
          </span>
          <span className="text-xs text-slate-500">
            {patient.condition}
          </span>
        </div>
      </td>
      <td className="px-3 py-3">
        <StatusIndicator
          status={
            patient.status === 'Critical'
              ? 'critical'
              : patient.status === 'Under Observation'
                ? 'observation'
                : 'stable'
          }
          label={patient.status}
        />
      </td>
      <td className="px-3 py-3">
        <Badge variant={riskVariant}>
          {patient.risk} risk
        </Badge>
      </td>
      <td className="px-3 py-3 text-sm">
        {patient.activeHandoff ? (
          <Badge variant="info">
            Active handoff
          </Badge>
        ) : (
          <span className="text-xs text-slate-400">
            No active handoff
          </span>
        )}
      </td>
      <td className="px-3 py-3 text-right">
        <Button
          size="sm"
          onClick={() => onStartHandoff(patient)}
        >
          Start handoff
        </Button>
      </td>
    </tr>
  )
}

