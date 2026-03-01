import React, {
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react'

const HandoffContext = createContext(null)

const initialPatients = [
  {
    id: 'p1',
    bed: 'A-101',
    name: 'John Carter',
    status: 'Stable',
    risk: 'Low',
    condition: 'Post-op day 1, appendectomy',
    activeHandoff: false,
  },
  {
    id: 'p2',
    bed: 'A-102',
    name: 'Maria Lopez',
    status: 'Under Observation',
    risk: 'Medium',
    condition: 'Chest pain, rule out ACS',
    activeHandoff: true,
  },
  {
    id: 'p3',
    bed: 'ICU-3',
    name: 'Samuel Kim',
    status: 'Critical',
    risk: 'High',
    condition: 'Septic shock on vasopressors',
    activeHandoff: false,
  },
]

const initialAlerts = [
  {
    id: 'a1',
    title: 'Sepsis bundle due',
    level: 'High',
    description: 'Lactate and blood cultures pending. Broad-spectrum antibiotics in progress.',
    acknowledged: false,
  },
  {
    id: 'a2',
    title: 'High fall risk',
    level: 'Medium',
    description: 'Patient scored > 45 on fall risk scale. Bed alarm required.',
    acknowledged: false,
  },
  {
    id: 'a3',
    title: 'New allergy documented',
    level: 'Low',
    description: 'Allergy to cephalosporins added in the last 2 hours.',
    acknowledged: false,
  },
]

const initialSbar = {
  situation: '',
  background: '',
  assessment: '',
  recommendation: '',
}

const initialTranscript = [
  {
    id: 1,
    speaker: 'Outgoing Nurse',
    timestamp: '14:02',
    text: 'Patient admitted from ED 2 hours ago with suspected sepsis.',
  },
  {
    id: 2,
    speaker: 'Incoming Nurse',
    timestamp: '14:03',
    text: 'Got it. Currently on any vasopressors or high-flow oxygen?',
  },
  {
    id: 3,
    speaker: 'Outgoing Nurse',
    timestamp: '14:03',
    text: 'Yes, on norepinephrine at 0.06 mcg/kg/min, 4L nasal cannula, saturating 95%.',
  },
]

export function HandoffProvider({ children }) {
  const [user, setUser] = useState(null)
  const [activeView, setActiveView] = useState('login') // 'login' | 'dashboard' | 'handoff' | 'reports'
  const [patients, setPatients] = useState(initialPatients)
  const [activePatientId, setActivePatientId] = useState(initialPatients[1]?.id ?? null)
  const [transcriptMessages, setTranscriptMessages] = useState(initialTranscript)
  const [sbar, setSbar] = useState(initialSbar)
  const [alerts, setAlerts] = useState(initialAlerts)
  const [verification, setVerification] = useState({
    confirmed: false,
    signedOff: false,
  })
  const [handoffLocked, setHandoffLocked] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  const activePatient = useMemo(
    () => patients.find((p) => p.id === activePatientId) ?? null,
    [patients, activePatientId],
  )

  const riskCounts = useMemo(() => {
    return alerts.reduce(
      (acc, alert) => {
        const key = alert.level.toLowerCase()
        acc[key] = (acc[key] ?? 0) + 1
        return acc
      },
      { high: 0, medium: 0, low: 0 },
    )
  }, [alerts])

  const completedSbarSections = useMemo(() => {
    return Object.values(sbar).filter((value) => value.trim().length > 0).length
  }, [sbar])

  const handoffProgress = useMemo(() => {
    // 4 SBAR sections + 1 verification step
    const totalSteps = 5
    const completedVerification = verification.signedOff ? 1 : 0
    const completed = completedSbarSections + completedVerification
    return Math.min(100, Math.round((completed / totalSteps) * 100))
  }, [completedSbarSections, verification.signedOff])

  const value = {
    user,
    setUser,
    activeView,
    setActiveView,
    patients,
    setPatients,
    activePatientId,
    setActivePatientId,
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
    darkMode,
    setDarkMode,
    riskCounts,
    handoffProgress,
  }

  return (
    <HandoffContext.Provider value={value}>
      {children}
    </HandoffContext.Provider>
  )
}

export function useHandoff() {
  const ctx = useContext(HandoffContext)
  if (!ctx) {
    throw new Error('useHandoff must be used within HandoffProvider')
  }
  return ctx
}

