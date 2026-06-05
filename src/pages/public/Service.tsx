import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

const stages = [
  { he: 'א', title: 'מודעות', desc: 'מבינים יחד לאן הכסף הולך. תמונה ברורה של ההכנסות וההוצאות — בלי שיפוטיות, רק עם כוונה לסדר.', sessions: 'מפגשים 1–2' },
  { he: 'ב', title: 'שינוי', desc: 'בונים יחד תקציב שמתאים לחיים האמיתיים שלכם, ומתרגלים יחד להחלטות נכונות, בעזרת השם.', sessions: 'מפגשים 3–4' },
  { he: 'ג', title: 'שמירה', desc: 'מוודאים שהשינוי מחזיק. יוצאים עם כלים שמלווים אתכם גם אחר כך, ברוך השם.', sessions: 'מפגשים 5–6' },
]

export default function Service() {
  return (
    <div>
      <section className="bg-navy text-white py-14 px-6 text-center">
        <p className="text-gold text-xs tracking-[0.2em] mb-3">בס"ד — השירות</p>
        <div className="w-10 h-0.5 bg-gold mx-auto mb-5" />
        <h1 className="text-3xl font-bold">ליווי אישי בענייני כסף — צעד אחר צעד, בעזרת השם</h1>
      </section>

      <section className="section-padding">
        <h2 className="text-2xl font-bold text-navy text-center mb-3">3 שלבי התהליך</h2>
        <p className="text-gray-500 text-center mb-10">בעזרת השם, כל שלב בנוי על הקודם — עד שהשינוי נהיה חלק מהחיים</p>

        <div className="flex flex-col gap-4 mb-12">
          {stages.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }} viewport={{ once: true }}
              className="bg-white rounded-xl border border-gray-100 p-6 flex gap-5 items-start shadow-sm">
              <div className="w-11 h-11 bg-navy text-gold rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0">
                {s.he}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-navy mb-2">{s.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-2">{s.desc}</p>
                <span className="text-xs text-gold bg-gold-light px-3 py-1 rounded-full">{s.sessions}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-navy rounded-2xl p-7 text-white">
          <h3 className="text-lg font-bold text-gold mb-4 text-center">למי זה מתאים?</h3>
          <ul className="space-y-3">
            {[
              'משפחות שרוצות לדעת לאן הכסף הולך',
              'זוגות שהלחץ הכלכלי משפיע על שלום הבית שלהם',
              'מי שרוצה לצאת מחובות ולבנות עתיד יציב, בעזרת השם',
              'כל מי שמרגיש שהגיע הזמן לשנות',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 bg-white/7 rounded-lg px-4 py-3 border-r-2 border-gold">
                <span className="text-white/90 text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center mt-10">
          <Link to="/contact"
            className="inline-flex items-center gap-2 bg-gold text-navy font-bold px-8 py-3.5 rounded-lg hover:bg-gold-dark transition-all">
            לקביעת שיחת היכרות ללא עלות <ArrowLeft size={16} />
          </Link>
        </div>
      </section>
    </div>
  )
}
