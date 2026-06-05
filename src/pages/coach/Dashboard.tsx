import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Users, CalendarDays, CheckCircle, LogOut, Plus, ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'
import type { Client } from '@/types/database'

function useClients() {
  const { user } = useAuth()
  return useQuery({
    queryKey: ['clients', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('clients').select('*').eq('coach_id', user!.id).order('created_at', { ascending: false })
      if (error) throw error
      return data as Client[]
    },
    enabled: !!user,
  })
}

const stageBadge: Record<string, string> = {
  'מודעות': 'bg-blue-50 text-blue-700 border-blue-100',
  'שינוי':   'bg-amber-50 text-amber-700 border-amber-100',
  'שמירה':  'bg-green-50 text-green-700 border-green-100',
}

const stagger = { show: { transition: { staggerChildren: 0.08 } } }
const fade = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }

export default function CoachDashboard() {
  const { user, signOut } = useAuth()
  const { data: clients = [], isLoading } = useClients()
  const active = clients.filter(c => c.session < 6)
  const done   = clients.filter(c => c.session >= 6)

  return (
    <div className="min-h-screen bg-cream" dir="rtl">
      {/* Header */}
      <div className="hero-pattern text-white px-6 py-5 flex items-center justify-between">
        <div>
          <p className="text-gold text-[10px] tracking-widest uppercase mb-0.5">בס"ד — תקציב חכם</p>
          <h1 className="text-xl font-bold">לוח הבקרה</h1>
          <p className="text-white/50 text-xs mt-0.5">{user?.email}</p>
        </div>
        <div className="flex gap-2">
          <Link to="/coach/clients"
            className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/20 px-3 py-2 rounded-xl text-sm transition-all">
            <Users size={14} /> לקוחות
          </Link>
          <button onClick={signOut}
            className="flex items-center gap-1.5 text-white/50 hover:text-white px-3 py-2 rounded-xl text-sm transition-all hover:bg-white/10">
            <LogOut size={14} />
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Stats */}
        <motion.div initial="hidden" animate="show" variants={stagger} className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: 'סה"כ לקוחות', value: clients.length, icon: <Users size={18} />, color: 'text-navy' },
            { label: 'פעילים',       value: active.length,  icon: <CalendarDays size={18} />, color: 'text-amber-600' },
            { label: 'סיימו ב"ה',    value: done.length,    icon: <CheckCircle size={18} />, color: 'text-green-600' },
          ].map((s, i) => (
            <motion.div key={i} variants={fade} className="bg-white rounded-2xl border border-gray-100 p-4 text-center shadow-sm hover:shadow-md hover:border-gold/20 transition-all">
              <div className={`flex justify-center mb-1.5 ${s.color} opacity-60`}>{s.icon}</div>
              <div className="text-3xl font-bold text-navy">{s.value}</div>
              <div className="text-xs text-gray-400 mt-1">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Active clients */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
            <h2 className="font-bold text-navy">לקוחות פעילים</h2>
            <div className="flex gap-2">
              <Link to="/coach/clients"
                className="text-xs text-gold hover:text-gold-dark flex items-center gap-1 transition-colors">
                כל הלקוחות <ArrowLeft size={12} />
              </Link>
            </div>
          </div>

          {isLoading ? (
            <div className="p-8 text-center text-gray-300 animate-pulse">טוען...</div>
          ) : active.length === 0 ? (
            <div className="p-10 text-center">
              <div className="w-14 h-14 bg-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users size={24} className="text-gold" />
              </div>
              <p className="text-gray-400 text-sm mb-4">עדיין אין לקוחות פעילים</p>
              <Link to="/coach/clients"
                className="inline-flex items-center gap-1.5 bg-navy text-white text-sm px-4 py-2 rounded-xl hover:bg-navy-light transition-all">
                <Plus size={14} /> הוסף לקוח ראשון
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-50/80">
              {active.map((c, i) => (
                <motion.div key={c.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.06 }}>
                  <Link to={`/coach/clients/${c.id}`}
                    className="flex items-center justify-between px-5 py-3.5 hover:bg-gray-50/60 transition-colors group">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-navy/5 flex items-center justify-center text-navy font-bold text-sm group-hover:bg-gold/10 group-hover:text-gold transition-colors">
                        {c.name.slice(0, 2)}
                      </div>
                      <div>
                        <p className="font-semibold text-navy text-sm">{c.name}</p>
                        <p className="text-xs text-gray-400">{c.email || 'ללא אימייל'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className={`badge ${stageBadge[c.stage]}`}>{c.stage}</span>
                      <span className="text-xs text-gray-300 font-medium">{c.session}/6</span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
