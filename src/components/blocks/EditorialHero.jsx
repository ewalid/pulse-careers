'use client';
import { storyblokEditable } from '@storyblok/react/rsc';
import { useIsMobile } from '@/lib/useIsMobile';

const TONE_COLORS = {
  coral:  { bg: '#FFD6C8', accent: '#FF7A5C' },
  amber:  { bg: '#FBE5B4', accent: '#C9901A' },
  mint:   { bg: '#CFEBE2', accent: '#2A7A6B' },
  violet: { bg: '#D9CDEA', accent: '#6B4FA8' },
  dusk:   { bg: '#E8D9E7', accent: '#8B6F8A' },
};

const LINE_ACCENTS = ['#FF7A5C', '#C9901A'];

const DEFAULT_IMAGES = [
  { label: 'Editorial · Team Portrait · Golden Hour', sublabel: 'Lisbon · Q1 Offsite', tone: 'dusk' },
  { label: 'Studio · Model Room', sublabel: '', tone: 'amber' },
  { label: 'Rooftop · Berlin', sublabel: '', tone: 'mint' },
  { label: 'Research Library', sublabel: '', tone: 'violet' },
  { label: 'Community Kitchen', sublabel: '', tone: 'coral' },
];

function MainImageCell({ img, isMobile }) {
  const tone = TONE_COLORS[img?.tone] || TONE_COLORS.dusk;
  const src = img?.image?.filename;
  const label = img?.label;
  const sublabel = img?.sublabel;

  return (
    <div
      {...storyblokEditable(img)}
      style={{
        gridRow: isMobile ? 'auto' : '1 / 3',
        borderRadius: 18, overflow: 'hidden', position: 'relative',
        height: isMobile ? 240 : '100%',
        backgroundColor: src ? '#000' : tone.bg,
        backgroundImage: src
          ? `url(${src})`
          : `repeating-linear-gradient(135deg, transparent 0 12px, ${tone.accent}18 12px 13px)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Top-left pill overlay (design pattern) */}
      {(label || sublabel) && (
        <div style={{
          position: 'absolute', top: 16, left: 16,
          background: 'rgba(255,252,247,0.93)',
          padding: '6px 11px', borderRadius: 99,
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF7A5C', flexShrink: 0 }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1, color: 'var(--ink)', textTransform: 'uppercase' }}>
            {sublabel || label}
          </span>
        </div>
      )}
      {/* Bottom label */}
      {label && (
        <div style={{ position: 'absolute', bottom: 16, left: 16 }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 1.5, textTransform: 'uppercase',
            color: '#fff',
            background: 'rgba(42,31,46,0.6)', backdropFilter: 'blur(8px)',
            borderRadius: 6, padding: '4px 8px',
          }}>{label}</span>
        </div>
      )}
    </div>
  );
}

function SmallImageCell({ img, height }) {
  const tone = TONE_COLORS[img?.tone] || TONE_COLORS.coral;
  const src = img?.image?.filename;
  const label = img?.label;

  return (
    <div
      {...storyblokEditable(img)}
      style={{
        borderRadius: 18, overflow: 'hidden', position: 'relative',
        height,
        backgroundColor: src ? '#000' : tone.bg,
        backgroundImage: src
          ? `url(${src})`
          : `repeating-linear-gradient(135deg, transparent 0 12px, ${tone.accent}18 12px 13px)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {label && (
        <div style={{ position: 'absolute', bottom: 12, left: 12 }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 1.5, textTransform: 'uppercase',
            color: '#fff',
            background: 'rgba(42,31,46,0.6)', backdropFilter: 'blur(8px)',
            borderRadius: 6, padding: '4px 8px',
          }}>{label}</span>
        </div>
      )}
    </div>
  );
}

export default function EditorialHero({ blok }) {
  const isMobile = useIsMobile();

  const eyebrow = blok?.eyebrow || 'Issue 14  ·  Spring 2026  ·  Life at Pulse';
  const headline = blok?.headline || 'Warm machines,\ncareful humans.';
  const accentWord = blok?.headline_accent;
  const subheading = blok?.subheading || "Pulse is 2,400 people across seven cities, building the infrastructure behind models you'll use every day without noticing. This is a field guide to what it's like inside.";
  const readTime = blok?.read_time || '8 min read';
  const author = blok?.author || 'Written by the team';
  const images = blok?.images?.length ? blok.images : DEFAULT_IMAGES;

  const [img0, img1, img2, img3, img4] = images;
  const lines = headline.split('\n');

  return (
    <section {...storyblokEditable(blok)} style={{ background: 'var(--paper)', padding: isMobile ? '48px 20px 32px' : '56px 48px 32px', position: 'relative', overflow: 'hidden' }}>
      {/* Amber neon blob */}
      <div style={{ position: 'absolute', right: -100, top: -150, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,144,26,0.18) 0%, transparent 65%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 'var(--container)', margin: '0 auto', position: 'relative' }}>

        {/* Grid: vertical eyebrow strip + main content */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'auto 1fr', gap: 40, alignItems: 'flex-end' }}>

          {/* Vertical eyebrow */}
          {!isMobile && (
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 2,
              color: 'var(--ink3)', writingMode: 'vertical-rl',
              transform: 'rotate(180deg)', alignSelf: 'stretch',
              display: 'flex', alignItems: 'center',
            }}>
              {eyebrow}
            </div>
          )}
          {isMobile && (
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 2, color: 'var(--ink3)', textTransform: 'uppercase', marginBottom: 12 }}>{eyebrow}</div>
          )}

          <div>
            {/* Headline */}
            <h1 style={{
              margin: '0 0 32px',
              fontFamily: 'var(--font-display)',
              fontSize: isMobile ? 56 : 120,
              fontWeight: 500,
              lineHeight: 0.9,
              letterSpacing: '-0.04em',
              color: 'var(--ink)',
            }}>
              {lines.map((line, i) => {
                const accentColor = LINE_ACCENTS[i] || LINE_ACCENTS[0];

                // If an accent word is set and it appears in this line, use it
                if (accentWord && line.includes(accentWord)) {
                  const parts = line.split(accentWord);
                  return (
                    <span key={i} style={{ display: 'block' }}>
                      {parts[0]}<em style={{ fontStyle: 'italic', color: accentColor }}>{accentWord}</em>{parts[1]}
                    </span>
                  );
                }

                // Fallback: color the last word of the line
                const words = line.split(' ');
                const lastWord = words[words.length - 1];
                const firstPart = words.slice(0, -1).join(' ');
                return (
                  <span key={i} style={{ display: 'block' }}>
                    {firstPart}{firstPart ? ' ' : ''}<em style={{ fontStyle: 'italic', color: accentColor }}>{lastWord}</em>
                  </span>
                );
              })}
            </h1>

            {/* Subheading + meta row */}
            <div style={{ display: 'flex', gap: 48, maxWidth: 880, justifyContent: 'space-between', flexWrap: isMobile ? 'wrap' : 'nowrap' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: isMobile ? 14 : 16, lineHeight: 1.55, color: 'var(--ink2)', maxWidth: 420, margin: 0, flex: '1 1 auto' }}>
                {subheading}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 180, flexShrink: 0 }}>
                {[readTime, 'Last updated · Apr 2026', author].map(chip => (
                  <span key={chip} style={{
                    fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 1,
                    padding: '5px 12px', borderRadius: 99,
                    background: 'var(--paper)', border: '1px solid var(--line2)',
                    color: 'var(--ink3)', textTransform: 'uppercase', whiteSpace: 'nowrap',
                  }}>{chip}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Image grid */}
        {isMobile ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 32 }}>
            {img0 && <MainImageCell img={img0} isMobile />}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {img1 && <SmallImageCell img={img1} height={130} />}
              {img2 && <SmallImageCell img={img2} height={130} />}
            </div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gridTemplateRows: '240px 180px', gap: 12, marginTop: 40 }}>
            {img0 && <MainImageCell img={img0} isMobile={false} />}
            {img1 && <SmallImageCell img={img1} height={240} />}
            {img2 && <SmallImageCell img={img2} height={240} />}
            {img3 && <SmallImageCell img={img3} height={180} />}
            {img4 && <SmallImageCell img={img4} height={180} />}
          </div>
        )}
      </div>
    </section>
  );
}
