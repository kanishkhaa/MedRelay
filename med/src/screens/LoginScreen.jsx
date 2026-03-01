import React, { useState } from 'react'
import { useHandoff } from '../context/HandoffContext'
import { Button } from '../components/ui/Button'

export function LoginScreen() {
  const { setUser, setActiveView } = useHandoff()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('Nurse')

  const handleSubmit = (event) => {
    event.preventDefault()
    setUser({
      name: email ? email.split('@')[0] : 'Clinician',
      role,
      email,
    })
    setActiveView('dashboard')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-6">
      <div className="w-full max-w-md rounded-3xl bg-white p-7 shadow-xl ring-1 ring-slate-200">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-700 text-white shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-6 w-6"
            >
              <path d="M5 4a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v2.5A2.5 2.5 0 0 1 12.5 9H11v2.293l1.146-1.147a.5.5 0 0 1 .708.708l-2.5 2.5a.5.5 0 0 1-.708 0l-2.5-2.5a.5.5 0 0 1 .708-.708L9 11.293V9H7.5A2.5 2.5 0 0 1 5 6.5V4Z" />
              <path d="M3.5 8A1.5 1.5 0 0 0 2 9.5v5A1.5 1.5 0 0 0 3.5 16h7a1.5 1.5 0 0 0 1.5-1.5V13h-1v1.5a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-5a.5.5 0 0 1 .5-.5H6V8H3.5Z" />
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-slate-900">
              MedRelay Clinical Access
            </h1>
            <p className="text-xs text-slate-500">
              Secure, role-based access for clinical handoffs.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-medium text-slate-700"
            >
              Work email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-100"
              placeholder="name@hospital.org"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xs font-medium text-slate-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-100"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          <div>
            <span className="block text-xs font-medium text-slate-700">
              Role
            </span>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {['Nurse', 'Doctor', 'Admin'].map((option) => {
                const selected = role === option
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setRole(option)}
                    className={`rounded-xl border px-2.5 py-1.5 text-xs font-medium transition-colors ${
                      selected
                        ? 'border-sky-600 bg-sky-50 text-sky-800'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-sky-300 hover:bg-sky-50'
                    }`}
                  >
                    {option}
                  </button>
                )
              })}
            </div>
          </div>

          <Button
            type="submit"
            className="mt-2 w-full justify-center"
          >
            Continue to dashboard
          </Button>

          <p className="mt-2 text-[11px] leading-relaxed text-slate-400">
            This is a demonstration environment. Do not enter real patient identifiers or protected health information.
          </p>
        </form>
      </div>
    </div>
  )
}

