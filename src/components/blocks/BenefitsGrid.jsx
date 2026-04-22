'use client';
import { useState } from 'react';
import { storyblokEditable } from '@storyblok/react/rsc';
import { useIsMobile } from '@/lib/useIsMobile';

const TONE_MAP = {
  coral:  '#FF7A5C',
  amber:  '#F4B942',
  mint:   '#7FD4C1',
  violet: '#9B7FD4',
};

const DEFAULT_CATEGORIES = [
  { title: 'Health & care', tone: 'coral', stat: '100%', stat_label: 'covered from day one', items: [
    { title: 'Private health',    description: 'Full family coverage, including dental + vision, from day one. No waiting period.', featured: true },
    { title: 'Mental health',     description: 'Unlimited therapy via Spring Health. Anonymous by default. No approval needed.' },
    { title: 'Annual check-ups',  description: 'Paid time off to go. We also book it for you if you forget.' },
  ]},
  { title: 'Time & rest', tone: 'amber', stat: '4+', stat_label: 'weeks off, minimum', items: [
    { title: 'Minimum 4 weeks off', description: "Not a cap \u2014 a floor. Your manager will flag if you're not taking it.", featured: true },
    { title: 'Sabbatical at year 5', description: '6 paid weeks. No project hand-off required. Just go.' },
    { title: '13th-month bonus',   description: 'Paid in December. Most of ours spend it on flights.' },
  ]},
  { title: 'Family', tone: 'mint', stat: '18wk', stat_label: 'parental leave, all caregivers', items: [
    { title: '18 weeks parental leave', description: 'All caregivers. Equal. No proof required beyond what HR needs legally.', featured: true },
    { title: 'Return-to-work runway',   description: 'Half-days for 8 weeks after return, full pay. No guilt.' },
    { title: 'Fertility support',       description: '€8,000 lifetime allowance, no questions asked.' },
  ]},
  { title: 'Growth', tone: 'violet', stat: '€3K', stat_label: 'annual learning budget', items: [
    { title: '€3,000 learning budget', description: 'Books, courses, conferences. Audit trail is your call.', featured: true },
    { title: '20% research time',      description: 'One day a week to explore something tangential. Officially protected.' },
    { title: 'Mentorship by default',  description: 'A mentor + a mentee, from week one. Both directions matter.' },
  ]},
];

function BenefitCard({ item, accent, featured, isMobile }) {
  const [hovered, setHovered] = useState(false);
  const title = item.title || item.content?.title || '';
  const desc  = item.description || item.content?.description || '';

  if (featured) {
    return (
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: 'var(--ink)',
          borderRadius: 20,
          padding: isMobile ? '28px 24px' : '36px 40px',
          position: 'relative',
          overflow: 'hidden',
          transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease',
          transform: hovered ? 'translateY(-4px)' : 'none',
          boxShadow: hovered ? `0 24px 60px ${accent}30` : '0 2px 12px rgba(42,31,46,0.06)',
          flex: '1 1 auto',
        }}
      >
        <div style={{ position: 'absolute', right: -60, top: -60, width: 260, height: 260, borderRadius: '50%', background: `radial-gradient(circle, ${accent}25 0%, transparent 70%)`, pointerEvents: 'none' }} />
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: accent, marginBottom: 20, opacity: 0.9 }}>
          ◉ Featured benefit
        </div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? 22 : 26, fontWeight: 600, letterSpacing: '-0.02em', color: 'rgba(244,237,225,0.95)', marginBottom: 12, lineHeight: 1.2 }}>
          {title}
        </div>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.65, color: 'rgba(244,237,225,0.6)', maxWidth: 420 }}>
          {desc}
        </div>
        <div style={{ marginTop: 28, width: 40, height: 3, background: accent, borderRadius: 99, boxShadow: `0 0 12px ${accent}` }} />
      </div>
    );
  }

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--paper)',
        borderRadius: 16,
        padding: '24px',
        border: `1px solid ${hovered ? accent + '55' : 'var(--line2)'}`,
        transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1), border-color 0.2s, box-shadow 0.3s ease',
        transform: hovered ? 'translateY(-3px)' : 'none',
        boxShadow: hovered ? `0 12px 32px ${accent}18` : 'none',
        flex: 1,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 10 }}>
        <div style={{ width: 7, height: 7, borderRadius: '50%', background: accent, boxShadow: `0 0 8px ${accent}`, marginTop: 6, flexShrink: 0 }} />
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.01em', lineHeight: 1.3 }}>{title}</div>
      </div>
      <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.6, color: 'var(--ink2)', paddingLeft: 19 }}>{desc}</div>
    </div>
  );
}

