'use client'
// app/feedback/page.tsx  (or wherever you want the route)
// AlphaCreative — Client Feedback Form

import { useState } from 'react'

type AreaRatings = {
  communication?: number
  quality?: number
  responsiveness?: number
  value?: number
}

const AREA_LABELS: { key: keyof AreaRatings; label: string }[] = [
  { key: 'communication', label: 'Communication' },
  { key: 'quality', label: 'Quality of work' },
  { key: 'responsiveness', label: 'Responsiveness' },
  { key: 'value', label: 'Value for money' },
]

const STAR_LABELS = ['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent']

function StarRow({
  value,
  onChange,
}: {
  value: number
  onChange: (v: number) => void
}) {
  const [hover, setHover] = useState(0)
  return (
    <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          onMouseEnter={() => setHover(n)}
          onMouseLeave={() => setHover(0)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: 28,
            padding: '2px 4px',
            color: n <= (hover || value) ? '#C9A84C' : '#DDE3F0',
            transition: 'color 0.15s',
          }}
        >
          ★
        </button>
      ))}
      {value > 0 && (
        <span style={{ fontSize: 13, color: '#6B7A99', marginLeft: 8 }}>
          {STAR_LABELS[value]}
        </span>
      )}
    </div>
  )
}

export default function FeedbackPage() {
  const [clientName, setClientName] = useState('')
  const [clientEmail, setClientEmail] = useState('')
  const [projectName, setProjectName] = useState('')
  const [overallRating, setOverallRating] = useState(0)
  const [areaRatings, setAreaRatings] = useState<AreaRatings>({})
  const [wentWell, setWentWell] = useState('')
  const [improve, setImprove] = useState('')
  const [finalNotes, setFinalNotes] = useState('')
  const [npsScore, setNpsScore] = useState<number | null>(null)
  const [wouldReturn, setWouldReturn] = useState('')
  const [testimonialConsent, setTestimonialConsent] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    if (!clientEmail) {
      setError('Please enter your email.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName,
          clientEmail,
          projectName,
          overallRating: overallRating || null,
          areaRatings,
          wentWell,
          improve,
          finalNotes,
          npsScore,
          wouldReturn,
          testimonialConsent,
        }),
      })
      if (!res.ok) throw new Error('Submission failed')
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px',
    border: '1.5px solid #DDE3F0',
    borderRadius: 10,
    fontSize: 15,
    color: '#0F1E3D',
    background: '#FAF8F3',
    outline: 'none',
    fontFamily: 'inherit',
  }

  const cardStyle: React.CSSProperties = {
    background: '#FFFFFF',
    borderRadius: 16,
    padding: '40px',
    marginBottom: 16,
    border: '1px solid #DDE3F0',
  }

  const sectionLabel: React.CSSProperties = {
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: '#C9A84C',
    marginBottom: 6,
  }

  const sectionTitle: React.CSSProperties = {
    fontSize: 20,
    fontWeight: 500,
    color: '#0F1E3D',
    marginBottom: 24,
    fontFamily: "'Playfair Display', Georgia, serif",
  }

  if (submitted) {
    return (
      <div style={{ maxWidth: 680, margin: '80px auto', padding: '0 16px', textAlign: 'center' }}>
        <div style={{ ...cardStyle, padding: '60px 40px' }}>
          <div style={{
            width: 64, height: 64, borderRadius: '50%',
            background: '#F5E9C8', display: 'flex', alignItems: 'center',
            justifyContent: 'center', margin: '0 auto 24px', fontSize: 24
          }}>
            ✦
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 26, color: '#0F1E3D', marginBottom: 12 }}>
            Thank you so much.
          </h2>
          <div style={{ width: 48, height: 2, background: '#C9A84C', margin: '0 auto 20px' }} />
          <p style={{ fontSize: 15, color: '#6B7A99', lineHeight: 1.7 }}>
            Your feedback means a great deal and helps us keep improving for every client.
            We truly appreciate the time you took to share your experience.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 680, margin: '0 auto', padding: '48px 16px 80px', fontFamily: "'DM Sans', system-ui, sans-serif" }}>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
          <div style={{ width: 24, height: 24, background: '#C9A84C', transform: 'rotate(45deg)', borderRadius: 3 }} />
          <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 18, color: '#0F1E3D', letterSpacing: '0.04em' }}>
            AlphaCreative
          </span>
        </div>
        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 32, fontWeight: 500, color: '#0F1E3D', marginBottom: 12 }}>
          How did we do?
        </h1>
        <div style={{ width: 48, height: 2, background: '#C9A84C', margin: '16px auto' }} />
        <p style={{ fontSize: 15, color: '#6B7A99', maxWidth: 480, margin: '0 auto', lineHeight: 1.6 }}>
          Your honest feedback helps us grow and helps future clients know what to expect. This takes about 3 minutes.
        </p>
      </div>

      {/* Your Info */}
      <div style={cardStyle}>
        <p style={sectionLabel}>Your Info</p>
        <p style={sectionTitle}>Let's start with you</p>
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', fontSize: 14, fontWeight: 500, color: '#0F1E3D', marginBottom: 8 }}>Full name</label>
          <input style={inputStyle} value={clientName} onChange={e => setClientName(e.target.value)} placeholder="e.g. Michelle Williams" />
        </div>
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', fontSize: 14, fontWeight: 500, color: '#0F1E3D', marginBottom: 8 }}>
            Email <span style={{ fontWeight: 300, color: '#6B7A99', fontSize: 13 }}>— so we can follow up if needed</span>
          </label>
          <input style={inputStyle} type="email" value={clientEmail} onChange={e => setClientEmail(e.target.value)} placeholder="you@example.com" />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 14, fontWeight: 500, color: '#0F1E3D', marginBottom: 8 }}>Project or service</label>
          <input style={inputStyle} value={projectName} onChange={e => setProjectName(e.target.value)} placeholder="e.g. Website design, Social media setup…" />
        </div>
      </div>

      {/* Ratings */}
      <div style={cardStyle}>
        <p style={sectionLabel}>Overall</p>
        <p style={sectionTitle}>Your overall experience</p>
        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', fontSize: 14, fontWeight: 500, color: '#0F1E3D', marginBottom: 10 }}>Overall satisfaction</label>
          <StarRow value={overallRating} onChange={setOverallRating} />
        </div>
        <div style={{ borderTop: '1px solid #DDE3F0', paddingTop: 24 }}>
          <p style={{ ...sectionLabel, marginBottom: 16 }}>Specific Areas</p>
          <div style={{ display: 'grid', gap: 20 }}>
            {AREA_LABELS.map(({ key, label }) => (
              <div key={key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 14, color: '#0F1E3D', minWidth: 140 }}>{label}</span>
                <StarRow
                  value={areaRatings[key] || 0}
                  onChange={v => setAreaRatings(prev => ({ ...prev, [key]: v }))}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Open text */}
      <div style={cardStyle}>
        <p style={sectionLabel}>In Your Words</p>
        <p style={sectionTitle}>Tell us more</p>
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', fontSize: 14, fontWeight: 500, color: '#0F1E3D', marginBottom: 8 }}>
            What went well? <span style={{ fontWeight: 300, color: '#6B7A99', fontSize: 13 }}>— optional</span>
          </label>
          <textarea style={{ ...inputStyle, minHeight: 96, resize: 'vertical', lineHeight: 1.6 }}
            value={wentWell} onChange={e => setWentWell(e.target.value)}
            placeholder="What did you appreciate most about working with AlphaCreative?" />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 14, fontWeight: 500, color: '#0F1E3D', marginBottom: 8 }}>
            What could we improve? <span style={{ fontWeight: 300, color: '#6B7A99', fontSize: 13 }}>— optional</span>
          </label>
          <textarea style={{ ...inputStyle, minHeight: 96, resize: 'vertical', lineHeight: 1.6 }}
            value={improve} onChange={e => setImprove(e.target.value)}
            placeholder="Anything you'd change about the process or experience?" />
        </div>
      </div>

      {/* NPS + Would return */}
      <div style={cardStyle}>
        <p style={sectionLabel}>Likelihood to Recommend</p>
        <p style={sectionTitle}>How likely are you to refer us?</p>
        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', fontSize: 14, fontWeight: 500, color: '#0F1E3D', marginBottom: 14 }}>On a scale of 0–10</label>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {Array.from({ length: 11 }, (_, i) => (
              <button key={i} type="button" onClick={() => setNpsScore(i)}
                style={{
                  width: 44, height: 44,
                  border: `1.5px solid ${npsScore === i ? '#0F1E3D' : '#DDE3F0'}`,
                  borderRadius: 8,
                  background: npsScore === i ? '#0F1E3D' : '#FAF8F3',
                  color: npsScore === i ? '#E2C472' : '#6B7A99',
                  fontSize: 14, fontWeight: 500, cursor: 'pointer',
                  transition: 'all 0.15s',
                }}>
                {i}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
            <span style={{ fontSize: 12, color: '#6B7A99' }}>Not at all likely</span>
            <span style={{ fontSize: 12, color: '#6B7A99' }}>Extremely likely</span>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #DDE3F0', paddingTop: 24 }}>
          <label style={{ display: 'block', fontSize: 14, fontWeight: 500, color: '#0F1E3D', marginBottom: 12 }}>Would you work with us again?</label>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {[{ val: 'yes', label: 'Yes, definitely' }, { val: 'maybe', label: 'Maybe' }, { val: 'no', label: 'Not at this time' }].map(opt => (
              <button key={opt.val} type="button" onClick={() => setWouldReturn(opt.val)}
                style={{
                  flex: 1, minWidth: 120, padding: '12px',
                  border: `1.5px solid ${wouldReturn === opt.val ? '#0F1E3D' : '#DDE3F0'}`,
                  borderRadius: 10,
                  background: wouldReturn === opt.val ? '#0F1E3D' : '#FAF8F3',
                  color: wouldReturn === opt.val ? '#E2C472' : '#6B7A99',
                  fontSize: 14, fontWeight: wouldReturn === opt.val ? 500 : 400,
                  cursor: 'pointer', transition: 'all 0.15s',
                }}>
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonial + final */}
      <div style={cardStyle}>
        <p style={sectionLabel}>Testimonial</p>
        <p style={sectionTitle}>May we share your feedback?</p>
        <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: 16, border: '1.5px solid #DDE3F0', borderRadius: 10, background: '#FAF8F3', cursor: 'pointer', marginBottom: 20 }}>
          <input type="checkbox" checked={testimonialConsent} onChange={e => setTestimonialConsent(e.target.checked)}
            style={{ width: 18, height: 18, marginTop: 2, accentColor: '#0F1E3D', cursor: 'pointer', flexShrink: 0 }} />
          <div>
            <span style={{ fontSize: 14, color: '#0F1E3D', fontWeight: 400 }}>Yes — AlphaCreative may use my feedback as a testimonial</span>
            <small style={{ display: 'block', color: '#6B7A99', fontSize: 12, marginTop: 4 }}>
              We may use your name and comments on our website or marketing materials. You can request removal at any time.
            </small>
          </div>
        </label>
        <div>
          <label style={{ display: 'block', fontSize: 14, fontWeight: 500, color: '#0F1E3D', marginBottom: 8 }}>
            Anything else? <span style={{ fontWeight: 300, color: '#6B7A99', fontSize: 13 }}>— optional</span>
          </label>
          <textarea style={{ ...inputStyle, minHeight: 72, resize: 'vertical', lineHeight: 1.6 }}
            value={finalNotes} onChange={e => setFinalNotes(e.target.value)}
            placeholder="Final thoughts, shoutouts, questions…" />
        </div>
      </div>

      {error && <p style={{ color: '#E24B4A', fontSize: 14, textAlign: 'center', marginBottom: 12 }}>{error}</p>}

      <button type="button" onClick={handleSubmit} disabled={loading}
        style={{
          display: 'block', width: '100%', padding: 16,
          background: loading ? '#6B7A99' : '#0F1E3D',
          color: '#E2C472', fontSize: 16, fontWeight: 500,
          letterSpacing: '0.04em', border: 'none', borderRadius: 12,
          cursor: loading ? 'not-allowed' : 'pointer',
          transition: 'background 0.2s',
          fontFamily: 'inherit',
        }}>
        {loading ? 'Submitting…' : 'Submit feedback'}
      </button>

      <p style={{ textAlign: 'center', marginTop: 28, fontSize: 13, color: '#6B7A99' }}>
        Powered by <a href="https://thealphacreative.com" style={{ color: '#C9A84C', textDecoration: 'none' }}>AlphaCreative</a> · Your responses are kept confidential.
      </p>
    </div>
  )
}
