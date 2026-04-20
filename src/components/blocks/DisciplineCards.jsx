'use client';
import { storyblokEditable } from '@storyblok/react/rsc';

const ACCENT_COLORS = {
  coral: '#FF7A5C',
  amber: '#F4B942',
  violet: '#9B7FD4',
  mint: '#7FD4C1',
  'coral-soft': '#FFB8A5',
};

const PLACEHOLDER_TONES = {
  coral: { bg: '#FFD6C8', stripe: 'rgba(255,122,92,0.18)' },
  amber: { bg: '#FDE8B0', stripe: 'rgba(244,185,66,0.2)' },
  violet: { bg: '#DDD3F5', stripe: 'rgba(155,127,212,0.18)' },
  mint: { bg: '#C4EDE7', stripe: 'rgba(127,212,193,0.2)' },
  'coral-soft': { bg: '#FFE8E1', stripe: 'rgba(255,184,165,0.2)' },
};

const DEFAULT_DISCIPLINES = [
  { title: 'Engineering', count: 94, note: 'Infra · ML · Platform · iOS', accent_color: 'coral' },
  { title: 'Data Science', count: 38, note: 'Analytics · Research · Causal', accent_color: 'amber' },
  { title: 'AI & Research', count: 47, note: 'Models · Safety · Applied', accent_color: 'violet' },
  { title: 'Operations', count: 41, note: 'Supply · People · Finance · Legal', accent_color: 'mint' },
  { title: 'Design', count: 27, note: 'Product · Brand · Motion · Research', accent_color: 'coral-soft' },
];

function DisciplineCard({ item }) {
  const accentKey = item.accent_color || 'coral';
  const accent = ACCENT_COLORS[accentKey] || '#FF7A5C';
  const tone = PLACEHOLDER_TONES[accentKey] || PLACEHOLDER_TONES.coral;
  const count = item.count ?? '';

  const card = (
    <div
      {...(item._uid ? storyblokEditable(item) : {})}
      style={{
        background: 'var(--paper)',
        borderRadius: 16,
        border: '1px solid var(--line2)',
        overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        cursor: 'pointer', position: 'relative',
        transition: 'transform .2s ease, box-shadow .2s ease',
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(42,31,46,0.12)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
    >
      {/* Image area */}
      <div style={{
        height: 140, position: 'relative',
        background: tone.bg,
        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, ${tone.stripe} 10px, ${tone.stripe} 20px)`,
      }}>
        <div style={{
          position: 'absolute', top: 12, right: 12,
          background: 'var(--paper)', borderRadius: 99,
          padding: '5px 10px',
          fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 600,
          color: 'var(--ink)',
        }}>
          {count} roles
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '18px 20px 22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{
          fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 600,
          letterSpacing: '-0.01em', color: 'var(--ink)',
        }}>
          {item.title}
        </div>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink3)',
          marginTop: 6, letterSpacing: 0.5,
        }}>
          {item.note}
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginTop: 'auto', paddingTop: 18,
        }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--ink2)' }}>
            Explore →
          </span>
          <div style={{
            width: 8, height: 8, borderRadius: '50%',
            background: accent, boxShadow: `0 0 10px ${accent}`,
          }} />
        </div>
      </div>
    </div>
  );

  if (item.link_url) {
    return (
      <a href={item.link_url} style={{ textDecoration: 'none', display: 'block' }}>
        {card}
      </a>
    );
  }
  return card;
}

export default function DisciplineCards({ blok }) {
  const items = (blok?.disciplines?.length > 0)
    ? blok.disciplines
    : DEFAULT_DISCIPLINES;

  const ctaLabel = blok?.cta_label || 'All 247 roles';
  const ctaUrl = blok?.cta_url || '#';

  return (
    <section
      {...storyblokEditable(blok)}
      style={{
        background: 'var(--paper2)',
        borderTop: '1px solid var(--line2)',
        padding: '72px 48px',
      }}
    >
      <div style={{ maxWidth: 'var(--container)', margin: '0 auto' }}>
        {/* Header row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
          <div>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 2,
              textTransform: 'uppercase', color: 'var(--ink3)', marginBottom: 10,
            }}>
              § 01 · Disciplines
            </div>
            <h2 style={{
              margin: 0,
              fontFamily: 'var(--font-display)', fontSize: 44, fontWeight: 500,
              letterSpacing: '-0.02em', color: 'var(--ink)', maxWidth: 620, lineHeight: 1.1,
            }}>
              {blok?.headline || 'Every craft has a home here.'}
            </h2>
          </div>
          <a
            href={ctaUrl}
            style={{
              fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 500,
              color: 'var(--ink)', textDecoration: 'none',
              border: '1px solid var(--line)', borderRadius: '99px',
              padding: '9px 18px', whiteSpace: 'nowrap',
              letterSpacing: '-0.01em',
            }}
          >
            {ctaLabel} →
          </a>
        </div>

        {/* Cards grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${Math.min(items.length, 5)}, 1fr)`,
          gap: 14,
        }}>
          {items.map((item, i) => (
            <DisciplineCard key={item._uid || item.title || i} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
