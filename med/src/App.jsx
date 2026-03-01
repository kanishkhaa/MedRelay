import React, { useState } from 'react'
import { HandoffProvider, useHandoff } from './context/HandoffContext'
import { Sidebar } from './components/layout/Sidebar'
import { Header } from './components/layout/Header'
import { LoginScreen } from './screens/LoginScreen'
import { DashboardScreen } from './screens/DashboardScreen'
import { HandoffScreen } from './screens/HandoffScreen'
import { ReportsScreen } from './screens/ReportsScreen'

function AppShell() {
  const { activeView, user, darkMode } = useHandoff()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  if (!user || activeView === 'login') {
    return <LoginScreen />
  }

  let content = null
  if (activeView === 'dashboard') {
    content = <DashboardScreen />
  } else if (activeView === 'handoff') {
    content = <HandoffScreen />
  } else if (activeView === 'reports') {
    content = <ReportsScreen />
  }

  return (
    <div
      className={`min-h-screen ${
        darkMode ? 'bg-slate-950 text-slate-50' : 'bg-slate-100 text-slate-900'
      }`}
    >
      <div className="flex min-h-screen items-stretch">
        <div className="hidden h-full md:block">
          <Sidebar
            collapsed={sidebarCollapsed}
            onToggle={() => setSidebarCollapsed((prev) => !prev)}
          />
        </div>
        <div className="flex min-h-screen flex-1 flex-col">
          <div className="flex h-full flex-1 flex-col overflow-hidden rounded-none bg-white/90 shadow-none ring-0 md:rounded-3xl md:border md:border-slate-200 md:bg-white/90 md:shadow-md">
            <Header />
            <main className="flex-1 overflow-hidden">
              {content}
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <HandoffProvider>
      <AppShell />
    </HandoffProvider>
  )
}

