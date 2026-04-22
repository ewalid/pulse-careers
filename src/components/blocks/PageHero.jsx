'use client';
import { storyblokEditable } from '@storyblok/react/rsc';
import { useIsMobile } from '@/lib/useIsMobile';

const TONES = {
  coral:  { bg: '#FFD6C8', stripe: 'rgba(255,122,92,0.2)',   accent: '#FF7A5C' },
  amber:  { bg: '#FBE5B4', stripe: 'rgba(244,185,66,0.3)',   accent: '#F4B942' },
  mint:   { bg: '#CFEBE2', stripe: 'rgba(127,212,193,0.35)', accent: '#7FD4C1' },
  violet: { bg: '#D9CDEA', stripe: 'rgba(155,127,212,0.3)',  accent: '#9B7FD4' },
};

function accentHeadlineColored(headline, accentWord, color) {
  if (!accentWord || !headline) return <>{headline}</>;
  const idx = headline.toLowerCase().indexOf(accentWord.toLowerCase());
  if (idx === -1) return <>{headline}</>;
  return (
    <>
      {headline.slice(0, idx)}
      <em style={{ fontStyle: 'italic', color }}>{headline.slice(idx, idx + accentWord.length)}</em>
      {headline.slice(idx + accentWord.length)}
    </>
  );
}

export default function PageHero({ blok }) {
  const isMobile = useIsMobile();

  const eyebrow     = blok?.eyebrow || '';
  const headline    = blok?.headline || '';
  const accentWord  = blok?.headline_accent_word || '';
  const subtitle    = blok?.subtitle || '';
  const toneKey     = blok?.tone || 'coral';
  const t           = TONES[toneKey] || TONES.coral;

  return (
    <section
      {...storyblokEditable(blok)}
      style={{
        background: 'var(--paper)',
        borderBottom: '1px solid var(--line2)',
        padding: isMobile ? '72px 20px 64px' : '120px 48px 96px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Diagonal stripe overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `repeating-linear-gradient(135deg, ${t.bg}40 0 20px, ${t.stripe} 20px 21px)`,
        opacity: 0.35, pointerEvents: 'none',
      }} />
      {/* Radial blob */}
      <div style={{
        position: 'absolute', top: -200, right: -200,
        width: 600, height: 600, borderRadius: '50%',
        background: `radial-gradient(circle, ${t.bg} 0%, transparent 65%)`,
        opacity: 0.5, filter: 'blur(40px)', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 'var(--container)', margin: '0 auto', position: 'relative' }}>
        {eyebrow && (
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 2,
            textTransform: 'uppercase', color: 'var(--ink3)', marginBottom: 20,
          }}>
            {eyebrow}
          </div>
        )}
        <h1 style={{
          margin: '0 0 24px',
          fontFamily: 'var(--font-display)',
          fontSize: isMobile ? 48 : 88,
          fontWeight: 600,
          letterSpacing: '-0.03em',
          color: 'var(--ink)',
          lineHeight: 1.02,
          maxWidth: 1000,
        }}>
          {accentHeadlineColored(headline, accentWord, t.accent)}
        </h1>
        {subtitle && (
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: isMobile ? 17 : 20,
            lineHeight: 1.55,
            color: 'var(--ink2)',
            maxWidth: 680,
            margin: 0,
          }}>
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
