import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { FileText } from 'lucide-react'
import type { Client } from '@/types/database'

const F = 'Inter, Segoe UI, system-ui, sans-serif'

const MATERIALS = [
  'שיעור 1 — יסודות ומודעות',
  'שיעור 2 — מעקב הכנסות והוצאות',
  'שיעור 3 — בניית תקציב',
  'שיעור 4 — שינוי הרגלים',
  'שיעור 5 — חסכון וחובות',
  'שיעור 6 — שמירה לטווח ארוך',
]

export default function ClientPortal() {
  const [client, setClient] = useState<Client | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get('token')
    if (!token) { setError('לא נמצא לינק תקין'); setLoading(false); return }
    supabase.from('clients').select('*').eq('token', token).single()
      .then(({ data, error }) => {
        if (error || !data) setError('לינק לא תקין. אנא פנה למאמן שלך.')
        else setClient(data as Client)
        setLoading(false)
      })
  }, [])

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FAFAFA', fontFamily: F, color: '#94A3B8', fontSize: 14 }}>
      טוען...
    </div>
  )

  if (error || !client) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FAFAFA', fontFamily: F, padding: 24 }} dir="rtl">
      <div style={{ background: '#fff', border: '1px solid #FECACA', borderRadius: 14, padding: '36px 32px', textAlign: 'center', maxWidth: 360, boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
        <p style={{ fontSize: 32, marginBottom: 12 }}>❌</p>
        <p style={{ fontSize: 15, fontWeight: 600, color: '#DC2626', marginBottom: 8 }}>{error}</p>
        <a href="mailto:smartbudgetlondon@gmail.com" style={{ fontSize: 13, color: '#64748B', textDecoration: 'none' }}>smartbudgetlondon@gmail.com</a>
      </div>
    </div>
  )

  const pct = Math.round((client.session / 6) * 100)
  const mats = (client.materials || []).map((id: number) => MATERIALS[id - 1]).filter(Boolean)

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAFA', fontFamily: F }} dir="rtl">
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #0F172A, #1E293B)', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <p style={{ fontSize: 10, color: '#C9A84C', letterSpacing: '0.15em' }}>בס"ד — תקhציב חכם</p>
          <p style={{ fontSize: 15, fontWeight: 600, color: '#F8FAFC', letterSpacing: '-0.02em' }}>האזור האישי שלך</p>
        </div>
        <p style={{ fontSize: 12, color: '#475569' }}>Smart Budget London</p>
      </div>

      <div style={{ maxWidth: 560, margin: '0 auto', padding: '32px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>

        {/* Welcome */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          style={{ background: '#0F172A', borderRadius: 14, padding: '28px 24px', color: '#fff' }}>
          <p style={{ fontSize: 11, color: '#C9A84C', letterSpacing: '0.1em', marginBottom: 6 }}>ברוך הבא / ברוכה הבאה</p>
          <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 4 }}>שלום, {client.name}</h1>
          <p style={{ fontSize: 13, color: '#475569' }}>שלב נוכחי: <span style={{ color: '#C9A84C', fontWeight: 600 }}>{client.stage}</span></p>
        </motion.div>

        {/* Progress */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 14, padding: '22px 24px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h2 style={{ fontSize: 14, fontWeight: 600, color: '#0F172A' }}>ההתקדמות שלך</h2>
            <span style={{ fontSize: 12, color: '#94A3B8' }}>מפגש {client.session} מתוך 6</span>
          </div>
          <div style={{ background: '#F1F5F9', borderRadius: 999, height: 8, overflow: 'hidden' }}>
            <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ delay: 0.4, duration: 0.8 }}
              style={{ height: '100%', background: 'linear-gradient(90deg, #C9A84C, #B8962E)', borderRadius: 999 }} />
          </div>
          <p style={{ fontSize: 12, color: '#94A3B8', marginTop: 6, direction: 'ltr', textAlign: 'left' }}>{pct}% complete</p>
        </motion.div>

        {/* Materials */}
        {mats.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 14, padding: '22px 24px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            <h2 style={{ fontSize: 14, fontWeight: 600, color: '#0F172A', marginBottom: 14 }}>החומרים שלך</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {mats.map((mat, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: '#F8FAFC', borderRadius: 9, border: '1px solid #F1F5F9' }}>
                  <FileText size={14} color="#94A3B8" />
                  <span style={{ fontSize: 13, color: '#475569' }}>{mat}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Contact */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          style={{ textAlign: 'center', padding: '8px 0' }}>
          <p style={{ fontSize: 12, color: '#94A3B8' }}>
            שאלות?{' '}
            <a href="mailto:smartbudgetlondon@gmail.com" style={{ color: '#C9A84C', textDecoration: 'none', fontWeight: 500 }}>
              smartbudgetlondon@gmail.com
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
