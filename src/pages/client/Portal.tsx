import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import type { Client } from '@/types/database'

export default function ClientPortal() {
  const [client, setClient] = useState<Client | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get('token')
    if (!token) { setError('לא נמצא לינק תקין'); setLoading(false); return }

    supabase.from('clients').select('*').eq('token', token).single()
      .then(({ data, error }) => {
        if (error || !data) setError('לינק לא תקין. פנה למאמן שלך.')
        else setClient(data as Client)
        setLoading(false)
      })
  }, [])

  if (loading) return (
    <div className="min-h-screen bg-cream flex items-center justify-center text-navy animate-pulse" dir="rtl">טוען...</div>
  )

  if (error || !client) return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4" dir="rtl">
      <div className="bg-white rounded-2xl p-8 text-center max-w-sm w-full border border-red-100">
        <p className="text-4xl mb-4">❌</p>
        <p className="text-red-700 font-semibold mb-2">{error}</p>
        <a href="mailto:smartbudgetlondon@gmail.com" className="text-sm text-navy hover:underline">
          smartbudgetlondon@gmail.com
        </a>
      </div>
    </div>
  )

  const pct = Math.round((client.session / 6) * 100)

  return (
    <div className="min-h-screen bg-cream" dir="rtl">
      <div className="max-w-md mx-auto px-4 py-6 space-y-4">
        {/* Welcome */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
          className="bg-navy text-white rounded-2xl p-6">
          <p className="text-gold text-xs tracking-widest mb-2">בס"ד</p>
          <h1 className="text-2xl font-bold mb-1">שלום, {client.name}</h1>
          <p className="text-white/60 text-sm">Smart Budget London</p>
        </motion.div>

        {/* Progress */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <h2 className="font-bold text-navy mb-1">ההתקדמות שלך</h2>
          <p className="text-sm text-gray-400 mb-3">שלב: {client.stage} | מפגש {client.session} מתוך 6</p>
          <div className="bg-gray-100 rounded-full h-2.5 mb-1 overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ delay: 0.3, duration: 0.8 }}
              className="h-full bg-gold rounded-full" />
          </div>
          <p className="text-xs text-gray-400" dir="ltr">{pct}% complete</p>
        </motion.div>

        {/* Materials */}
        {(client.materials || []).length > 0 && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <h2 className="font-bold text-navy mb-3">החומרים שלך</h2>
            <div className="space-y-2">
              {[
                'שיעור 1 — יסודות ומודעות', 'שיעור 2 — מעקב הכנסות והוצאות',
                'שיעור 3 — בניית תקציב', 'שיעור 4 — שינוי הרגלים',
                'שיעור 5 — חסכון וחובות', 'שיעור 6 — שמירה לטווח ארוך',
              ].filter((_, i) => (client.materials || []).includes(i + 1)).map((mat, i) => (
                <div key={i} className="flex items-center gap-2.5 py-2 border-b border-gray-50 last:border-0 text-sm">
                  <span>📄</span><span className="text-gray-700">{mat}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Contact */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          className="text-center text-xs text-gray-400 py-2">
          שאלות?{' '}
          <a href="mailto:smartbudgetlondon@gmail.com" className="text-navy hover:underline">
            smartbudgetlondon@gmail.com
          </a>
        </motion.div>
      </div>
    </div>
  )
}
