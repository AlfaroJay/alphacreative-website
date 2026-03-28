'use client'
// app/admin/feedback/page.tsx
// AlphaCreative — Feedback Admin Dashboard
// Requires: SUPABASE_SERVICE_ROLE_KEY in server context
// For client-side preview, swap createClient args for your anon key + RLS read policy

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! // use service role key server-side
)

type Feedback = {
  id: string
  created_at: string
  client_name: string | null
  client_email: string | null
  project_name: string | null
  rating_overall: number | null
  rating_communication: number | null
  rating_quality: number | null
  rating_responsiveness: number | null
  rating_value: number | null
  went_well: string | null
  improve: string | null
  final_notes: string | null
  nps_score: number | null
  would_return: string | null
  testimonial_consent: boolean
  status: 'new' | 'reviewed' | 'featured' | 'archived'
  internal_notes: string | null
}

const STATUS_COLORS: Record<string, string> = {
  new:      '#1A2F54',
  reviewed: '#0F6E56',
  featured: '#854F0B',
  archived: '#888780',
}

const STATUS_BG: Record<string, string> = {
  new:      '#E6F1FB',
  reviewed: '#E1F5EE',
  featured: '#FAEEDA',
  archived: '#F1EFE8',
}

function Stars({ value }: { value: number | null }) {
  if (!value) return <span style={{ color: '#DDE3F0', fontSize: 13 }}>—</span>
  return (
    <span style={{ color: '#C9A84C', fontSize: 15, letterSpacing: 1 }}>
      {'★'.repeat(value)}{'☆'.repeat(5 - value)}
    </span>
  )
}

function Badge({ status }: { status: string }) {
  return (
    <span style={{
      fontSize: 11, fontWeight: 500, letterSpacing: '0.08em',
      textTransform: 'uppercase', padding: '3px 10px',
      borderRadius: 20, background: STATUS_BG[status] || '#F1EFE8',
      color: STATUS_COLORS[status] || '#888780',
    }}>
      {status}
    </span>
  )
}

function NpsChip({ score }: { score: number | null }) {
  if (score === null) return <span style={{ color: '#DDE3F0' }}>—</span>
  const color = score >= 9 ? '#0F6E56' : score >= 7 ? '#854F0B' : '#993C1D'
  const bg    = score >= 9 ? '#E1F5EE' : score >= 7 ? '#FAEEDA' : '#FAECE7'
  return (
    <span style={{ background: bg, color, fontSize: 13, fontWeight: 600, padding: '2px 10px', borderRadius: 20 }}>
      {score}
    </span>
  )
}

