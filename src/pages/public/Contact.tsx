import { Mail } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Contact() {
  return (
    <section className="section-padding flex flex-col items-center">
      <p className="text-gold text-xs tracking-[0.2em] mb-3">בס"ד — צור קשר</p>
      <div className="w-10 h-0.5 bg-navy mx-auto mb-6" />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-navy mb-3">שמחים לשמוע מכם</h2>
        <p className="text-gray-500 leading-relaxed mb-7">
          רוצים לדעת אם התהליך מתאים לכם? שלחו מייל ונקבע שיחת היכרות ללא עלות, בעזרת השם.
        </p>
        <a href="mailto:smartbudgetlondon@gmail.com"
          className="inline-flex items-center gap-2 bg-navy text-white px-7 py-3 rounded-xl font-semibold hover:bg-navy-light transition-all">
          <Mail size={17} />
          smartbudgetlondon@gmail.com
        </a>
        <p className="text-xs text-gray-400 mt-5">נחזור אליכם תוך יום עסקים, בעזרת השם</p>
      </motion.div>
    </section>
  )
}
