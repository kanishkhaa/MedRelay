import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useHandoff } from '../context/HandoffContext'
import { TranscriptBubble } from '../components/handoff/TranscriptBubble'
import { SBARCard } from '../components/handoff/SBARCard'
import { AlertCard } from '../components/handoff/AlertCard'
import { VoiceControl } from '../components/handoff/VoiceControl'
import { AgentPipeline } from '../components/handoff/AgentPipeline'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'

const queuedMessages = [
  {
    id: 4,
    speaker: 'Incoming Nurse',
    timestamp: '14:04',
    text: 'Any recent changes in vitals or mental status?',
  },
  {
    id: 5,
    speaker: 'Outgoing Nurse',
    timestamp: '14:04',
    text: 'MAP has been stable for the last hour, slightly more alert after fluids.',
  },
  {
    id: 6,
    speaker: 'Incoming Nurse',
    timestamp: '14:05',
    text: 'Okay, I will prioritize monitoring urine output and mental status closely.',
  },
]

export function HandoffScreen() {
  const {
    activePatient,
    transcriptMessages,
    setTranscriptMessages,
    sbar,
    setSbar,
    alerts,
    setAlerts,
    verification,
    setVerification,
    handoffLocked,
    setHandoffLocked,
  } = useHandoff()

  const [localQueue] = useState(queuedMessages)
  const [queueIndex, setQueueIndex] = useState(0)
  const [listening, setListening] = useState(true)
  const transcriptRef = useRef(null)

  useEffect(() => {
    if (!listening || queueIndex >= localQueue.length || handoffLocked) return

    const timer = setTimeout(() => {
      setTranscriptMessages((current) => [...current, localQueue[queueIndex]])
      setQueueIndex((current) => current + 1)
    }, 3500)

    return () => clearTimeout(timer)
  }, [queueIndex, localQueue, setTranscriptMessages, handoffLocked, listening])

  useEffect(() => {
    if (!transcriptRef.current) return
    const container = transcriptRef.current
    container.scrollTop = container.scrollHeight
  }, [transcriptMessages])

  const handleSbarChange = (field, value) => {
    if (handoffLocked) return
    setSbar((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleAcknowledge = (id) => {
    if (handoffLocked) return
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === id ? { ...alert, acknowledged: true } : alert,
      ),
    )
  }

  const handleConfirmChange = (event) => {
    const checked = event.target.checked
    setVerification((prev) => ({
      ...prev,
      confirmed: checked,
    }))
  }

  const handleSignOff = () => {
    setVerification({
      confirmed: true,
      signedOff: true,
    })
    setHandoffLocked(true)
  }

  const summaryText = useMemo(() => {
    if (!activePatient) {
      return 'No active patient selected. Choose a patient from the dashboard to begin a structured handoff.'
    }

    const pieces = []
    if (sbar.situation) {
      pieces.push(`Situation: ${sbar.situation}`)
    }
    if (sbar.background) {
      pieces.push(`Background: ${sbar.background}`)
    }
    if (sbar.assessment) {
      pieces.push(`Assessment: ${sbar.assessment}`)
    }
    if (sbar.recommendation) {
      pieces.push(`Recommendation: ${sbar.recommendation}`)
    }

    if (pieces.length === 0) {
      return 'As you complete the SBAR sections, an AI-ready summary of this handoff will appear here for quick review and verification.'
    }

    return pieces.join(' ')
  }, [activePatient, sbar])

  const hasUnacknowledgedHighRisk = alerts.some(
    (alert) => alert.level === 'High' && !alert.acknowledged,
  )

  const canSignOff =
    verification.confirmed && !handoffLocked && !hasUnacknowledgedHighRisk

  const pipelinePhase = useMemo(() => {
    if (verification.signedOff || handoffLocked) return 4
    if (sbar.assessment || sbar.recommendation) return 3
    if (queueIndex > 0) return 2
    return 1
  }, [
    verification.signedOff,
    handoffLocked,
    sbar.assessment,
    sbar.recommendation,
    queueIndex,
  ])

  return (
    <div className="relative flex h-full flex-col gap-4 bg-slate-100/70 p-4 md:p-5">
      <section className="grid gap-3 rounded-2xl bg-gradient-to-r from-sky-50 via-slate-50 to-emerald-50 p-4 shadow-sm ring-1 ring-sky-100/70 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1.1fr)]">
        <AgentPipeline phase={pipelinePhase} />
        <VoiceControl
          listening={listening}
          onToggle={() => {
            if (handoffLocked) return
            setListening((prev) => !prev)
          }}
          handoffLocked={handoffLocked}
        />
      </section>

      <div className="grid flex-1 gap-4 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1.1fr)_minmax(0,1fr)]">
        <section className="flex flex-col rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <header className="mb-3 flex items-center justify-between gap-2">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">
                Live transcript
              </h2>
              <p className="text-xs text-slate-500">
                Real-time capture of the verbal handoff between clinicians.
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1.5 text-[11px] font-medium text-slate-600 ring-1 ring-slate-200">
              <span className="relative flex h-2.5 w-2.5 items-center justify-center">
                <span className="absolute inline-flex h-2.5 w-2.5 animate-ping rounded-full bg-emerald-400/70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-600" />
              </span>
              <span>
                {handoffLocked
                  ? 'Session verified'
                  : listening
                    ? 'Voice capture active'
                    : 'Voice capture paused (demo)'}
              </span>
            </div>
          </header>

          <div
            ref={transcriptRef}
            className="relative flex-1 space-y-3 overflow-y-auto rounded-2xl border border-slate-100 bg-slate-50/60 p-3 pr-2 text-sm"
          >
            {transcriptMessages.map((message) => (
              <TranscriptBubble
                key={message.id}
                message={message}
              />
            ))}
          </div>
        </section>

        <section className="flex flex-col rounded-2xl bg-transparent">
          <div className="mb-3 flex items-center justify-between gap-2">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">
                Structured SBAR
              </h2>
              <p className="text-xs text-slate-500">
                Capture only the most critical information needed for a safe handoff.
              </p>
            </div>
            {activePatient && (
              <div className="rounded-xl bg-white px-3 py-2 text-xs shadow-sm ring-1 ring-slate-200">
                <p className="font-medium text-slate-900">
                  {activePatient.name}
                </p>
                <p className="text-[11px] text-slate-500">
                  Bed {activePatient.bed} · {activePatient.status}
                </p>
              </div>
            )}
          </div>

          <div className="grid flex-1 gap-3">
            <SBARCard
              title="S — Situation"
              fieldKey="situation"
              value={sbar.situation}
              onChange={handleSbarChange}
              locked={handoffLocked}
            />
            <SBARCard
              title="B — Background"
              fieldKey="background"
              value={sbar.background}
              onChange={handleSbarChange}
              locked={handoffLocked}
            />
            <SBARCard
              title="A — Assessment"
              fieldKey="assessment"
              value={sbar.assessment}
              onChange={handleSbarChange}
              locked={handoffLocked}
            />
            <SBARCard
              title="R — Recommendation"
              fieldKey="recommendation"
              value={sbar.recommendation}
              onChange={handleSbarChange}
              locked={handoffLocked}
            />
          </div>
        </section>

        <section className="flex flex-col rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <header className="mb-3 flex items-center justify-between gap-2">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">
                Risk alerts
              </h2>
              <p className="text-xs text-slate-500">
                AI-surfaced risks that require acknowledgement as part of the handoff.
              </p>
            </div>
            {hasUnacknowledgedHighRisk ? (
              <Badge variant="danger">
                High-risk alerts pending
              </Badge>
            ) : (
              <Badge variant="neutral">
                All high-risk alerts acknowledged
              </Badge>
            )}
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto">
            {alerts.map((alert) => (
              <AlertCard
                key={alert.id}
                alert={alert}
                onAcknowledge={handleAcknowledge}
                disabled={handoffLocked}
              />
            ))}
          </div>
        </section>
      </div>

      <section className="sticky bottom-0 z-10 mt-1 rounded-2xl bg-white/95 p-4 shadow-[0_-4px_18px_rgba(15,23,42,0.08)] ring-1 ring-slate-200">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex-1">
            <div className="mb-1 flex items-center gap-2">
              <h2 className="text-sm font-semibold text-slate-900">
                Verification & digital sign-off
              </h2>
              {verification.signedOff && (
                <Badge variant="success">
                  <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Verified
                </Badge>
              )}
            </div>
            <div className="rounded-xl bg-slate-50/80 p-3 text-xs text-slate-700 ring-1 ring-slate-100">
              <p className="line-clamp-2">
                {summaryText}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2 md:w-72">
            <label className="flex items-start gap-2 text-[11px] text-slate-600">
              <input
                type="checkbox"
                className="mt-0.5 h-3.5 w-3.5 rounded border-slate-300 text-sky-700 focus:ring-sky-500"
                checked={verification.confirmed}
                onChange={handleConfirmChange}
                disabled={handoffLocked}
              />
              <span>
                I confirm that this handoff accurately reflects the current clinical status and plan for this patient.
              </span>
            </label>
            <Button
              type="button"
              className="w-full justify-center md:w-auto"
              disabled={!canSignOff}
              onClick={handleSignOff}
            >
              {verification.signedOff ? 'Handoff verified' : 'Digitally sign & lock handoff'}
            </Button>
            {hasUnacknowledgedHighRisk && !handoffLocked && (
              <p className="text-[11px] font-medium text-red-600">
                All high-risk alerts must be acknowledged before sign-off.
              </p>
            )}
          </div>
        </div>

        {handoffLocked && (
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-slate-900/5 ring-1 ring-emerald-400/30" />
        )}
      </section>

      {handoffLocked && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-2xl bg-slate-900/10">
          <div className="rounded-2xl bg-white/90 px-6 py-4 text-center shadow-lg ring-1 ring-emerald-300">
            <p className="text-sm font-semibold text-slate-900">
              Handoff verified and locked
            </p>
            <p className="mt-1 text-xs text-slate-600">
              This record is now read-only. Start a new handoff if the clinical status changes.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

