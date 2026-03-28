// app/api/feedback/route.ts
// AlphaCreative — feedback form submission handler

import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // service role — never expose this client-side
)

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const {
      clientName,
      clientEmail,
      projectName,
      overallRating,
      areaRatings,
      wentWell,
      improve,
      finalNotes,
      npsScore,
      wouldReturn,
      testimonialConsent,
    } = body

    // Basic validation
    if (!clientEmail || typeof clientEmail !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('client_feedback')
      .insert([{
        client_name:            clientName,
        client_email:           clientEmail.toLowerCase().trim(),
        project_name:           projectName,
        rating_overall:         overallRating || null,
        rating_communication:   areaRatings?.communication || null,
        rating_quality:         areaRatings?.quality || null,
        rating_responsiveness:  areaRatings?.responsiveness || null,
        rating_value:           areaRatings?.value || null,
        went_well:              wentWell || null,
        improve:                improve || null,
        final_notes:            finalNotes || null,
        nps_score:              npsScore ?? null,
        would_return:           wouldReturn || null,
        testimonial_consent:    testimonialConsent || false,
        status:                 'new',
      }])
      .select('id')
      .single()

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json({ error: 'Submission failed' }, { status: 500 })
    }

    return NextResponse.json({ success: true, id: data.id }, { status: 201 })

  } catch (err) {
    console.error('Feedback API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
