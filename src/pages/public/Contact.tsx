import { Mail, Clock } from 'lucide-react'
import { motion } from 'framer-motion'

const F = 'Inter, Segoe UI, system-ui, sans-serif'

export default function Contact() {
  return (
    <div style={{ fontFamily: F, minHeight: 'calc(100vh - 120px)', background: '#FAFAFA', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 24px' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}
        style={{ width: '100%', maxWidth: 480 }}>

        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <p style={{ fontSize: 11, color: '#C9A84C', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 12 }}>בס"ד — צור קשר</p>
          <div style={{ width: 32, height: 2, background: '#C9A84C', borderRadius: 2, margin: '0 auto 20px' }} />
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#0F172A', letterSpacing: '-0.02em' }}>שמחים לשמוע מכם</h1>
          <p style={{ fontSize: 15, color: '#64748B', marginTop: 8, lineHeight: 1.6 }}>
            רוצים לדעת אם התהליך מתאים לכם?<br />שלחו מייל ונקבע שיחת היכרות ללא עלות, בעזרת השם.
          </p>
        </div>

        {/* Card */}
        <div style={{ background: '#ffffff', border: '1px solid #E2E8F0', borderRadius: 16, padding: '36px 32px', boxShadow: '0 4px 24px rgba(0,0,0,0.05)', textAlign: 'center' }}>
          <div style={{ width: 56, height: 56, background: '#F8FAFC', borderRadius: 14, border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: '#475569' }}>
            <Mail size={22} />
          </div>

          <a href="mailto:smartbudgetlondon@gmail.com"
            style={{ display: 'inline-block', background: '#0F172A', color: '#ffffff', fontWeight: 600, fontSize: 14, padding: '12px 28px', borderRadius: 10, textDecoration: 'none', letterSpacing: '-0.01em', transition: 'background 0.15s, transform 0.15s', direction: 'ltr' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#1E293B'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#0F172A'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)' }}>
            smartbudgetlondon@gmail.com
          </a>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 20, color: '#94A3B8', fontSize: 13 }}>
            <Clock size={13} />
            <span>נחזור אליכם תוך יום עסקים, בעזרת השם</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
