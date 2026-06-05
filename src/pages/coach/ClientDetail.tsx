import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ArrowRight, Copy, Check } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'
import type { Client } from '@/types/database'

const stageBadge: Record<string, string> = {
  'מודעות': 'bg-blue-100 text-blue-800',
  'שינוי': 'bg-amber-100 text-amber-800',
  'שמירה': 'bg-green-100 text-green-800',
}

export default function ClientDetail() {
  const { id } = useParams<{ id: string }>()
  const { user } = useAuth()
  const qc = useQueryClient()
  const [copied, setCopied] = useState(false)

  const { data: client, isLoading } = useQuery({
    queryKey: ['client', id],
    queryFn: async () => {
      const { data, error } = await supabase.from('clients').select('*').eq('id', id!).single()
      if (error) throw error
      return data as Client
    },
  })

  const updateClient = useMutation({
    mutationFn: async (updates: Partial<Client>) => {
      const { error } = await supabase.from('clients').update(updates).eq('id', id!)
      if (error) throw error
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['client', id] }),
  })

  const advanceSession = () => {
    if (!client || client.session >= 6) return
    if (!confirm(`לעבור לפגישה ${client.session + 1}?`)) return
    const newSession = client.session + 1
    const newStage: Client['stage'] = newSession > 4 ? 'שמירה' : newSession > 2 ? 'שינוי' : 'מודעות'
    updateClient.mutate({ session: newSession, stage: newStage })
  }

  const copyLink = () => {
    if (!client) return
    const link = `${window.location.origin}/portal?token=${client.token}`
    navigator.clipboard.writeText(link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (isLoading || !client) return (
    <div className="min-h-screen bg-cream flex items-center justify-center text-navy animate-pulse" dir="rtl">טוען...</div>
  )

  const portalLink = `${window.location.origin}/portal?token=${client.token}`

  return (
    <div className="min-h-screen bg-cream" dir="rtl">
      {/* Header */}
      <div className="bg-navy text-white px-6 py-4 flex items-center gap-3">
        <Link to="/coach/clients" className="text-white/60 hover:text-white"><ArrowRight size={18} /></Link>
        <div className="flex-1">
          <h1 className="text-lg font-bold">{client.name}</h1>
          <p className="text-white/60 text-xs">{client.email}</p>
        </div>
        <span className={`text-xs px-3 py-1 rounded-full font-medium ${stageBadge[client.stage]}`}>{client.stage}</span>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-5 space-y-4">
        {/* Progress */}
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
          <h2 className="font-bold text-navy text-sm mb-4">התקדמות מפגשים</h2>
          <div className="flex gap-2 mb-4">
            {[1,2,3,4,5,6].map(n => (
              <button key={n} onClick={() => updateClient.mutate({ session: n })}
                className={`w-10 h-10 rounded-full text-sm font-bold transition-all ${
                  n < client.session ? 'bg-navy text-gold' :
                  n === client.session ? 'bg-gold text-navy ring-2 ring-gold/30' :
                  'bg-gray-100 text-gray-400 hover:bg-gray-200'
                }`}>{n}</button>
            ))}
          </div>
          <p className="text-xs text-gray-400">מפגש נוכחי: <strong className="text-navy">{client.session}</strong></p>
          {client.session < 6 && (
            <button onClick={advanceSession}
              className="mt-3 w-full bg-green-600 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-green-700 transition-all">
              ✅ סיום פגישה {client.session} — מעבר לפגישה {client.session + 1}, בעזרת השם
            </button>
          )}
          {client.session >= 6 && (
            <div className="mt-3 bg-green-50 text-green-800 text-center py-2.5 rounded-lg text-sm font-bold border border-green-200">
              ✅ התהליך הושלם, ברוך השם!
            </div>
          )}
        </div>

        {/* Details */}
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
          <h2 className="font-bold text-navy text-sm mb-4">פרטים</h2>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-400 block mb-1">שם</label>
              <input type="text" defaultValue={client.name}
                onBlur={e => e.target.value !== client.name && updateClient.mutate({ name: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-navy" />
            </div>
            <div>
              <label className="text-xs text-gray-400 block mb-1">אימייל</label>
              <input type="email" defaultValue={client.email || ''} dir="ltr"
                onBlur={e => updateClient.mutate({ email: e.target.value || null })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-navy" />
            </div>
            <div>
              <label className="text-xs text-gray-400 block mb-1">טלפון</label>
              <input type="text" defaultValue={client.phone || ''} dir="ltr"
                onBlur={e => updateClient.mutate({ phone: e.target.value || null })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-navy" />
            </div>
            <div>
              <label className="text-xs text-gray-400 block mb-1">שלב</label>
              <select defaultValue={client.stage} onChange={e => updateClient.mutate({ stage: e.target.value as Client['stage'] })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-navy">
                <option>מודעות</option><option>שינוי</option><option>שמירה</option>
              </select>
            </div>
          </div>
          <div className="mt-3">
            <label className="text-xs text-gray-400 block mb-1">הערות פנימיות</label>
            <textarea defaultValue={client.notes || ''} rows={3} onBlur={e => updateClient.mutate({ notes: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-navy resize-none" />
          </div>
        </div>

        {/* Portal link */}
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
          <h2 className="font-bold text-navy text-sm mb-3">לינק אישי ללקוח</h2>
          <div className="bg-gray-50 rounded-lg px-3 py-2 text-xs text-gray-500 font-mono mb-3 break-all" dir="ltr">
            {portalLink}
          </div>
          <button onClick={copyLink}
            className="flex items-center gap-2 bg-navy text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-navy-light transition-all">
            {copied ? <><Check size={14} /> הועתק!</> : <><Copy size={14} /> העתק לינק</>}
          </button>
        </div>
      </div>
    </div>
  )
}
