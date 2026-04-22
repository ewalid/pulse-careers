'use client';
import { storyblokEditable } from '@storyblok/react/rsc';
import { useIsMobile } from '@/lib/useIsMobile';
import { resolveLink } from '@/lib/resolveLink';

const DEFAULT_HIGHLIGHTS = [
  { title: 'Paid €2,800/month',      subtitle: 'Plus housing support in Lisbon and Berlin.' },
  { title: 'Return-offer rate: 72%', subtitle: 'Over the last 3 cohorts.' },
  { title: '5 cities',               subtitle: 'Lisbon, Berlin, NYC, London, Singapore.' },
];

const DEFAULT_TIMELINE = [
  { event: 'Applications open', date: 'Jan 15' },
  { event: 'Interviews',        date: 'Feb–Mar' },
  { event: 'Offers out',        date: 'Apr 1' },
  { event: 'Program starts',    date: 'Jun 8' },
  { event: 'Demo day',          date: 'Aug 24' },
  { event: 'Return offers',     date: 'Sep 1' },
];

export default function InternshipOverview({ blok }) {
  const isMobile = useIsMobile();

  const sectionLabel  = blok?.section_label  || '§ Program';
  const headline      = blok?.headline       || '12 weeks. One project that ships.';
  const description   = blok?.description    || "You'll be assigned a real problem — something we'd pay a full-time engineer to solve. Your mentor blocks out 3 hours a week for you, and every intern presents their work to the whole company in week 11.";
  const timelineLabel = blok?.timeline_label || 'SUMMER 2026 · TIMELINE';
  const ctaLabel      = blok?.cta_label      || 'Apply for Summer 2026 →';
  const ctaUrl        = resolveLink(blok?.cta_url) || '/jobs?e=Internship';
  const highlights    = blok?.highlights?.length    ? blok.highlights    : DEFAULT_HIGHLIGHTS;
  const timelineItems = blok?.timeline_items?.length ? blok.timeline_items : DEFAULT_TIMELINE;

  return (
    <section
      {...storyblokEditable(blok)}
      style={{ backgroundColor: 'var(--paper)', padding: isMobile ? '64px 20px' : '96px 48px' }}
    >
      <div style={{
        maxWidth: 'var(--container)', margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr',
        gap: isMobile ? 32 : 80,
        alignItems: 'start',
      }}>
        {/* Left — text */}
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 2, color: 'var(--ink3)', textTransform: 'uppercase', marginBottom: 14 }}>
            {sectionLabel}
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? 32 : 44, fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--ink)', lineHeight: 1.05, marginBottom: 24 }}>
            {headline}
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.65, color: 'var(--ink2)', marginBottom: 32 }}>
            {description}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {highlights.map((h, i) => {
              const title    = h.title    || h.content?.title    || '';
              const subtitle = h.subtitle || h.content?.subtitle || '';
              return (
                <div key={h._uid || i} {...storyblokEditable(h)} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#FF7A5C', flexShrink: 0, marginTop: 8, boxShadow: '0 0 10px #FF7A5C' }} />
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 600, color: 'var(--ink)', marginBottom: 3 }}>{title}</div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--ink2)' }}>{subtitle}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right — timeline card */}
        <div style={{
          backgroundColor: 'var(--ink)', color: 'var(--paper)',
          borderRadius: 18, padding: 28,
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', right: -60, top: -60, width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,122,92,0.35) 0%, transparent 70%)', filter: 'blur(10px)' }} />
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: '#7FD4C1', marginBottom: 18, position: 'relative' }}>
            {timelineLabel}
          </div>
          {timelineItems.map((row, i) => {
            const event = row.event || row.content?.event || '';
            const date  = row.date  || row.content?.date  || '';
            const isLast = i === timelineItems.length - 1;
            return (
              <div key={row._uid || i} style={{
                display: 'flex', justifyContent: 'space-between',
                padding: '14px 0',
                borderBottom: !isLast ? '1px solid rgba(244,237,225,0.1)' : 'none',
                position: 'relative',
              }}>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'rgba(244,237,225,0.85)' }}>{event}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: '#FF7A5C', letterSpacing: 0.5 }}>{date}</div>
              </div>
            );
          })}
          <a
            href={ctaUrl}
            style={{
              display: 'block', textAlign: 'center',
              marginTop: 24, padding: '14px',
              background: 'linear-gradient(135deg, #FF7A5C, #F4B942)',
              color: '#2A1F2E', borderRadius: 12,
              fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 600,
              letterSpacing: '-0.01em', position: 'relative',
              textDecoration: 'none',
            }}
          >
            {ctaLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
