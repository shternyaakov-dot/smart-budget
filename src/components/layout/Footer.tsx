export function Footer() {
  return (
    <footer style={{ background: '#0F172A', padding: '24px', textAlign: 'center', fontFamily: 'Inter, Segoe UI, system-ui, sans-serif' }}>
      <p style={{ fontSize: 13, color: '#475569' }}>
        <span style={{ color: '#C9A84C', fontWeight: 600 }}>תקציב חכם</span>
        {' '}— Smart Budget London &nbsp;·&nbsp; בס"ד &nbsp;·&nbsp;{' '}
        <a href="mailto:smartbudgetlondon@gmail.com"
          style={{ color: '#475569', textDecoration: 'none', transition: 'color 0.15s' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#C9A84C')}
          onMouseLeave={e => (e.currentTarget.style.color = '#475569')}>
          smartbudgetlondon@gmail.com
        </a>
      </p>
    </footer>
  )
}
