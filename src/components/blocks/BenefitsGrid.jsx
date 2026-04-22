'use client';
import { storyblokEditable } from '@storyblok/react/rsc';
import { useIsMobile } from '@/lib/useIsMobile';

const TONE_MAP = {
  coral:  '#FF7A5C',
  amber:  '#F4B942',
  mint:   '#7FD4C1',
  violet: '#9B7FD4',
};

const DEFAULT_CATEGORIES = [
  { title: 'Health & care', tone: 'coral', items: [
    { title: 'Private health',    description: 'Full family coverage, including dental + vision, from day one.' },
    { title: 'Mental health',     description: 'Unlimited therapy via Spring Health. Anonymous by default.' },
    { title: 'Annual check-ups',  description: 'Paid time off to go. We also book it for you if you forget.' },
  ]},
  { title: 'Time & rest', tone: 'amber', items: [
    { title: 'Minimum 4 weeks off', description: 'Not a cap — a floor. Enforced by your manager.' },
    { title: 'Sabbatical at year 5', description: '6 paid weeks. Not optional.' },
    { title: '13th-month bonus',   description: 'Paid in December. Most of ours spend it on holidays.' },
  ]},
  { title: 'Family', tone: 'mint', items: [
    { title: '18 weeks parental leave', description: 'All caregivers. Equal. No proof required.' },
    { title: 'Return-to-work runway',   description: 'Half-days for 8 weeks after return, full pay.' },
    { title: 'Fertility support',       description: '€8,000 lifetime allowance, no questions asked.' },
  ]},
  { title: 'Growth', tone: 'violet', items: [
    { title: '€3,000 learning budget', description: 'Books, courses, conferences. Audit trail is your call.' },
    { title: '20% research time',      description: 'One day a week to explore something tangential.' },
    { title: 'Mentorship by default',  description: 'A mentor + a mentee, from week one.' },
  ]},
];

export default function BenefitsGrid({ blok }) {
  const isMobile = useIsMobile();
  const categories = blok?.categories?.length ? blok.categories : DEFAULT_CATEGORIES;

  return (
    <>
      <section
        {...storyblokEditable(blok)}
        style={{ background: 'var(--paper)', padding: isMobile ? '64px 20px' : '96px 48px' }}
      >
        <div style={{ maxWidth: 'var(--container)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 40 }}>
          {categories.map((cat, i) => {
            const title   = cat.title || cat.content?.title || '';
            const toneKey = cat.tone  || cat.content?.tone  || 'coral';
            const color   = TONE_MAP[toneKey] || cat.tone || '#FF7A5C';
            const items   = cat.items || cat.content?.items || [];

            return (
              <div key={cat._uid || i} {...storyblokEditable(cat)} style={{ borderTop: i === 0 ? 'none' : '1px solid var(--line2)', paddingTop: i === 0 ? 0 : 40 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
                  <div style={{ width: 36, height: 4, backgroundColor: color, borderRadius: 99 }} />
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? 28 : 36, fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--ink)' }}>
                    {title}
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 14 }}>
                  {items.map((item, j) => {
                    const itemTitle = item.title || item.content?.title || '';
                    const itemDesc  = item.description || item.content?.description || '';
                    return (
                      <div key={item._uid || j} {...storyblokEditable(item)} style={{ backgroundColor: 'var(--paper2)', borderRadius: 14, padding: 24, border: '1px solid var(--line2)' }}>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600, color: 'var(--ink)', marginBottom: 8, letterSpacing: '-0.01em' }}>{itemTitle}</div>
                        <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.55, color: 'var(--ink2)' }}>{itemDesc}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Fine print */}
      <section style={{ backgroundColor: 'var(--paper2)', padding: isMobile ? '48px 20px' : '72px 48px', borderTop: '1px solid var(--line2)' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 2, color: 'var(--ink3)', textTransform: 'uppercase', marginBottom: 12 }}>The fine print</div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.7, color: 'var(--ink2)', margin: 0 }}>
            Benefits vary slightly by jurisdiction — we match or exceed local equivalents everywhere we hire. All offers include a full breakdown at the written-offer stage, and a 1-hour call with People Ops to walk you through it, because benefits docs should not be homework.
          </p>
        </div>
      </section>
    </>
  );
}
