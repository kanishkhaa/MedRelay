import React from 'react'

export function VoiceControl({ listening, onToggle, handoffLocked }) {
  const stateLabel = handoffLocked
    ? 'Session locked'
    : listening
      ? 'Listening to bedside handoff'
      : 'Tap to resume listening'

  const subLabel = handoffLocked
    ? 'Audio controls are disabled once both clinicians have signed off.'
    : listening
      ? 'MedRelay is passively capturing the conversation for Whisper transcription.'
      : 'Mic is paused for this demo. Resume to continue simulated transcript.'

  const buttonBase =
    'relative flex h-16 w-16 items-center justify-center rounded-full shadow-lg transition-transform duration-150'
  const buttonColors = handoffLocked
    ? 'bg-slate-300 text-slate-600'
    : listening
      ? 'bg-gradient-to-br from-sky-500 via-sky-600 to-sky-700 text-white'
      : 'bg-white text-sky-700 ring-2 ring-sky-500/60'

  return (
    <div className="flex items-center gap-4 rounded-2xl bg-slate-900/5 p-3 ring-1 ring-white/40 backdrop-blur-sm">
      <button
        type="button"
        onClick={onToggle}
        disabled={handoffLocked}
        className="relative inline-flex items-center justify-center"
        aria-label={listening ? 'Pause microphone' : 'Start microphone'}
      >
        {listening && !handoffLocked && (
          <span className="absolute inline-flex h-20 w-20 animate-ping rounded-full bg-sky-400/40" />
        )}
        <span className={`${buttonBase} ${buttonColors}`}>
          <span className="absolute inset-0 rounded-full bg-white/10" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="relative h-7 w-7"
          >
            <path d="M7.75 4A2.25 2.25 0 0 1 10 1.75h0A2.25 2.25 0 0 1 12.25 4v4A2.25 2.25 0 0 1 10 10.25h0A2.25 2.25 0 0 1 7.75 8V4Z" />
            <path d="M5.5 7.75a.75.75 0 0 1 .75.75 3.75 3.75 0 1 0 7.5 0 .75.75 0 0 1 1.5 0 5.25 5.25 0 0 1-4.5 5.19v1.31h2.25a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1 0-1.5H9.5v-1.31A5.25 5.25 0 0 1 5 8.5a.75.75 0 0 1 .75-.75Z" />
          </svg>
        </span>
      </button>

      <div className="flex-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">
          Voice capture
        </p>
        <p className="text-sm font-medium text-slate-900">
          {stateLabel}
        </p>
        <p className="mt-0.5 text-[11px] text-slate-600">
          {subLabel}
        </p>
        {!handoffLocked && (
          <div className="mt-2 flex h-5 items-center gap-1.5">
            {[0.4, 0.8, 0.6, 1, 0.7, 0.5].map((height, index) => (
              <span
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                className="w-0.5 rounded-full bg-sky-500/70"
                style={{
                  height: `${height * 18}px`,
                  animation: listening
                    ? `bounce-${index} 1.1s ease-in-out infinite alternate`
                    : 'none',
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

