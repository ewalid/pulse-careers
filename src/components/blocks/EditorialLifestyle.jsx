'use client';
import { storyblokEditable } from '@storyblok/react/rsc';
import { useIsMobile } from '@/lib/useIsMobile';

const TONE_MAP = {
  coral:  { accent: '#FF7A5C', bg: '#FFD6C8' },
  amber:  { accent: '#C9901A', bg: '#FBE5B4' },
  mint:   { accent: '#2A7A6B', bg: '#CFEBE2' },
  violet: { accent: '#6B4FA8', bg: '#D9CDEA' },
};

const DEFAULT_BENEFITS = [
  { icon: '◈', label: 'Hackathon', value: 'Quarterly', sub: 'with prize pool', accent_color: 'mint' },
  { icon: '◎', label: 'Learning budget', value: '€3k / yr', sub: '94% in active use', accent_color: 'violet' },
  { icon: '◉', label: 'Parental leave', value: '18 weeks', sub: 'all caregivers, equal', accent_color: 'amber' },
  { icon: '◷', label: 'Sabbatical', value: '6 weeks', sub: 'at year 4, paid', accent_color: 'coral' },
];

export default function EditorialLifestyle({ blok }) {
  const isMobile = useIsMobile();

  const pullQuote = blok?.pull_quote || "I have never once felt like I had to choose between doing good work and having a life. Pulse is the first place that made that feel real, not just written on a wall.";
  const quoteAuthor = blok?.quote_author || 'Hana Okafor';
  const quoteRole = blok?.quote_role || 'Staff Engineer · 6th year · Singapore';
  const featureLocation = blok?.feature_location || 'Lisbon Studio, PT';
  const featureCaption = blok?.feature_caption || '240 people · open since 2023';
  const benefits = blok?.benefits?.length ? blok.benefits : DEFAULT_BENEFITS;

  return (
    <section {...storyblokEditable(blok)} style={{ background: 'var(--paper2)', borderBottom: '1px solid var(--line2)', padding: isMobile ? '56px 20px' : '80px 48px' }}>
      <div style={{ maxWidth: 'var(--container)', margin: '0 auto' }}>

        {/* Two-column feature */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: 20,
          marginBottom: 20,
        }}>
          {/* Feature image placeholder */}
          <div style={{
            borderRadius: 20, overflow: 'hidden', position: 'relative',
            minHeight: isMobile ? 240 : 380,
            background: '#FFD6C8',
            backgroundImage: 'repeating-linear-gradient(135deg, transparent 0 12px, rgba(255,122,92,0.15) 12px 13px)',
          }}>
            <div style={{
              position: 'absolute', bottom: 20, left: 20, right: 20,
              background: 'rgba(42,31,46,0.8)', backdropFilter: 'blur(10px)',
              borderRadius: 12, padding: '14px 16px',
            }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 600, color: '#fff', marginBottom: 3 }}>{featureLocation}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'rgba(255,255,255,0.55)', letterSpacing: 1, textTransform: 'uppercase' }}>{featureCaption}</div>
            </div>
          </div>

          {/* Pull quote card */}
          <div style={{
            background: 'var(--ink)', borderRadius: 20, padding: isMobile ? '32px 24px' : '40px 36px',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            position: 'relative', overflow: 'hidden',
          }}>
            {/* Neon blob */}
            <div style={{ position: 'absolute', top: -40, right: -40, width: 180, height: 180, borderRadius: '50%', background: 'radial-gradient(circle, rgba(127,212,193,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 36, color: '#7FD4C1', lineHeight: 1, marginBottom: 16, opacity: 0.6 }}>"</div>
              <p style={{
                margin: '0 0 32px',
                fontFamily: 'var(--font-display)', fontSize: isMobile ? 18 : 22,
                fontWeight: 500, color: 'var(--paper)', lineHeight: 1.45,
                letterSpacing: '-0.01em',
              }}>
                {pullQuote}
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#7FD4C1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: 'var(--ink)', flexShrink: 0 }}>
                {quoteAuthor.split(' ').map(w => w[0]).slice(0, 2).join('')}
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600, color: 'var(--paper)' }}>{quoteAuthor}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'rgba(255,255,255,0.4)', letterSpacing: 1, textTransform: 'uppercase', marginTop: 2 }}>{quoteRole}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
          gap: 14,
        }}>
          {benefits.map((b, i) => {
            const label = b.label || b.content?.label;
            const value = b.value || b.content?.value;
            const sub = b.sub || b.content?.sub;
            const icon = b.icon || b.content?.icon || '◎';
            const accentKey = b.accent_color || b.content?.accent_color || 'coral';
            const tone = TONE_MAP[accentKey] || TONE_MAP.coral;

            return (
              <div key={i} style={{ borderRadius: 14, overflow: 'hidden', border: '1px solid var(--line2)', background: 'var(--paper)' }}>
                <div style={{ height: 4, background: tone.accent }} />
                <div style={{ padding: '18px 16px' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 18, color: tone.accent, marginBottom: 8, lineHeight: 1 }}>{icon}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 1.5, color: 'var(--ink3)', textTransform: 'uppercase', marginBottom: 6 }}>{label}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: tone.accent, letterSpacing: '-0.02em', marginBottom: 4 }}>{value}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--ink3)', letterSpacing: 0.5 }}>{sub}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
