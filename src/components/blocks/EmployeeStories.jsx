'use client';
import { storyblokEditable } from '@storyblok/react/rsc';
import { useIsMobile } from '@/lib/useIsMobile';
import { accentHeadline } from '@/lib/accentHeadline';

const ACCENT_COLORS = { coral: '#FF7A5C', mint: '#7FD4C1', amber: '#F4B942' };

const DEFAULT_STORIES = [
  { _uid: 'ds1', featured: true, accent_color: 'coral', quote: "I joined to ship one model. I stayed because Pulse is the first place where my mentor said \"slow down\" and meant it.", author_name: 'Priya Ramanathan', author_role: 'Staff ML Engineer · Berlin', tenure: '3rd year' },
  { _uid: 'ds2', featured: false, accent_color: 'mint', quote: "Pulse is the only place where design reviews start with \"what do users feel?\" — not \"what does the dashboard say?\"", author_name: 'Marcos Oliveira', author_role: 'Principal Designer · Lisbon', tenure: '5th year' },
  { _uid: 'ds3', featured: false, accent_color: 'amber', quote: "I came back after my kid was born. Pulse held the role for 14 months. That's not a perk, that's a posture.", author_name: 'Zahra Idris', author_role: 'VP of Ops · Remote (Nairobi)', tenure: '7th year' },
];

function initials(name) {
  return (name || '??').split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
}

export default function EmployeeStories({ blok }) {
  const isMobile = useIsMobile();
  const stories = blok?.stories?.length > 0 ? blok.stories : DEFAULT_STORIES;
  const ctaIntro = blok?.cta_intro || 'READ 42 MORE STORIES — VIDEO, AUDIO, WRITTEN';
  const ctaLabel = blok?.cta_label || 'Pulse Stories →';
  const ctaUrl = blok?.cta_url || '#';

  return (
    <section {...storyblokEditable(blok)} style={{ background: 'var(--paper)', padding: isMobile ? '48px 20px' : '80px 48px' }}>
      <div style={{ maxWidth: 'var(--container)', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'flex-end', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 16 : 0, marginBottom: 40 }}>
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--ink3)', marginBottom: 10 }}>
              {blok?.eyebrow || 'Voices'}
            </p>
            <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: isMobile ? 32 : 44, fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--ink)', maxWidth: 680, lineHeight: 1.05 }}>
              {accentHeadline(blok?.headline || 'Stories from people who stayed.', blok?.headline_accent_word || 'stayed')}
            </h2>
          </div>
          {!isMobile && (
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--ink)', background: 'transparent', border: '1px solid var(--line)', borderRadius: '99px', padding: '8px 14px', cursor: 'pointer' }}>←</button>
              <button style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--ink)', background: 'transparent', border: '1px solid var(--line)', borderRadius: '99px', padding: '8px 14px', cursor: 'pointer' }}>→</button>
            </div>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr 1fr', gap: 18, marginBottom: 24 }}>
          {stories.map((s, i) => {
            const accent = ACCENT_COLORS[s.accent_color] || '#FF7A5C';
            const isFeatured = s.featured === true || s.featured === 'true';
            return (
              <div key={s._uid || i}
                {...(s._uid ? storyblokEditable(s) : {})}
                style={{ background: isFeatured ? 'var(--ink)' : (s.background_color || 'var(--paper2)'), borderRadius: 18, padding: '28px', border: `1px solid ${isFeatured ? 'transparent' : 'var(--line2)'}`, display: 'flex', flexDirection: 'column', gap: 20, position: 'relative', overflow: 'hidden' }}
              >
                {isFeatured && (
                  <div style={{ position: 'absolute', right: -80, top: -80, width: 300, height: 300, borderRadius: '50%', background: `radial-gradient(circle, ${accent}40 0%, transparent 70%)`, filter: 'blur(8px)', pointerEvents: 'none' }} />
                )}
                <div style={{ fontFamily: 'var(--font-display)', fontSize: isFeatured ? 66 : 46, lineHeight: 0.7, color: accent, opacity: 0.9, marginBottom: -10, position: 'relative' }}>&ldquo;</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: isFeatured ? 18 : 15, fontWeight: 500, lineHeight: 1.4, letterSpacing: '-0.01em', color: isFeatured ? 'rgba(244,237,225,0.9)' : 'var(--ink)', position: 'relative', flex: 1 }}>
                  {s.quote}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 16, borderTop: `1px solid ${isFeatured ? 'rgba(244,237,225,0.15)' : 'var(--line2)'}`, position: 'relative' }}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: isFeatured ? 'rgba(244,237,225,0.15)' : 'var(--paper3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 600, color: isFeatured ? 'var(--paper)' : 'var(--ink3)', flexShrink: 0 }}>
                    {initials(s.author_name)}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 600, color: isFeatured ? 'var(--paper)' : 'var(--ink)', marginBottom: 2 }}>{s.author_name}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, opacity: 0.65, letterSpacing: 0.5, color: isFeatured ? 'var(--paper)' : 'var(--ink3)' }}>{s.author_role}</div>
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', background: isFeatured ? 'rgba(244,237,225,0.1)' : 'var(--paper3)', color: isFeatured ? 'rgba(244,237,225,0.6)' : 'var(--ink3)', padding: '4px 10px', borderRadius: '99px', flexShrink: 0 }}>
                    {s.tenure}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA strip */}
        <div style={{ marginTop: 0, padding: 20, background: 'var(--paper2)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 1.5, color: 'var(--ink2)', textTransform: 'uppercase' }}>
            {ctaIntro}
          </div>
          <a href={ctaUrl} style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, color: 'var(--paper)', background: 'var(--ink)', textDecoration: 'none', borderRadius: '99px', padding: '9px 18px', whiteSpace: 'nowrap', letterSpacing: '-0.01em' }}>
            {ctaLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
