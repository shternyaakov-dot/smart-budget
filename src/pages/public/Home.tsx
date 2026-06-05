import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, TrendingUp, ShieldCheck, Heart, ChevronLeft } from 'lucide-react'

const painPoints = [
  { icon: <TrendingUp size={20} />, title: 'לאן הולך הכסף?', text: 'הכסף נכנס, ברוך השם — אבל בסוף החודש לא ברור לאן הוא הלך' },
  { icon: <ShieldCheck size={20} />, title: 'חובות וחסכון', text: 'רוצים לחסוך ולצאת מחובות — אבל לא יודעים מאיפה להתחיל' },
  { icon: <Heart size={20} />, title: 'שלום בית', text: 'הלחץ הכלכלי משפיע על שלום הבית — ורוצים לשנות את זה' },
]

const stages = [
  { n: '1', title: 'מודעות', desc: 'מפגשים 1–2' },
  { n: '2', title: 'שינוי', desc: 'מפגשים 3–4' },
  { n: '3', title: 'שמירה', desc: 'מפגשים 5–6' },
]

export default function Home() {
  return (
    <div style={{ fontFamily: 'Inter, Segoe UI, system-ui, sans-serif' }}>

      {/* ── HERO ── */}
      <section style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 60%, #0F172A 100%)',
        padding: '96px 24px 104px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Subtle grid overlay */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.04,
          backgroundImage: 'linear-gradient(#C9A84C 1px, transparent 1px), linear-gradient(90deg, #C9A84C 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }} />

        {/* Gold glow */}
        <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 300, background: 'radial-gradient(ellipse, rgba(201,168,76,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          style={{ maxWidth: 720, margin: '0 auto', position: 'relative', zIndex: 1 }}>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.25)', borderRadius: 999, padding: '6px 16px', marginBottom: 32 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#C9A84C', display: 'inline-block' }} />
            <span style={{ fontSize: 12, color: '#C9A84C', letterSpacing: '0.1em', fontWeight: 500 }}>Smart Budget London · בס"ד</span>
          </div>

          <h1 style={{ fontSize: 52, fontWeight: 700, color: '#F8FAFC', lineHeight: 1.15, letterSpacing: '-0.03em', marginBottom: 20 }}>
            הכסף נכנס,{' '}
            <span style={{ color: '#C9A84C' }}>ברוך השם</span>
            <br />— אבל בסוף החודש<br />לא נשאר כלום?
          </h1>

          <p style={{ fontSize: 18, color: '#94A3B8', lineHeight: 1.7, maxWidth: 520, margin: '0 auto 40px' }}>
            בעזרת השם, אני מסייע למשפחות לעשות סדר בהכנסות ובהוצאות, לבנות תקציב שמחזיק, ולהגיע לשקט ושלום בית.
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn-accent" style={{ fontSize: 15, padding: '13px 32px' }}>
              לקביעת שיחת היכרות ללא עלות
              <ArrowLeft size={17} />
            </Link>
            <Link to="/service" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#64748B', fontSize: 14, textDecoration: 'none', padding: '13px 20px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)', transition: 'color 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#94A3B8')}
              onMouseLeave={e => (e.currentTarget.style.color = '#64748B')}>
              קרא על התהליך <ChevronLeft size={14} />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ── PAIN POINTS ── */}
      <section style={{ background: '#FAFAFA', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="accent-line" style={{ margin: '0 auto 16px' }} />
            <h2 style={{ fontSize: 30, fontWeight: 700, color: '#0F172A', letterSpacing: '-0.02em', marginBottom: 10 }}>
              מה מביא אנשים אליי?
            </h2>
            <p className="text-muted" style={{ fontSize: 15 }}>שלושת האתגרים הכי נפוצים</p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 64 }}>
            {painPoints.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                className="ui-card"
                style={{ padding: '28px 24px' }}>
                <div style={{ width: 44, height: 44, background: '#F8FAFC', borderRadius: 10, border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, color: '#475569' }}>
                  {item.icon}
                </div>
                <h3 style={{ fontWeight: 600, fontSize: 16, color: '#0F172A', marginBottom: 8 }}>{item.title}</h3>
                <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.65 }}>{item.text}</p>
              </motion.div>
            ))}
          </div>

          {/* Process strip */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ background: '#0F172A', borderRadius: 16, padding: '48px 40px', color: 'white', display: 'grid', gridTemplateColumns: '1fr 1px 2fr', gap: 40, alignItems: 'center' }}>

            <div>
              <p style={{ fontSize: 11, color: '#C9A84C', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 12 }}>בעזרת השם</p>
              <h3 style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 10 }}>תהליך ליווי אישי בן 6 מפגשים</h3>
              <p style={{ fontSize: 14, color: '#94A3B8', lineHeight: 1.7, marginBottom: 20 }}>
                מעשי, ברור, ומותאם לאורח החיים שלכם. בסוף יש לכם תקציב שעובד, ברוך השם.
              </p>
              <Link to="/service" className="btn-accent" style={{ fontSize: 14, padding: '10px 22px' }}>
                לפרטים <ArrowLeft size={14} />
              </Link>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.08)', height: '100%', minHeight: 120 }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {stages.map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C9A84C', fontSize: 14, fontWeight: 700, flexShrink: 0 }}>
                    {s.n}
                  </div>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: 15, marginBottom: 2 }}>{s.title}</p>
                    <p style={{ fontSize: 12, color: '#64748B' }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