export default function BenefitsGrid({ blok }) {
  const isMobile = useIsMobile();
  const categories = blok?.categories?.length ? blok.categories : DEFAULT_CATEGORIES;
  const stats = DEFAULT_CATEGORIES.map(c => ({ stat: c.stat, label: c.stat_label, tone: c.tone }));

  return (
    <>
      {/* Stats strip */}
      <section style={{ background: 'var(--ink)', borderBottom: '1px solid rgba(244,237,225,0.08)', padding: isMobile ? '36px 20px' : '40px 48px' }}>
        <div style={{ maxWidth: 'var(--container)', margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: isMobile ? 28 : 0 }}>
          {stats.map((s, i) => {
            const accent = TONE_MAP[s.tone];
            return (
              <div key={i} style={{ textAlign: 'center', position: 'relative' }}>
                {i > 0 && !isMobile && <div style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', height: 40, width: 1, background: 'rgba(244,237,225,0.1)' }} />}
                <div style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? 44 : 56, fontWeight: 600, letterSpacing: '-0.04em', color: accent, lineHeight: 1, marginBottom: 8 }}>{s.stat}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1.5, color: 'rgba(244,237,225,0.45)', textTransform: 'uppercase' }}>{s.label}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Categories */}
      {categories.map((cat, i) => {
        const title   = cat.title   || cat.content?.title   || '';
        const toneKey = cat.tone    || cat.content?.tone    || 'coral';
        const stat    = cat.stat    || cat.content?.stat    || '';
        const accent  = TONE_MAP[toneKey] || '#FF7A5C';
        const items   = cat.items   || cat.content?.items   || [];
        const featured = items[0];
        const rest     = items.slice(1);
        const bg = i % 2 === 0 ? 'var(--paper2)' : 'var(--paper)';

        return (
          <section
            key={cat._uid || i}
            {...storyblokEditable(cat)}
            style={{ background: bg, borderTop: '1px solid var(--line2)', padding: isMobile ? '48px 20px' : '72px 48px' }}
          >
            <div style={{ maxWidth: 'var(--container)', margin: '0 auto' }}>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '220px 1fr', gap: isMobile ? 32 : 64, alignItems: 'start' }}>

                {/* Left: category identity */}
                <div style={{ position: isMobile ? 'static' : 'sticky', top: 32 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 2, color: accent, textTransform: 'uppercase', marginBottom: 12 }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? 32 : 40, fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--ink)', lineHeight: 1.05, marginBottom: 16 }}>
                    {title}
                  </div>
                  {stat && (
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: `${accent}14`, border: `1px solid ${accent}35`, borderRadius: 99, padding: '6px 14px' }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: accent, boxShadow: `0 0 8px ${accent}` }} />
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1, color: accent, textTransform: 'uppercase' }}>{items.length} benefits</span>
                    </div>
                  )}
                </div>

                {/* Right: bento cards */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {featured && <BenefitCard item={featured} accent={accent} featured isMobile={isMobile} />}
                  {rest.length > 0 && (
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : `repeat(${rest.length}, 1fr)`, gap: 12 }}>
                      {rest.map((item, j) => (
                        <BenefitCard key={item._uid || j} item={item} accent={accent} isMobile={isMobile} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Fine print */}
      <section style={{ background: 'var(--ink)', padding: isMobile ? '48px 20px' : '64px 48px' }}>
        <div style={{ maxWidth: 'var(--container)', margin: '0 auto', display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'center', gap: 32, justifyContent: 'space-between' }}>
          <div style={{ flex: 1, maxWidth: 600 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: 'rgba(244,237,225,0.4)', textTransform: 'uppercase', marginBottom: 12 }}>The fine print</div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.7, color: 'rgba(244,237,225,0.6)', margin: 0 }}>
              Benefits vary slightly by jurisdiction — we match or exceed local equivalents everywhere we hire. All offers include a full breakdown at the written-offer stage, and a 1-hour call with People Ops to walk you through it.
            </p>
          </div>
          <a href="/jobs" style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, color: '#2A1F2E', background: 'linear-gradient(135deg, #FF7A5C, #F4B942)', textDecoration: 'none', borderRadius: 99, padding: '12px 24px', whiteSpace: 'nowrap', letterSpacing: '-0.01em', flexShrink: 0 }}>
            See open roles →
          </a>
        </div>
      </section>
    </>
  );
}
