'use client';
import { storyblokEditable } from '@storyblok/react/rsc';
import PulseLogo from '@/components/ui/PulseLogo';
import { useIsMobile } from '@/lib/useIsMobile';

const LINK_COLS = [
  { title: 'Careers', items: ['Open roles', 'Teams', 'Internships', 'Returners', 'Referrals'] },
  { title: 'Culture', items: ['Life at Pulse', 'Benefits', 'Learning', 'DEI report', 'Parental'] },
  { title: 'Company', items: ['About', 'Research', 'News', 'Investors', 'Press kit'] },
];

export default function FooterBlock({ blok }) {
  const isMobile = useIsMobile();
  const tagline = blok?.tagline || 'Building the infrastructure of everyday intelligence.';
  const offices = blok?.offices || 'NYC · LDN · LIS · BER · SGP · SF · RMT';

  return (
    <footer
      {...(blok ? storyblokEditable(blok) : {})}
      style={{
        background: 'var(--ink)', color: 'var(--paper)',
        padding: isMobile ? '48px 20px 32px' : '60px 48px 36px', position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Decorative blob */}
      <div style={{
        position: 'absolute', right: -150, top: -200,
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,122,92,0.28) 0%, transparent 70%)',
        filter: 'blur(40px)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', left: -100, bottom: -100,
        width: 350, height: 350, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(155,127,212,0.2) 0%, transparent 70%)',
        filter: 'blur(32px)', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 'var(--container)', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {/* Main grid */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : '2fr 1fr 1fr 1fr', gap: isMobile ? 32 : 48 }}>
          {/* Brand column */}
          <div style={isMobile ? { gridColumn: '1 / -1' } : {}}>
            <PulseLogo size={20} color="var(--paper)" />
            <div style={{
              fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 500,
              marginTop: 22, maxWidth: 340, letterSpacing: '-0.025em', lineHeight: 1.3,
              color: 'rgba(244,237,225,0.9)',
            }}>
              {tagline}
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1.5,
              color: 'var(--mint)', marginTop: 28, lineHeight: 1.6,
            }}>
              ◉ {offices}
            </div>
          </div>

          {/* Link columns */}
          {LINK_COLS.map(col => (
            <div key={col.title}>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--mint)',
                letterSpacing: 1.5, marginBottom: 18, textTransform: 'uppercase',
              }}>
                {col.title}
              </div>
              {col.items.map(item => (
                <a key={item} href="#" style={{
                  display: 'block', fontFamily: 'var(--font-body)', fontSize: 13,
                  margin: '9px 0', opacity: 0.75, color: 'var(--paper)',
                  textDecoration: 'none', transition: 'opacity 0.15s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = '1'; }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = '0.75'; }}
                >
                  {item}
                </a>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(244,237,225,0.1)', marginTop: isMobile ? 36 : 52, paddingTop: 22,
          display: 'flex', flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center',
          gap: isMobile ? 14 : 0,
          fontFamily: 'var(--font-mono)', fontSize: 11, opacity: 0.45, letterSpacing: 0.5,
        }}>
          <div>© 2026 PULSE SYSTEMS, INC. · ALL RIGHTS RESERVED</div>
          <div style={{ display: 'flex', gap: isMobile ? 14 : 20, flexWrap: 'wrap' }}>
            {['Privacy', 'Terms', 'Accessibility', 'Candidate Privacy'].map(l => (
              <a key={l} href="#" style={{ color: 'var(--paper)', textDecoration: 'none' }}>{l.toUpperCase()}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
