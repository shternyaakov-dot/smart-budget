import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus, Search, ArrowRight, Trash2, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'
import { generateToken } from '@/lib/utils'
import type { Client } from '@/types/database'

const F = 'Inter, Segoe UI, system-ui, sans-serif'

const stagePill: Record<string, { bg: string; color: string; border: string }> = {
  'מודעות': { bg: '#EFF6FF', color: '#1D4ED8', border: '#BFDBFE' },
  'שינוי':  { bg: '#FFFBEB', color: '#B45309', border: '#FDE68A' },
  'שמירה': { bg: '#F0FDF4', color: '#15803D', border: '#BBF7D0' },
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '9px 12px', border: '1px solid #E2E8F0',
  borderRadius: 8, fontSize: 14, fontFamily: F, color: '#0F172A',
  background: '#fff', outline: 'none', boxSizing: 'border-box', marginBottom: 12,
}

export default function CoachClients() {
  const { user } = useAuth()
  const qc = useQueryClient()
  const [search, setSearch] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', stage: 'מודעות' as Client['stage'], notes: '' })

  const { data: clients = [], isLoading } = useQuery({
    queryKey: ['clients', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase.from('clients').select('*').eq('coach_id', user!.id).order('created_at', { ascending: false })
      if (error) throw error
      return data as Client[]
    },
    enabled: !!user,
  })

  const addClient = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from('clients').insert({
        coach_id: user!.id, name: form.name,
        email: form.email || null, phone: form.phone || null,
        stage: form.stage, session: 1, notes: form.notes || null,
        token: generateToken(), materials: [], guide_data: {},
      })
      if (error) throw error
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['clients'] })
      setShowAdd(false)
      setForm({ name: '', email: '', phone: '', stage: 'מודעות', notes: '' })
    },
  })

  const deleteClient = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('clients').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['clients'] }),
  })

  const filtered = clients.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    (c.email || '').toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAFA', fontFamily: F }} dir="rtl">
      {/* Header */}
      <div style={{ background: '#fff', borderBottom: '1px solid #E2E8F0', padding: '0 28px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link to="/coach" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: 8, border: '1px solid #E2E8F0', color: '#64748B', textDecoration: 'none', transition: 'all 0.15s' }}>
            <ArrowRight size={15} />
          </Link>
          <div>
            <p style={{ fontSize: 10, color: '#94A3B8', letterSpacing: '0.1em' }}>תקציב חכם</p>
            <p style={{ fontSize: 16, fontWeight: 700, color: '#0F172A', letterSpacing: '-0.02em' }}>כל הלקוחות</p>
          </div>
        </div>
        <button onClick={() => setShowAdd(true)}
          style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#0F172A', color: '#fff', border: 'none', borderRadius: 9, padding: '8px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: F, transition: 'background 0.15s' }}
          onMouseEnter={e => (e.currentTarget.style.background = '#1E293B')}
          onMouseLeave={e => (e.currentTarget.style.background = '#0F172A')}>
          <Plus size={14} /> לקוח חדש
        </button>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '28px 24px' }}>
        {/* Search */}
        <div style={{ position: 'relative', marginBottom: 16 }}>
          <Search size={14} style={{ position: 'absolute', right: 13, top: '50%', transform: 'translateY(-50%)', color: '#CBD5E1', pointerEvents: 'none' }} />
          <input type="text" placeholder="חיפוש לקוח..." value={search} onChange={e => setSearch(e.target.value)}
            style={{ ...inputStyle, marginBottom: 0, paddingRight: 38, background: '#fff', boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}
            onFocus={e => (e.target.style.borderColor = '#94A3B8')}
            onBlur={e => (e.target.style.borderColor = '#E2E8F0')} />
        </div>

        {/* List */}
        <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 14, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          {isLoading ? (
            <div style={{ padding: 40, textAlign: 'center', color: '#CBD5E1', fontSize: 14 }}>טוען...</div>
          ) : filtered.length === 0 ? (
            <div style={{ padding: 48, textAlign: 'center' }}>
              <p style={{ fontSize: 14, color: '#94A3B8' }}>לא נמצאו לקוחות</p>
            </div>
          ) : (
            filtered.map((c, i) => {
              const pill = stagePill[c.stage] || stagePill['מודעות']
              return (
                <div key={c.id} style={{ display: 'flex', alignItems: 'center', borderBottom: i < filtered.length - 1 ? '1px solid #F8FAFC' : 'none' }}>
                  <Link to={`/coach/clients/${c.id}`}
                    style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', textDecoration: 'none', transition: 'background 0.1s' }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#FAFAFA')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 36, height: 36, borderRadius: 9, background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#475569' }}>
                        {c.name.slice(0, 2)}
                      </div>
                      <div>
                        <p style={{ fontSize: 14, fontWeight: 600, color: '#0F172A' }}>{c.name}</p>
                        <p style={{ fontSize: 12, color: '#94A3B8' }}>{c.email || 'ללא אימייל'}{c.phone ? ` · ${c.phone}` : ''}</p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: 11, fontWeight: 500, padding: '3px 10px', borderRadius: 999, background: pill.bg, color: pill.color, border: `1px solid ${pill.border}` }}>{c.stage}</span>
                      <span style={{ fontSize: 12, color: '#CBD5E1' }}>{c.session}/6</span>
                    </div>
                  </Link>
                  <button onClick={() => confirm('למחוק?') && deleteClient.mutate(c.id)}
                    style={{ padding: '8px 16px', color: '#CBD5E1', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.15s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#EF4444')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#CBD5E1')}>
                    <Trash2 size={14} />
                  </button>
                </div>
              )
            })
          )}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showAdd && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, backdropFilter: 'blur(4px)' }}
            onClick={e => e.target === e.currentTarget && setShowAdd(false)}>
            <motion.div initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.96, opacity: 0 }}
              style={{ background: '#fff', borderRadius: 16, padding: '28px', width: '100%', maxWidth: 440, boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 }}>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0F172A' }}>לקוח חדש</h3>
                <button onClick={() => setShowAdd(false)} style={{ color: '#94A3B8', background: 'none', border: 'none', cursor: 'pointer', padding: 4, borderRadius: 6 }}><X size={16} /></button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ fontSize: 12, fontWeight: 500, color: '#475569', display: 'block', marginBottom: 5 }}>שם מלא *</label>
                  <input style={inputStyle} type="text" placeholder="ישראל כהן" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    onFocus={e => (e.target.style.borderColor = '#94A3B8')} onBlur={e => (e.target.style.borderColor = '#E2E8F0')} />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 500, color: '#475569', display: 'block', marginBottom: 5 }}>אימייל</label>
                  <input style={{ ...inputStyle, direction: 'ltr' }} type="email" placeholder="email@example.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    onFocus={e => (e.target.style.borderColor = '#94A3B8')} onBlur={e => (e.target.style.borderColor = '#E2E8F0')} />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 500, color: '#475569', display: 'block', marginBottom: 5 }}>טלפון</label>
                  <input style={{ ...inputStyle, direction: 'ltr' }} type="text" placeholder="07123456789" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    onFocus={e => (e.target.style.borderColor = '#94A3B8')} onBlur={e => (e.target.style.borderColor = '#E2E8F0')} />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ fontSize: 12, fontWeight: 500, color: '#475569', display: 'block', marginBottom: 5 }}>שלב</label>
                  <select style={{ ...inputStyle, cursor: 'pointer' }} value={form.stage} onChange={e => setForm(f => ({ ...f, stage: e.target.value as Client['stage'] }))}>
                    <option value="מודעות">מודעות — Awareness</option>
                    <option value="שינוי">שינוי — Change</option>
                    <option value="שמירה">שמירה — Maintenance</option>
                  </select>
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ fontSize: 12, fontWeight: 500, color: '#475569', display: 'block', marginBottom: 5 }}>הערות פנימיות</label>
                  <textarea style={{ ...inputStyle, resize: 'vertical', minHeight: 72 }} placeholder="הערות שרק אתה רואה..." value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                    onFocus={e => (e.target.style.borderColor = '#94A3B8')} onBlur={e => (e.target.style.borderColor = '#E2E8F0')} />
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                <button onClick={() => setShowAdd(false)}
                  style={{ flex: 1, padding: '10px', borderRadius: 8, border: '1px solid #E2E8F0', background: '#fff', fontSize: 13, cursor: 'pointer', fontFamily: F, color: '#64748B' }}>
                  ביטול
                </button>
                <button onClick={() => form.name && addClient.mutate()} disabled={!form.name || addClient.isPending}
                  style={{ flex: 1, padding: '10px', borderRadius: 8, border: 'none', background: '#0F172A', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: F, opacity: !form.name ? 0.5 : 1 }}>
                  {addClient.isPending ? 'שומר...' : 'צור לקוח'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
