import Link from 'next/link'

export default function Home() {
  return (
    <main style={{ fontFamily: 'var(--font-dm-sans), system-ui, sans-serif' }}>

      {/* Nav */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '24px 48px', borderBottom: '1px solid #DDE3F0',
        background: '#FFFFFF',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 22, height: 22, background: '#C9A84C', transform: 'rotate(45deg)', borderRadius: 3 }} />
          <span style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: 18, fontWeight: 500, color: '#0F1E3D', letterSpacing: '0.04em' }}>
            AlphaCreative
          </span>
        </div>
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          <a href="https://thealphacreative.com/services" style={{ fontSize: 14, color: '#6B7A99', textDecoration: 'none' }}>Services</a>
          <a href="https://thealphacreative.com/our-work" style={{ fontSize: 14, color: '#6B7A99', textDecoration: 'none' }}>Our Work</a>
          <a href="https://thealphacreative.com/about" style={{ fontSize: 14, color: '#6B7A99', textDecoration: 'none' }}>About</a>
          <a href="https://alphacreative.as.me/" style={{
            fontSize: 14, fontWeight: 500, color: '#E2C472',
            background: '#0F1E3D', padding: '8px 20px',
            borderRadius: 8, textDecoration: 'none',
          }}>
            Book a call
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section style={{
        maxWidth: 900, margin: '0 auto', padding: '100px 48px 80px',
        textAlign: 'center',
      }}>
        <p style={{
          fontSize: 11, fontWeight: 500, letterSpacing: '0.14em',
          textTransform: 'uppercase', color: '#C9A84C', marginBottom: 20,
        }}>
          AI-Powered Growth Systems
        </p>
        <h1 style={{
          fontFamily: 'var(--font-playfair), Georgia, serif',
          fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 500,
          color: '#0F1E3D', lineHeight: 1.1, marginBottom: 28,
        }}>
          Where design<br />
          <em style={{ fontStyle: 'italic', color: '#C9A84C' }}>meets data.</em>
        </h1>
        <p style={{ fontSize: 18, color: '#6B7A99', lineHeight: 1.7, maxWidth: 560, margin: '0 auto 40px', fontWeight: 300 }}>
          Strategy still matters. AI just helps it scale. We build data-driven growth systems that connect your website, analytics, and acquisition channels into a single measurable engine.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="https://alphacreative.as.me/" style={{
            display: 'inline-block', padding: '16px 36px',
            background: '#0F1E3D', color: '#E2C472',
            fontWeight: 500, fontSize: 16, borderRadius: 10,
            textDecoration: 'none', letterSpacing: '0.03em',
          }}>
            Book a Discovery Call
          </a>
          <a href="https://thealphacreative.com/services" style={{
            display: 'inline-block', padding: '16px 36px',
            background: 'transparent', color: '#0F1E3D',
            fontWeight: 500, fontSize: 16, borderRadius: 10,
            textDecoration: 'none', border: '1.5px solid #DDE3F0',
          }}>
            View Services
          </a>
        </div>
      </section>

      {/* Three pillars */}
      <section style={{ background: '#FFFFFF', padding: '80px 48px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#C9A84C', textAlign: 'center', marginBottom: 12 }}>
            How Growth Happens
          </p>
          <h2 style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: 36, fontWeight: 500, color: '#0F1E3D', textAlign: 'center', marginBottom: 56 }}>
            The AlphaCreative Growth System
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 32 }}>
            {[
              { num: '01', title: 'Market Positioning', sub: 'Clarity before traffic.', body: 'Before you spend a dollar on ads, we define the foundation: who you serve, what makes you different, and why customers should choose you.' },
              { num: '02', title: 'Conversion Infrastructure', sub: 'Turn attention into revenue.', body: 'Traffic alone doesn\'t grow a business. We design the infrastructure behind growth — high-converting pages, analytics tracking, funnels, and automations.' },
              { num: '03', title: 'Customer Acquisition', sub: 'Scale with precision.', body: 'AI-optimized campaigns across Google, Meta, and LinkedIn drive qualified traffic into your system — creating predictable customer acquisition.' },
            ].map(({ num, title, sub, body }) => (
              <div key={num} style={{ padding: '32px', border: '1px solid #DDE3F0', borderRadius: 16, background: '#FAF8F3' }}>
                <p style={{ fontSize: 12, fontWeight: 500, color: '#C9A84C', letterSpacing: '0.1em', marginBottom: 16 }}>{num}</p>
                <h3 style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: 22, fontWeight: 500, color: '#0F1E3D', marginBottom: 8 }}>{title}</h3>
                <p style={{ fontSize: 14, fontWeight: 500, color: '#0F1E3D', marginBottom: 12 }}>{sub}</p>
                <p style={{ fontSize: 14, color: '#6B7A99', lineHeight: 1.7, fontWeight: 300 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Retainer tiers */}
      <section style={{ padding: '80px 48px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#C9A84C', textAlign: 'center', marginBottom: 12 }}>
            Ongoing Strategic Growth Support
          </p>
          <h2 style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: 36, fontWeight: 500, color: '#0F1E3D', textAlign: 'center', marginBottom: 16 }}>
            Invest in Growth. Not Guesswork.
          </h2>
          <p style={{ fontSize: 16, color: '#6B7A99', textAlign: 'center', marginBottom: 56, fontWeight: 300 }}>
            Choose the level of support you need. Every tier is built around measurement, optimization, and compounding results.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {[
              {
                tier: 'Tier 1', name: 'Visibility Foundation', tagline: 'Make the business discoverable',
                price: '$750/mo', popular: false,
                link: 'https://app.acuityscheduling.com/catalog.php?owner=35514751&action=addCart&clear=1&id=2165082',
                features: ['Google Business Profile optimization', 'Local SEO monitoring + improvements', 'Website health + conversion fixes', 'Monthly analytics snapshot', 'Monthly strategy call'],
              },
              {
                tier: 'Tier 2', name: 'Lead Generation Engine', tagline: 'Turn traffic into customers',
                price: '$1,500/mo', popular: true,
                link: 'https://app.acuityscheduling.com/catalog.php?owner=35514751&action=addCart&clear=1&id=2170780',
                features: ['Everything in Tier 1', '1 paid platform management', 'Conversion tracking setup', 'Landing page optimization', 'Monthly growth report', 'Continuous optimization'],
              },
              {
                tier: 'Tier 3', name: 'Growth Partner', tagline: 'Scale predictable acquisition',
                price: '$2,500/mo', popular: false,
                link: 'https://app.acuityscheduling.com/catalog.php?owner=35514751&action=addCart&clear=1&id=2170792',
                features: ['Everything in Tier 2', 'Multi-platform advertising', 'Budget allocation strategy', 'KPI dashboard', 'Biweekly strategy review', 'Ongoing funnel optimization'],
              },
            ].map(({ tier, name, tagline, price, popular, link, features }) => (
              <div key={tier} style={{
                padding: 32, borderRadius: 16, background: popular ? '#0F1E3D' : '#FFFFFF',
                border: `${popular ? '2px' : '1px'} solid ${popular ? '#C9A84C' : '#DDE3F0'}`,
                display: 'flex', flexDirection: 'column',
              }}>
                {popular && (
                  <p style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 12 }}>
                    Most Popular
                  </p>
                )}
                <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: popular ? '#E2C472' : '#C9A84C', marginBottom: 6 }}>{tier}</p>
                <h3 style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: 22, fontWeight: 500, color: popular ? '#FFFFFF' : '#0F1E3D', marginBottom: 6 }}>{name}</h3>
                <p style={{ fontSize: 13, color: popular ? '#9aaccc' : '#6B7A99', marginBottom: 16, fontWeight: 300 }}>{tagline}</p>
                <p style={{ fontSize: 28, fontWeight: 500, color: popular ? '#E2C472' : '#0F1E3D', marginBottom: 24 }}>{price}</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px', flex: 1 }}>
                  {features.map(f => (
                    <li key={f} style={{ fontSize: 14, color: popular ? '#C8D4E8' : '#6B7A99', padding: '5px 0', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                      <span style={{ color: '#C9A84C', flexShrink: 0, marginTop: 1 }}>→</span> {f}
                    </li>
                  ))}
                </ul>
                <a href={link} style={{
                  display: 'block', textAlign: 'center', padding: '13px 24px',
                  background: popular ? '#C9A84C' : '#0F1E3D',
                  color: popular ? '#0F1E3D' : '#E2C472',
                  fontWeight: 500, fontSize: 14, borderRadius: 8,
                  textDecoration: 'none',
                }}>
                  Get Started
                </a>
              </div>
            ))}
          </div>
          <p style={{ textAlign: 'center', fontSize: 13, color: '#6B7A99', marginTop: 24, fontWeight: 300 }}>
            All packages include onboarding. No long-term contracts. Cancel anytime.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#0F1E3D', padding: '48px', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 24 }}>
          <div style={{ width: 18, height: 18, background: '#C9A84C', transform: 'rotate(45deg)', borderRadius: 2 }} />
          <span style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: 16, fontWeight: 500, color: '#FFFFFF', letterSpacing: '0.04em' }}>
            AlphaCreative
          </span>
        </div>
        <p style={{ fontSize: 13, color: '#9aaccc', marginBottom: 16 }}>
          <a href="mailto:jose@thealphacreative.com" style={{ color: '#C9A84C', textDecoration: 'none' }}>jose@thealphacreative.com</a>
        </p>
        <div style={{ display: 'flex', gap: 24, justifyContent: 'center', fontSize: 12, color: '#9aaccc' }}>
          <a href="https://thealphacreative.com/privacy-policy" style={{ color: '#9aaccc', textDecoration: 'none' }}>Privacy Policy</a>
          <a href="https://thealphacreative.com/terms-conditions" style={{ color: '#9aaccc', textDecoration: 'none' }}>Terms</a>
          <Link href="/feedback" style={{ color: '#9aaccc', textDecoration: 'none' }}>Client Feedback</Link>
        </div>
        <p style={{ fontSize: 11, color: '#5a6a88', marginTop: 24 }}>
          © {new Date().getFullYear()} AlphaCreative LLC. All rights reserved.
        </p>
      </footer>

    </main>
  )
}
