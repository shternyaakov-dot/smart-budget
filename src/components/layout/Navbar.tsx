import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'

const links = [
  { href: '/', label: 'דף הבית' },
  { href: '/service', label: 'השירות' },
  { href: '/contact', label: 'צור קשר' },
]

export function Navbar() {
  const { pathname } = useLocation()
  const { user } = useAuth()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: scrolled ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.98)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: scrolled ? '1px solid #E2E8F0' : '1px solid transparent',
      transition: 'all 0.25s',
      boxShadow: scrolled ? '0 1px 8px rgba(0,0,0,0.06)' : 'none',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          <span style={{ fontSize: 10, color: '#94A3B8', letterSpacing: '0.15em' }}>בס"ד</span>
          <span style={{ fontSize: 17, fontWeight: 700, color: '#0F172A', lineHeight: 1.2, letterSpacing: '-0.03em' }}>תקציב חכם</span>
          <span style={{ fontSize: 9, color: '#C9A84C', letterSpacing: '0.12em', fontWeight: 500 }}>SMART BUDGET LONDON</span>
        </Link>

        {/* Desktop nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="hidden md:flex">
          {links.map(l => (
            <Link key={l.href} to={l.href} style={{
              padding: '7px 14px',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: pathname === l.href ? 600 : 400,
              color: pathname === l.href ? '#0F172A' : '#64748B',
              background: pathname === l.href ? '#F1F5F9' : 'transparent',
              textDecoration: 'none',
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => { if (pathname !== l.href) (e.target as HTMLElement).style.color = '#0F172A' }}
            onMouseLeave={e => { if (pathname !== l.href) (e.target as HTMLElement).style.color = '#64748B' }}>
              {l.label}
            </Link>
          ))}
          <div style={{ width: 1, height: 20, background: '#E2E8F0', margin: '0 8px' }} />
          {user ? (
            <Link to="/coach" className="btn-cta" style={{ padding: '8px 18px', fontSize: 13 }}>לוח הבקרה</Link>
          ) : (
            <Link to="/auth" className="btn-ghost" style={{ fontSize: 13 }}>כניסת לקוחות</Link>
          )}
        </div>

        {/* Mobile */}
        <button className="md:hidden" onClick={() => setOpen(!open)}
          style={{ padding: 8, borderRadius: 8, border: '1px solid #E2E8F0', background: 'transparent', cursor: 'pointer', color: '#64748B' }}>
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            style={{ borderTop: '1px solid #F1F5F9', overflow: 'hidden' }}>
            <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 4 }}>
              {links.map(l => (
                <Link key={l.href} to={l.href} onClick={() => setOpen(false)}
                  style={{ padding: '10px 14px', borderRadius: 8, fontSize: 14, color: pathname === l.href ? '#0F172A' : '#64748B', fontWeight: pathname === l.href ? 600 : 400, background: pathname === l.href ? '#F1F5F9' : 'transparent', textDecoration: 'none' }}>
                  {l.label}
                </Link>
              ))}
              <Link to={user ? '/coach' : '/auth'} onClick={() => setOpen(false)}
                className="btn-cta" style={{ marginTop: 4, justifyContent: 'center', padding: '10px 18px' }}>
                {user ? 'לוח הבקרה' : 'כניסת לקוחות'}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
