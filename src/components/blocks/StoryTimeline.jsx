'use client';
import { storyblokEditable } from '@storyblok/react/rsc';
import { useIsMobile } from '@/lib/useIsMobile';

const DEFAULT_CHAPTERS = [
  { year: '2014', title: 'Founded, above a bakery',      body: 'Four people, one office in Cais do Sodré, €180k from friends and family. We built the first version on a kitchen table.' },
  { year: '2016', title: 'Our first public contract',    body: 'The Portuguese national health service asked us to modernize their referral system. We said yes. It ran on a single server for two years.' },
  { year: '2019', title: 'Series B. First hire in Berlin.', body: 'We grew from 12 to 80 in a year. That almost broke us. We spent six months re-learning how to hire slowly.' },
  { year: '2022', title: 'Profitable',                   body: 'Three years ahead of plan. We chose to reinvest everything into the long-horizon research team.' },
  { year: '2025', title: '€340M revenue, 7 offices',     body: 'Still founder-led. Still privately held. Still above that same bakery, now two floors up.' },
];

const DEFAULT_FOUNDERS = [
  { name: 'Inês Vasconcelos', role: 'CEO',                    tone: '#FF7A5C' },
  { name: 'Pedro Almeida',    role: 'CTO',                    tone: '#F4B942' },
  { name: 'Sofia Ribeiro',    role: 'Chief Design Officer',   tone: '#7FD4C1' },
  { name: 'Miguel Costa',     role: 'Chief Research Officer', tone: '#9B7FD4' },
];

export default function StoryTimeline({ blok }) {
  const isMobile = useIsMobile();
  const chapters = blok?.chapters?.length ? blok.chapters : DEFAULT_CHAPTERS;
  const founders  = blok?.founders?.length  ? blok.founders  : DEFAULT_FOUNDERS;

  return (
    <>
      {/* Timeline */}
      <section
        {...storyblokEditable(blok)}
        style={{ backgroundColor: 'var(--paper)', padding: isMobile ? '64px 20px 96px' : '96px 48px 140px' }}
      >
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          {chapters.map((ch, i) => {
            const year  = ch.year  || ch.content?.year  || '';
            const title = ch.title || ch.content?.title || '';
            const body  = ch.body  || ch.content?.body  || '';
            return (
              <div
                key={ch._uid || i}
                {...storyblokEditable(ch)}
                style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : '140px 1fr',
                  gap: isMobile ? 16 : 40,
                  padding: isMobile ? '32px 0' : '44px 0',
                  borderTop: i === 0 ? 'none' : '1px solid var(--line)',
                }}
              >
                <div style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? 44 : 56, fontWeight: 700, letterSpacing: '-0.04em', color: '#FF7A5C', lineHeight: 1 }}>
                  {year}
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? 24 : 30, fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 12, lineHeight: 1.2 }}>
                    {title}
                  </div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.65, color: 'var(--ink2)', margin: 0, maxWidth: 620 }}>
                    {body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Founders */}
      <section style={{ backgroundColor: 'var(--paper2)', padding: isMobile ? '48px 20px' : '80px 48px', borderTop: '1px solid var(--line2)' }}>
        <div style={{ maxWidth: 'var(--container)', margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 2, color: 'var(--ink3)', textTransform: 'uppercase', marginBottom: 12 }}>
            § Founders
          </div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? 28 : 40, fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--ink)', marginBottom: 32 }}>
            Still here, still building.
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)', gap: 16 }}>
            {founders.map((f, i) => {
              const name = f.name || f.content?.name || '';
              const role = f.role || f.content?.role || '';
              const color = f.tone || f.content?.tone || '#FF7A5C';
              const imageUrl = f.image?.filename || f.content?.image?.filename || '';
              const initials = name.split(' ').map(w => w[0]).join('');
              return (
                <div key={f._uid || i} {...storyblokEditable(f)} style={{ backgroundColor: 'var(--paper)', borderRadius: 14, padding: 20, border: '1px solid var(--line2)' }}>
                  <div style={{
                    width: '100%', aspectRatio: '1', borderRadius: 10,
                    backgroundColor: color,
                    marginBottom: 14,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-display)', fontSize: 38, fontWeight: 700, color: 'var(--ink)',
                    overflow: 'hidden',
                  }}>
                    {imageUrl
                      ? <img src={imageUrl} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                      : initials}
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600, color: 'var(--ink)', marginBottom: 4 }}>{name}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1, color: 'var(--ink3)', textTransform: 'uppercase' }}>{role} · SINCE 2014</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
