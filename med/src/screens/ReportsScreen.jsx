import React, { useState } from 'react'
import { Modal } from '../components/ui/Modal'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'

const mockReports = [
  {
    id: 'r1',
    patient: 'Maria Lopez',
    date: '2026-03-01 13:40',
    verifiedBy: 'K. Shah, RN',
    riskCount: 3,
    sbar: {
      situation:
        'Admitted from ED with chest pain, rule out acute coronary syndrome.',
      background:
        'History of hypertension, hyperlipidemia, and prior NSTEMI in 2022. On aspirin and beta-blocker at home.',
      assessment:
        'Currently hemodynamically stable, mild discomfort at rest, troponin pending, EKG with non-specific ST-T changes.',
      recommendation:
        'Continuous telemetry monitoring, repeat troponin in 3 hours, cardiology consult if biomarkers trend up.',
    },
  },
  {
    id: 'r2',
    patient: 'Samuel Kim',
    date: '2026-03-01 12:10',
    verifiedBy: 'L. Patel, MD',
    riskCount: 5,
    sbar: {
      situation:
        'ICU transfer for septic shock requiring vasopressors.',
      background:
        'Admitted with pneumonia, progressively hypotensive despite fluids, lactate 3.8 on arrival.',
      assessment:
        'On norepinephrine, MAP 68, urine output improving, lactate down-trending.',
      recommendation:
        'Continue current pressor support, maintain MAP > 65, reassess fluid responsiveness, repeat lactate in 4 hours.',
    },
  },
]

export function ReportsScreen() {
  const [selectedReport, setSelectedReport] = useState(null)

  return (
    <div className="flex h-full flex-col gap-4 bg-slate-100/70 p-4 md:p-5">
      <section className="flex items-center justify-between gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">
            Completed handoff reports
          </h2>
          <p className="text-xs text-slate-500">
            Review structured SBAR summaries and verification history for completed handoffs.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          type="button"
        >
          Export summary (UI only)
        </Button>
      </section>

      <section className="flex-1 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
        <div className="overflow-hidden rounded-xl border border-slate-100">
          <table className="min-w-full divide-y divide-slate-100 text-left">
            <thead className="bg-slate-50/80 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-3 py-2 font-medium">
                  Patient
                </th>
                <th className="px-3 py-2 font-medium">
                  Date
                </th>
                <th className="px-3 py-2 font-medium">
                  Verified by
                </th>
                <th className="px-3 py-2 font-medium">
                  Risk count
                </th>
                <th className="px-3 py-2 text-right font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white text-sm">
              {mockReports.map((report) => (
                <tr
                  key={report.id}
                  className="hover:bg-slate-50/60"
                >
                  <td className="px-3 py-3">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-slate-900">
                        {report.patient}
                      </span>
                      <span className="text-xs text-slate-500">
                        Completed handoff
                      </span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-sm text-slate-700">
                    {report.date}
                  </td>
                  <td className="px-3 py-3 text-sm text-slate-700">
                    {report.verifiedBy}
                  </td>
                  <td className="px-3 py-3">
                    <Badge variant={report.riskCount > 3 ? 'danger' : 'warning'}>
                      {report.riskCount} alerts
                    </Badge>
                  </td>
                  <td className="px-3 py-3 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      type="button"
                      onClick={() => setSelectedReport(report)}
                    >
                      View SBAR
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <Modal
        open={Boolean(selectedReport)}
        title={selectedReport ? `SBAR summary – ${selectedReport.patient}` : ''}
        onClose={() => setSelectedReport(null)}
        footer={(
          <Button
            variant="outline"
            size="sm"
            type="button"
            onClick={() => setSelectedReport(null)}
          >
            Close
          </Button>
        )}
      >
        {selectedReport && (
          <div className="space-y-3 text-sm text-slate-800">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                S – Situation
              </h3>
              <p className="mt-1">
                {selectedReport.sbar.situation}
              </p>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                B – Background
              </h3>
              <p className="mt-1">
                {selectedReport.sbar.background}
              </p>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                A – Assessment
              </h3>
              <p className="mt-1">
                {selectedReport.sbar.assessment}
              </p>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                R – Recommendation
              </h3>
              <p className="mt-1">
                {selectedReport.sbar.recommendation}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

