import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus, Search, ArrowRight, Trash2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'
import { generateToken } from '@/lib/utils'
import type { Client } from '@/types/database'

const stageBadge: Record<string, string> = {
  'מודעות': 'bg-blue-100 text-blue-800',
  'שינוי': 'bg-amber-100 text-amber-800',
  'שמירה': 'bg-green-100 text-green-800',
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
        coach_id: user!.id,
        name: form.name,
        email: form.email || null,
        phone: form.phone || null,
        stage: form.stage,
        session: 1,
        notes: form.notes || null,
        token: generateToken(),
        materials: [],
        guide_data: {},
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
    <div className="min-h-screen bg-cream" dir="rtl">
      <div className="bg-navy text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/coach" className="text-white/60 hover:text-white"><ArrowRight size={18} /></Link>
          <h1 className="text-lg font-bold">כל הלקוחות</h1>
        </div>
        <button onClick={() => setShowAdd(true)}
          className="flex items-center gap-1.5 bg-gold text-navy px-4 py-2 rounded-lg font-bold text-sm hover:bg-gold-dark transition-all">
          <Plus size={15} /> לקוח חדש
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-5">
        {/* Search */}
        <div className="relative mb-4">
          <Search size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="חיפוש לקוח..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full border border-gray-200 rounded-xl pr-9 pl-4 py-2.5 text-sm bg-white focus:outline-none focus:border-navy" />
        </div>

        {/* List */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          {isLoading ? (
            <div className="p-8 text-center text-gray-400">טוען...</div>
          ) : filtered.length === 0 ? (
            <div className="p-8 text-center text-gray-400">לא נמצאו לקוחות</div>
          ) : (
            <div className="divide-y divide-gray-50">
              {filtered.map(c => (
                <div key={c.id} className="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50/70 transition-colors">
                  <Link to={`/coach/clients/${c.id}`} className="flex-1 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-navy text-sm">{c.name}</p>
                      <p className="text-xs text-gray-400">{c.email || 'ללא אימייל'} {c.phone ? `· ${c.phone}` : ''}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${stageBadge[c.stage]}`}>{c.stage}</span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{c.session}/6</span>
                    </div>
                  </Link>
                  <button onClick={() => { if (confirm('למחוק?')) deleteClient.mutate(c.id) }}
                    className="p-1.5 rounded-md text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all">
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add client modal */}
      <AnimatePresence>
        {showAdd && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
            onClick={e => e.target === e.currentTarget && setShowAdd(false)}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
              <h3 className="text-lg font-bold text-navy mb-5">לקוח חדש</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="text-xs text-gray-400 block mb-1">שם מלא *</label>
                  <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-navy" />
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1">אימייל</label>
                  <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-navy" dir="ltr" />
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1">טלפון</label>
                  <input type="text" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-navy" dir="ltr" />
                </div>
                <div className="col-span-2">
                  <label className="text-xs text-gray-400 block mb-1">שלב</label>
                  <select value={form.stage} onChange={e => setForm(f => ({ ...f, stage: e.target.value as Client['stage'] }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-navy">
                    <option value="מודעות">מודעות</option>
                    <option value="שינוי">שינוי</option>
                    <option value="שמירה">שמירה</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="text-xs text-gray-400 block mb-1">הערות פנימיות</label>
                  <textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} rows={2}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-navy resize-none" />
                </div>
              </div>
              <div className="flex gap-2 mt-5">
                <button onClick={() => setShowAdd(false)} className="flex-1 border border-gray-200 py-2.5 rounded-lg text-sm hover:bg-gray-50 transition-all">ביטול</button>
                <button onClick={() => form.name && addClient.mutate()} disabled={!form.name || addClient.isPending}
                  className="flex-1 bg-navy text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-navy-light transition-all disabled:opacity-60">
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
