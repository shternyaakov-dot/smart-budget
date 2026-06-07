import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'
import { ArrowRight } from 'lucide-react'

const S = {
  page: { minHeight: '100vh', background: '#FAFAFA', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', fontFamily: 'Inter, Segoe UI, system-ui, sans-serif' } as const,
  card: { background: '#ffffff', border: '1px solid #E2E8F0', borderRadius: 16, padding: '40px 36px', width: '100%', maxWidth: 400, boxShadow: '0 4px 24px rgba(0,0,0,0.06)' } as const,
  label: { fontSize: 12, fontWeight: 500, color: '#475569', marginBottom: 6, display: 'block' } as const,
  input: { width: '100%', padding: '10px 14px', border: '1px solid #E2E8F0', borderRadius: 8, fontSize: 14, fontFamily: 'inherit', color: '#0F172A', background: '#fff', outline: 'none', boxSizing: 'border-box' as const, marginBottom: 14, transition: 'border-color 0.15s' },
  btn: { width: '100%', padding: '11px', borderRadius: 8, fontSize: 14, fontWeight: 600, fontFamily: 'inherit', border: 'none', cursor: 'pointer', background: '#0F172A', color: '#fff', transition: 'all 0.2s', marginTop: 4 } as const,
}

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn, signUp } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error } = isLogin ? await signIn(email, password) : await signUp(email, password, name)
    setLoading(false)
    if (error) { setError(error.message); return }
    navigate('/coach')
  }

  return (
    <div style={S.page} dir="rtl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div style={S.card}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <p style={{ fontSize: 10, color: '#94A3B8', letterSpacing: '0.15em', marginBottom: 2 }}>בס"ד</p>
              <p style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', letterSpacing: '-0.03em' }}>תקציב חכם</p>
            </Link>
            <div style={{ width: 32, height: 2, background: '#C9A84C', borderRadius: 2, margin: '12px auto 20px' }} />
            <h2 style={{ fontSize: 18, fontWeight: 600, color: '#0F172A', marginBottom: 4 }}>
              {isLogin ? 'כניסת מאמן' : 'רישום מאמן חדש'}
            </h2>
            <p style={{ fontSize: 13, color: '#64748B' }}>
              {isLogin ? 'ברוך השם, שמחים לראותך' : 'צור חשבון חדש'}
            </p>
          </div>

          {/* Error */}
          {error && (
            <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#DC2626', marginBottom: 16 }}>
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div>
                <label style={S.label}>שם מלא</label>
                <input style={S.input} type="text" placeholder="ישראל כהן" value={name}
                  onChange={e => setName(e.target.value)} required
                  onFocus={e => (e.target.style.borderColor = '#94A3B8')}
                  onBlur={e => (e.target.style.borderColor = '#E2E8F0')} />
              </div>
            )}
            <div>
              <label style={S.label}>אימייל</label>
              <input style={{ ...S.input, direction: 'ltr' }} type="email" placeholder="your@email.com"
                value={email} onChange={e => setEmail(e.target.value)} required
                onFocus={e => (e.target.style.borderColor = '#94A3B8')}
                onBlur={e => (e.target.style.borderColor = '#E2E8F0')} />
            </div>
            <div>
              <label style={S.label}>סיסמה</label>
              <input style={{ ...S.input, direction: 'ltr' }} type="password" placeholder="••••••••"
                value={password} onChange={e => setPassword(e.target.value)} required
                onFocus={e => (e.target.style.borderColor = '#94A3B8')}
                onBlur={e => (e.target.style.borderColor = '#E2E8F0')} />
            </div>
            <button type="submit" disabled={loading} style={{ ...S.btn, opacity: loading ? 0.6 : 1 }}
              onMouseEnter={e => !loading && ((e.target as HTMLElement).style.background = '#1E293B')}
              onMouseLeave={e => ((e.target as HTMLElement).style.background = '#0F172A')}>
              {loading ? 'טוען...' : isLogin ? 'כניסה' : 'יצירת חשבון'}
            </button>
          </form>

          {/* Toggle */}
          <button onClick={() => { setIsLogin(!isLogin); setError('') }}
            style={{ width: '100%', textAlign: 'center', fontSize: 13, color: '#64748B', background: 'none', border: 'none', cursor: 'pointer', marginTop: 16, fontFamily: 'inherit' }}>
            {isLogin ? 'מאמן חדש? לחץ לרישום' : 'יש לי חשבון — כניסה'}
          </button>

          <div style={{ borderTop: '1px solid #F1F5F9', marginTop: 20, paddingTop: 16, textAlign: 'center' }}>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#94A3B8', textDecoration: 'none' }}>
              <ArrowRight size={12} /> חזרה לאתר
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
