'use client';
import { storyblokEditable } from '@storyblok/react/rsc';
import { useIsMobile } from '@/lib/useIsMobile';
import { resolveLink } from '@/lib/resolveLink';

export default function BrandCta({ blok }) {
  const isMobile = useIsMobile();

  const headline = blok?.headline || "If any of this sounds like home,\nlet's talk.";
  const accentWord = blok?.headline_accent || 'like home';
  const primaryLabel = blok?.primary_cta_label || 'Browse 247 roles';
  const primaryUrl = resolveLink(blok?.primary_cta_url) || '/jobs';
  const secondaryLabel = blok?.secondary_cta_label || 'Join talent network';
  const secondaryUrl = resolveLink(blok?.secondary_cta_url) || '#alerts';

  const headlineWithAccent = headline.split(accentWord);

  return (
    <section {...storyblokEditable(blok)} style={{ background: 'var(--paper)', borderTop: '1px solid var(--line2)', padding: isMobile ? '72px 20px' : '100px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      {/* Neon blobs */}
      <div style={{ position: 'absolute', top: -80, left: '10%', width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,122,92,0.1) 0%, transparent 65%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -60, right: '15%', width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(127,212,193,0.12) 0%, transparent 65%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 720, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Eyebrow */}
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 2.5, color: 'var(--ink3)', textTransform: 'uppercase', marginBottom: 28 }}>
          Life at Pulse · Join us
        </div>

        {/* Headline */}
        <h2 style={{
          margin: '0 0 40px',
          fontFamily: 'var(--font-display)',
          fontSize: isMobile ? 38 : 58,
          fontWeight: 700,
          letterSpacing: '-0.03em',
          lineHeight: 1.08,
          color: 'var(--ink)',
          whiteSpace: 'pre-line',
        }}>
          {headlineWithAccent.length === 2 ? (
            <>
              {headlineWithAccent[0]}
              <em style={{ color: '#FF7A5C', fontStyle: 'italic' }}>{accentWord}</em>
              {headlineWithAccent[1]}
            </>
          ) : headline}
        </h2>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href={primaryUrl}
            style={{
              fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 600,
              color: '#fff', background: '#FF7A5C', textDecoration: 'none',
              borderRadius: 99, padding: '14px 32px',
              display: 'inline-flex', alignItems: 'center', gap: 6,
              letterSpacing: '-0.01em',
              boxShadow: '0 4px 20px rgba(255,122,92,0.35)',
              transition: 'background 0.15s, box-shadow 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#ff6040'; e.currentTarget.style.boxShadow = '0 6px 28px rgba(255,122,92,0.45)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#FF7A5C'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(255,122,92,0.35)'; }}
          >
            {primaryLabel} →
          </a>
          <a
            href={secondaryUrl}
            style={{
              fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 600,
              color: 'var(--ink)', textDecoration: 'none',
              borderRadius: 99, padding: '14px 32px',
              border: '1.5px solid var(--ink)',
              display: 'inline-flex', alignItems: 'center', gap: 6,
              letterSpacing: '-0.01em',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--paper2)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
          >
            {secondaryLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