export default function FeedbackAdmin() {
  const [rows, setRows] = useState<Feedback[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')
  const [selected, setSelected] = useState<Feedback | null>(null)
  const [savingStatus, setSavingStatus] = useState(false)
  const [internalNote, setInternalNote] = useState('')

  const fetchData = useCallback(async () => {
    setLoading(true)
    let query = supabase.from('client_feedback').select('*').order('created_at', { ascending: false })
    if (filter !== 'all') query = query.eq('status', filter)
    const { data } = await query
    setRows(data || [])
    setLoading(false)
  }, [filter])

  useEffect(() => { fetchData() }, [fetchData])

  const updateStatus = async (id: string, status: string) => {
    setSavingStatus(true)
    await supabase.from('client_feedback').update({ status }).eq('id', id)
    setRows(prev => prev.map(r => r.id === id ? { ...r, status: status as Feedback['status'] } : r))
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, status: status as Feedback['status'] } : null)
    setSavingStatus(false)
  }

  const saveNote = async () => {
    if (!selected) return
    await supabase.from('client_feedback').update({ internal_notes: internalNote }).eq('id', selected.id)
    setRows(prev => prev.map(r => r.id === selected.id ? { ...r, internal_notes: internalNote } : r))
  }

  const openDetail = (row: Feedback) => {
    setSelected(row)
    setInternalNote(row.internal_notes || '')
  }

  // Summary metrics
  const total = rows.length
  const avgNps = rows.filter(r => r.nps_score !== null).length > 0
    ? Math.round(rows.filter(r => r.nps_score !== null).reduce((s, r) => s + (r.nps_score || 0), 0) / rows.filter(r => r.nps_score !== null).length * 10) / 10
    : null
  const avgOverall = rows.filter(r => r.rating_overall !== null).length > 0
    ? Math.round(rows.filter(r => r.rating_overall !== null).reduce((s, r) => s + (r.rating_overall || 0), 0) / rows.filter(r => r.rating_overall !== null).length * 10) / 10
    : null
  const testimonials = rows.filter(r => r.testimonial_consent && r.status === 'featured').length

  const card: React.CSSProperties = {
    background: '#FFFFFF', borderRadius: 16, padding: '24px 28px',
    border: '1px solid #DDE3F0', marginBottom: 16,
  }

  const metricCard: React.CSSProperties = {
    background: '#FAF8F3', borderRadius: 12, padding: '16px 20px',
    border: '1px solid #DDE3F0', flex: 1,
  }

  const filterBtn = (val: string): React.CSSProperties => ({
    padding: '7px 16px', borderRadius: 20, fontSize: 13, fontWeight: 500,
    border: `1.5px solid ${filter === val ? '#0F1E3D' : '#DDE3F0'}`,
    background: filter === val ? '#0F1E3D' : 'transparent',
    color: filter === val ? '#E2C472' : '#6B7A99',
    cursor: 'pointer', transition: 'all 0.15s',
  })

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px', fontFamily: "'DM Sans', system-ui, sans-serif" }}>

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 6 }}>
          AlphaCreative
        </p>
        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 28, fontWeight: 500, color: '#0F1E3D', margin: '0 0 4px' }}>
          Client Feedback
        </h1>
        <p style={{ fontSize: 14, color: '#6B7A99', margin: 0 }}>Review submissions, manage testimonials, track satisfaction.</p>
      </div>

      {/* Metrics row */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
        <div style={metricCard}>
          <p style={{ fontSize: 12, color: '#6B7A99', margin: '0 0 6px' }}>Total responses</p>
          <p style={{ fontSize: 28, fontWeight: 500, color: '#0F1E3D', margin: 0 }}>{total}</p>
        </div>
        <div style={metricCard}>
          <p style={{ fontSize: 12, color: '#6B7A99', margin: '0 0 6px' }}>Avg. overall rating</p>
          <p style={{ fontSize: 28, fontWeight: 500, color: '#0F1E3D', margin: 0 }}>{avgOverall ?? '—'}<span style={{ fontSize: 14, color: '#6B7A99' }}>/5</span></p>
        </div>
        <div style={metricCard}>
          <p style={{ fontSize: 12, color: '#6B7A99', margin: '0 0 6px' }}>Avg. NPS score</p>
          <p style={{ fontSize: 28, fontWeight: 500, color: '#0F1E3D', margin: 0 }}>{avgNps ?? '—'}<span style={{ fontSize: 14, color: '#6B7A99' }}>/10</span></p>
        </div>
        <div style={metricCard}>
          <p style={{ fontSize: 12, color: '#6B7A99', margin: '0 0 6px' }}>Featured testimonials</p>
          <p style={{ fontSize: 28, fontWeight: 500, color: '#C9A84C', margin: 0 }}>{testimonials}</p>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {['all', 'new', 'reviewed', 'featured', 'archived'].map(f => (
          <button key={f} type="button" style={filterBtn(f)} onClick={() => setFilter(f)}>
            {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 380px' : '1fr', gap: 16, alignItems: 'start' }}>

        {/* Table */}
        <div style={card}>
          {loading ? (
            <p style={{ color: '#6B7A99', fontSize: 14, textAlign: 'center', padding: '32px 0' }}>Loading…</p>
          ) : rows.length === 0 ? (
            <p style={{ color: '#6B7A99', fontSize: 14, textAlign: 'center', padding: '32px 0' }}>No submissions yet.</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #DDE3F0' }}>
                    {['Client', 'Project', 'Overall', 'NPS', 'Would return', 'Status', 'Date', ''].map(h => (
                      <th key={h} style={{ textAlign: 'left', padding: '8px 12px', fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6B7A99' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map(row => (
                    <tr key={row.id}
                      onClick={() => openDetail(row)}
                      style={{
                        borderBottom: '1px solid #DDE3F0', cursor: 'pointer',
                        background: selected?.id === row.id ? '#FAF8F3' : 'transparent',
                        transition: 'background 0.1s',
                      }}
                    >
                      <td style={{ padding: '12px 12px' }}>
                        <p style={{ margin: 0, fontWeight: 500, color: '#0F1E3D' }}>{row.client_name || '—'}</p>
                        <p style={{ margin: 0, fontSize: 12, color: '#6B7A99' }}>{row.client_email || ''}</p>
                      </td>
                      <td style={{ padding: '12px 12px', color: '#6B7A99' }}>{row.project_name || '—'}</td>
                      <td style={{ padding: '12px 12px' }}><Stars value={row.rating_overall} /></td>
                      <td style={{ padding: '12px 12px' }}><NpsChip score={row.nps_score} /></td>
                      <td style={{ padding: '12px 12px', color: '#0F1E3D', textTransform: 'capitalize' }}>{row.would_return || '—'}</td>
                      <td style={{ padding: '12px 12px' }}><Badge status={row.status} /></td>
                      <td style={{ padding: '12px 12px', color: '#6B7A99', fontSize: 12, whiteSpace: 'nowrap' }}>
                        {new Date(row.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                      <td style={{ padding: '12px 12px' }}>
                        {row.testimonial_consent && (
                          <span style={{ fontSize: 10, background: '#FAEEDA', color: '#854F0B', padding: '2px 8px', borderRadius: 20, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                            Consent
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Detail panel */}
        {selected && (
          <div style={{ ...card, position: 'sticky', top: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <div>
                <p style={{ margin: 0, fontWeight: 500, fontSize: 16, color: '#0F1E3D' }}>{selected.client_name || 'Unknown'}</p>
                <p style={{ margin: 0, fontSize: 13, color: '#6B7A99' }}>{selected.client_email}</p>
                {selected.project_name && <p style={{ margin: '2px 0 0', fontSize: 13, color: '#C9A84C' }}>{selected.project_name}</p>}
              </div>
              <button type="button" onClick={() => setSelected(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: '#6B7A99', padding: 4 }}>×</button>
            </div>

            {/* Ratings summary */}
            <div style={{ marginBottom: 20 }}>
              {[
                { label: 'Overall', val: selected.rating_overall },
                { label: 'Communication', val: selected.rating_communication },
                { label: 'Quality', val: selected.rating_quality },
                { label: 'Responsiveness', val: selected.rating_responsiveness },
                { label: 'Value', val: selected.rating_value },
              ].map(r => (
                <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 0', borderBottom: '1px solid #DDE3F0' }}>
                  <span style={{ fontSize: 13, color: '#6B7A99' }}>{r.label}</span>
                  <Stars value={r.val} />
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', marginTop: 4 }}>
                <span style={{ fontSize: 13, color: '#6B7A99' }}>NPS</span>
                <NpsChip score={selected.nps_score} />
              </div>
            </div>

            {/* Text responses */}
            {selected.went_well && (
              <div style={{ marginBottom: 14 }}>
                <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C9A84C', margin: '0 0 6px' }}>What went well</p>
                <p style={{ fontSize: 14, color: '#0F1E3D', margin: 0, lineHeight: 1.6 }}>{selected.went_well}</p>
              </div>
            )}
            {selected.improve && (
              <div style={{ marginBottom: 14 }}>
                <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C9A84C', margin: '0 0 6px' }}>Could improve</p>
                <p style={{ fontSize: 14, color: '#0F1E3D', margin: 0, lineHeight: 1.6 }}>{selected.improve}</p>
              </div>
            )}
            {selected.final_notes && (
              <div style={{ marginBottom: 14 }}>
                <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C9A84C', margin: '0 0 6px' }}>Final notes</p>
                <p style={{ fontSize: 14, color: '#0F1E3D', margin: 0, lineHeight: 1.6 }}>{selected.final_notes}</p>
              </div>
            )}

            {/* Testimonial consent */}
            {selected.testimonial_consent && (
              <div style={{ background: '#FAEEDA', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: '#854F0B' }}>
                Client consented to testimonial use.
              </div>
            )}

            {/* Status selector */}
            <div style={{ marginBottom: 16 }}>
              <p style={{ fontSize: 12, color: '#6B7A99', marginBottom: 8 }}>Update status</p>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {['new', 'reviewed', 'featured', 'archived'].map(s => (
                  <button key={s} type="button" disabled={savingStatus}
                    onClick={() => updateStatus(selected.id, s)}
                    style={{
                      padding: '5px 12px', borderRadius: 20, fontSize: 12, fontWeight: 500,
                      border: `1.5px solid ${selected.status === s ? STATUS_COLORS[s] : '#DDE3F0'}`,
                      background: selected.status === s ? STATUS_BG[s] : 'transparent',
                      color: selected.status === s ? STATUS_COLORS[s] : '#6B7A99',
                      cursor: savingStatus ? 'not-allowed' : 'pointer',
                      textTransform: 'capitalize',
                    }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Internal notes */}
            <div>
              <p style={{ fontSize: 12, color: '#6B7A99', marginBottom: 8 }}>Internal notes</p>
              <textarea
                value={internalNote}
                onChange={e => setInternalNote(e.target.value)}
                placeholder="Add notes for your records…"
                style={{
                  width: '100%', padding: '10px 14px', border: '1.5px solid #DDE3F0',
                  borderRadius: 8, fontSize: 13, color: '#0F1E3D', background: '#FAF8F3',
                  fontFamily: 'inherit', resize: 'vertical', minHeight: 72, outline: 'none',
                }}
              />
              <button type="button" onClick={saveNote}
                style={{
                  marginTop: 8, padding: '8px 20px', background: '#0F1E3D',
                  color: '#E2C472', border: 'none', borderRadius: 8, fontSize: 13,
                  fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
                }}>
                Save note
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
