import React, { useMemo, useState } from 'react'
import { useHandoff } from '../context/HandoffContext'
import { PatientTableRow } from '../components/dashboard/PatientTableRow'
import { StatusIndicator } from '../components/ui/StatusIndicator'

export function DashboardScreen() {
  const {
    patients,
    setActivePatientId,
    setActiveView,
  } = useHandoff()

  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')

  const filteredPatients = useMemo(() => {
    return patients.filter((patient) => {
      const matchesSearch =
        patient.name.toLowerCase().includes(search.toLowerCase()) ||
        patient.bed.toLowerCase().includes(search.toLowerCase())
      const matchesFilter =
        filter === 'All' ||
        (filter === 'High Risk' && patient.risk === 'High') ||
        (filter === 'Active Handoff' && patient.activeHandoff)
      return matchesSearch && matchesFilter
    })
  }, [patients, search, filter])

  const startHandoff = (patient) => {
    setActivePatientId(patient.id)
    setActiveView('handoff')
  }

  return (
    <div className="flex h-full flex-col gap-4 bg-slate-100/70 p-4 md:p-5">
      <section className="grid gap-4 rounded-2xl bg-gradient-to-r from-sky-900 via-sky-800 to-emerald-700 p-4 text-sky-50 shadow-md ring-1 ring-sky-500/40 md:grid-cols-[minmax(0,1.7fr)_minmax(0,1.1fr)]">
        <div className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-200">
            MedRelay · Intelligent clinical handoff
          </p>
          <h2 className="text-xl font-semibold leading-snug">
            Eliminating preventable deaths from broken handoffs.
          </h2>
          <p className="text-xs text-sky-100/90">
            A passive, voice-native, four-agent AI system that listens to bedside conversations, structures SBAR, flags risk, and delivers a signable handoff in seconds.
          </p>
          <p className="text-[11px] text-sky-100/80">
            Agents: <span className="font-semibold">Relay</span> (listener) · <span className="font-semibold">Extract</span> (SBAR) · <span className="font-semibold">Sentinel</span> (risk) · <span className="font-semibold">Bridge</span> (summary)
          </p>
        </div>
        <div className="grid gap-2 text-xs md:grid-cols-3">
          <div className="rounded-2xl bg-slate-900/40 p-3 ring-1 ring-sky-400/40">
            <p className="text-[10px] uppercase tracking-wide text-sky-200">
              Preventable deaths / year (US)
            </p>
            <p className="mt-1 text-lg font-semibold text-white">
              250,000+
            </p>
          </div>
          <div className="rounded-2xl bg-slate-900/40 p-3 ring-1 ring-sky-400/40">
            <p className="text-[10px] uppercase tracking-wide text-sky-200">
              Errors happening at handoffs
            </p>
            <p className="mt-1 text-lg font-semibold text-white">
              ~80%
            </p>
          </div>
          <div className="rounded-2xl bg-slate-900/40 p-3 ring-1 ring-sky-400/40">
            <p className="text-[10px] uppercase tracking-wide text-sky-200">
              Annual cost to US healthcare
            </p>
            <p className="mt-1 text-lg font-semibold text-white">
              $17B
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Unit status
            </h2>
            <span className="text-xs text-slate-400">
              {patients.length} patients
            </span>
          </div>
          <div className="mt-3 space-y-2 text-sm">
            <StatusIndicator
              status="stable"
              label="Stable patients"
            />
            <StatusIndicator
              status="observation"
              label="Under observation"
            />
            <StatusIndicator
              status="critical"
              label="Critical care"
            />
          </div>
        </div>

        <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 md:col-span-2">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Active handoff guidance
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Prioritize high-risk patients and those with active handoffs. MedRelay keeps a structured SBAR view aligned with your live conversation.
          </p>
        </div>
      </section>

      <section className="flex-1 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
        <div className="flex flex-col gap-3 pb-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">
              Patient list
            </h2>
            <p className="text-xs text-slate-500">
              Select a patient to begin or resume a structured handoff.
            </p>
          </div>
          <div className="flex flex-col gap-2 md:flex-row md:items-center">
            <div className="relative">
              <input
                type="search"
                placeholder="Search by name or bed"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-8 pr-3 py-1.5 text-xs text-slate-900 shadow-sm outline-none focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-100 md:w-56"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
              <span className="pointer-events-none absolute inset-y-0 left-2 flex items-center text-slate-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-3.5 w-3.5"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 3.5a5.5 5.5 0 1 0 3.473 9.8.75.75 0 0 1 .948.115l2.75 2.75a.75.75 0 1 1-1.06 1.06l-2.75-2.75a.75.75 0 0 1-.115-.948A5.5 5.5 0 0 0 9 3.5ZM5 9a4 4 0 1 1 8 0 4 4 0 0 1-8 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
            <select
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs text-slate-900 shadow-sm outline-none focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-100 md:w-40"
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
            >
              <option>All</option>
              <option>High Risk</option>
              <option>Active Handoff</option>
            </select>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-100">
          <table className="min-w-full divide-y divide-slate-100 text-left">
            <thead className="bg-slate-50/80 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-3 py-2 font-medium">
                  Bed
                </th>
                <th className="px-3 py-2 font-medium">
                  Patient
                </th>
                <th className="px-3 py-2 font-medium">
                  Status
                </th>
                <th className="px-3 py-2 font-medium">
                  Risk
                </th>
                <th className="px-3 py-2 font-medium">
                  Handoff
                </th>
                <th className="px-3 py-2 text-right font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white text-sm">
              {filteredPatients.map((patient) => (
                <PatientTableRow
                  key={patient.id}
                  patient={patient}
                  onStartHandoff={startHandoff}
                />
              ))}
              {filteredPatients.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-3 py-6 text-center text-xs text-slate-500"
                  >
                    No patients match the current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

