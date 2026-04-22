'use client';
import { storyblokEditable } from '@storyblok/react/rsc';
import { useIsMobile } from '@/lib/useIsMobile';

const TONE_COLORS = {
  coral:  { bg: '#FFD6C8', accent: '#FF7A5C' },
  amber:  { bg: '#FBE5B4', accent: '#C9901A' },
  mint:   { bg: '#CFEBE2', accent: '#2A7A6B' },
  violet: { bg: '#D9CDEA', accent: '#6B4FA8' },
};

const DEFAULT_IMAGES = [
  { label: 'Lisbon Studio', sublabel: '240 people · open since 2023', tone: 'coral' },
  { label: 'Model room', sublabel: 'Berlin HQ', tone: 'amber' },
  { label: 'Rooftop', sublabel: 'Berlin, 6th floor', tone: 'violet' },
  { label: 'Research library', sublabel: 'Lisbon, 3rd floor', tone: 'mint' },
  { label: 'Community kitchen', sublabel: 'NYC office', tone: 'amber' },
];

function EditorialImageCell({ img, height, style = {} }) {
  const tone = TONE_COLORS[img?.tone] || TONE_COLORS.coral;
  const src = img?.image?.filename;
  const label = img?.label;
  const sublabel = img?.sublabel;

  return (
    <div
      {...storyblokEditable(img)}
      style={{
        height, borderRadius: 12, overflow: 'hidden', position: 'relative',
        background: src ? '#000' : tone.bg,
        backgroundImage: src
          ? `url(${src})`
          : `repeating-linear-gradient(135deg, transparent 0 12px, ${tone.accent}18 12px 13px)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        ...style,
      }}
    >
      {(label || sublabel) && (
        <div style={{
          position: 'absolute', bottom: 12, left: 12,
          background: 'rgba(42,31,46,0.75)', backdropFilter: 'blur(8px)',
          borderRadius: 8, padding: '6px 10px',
        }}>
          {label && <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#fff', letterSpacing: 1, textTransform: 'uppercase' }}>{label}</div>}
          {sublabel && <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'rgba(255,255,255,0.55)', letterSpacing: 0.5, marginTop: 2 }}>{sublabel}</div>}
        </div>
      )}
    </div>
  );
}

export default function EditorialHero({ blok }) {
  const isMobile = useIsMobile();

  const eyebrow = blok?.eyebrow || 'Issue 14 · Spring 2026 · Life at Pulse';
  const headline = blok?.headline || 'Warm machines,\ncareful humans.';
  const subheading = blok?.subheading || 'What it actually feels like to work at Pulse — told through the people who stayed, the spaces we built, and the decisions we made when no one was watching.';
  const readTime = blok?.read_time || '8 min read';
  const author = blok?.author || 'Pulse Editorial Team';
  const images = blok?.images?.length ? blok.images : DEFAULT_IMAGES;

  const [img0, img1, img2, img3, img4] = images;

  return (
    <section {...storyblokEditable(blok)} style={{ background: 'var(--paper2)', borderBottom: '1px solid var(--line2)', padding: isMobile ? '48px 20px' : '72px 48px' }}>
      <div style={{ maxWidth: 'var(--container)', margin: '0 auto' }}>

        {/* Top layout: vertical strip + headline */}
        <div style={{ display: 'flex', gap: isMobile ? 20 : 40, alignItems: 'flex-start', marginBottom: 48 }}>
          {!isMobile && (
            <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 8 }}>
              <div style={{
                transform: 'rotate(-90deg)',
                transformOrigin: 'center center',
                whiteSpace: 'nowrap',
                fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 2.5,
                color: 'var(--ink3)', textTransform: 'uppercase',
                width: 220, textAlign: 'center',
              }}>
                {eyebrow}
              </div>
            </div>
          )}

          <div style={{ flex: 1 }}>
            {isMobile && (
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 2, color: 'var(--ink3)', textTransform: 'uppercase', marginBottom: 16 }}>{eyebrow}</div>
            )}

            <h1 style={{
              margin: '0 0 20px',
              fontFamily: 'var(--font-display)',
              fontSize: isMobile ? 42 : 68,
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              color: 'var(--ink)',
              whiteSpace: 'pre-line',
            }}>
              {headline.split('\n').map((line, i) => (
                <span key={i}>
                  {i === 0 ? (
                    <>
                      <span>{line.split(' ')[0]} </span>
                      <em style={{ color: '#FF7A5C', fontStyle: 'italic' }}>{line.split(' ').slice(1).join(' ')}</em>
                    </>
                  ) : (
                    <>
                      {'\n'}
                      <span style={{ color: '#2A7A6B' }}>{line.split(' ')[0]} </span>
                      <span>{line.split(' ').slice(1).join(' ')}</span>
                    </>
                  )}
                </span>
              ))}
            </h1>

            <p style={{ margin: '0 0 24px', fontFamily: 'var(--font-body)', fontSize: isMobile ? 14 : 16, color: 'var(--ink2)', lineHeight: 1.7, maxWidth: 600 }}>
              {subheading}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {[readTime, 'Last updated Apr 2026', `By ${author}`].map(label => (
                <span key={label} style={{
                  fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 1,
                  padding: '4px 10px', borderRadius: 99,
                  background: 'var(--paper)', border: '1px solid var(--line2)',
                  color: 'var(--ink3)', textTransform: 'uppercase',
                }}>{label}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Image grid — row 1 */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr 1fr', gap: 12, marginBottom: 12 }}>
          {img0 && <EditorialImageCell img={img0} height={isMobile ? 220 : 340} />}
          <div style={{ display: 'flex', flexDirection: isMobile ? 'row' : 'column', gap: 12 }}>
            {img1 && <EditorialImageCell img={img1} height={isMobile ? 140 : 162} style={{ flex: 1 }} />}
            {img2 && <EditorialImageCell img={img2} height={isMobile ? 140 : 162} style={{ flex: 1 }} />}
          </div>
        </div>

        {/* Image grid — row 2 (desktop only) */}
        {!isMobile && (img3 || img4) && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {img3 && <EditorialImageCell img={img3} height={160} />}
            {img4 && <EditorialImageCell img={img4} height={160} />}
          </div>
        )}
      </div>
    </section>
  );
}
