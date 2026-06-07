import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Check } from 'lucide-react'

const F = 'Inter, Segoe UI, system-ui, sans-serif'

const stages = [
  { n: '01', title: 'מודעות', sessions: 'מפגשים 1–2', desc: 'מבינים יחד לאן הכסף הולך. עושים תמונה ברורה של ההכנסות וההוצאות — בלי שיפוטיות, רק עם כוונה לסדר.', en: 'Awareness — Understanding where the money actually goes.' },
  { n: '02', title: 'שינוי',   sessions: 'מפגשים 3–4', desc: 'בונים יחד תקציב שמתאים לחיים האמיתיים שלכם, ומתרגלים יחד להחלטות כלכליות נכונות, בעזרת השם.', en: 'Change — Building a budget and practising the right decisions.' },
  { n: '03', title: 'שמירה',  sessions: 'מפגשים 5–6', desc: 'מוודאים שהשינוי מחזיק לאורך זמן. יוצאים עם כלים שמלווים אתכם גם אחר כך, ברוך השם.', en: 'Maintenance — Ensuring the change lasts long-term.' },
]

const forWhom = [
  'משפחות שרוצות לדעת לאן הכסף הולך',
  'זוגות שהלחץ הכלכלי משפיע על שלום הבית שלהם',
  'מי שרוצה לצאת מחובות ולבנות עתיד יציב, בעזרת השם',
  'כל מי שמרגיש שהגיע הזמן לשנות',
]

export default function Service() {
  return (
    <div style={{ fontFamily: F }}>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)', padding: '72px 24px 80px', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ maxWidth: 600, margin: '0 auto' }}>
          <p style={{ fontSize: 11, color: '#C9A84C', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 16 }}>בס"ד — השירות</p>
          <div style={{ width: 32, height: 2, background: '#C9A84C', borderRadius: 2, margin: '0 auto 24px' }} />
          <h1 style={{ fontSize: 36, fontWeight: 700, color: '#F8FAFC', letterSpacing: '-0.03em', lineHeight: 1.2 }}>
            ליווי אישי בענייני כסף
          </h1>
          <p style={{ fontSize: 16, color: '#64748B', marginTop: 12 }}>צעד אחר צעד, בעזרת השם</p>
        </motion.div>
      </section>

      {/* Stages */}
      <section style={{ background: '#FAFAFA', padding: '72px 24px' }}>
        <div style={{ maxWidth: 780, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <div style={{ width: 32, height: 2, background: '#C9A84C', borderRadius: 2, margin: '0 auto 16px' }} />
            <h2 style={{ fontSize: 26, fontWeight: 700, color: '#0F172A', letterSpacing: '-0.02em' }}>3 שלבי התהליך</h2>
            <p style={{ fontSize: 14, color: '#64748B', marginTop: 8 }}>בעזרת השם, כל שלב בנוי על הקודם — עד שהשינוי נהיה חלק מהחיים</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 56 }}>
            {stages.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 14, padding: '24px 28px', display: 'flex', gap: 24, alignItems: 'flex-start', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', transition: 'box-shadow 0.2s, border-color 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 12px rgba(0,0,0,0.07)'; (e.currentTarget as HTMLElement).style.borderColor = '#CBD5E1' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)'; (e.currentTarget as HTMLElement).style.borderColor = '#E2E8F0' }}>
                <div style={{ fontWeight: 700, fontSize: 13, color: '#C9A84C', letterSpacing: '0.05em', flexShrink: 0, marginTop: 2 }}>{s.n}</div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                    <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0F172A', letterSpacing: '-0.01em' }}>{s.title}</h3>
                    <span style={{ fontSize: 11, padding: '2px 10px', borderRadius: 999, background: '#F1F5F9', color: '#64748B', border: '1px solid #E2E8F0' }}>{s.sessions}</span>
                  </div>
                  <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.7, marginBottom: 6 }}>{s.desc}</p>
                  <p style={{ fontSize: 12, color: '#94A3B8', fontStyle: 'italic' }}>{s.en}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* For whom */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ background: '#0F172A', borderRadius: 16, padding: '40px 36px' }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#F8FAFC', marginBottom: 24, textAlign: 'center' }}>למי זה מתאים?</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {forWhom.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 16px', background: 'rgba(255,255,255,0.05)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div style={{ width: 20, height: 20, borderRadius: 6, background: 'rgba(201,168,76,0.2)', border: '1px solid rgba(201,168,76,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                    <Check size={11} color="#C9A84C" />
                  </div>
                  <p style={{ fontSize: 14, color: '#CBD5E1', lineHeight: 1.5 }}>{item}</p>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: 32 }}>
              <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#C9A84C', color: '#0F172A', fontWeight: 700, fontSize: 14, padding: '12px 28px', borderRadius: 10, textDecoration: 'none' }}>
                לקביעת שיחת היכרות ללא עלות <ArrowLeft size={15} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
