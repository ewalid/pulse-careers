'use client';
import { storyblokEditable } from '@storyblok/react/rsc';
import { useIsMobile } from '@/lib/useIsMobile';

const TONE_MAP = {
  coral:  { accent: '#FF7A5C', bg: '#FFD6C8' },
  amber:  { accent: '#C9901A', bg: '#FBE5B4' },
  mint:   { accent: '#2A7A6B', bg: '#CFEBE2' },
  violet: { accent: '#6B4FA8', bg: '#D9CDEA' },
  dusk:   { accent: '#8B6F8A', bg: '#E8D9E7' },
};

const DEFAULT_VALUES = [
  { number: '01', name: 'Slow is smooth', description: 'We resist the pull to ship fast and break things. Deliberate decisions compound into durable work.', accent_color: 'coral' },
  { number: '02', name: 'Show your working', description: 'We think in public. Write it down, share the draft, invite the disagreement. Opacity is the enemy of trust.', accent_color: 'amber' },
  { number: '03', name: 'Users, then users', description: 'Every trade-off resolves in favour of the person on the other end. Not metrics, not convenience, not ego.', accent_color: 'mint' },
  { number: '04', name: 'Warm, not soft', description: 'We care about people deeply. We also hold a high bar. These are not contradictions — they are the same thing.', accent_color: 'violet' },
  { number: '05', name: 'Play the long game', description: 'We optimise for decades, not quarters. That changes what we build, who we hire, and how we treat each other.', accent_color: 'dusk' },
];

export default function ValuesBlock({ blok }) {
  const isMobile = useIsMobile();

  const headline = blok?.headline || 'Five values. Written down. Actually used.';
  const values = blok?.values?.length ? blok.values : DEFAULT_VALUES;

  return (
    <section {...storyblokEditable(blok)} style={{ background: 'var(--paper)', borderTop: '1px solid var(--line2)', borderBottom: '1px solid var(--line2)', padding: isMobile ? '56px 20px' : '80px 48px' }}>
      <div style={{ maxWidth: 'var(--container)', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 40, flexWrap: 'wrap', gap: 12 }}>
          <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: isMobile ? 32 : 44, fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--ink)', lineHeight: 1.1 }}>
            {headline}
          </h2>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 2, color: 'var(--ink3)', textTransform: 'uppercase' }}>
            Our values · Est. 2019
          </span>
        </div>

        {/* Cards grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(5, 1fr)',
          gap: 14,
        }}>
          {values.map((v, i) => {
            const name = v.name || v.content?.name;
            const description = v.description || v.content?.description;
            const number = v.number || v.content?.number || String(i + 1).padStart(2, '0');
            const accentKey = v.accent_color || v.content?.accent_color || 'coral';
            const tone = TONE_MAP[accentKey] || TONE_MAP.coral;

            return (
              <div
                key={i}
                {...storyblokEditable(v)}
                style={{
                  borderRadius: 16, overflow: 'hidden',
                  border: '1px solid var(--line2)',
                  background: 'var(--paper)',
                  display: 'flex', flexDirection: 'column',
                  gridColumn: isMobile && i === 4 ? 'span 2' : 'auto',
                  transition: 'transform 0.15s, box-shadow 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 12px 32px -8px ${tone.accent}30`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                {/* Top color bar */}
                <div style={{ height: 5, background: tone.accent, flexShrink: 0 }} />

                <div style={{ padding: '20px 18px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: tone.accent, letterSpacing: 2, marginBottom: 10 }}>{number}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.01em', lineHeight: 1.2, marginBottom: 10 }}>{name}</div>
                  <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--ink2)', lineHeight: 1.6, flex: 1 }}>{description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
