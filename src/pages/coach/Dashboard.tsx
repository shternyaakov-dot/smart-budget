import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Users, CalendarDays, CheckCircle, LogOut, Plus, ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'
import type { Client } from '@/types/database'

const F = 'Inter, Segoe UI, system-ui, sans-serif'

const stagePill: Record<string, { bg: string; color: string; border: string }> = {
  'מודעות': { bg: '#EFF6FF', color: '#1D4ED8', border: '#BFDBFE' },
  'שינוי':  { bg: '#FFFBEB', color: '#B45309', border: '#FDE68A' },
  'שמירה': { bg: '#F0FDF4', color: '#15803D', border: '#BBF7D0' },
}

function useClients() {
  const { user } = useAuth()
  return useQuery({
    queryKey: ['clients', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase.from('clients').select('*').eq('coach_id', user!.id).order('created_at', { ascending: false })
      if (error) throw error
      return data as Client[]
    },
    enabled: !!user,
  })
}

export default function CoachDashboard() {
  const { user, signOut } = useAuth()
  const { data: clients = [], isLoading } = useClients()
  const active = clients.filter(c => c.session < 6)
  const done   = clients.filter(c => c.session >= 6)

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAFA', fontFamily: F }} dir="rtl">
      {/* Top bar */}
      <div style={{ background: '#ffffff', borderBottom: '1px solid #E2E8F0', padding: '0 28px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div>
            <p style={{ fontSize: 10, color: '#94A3B8', letterSpacing: '0.1em' }}>בס"ד — תקציב חכם</p>
            <p style={{ fontSize: 16, fontWeight: 700, color: '#0F172A', letterSpacing: '-0.02em' }}>לוח הבקרה</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 12, color: '#94A3B8' }}>{user?.email}</span>
          <div style={{ width: 1, height: 16, background: '#E2E8F0' }} />
          <Link to="/coach/clients" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#475569', textDecoration: 'none', padding: '6px 12px', borderRadius: 7, border: '1px solid #E2E8F0', background: '#fff', transition: 'all 0.15s' }}>
            <Users size={14} /> לקוחות
          </Link>
          <button onClick={signOut} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: '#94A3B8', background: 'none', border: 'none', cursor: 'pointer', padding: '6px 10px', borderRadius: 7, fontFamily: F, transition: 'color 0.15s' }}>
            <LogOut size={14} />
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>
        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 28 }}>
          {[
            { label: 'סה"כ לקוחות', value: clients.length, icon: <Users size={16} />, accent: '#3B82F6' },
            { label: 'פעילים',       value: active.length,  icon: <CalendarDays size={16} />, accent: '#F59E0B' },
            { label: 'סיימו ב"ה',    value: done.length,    icon: <CheckCircle size={16} />, accent: '#10B981' },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 12, padding: '20px', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <div style={{ color: s.accent, opacity: 0.7, marginBottom: 8, display: 'flex', justifyContent: 'center' }}>{s.icon}</div>
              <div style={{ fontSize: 30, fontWeight: 700, color: '#0F172A', letterSpacing: '-0.03em' }}>{s.value}</div>
              <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 4 }}>{s.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Clients card */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 14, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <div style={{ padding: '18px 22px', borderBottom: '1px solid #F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 style={{ fontSize: 15, fontWeight: 600, color: '#0F172A' }}>לקוחות פעילים</h2>
            <Link to="/coach/clients" style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#94A3B8', textDecoration: 'none', transition: 'color 0.15s' }}>
              כל הלקוחות <ArrowLeft size={11} />
            </Link>
          </div>

          {isLoading ? (
            <div style={{ padding: 40, textAlign: 'center', color: '#CBD5E1', fontSize: 14 }}>טוען...</div>
          ) : active.length === 0 ? (
            <div style={{ padding: 48, textAlign: 'center' }}>
              <div style={{ width: 48, height: 48, background: '#F8FAFC', borderRadius: 12, border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', color: '#CBD5E1' }}>
                <Users size={20} />
              </div>
              <p style={{ fontSize: 14, color: '#94A3B8', marginBottom: 16 }}>עדיין אין לקוחות פעילים</p>
              <Link to="/coach/clients" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#0F172A', color: '#fff', fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none' }}>
                <Plus size={13} /> הוסף לקוח ראשון
              </Link>
            </div>
          ) : (
            active.map((c, i) => {
              const pill = stagePill[c.stage] || stagePill['מודעות']
              const initials = c.name.slice(0, 2)
              return (
                <motion.div key={c.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 + i * 0.05 }}>
                  <Link to={`/coach/clients/${c.id}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 22px', textDecoration: 'none', borderBottom: '1px solid #F8FAFC', transition: 'background 0.1s' }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#FAFAFA')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 36, height: 36, borderRadius: 9, background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#475569' }}>
                        {initials}
                      </div>
                      <div>
                        <p style={{ fontSize: 14, fontWeight: 600, color: '#0F172A' }}>{c.name}</p>
                        <p style={{ fontSize: 12, color: '#94A3B8' }}>{c.email || 'ללא אימייל'}</p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: 11, fontWeight: 500, padding: '3px 10px', borderRadius: 999, background: pill.bg, color: pill.color, border: `1px solid ${pill.border}` }}>
                        {c.stage}
                      </span>
                      <span style={{ fontSize: 12, color: '#CBD5E1', fontWeight: 500 }}>{c.session}/6</span>
                    </div>
                  </Link>
                </motion.div>
              )
            })
          )}
        </motion.div>
      </div>
    </div>
  )
}
