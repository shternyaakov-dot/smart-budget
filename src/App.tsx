import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

// Public pages
import Home from '@/pages/public/Home'
import Service from '@/pages/public/Service'
import Contact from '@/pages/public/Contact'

// Auth
import AuthPage from '@/pages/AuthPage'

// Coach pages (protected)
import CoachDashboard from '@/pages/coach/Dashboard'
import CoachClients from '@/pages/coach/Clients'
import ClientDetail from '@/pages/coach/ClientDetail'

// Client portal
import ClientPortal from '@/pages/client/Portal'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  if (loading) return <div className="flex items-center justify-center min-h-screen"><div className="text-navy animate-pulse text-lg">טוען...</div></div>
  if (!user) return <Navigate to="/auth" replace />
  return <>{children}</>
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <Routes>
        {/* Client portal — no navbar */}
        <Route path="/portal" element={<ClientPortal />} />

        {/* Auth */}
        <Route path="/auth" element={<AuthPage />} />

        {/* Protected coach routes */}
        <Route path="/coach" element={<ProtectedRoute><CoachDashboard /></ProtectedRoute>} />
        <Route path="/coach/clients" element={<ProtectedRoute><CoachClients /></ProtectedRoute>} />
        <Route path="/coach/clients/:id" element={<ProtectedRoute><ClientDetail /></ProtectedRoute>} />

        {/* Public routes with nav */}
        <Route path="/*" element={
          <>
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/service" element={<Service />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </main>
            <Footer />
          </>
        } />
      </Routes>
    </div>
  )
}
