import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'

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
    const { error } = isLogin
      ? await signIn(email, password)
      : await signUp(email, password, name)
    setLoading(false)
    if (error) { setError(error.message); return }
    navigate('/coach')
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4" dir="rtl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
        <div className="text-center mb-7">
          <p className="text-gold text-xs tracking-widest mb-1">בס"ד</p>
          <h2 className="text-xl font-bold text-navy">{isLogin ? 'כניסת מאמן' : 'רישום מאמן חדש'}</h2>
        </div>

        {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {!isLogin && (
            <input type="text" placeholder="שם מלא" value={name} onChange={e => setName(e.target.value)} required
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-navy" />
          )}
          <input type="email" placeholder="אימייל" value={email} onChange={e => setEmail(e.target.value)} required
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-navy" dir="ltr" />
          <input type="password" placeholder="סיסמה" value={password} onChange={e => setPassword(e.target.value)} required
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-navy" dir="ltr" />
          <button type="submit" disabled={loading}
            className="w-full bg-navy text-white py-2.5 rounded-lg font-semibold hover:bg-navy-light transition-all disabled:opacity-60 mt-1">
            {loading ? 'טוען...' : isLogin ? 'כניסה' : 'יצירת חשבון'}
          </button>
        </form>

        <button onClick={() => setIsLogin(!isLogin)} className="w-full text-center text-sm text-gray-400 hover:text-navy mt-4 transition-colors">
          {isLogin ? 'מאמן חדש? לחץ לרישום' : 'יש לי חשבון — כניסה'}
        </button>
      </motion.div>
    </div>
  )
}
