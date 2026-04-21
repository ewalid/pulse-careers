'use client';
import { useEffect, useRef, useState } from 'react';
import { storyblokEditable } from '@storyblok/react/rsc';
import { useIsMobile } from '@/lib/useIsMobile';

const DEFAULT_PUBS = ['WIRED', 'FAST COMPANY', 'MIT TECH REVIEW', 'BLOOMBERG', 'THE VERGE', 'SIFTED', 'FT', 'MONOCLE'];

const DEFAULT_STATS = [
  { target: 4.7, suffix: '', prefix: '★ ', decimals: 1, label: 'Glassdoor overall', sub: 'top 1% of scale-ups', barPct: 94 },
  { target: 96, suffix: '%', prefix: '', decimals: 0, label: 'Recommend to a friend', sub: 'up from 91% · 2024', barPct: 96 },
  { target: 42, suffix: '', prefix: '', decimals: 0, label: 'Countries represented', sub: 'across 7 offices', barPct: 84 },
  { target: 18, suffix: 'wk', prefix: '', decimals: 0, label: 'Paid parental leave', sub: 'all caregivers, equal', barPct: 75 },
];

function useCountUp(target, decimals, active) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    const duration = 1400;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(+(target * ease).toFixed(decimals));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target, decimals]);
  return val;
}

function StatItem({ stat, active, isMobile }) {
  const val = useCountUp(stat.target, stat.decimals, active);
  const barPct = stat.barPct ?? Math.round((stat.target / (stat.suffix === '%' ? 100 : stat.target * 1.25)) * 100);

  if (isMobile) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: 28, fontWeight: 500, letterSpacing: '-0.02em', color: 'var(--ink)', lineHeight: 1.1, marginBottom: 6 }}>
          {stat.prefix && <span>{stat.prefix}</span>}{val}{stat.suffix}
        </div>
        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.3, marginBottom: 3 }}>{stat.label}</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--ink3)', letterSpacing: 0.5, lineHeight: 1.3, marginBottom: 10 }}>{stat.sub}</div>
        <div style={{ height: 3, background: 'var(--line)', borderRadius: 99, overflow: 'hidden' }}>
          <div style={{
            height: '100%', borderRadius: 99,
            background: 'linear-gradient(90deg, var(--coral), var(--amber))',
            width: active ? `${barPct}%` : '0%',
            transition: 'width 1.5s cubic-bezier(0.16,1,0.3,1) 0.1s',
          }} />
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 10 }}>
        <div style={{ flexShrink: 0 }}>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 40, fontWeight: 500, letterSpacing: '-0.02em', color: 'var(--ink)', lineHeight: 1.2 }}>
            {stat.prefix && <span>{stat.prefix}</span>}{val}{stat.suffix}
          </div>
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.4 }}>{stat.label}</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink3)', letterSpacing: 0.5, marginTop: 3, lineHeight: 1.3 }}>{stat.sub}</div>
        </div>
      </div>
      <div style={{ height: 3, background: 'var(--line)', borderRadius: 99, overflow: 'hidden' }}>
        <div style={{
          height: '100%', borderRadius: 99,
          background: 'linear-gradient(90deg, var(--coral), var(--amber))',
          width: active ? `${barPct}%` : '0%',
          transition: 'width 1.5s cubic-bezier(0.16,1,0.3,1) 0.1s',
        }} />
      </div>
    </div>
  );
}

function parseStat(s) {
  return {
    target: parseFloat(s.target ?? s.value ?? 0),
    decimals: parseInt(s.decimals ?? 0, 10),
    prefix: s.prefix ?? '',
    suffix: s.suffix ?? '',
    label: s.label ?? '',
    sub: s.sub ?? '',
    barPct: s.bar_pct ? parseInt(s.bar_pct, 10) : undefined,
  };
}

export default function BrandMarquee({ blok }) {
  const isMobile = useIsMobile();
  const pubs = blok?.publications
    ? blok.publications.split(',').map(p => p.trim()).filter(Boolean)
    : DEFAULT_PUBS;

  const stats = blok?.stats?.length > 0
    ? blok.stats.map(parseStat)
    : DEFAULT_STATS;

  const ref = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setActive(true); obs.disconnect(); } }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const doubled = [...pubs, ...pubs];

  return (
    <section {...storyblokEditable(blok)} style={{ background: 'var(--paper)', borderTop: '1px dashed var(--line)', borderBottom: '1px dashed var(--line)', padding: '36px 0' }}>
      {/* Scrolling marquee */}
      <div style={{ overflow: 'hidden', marginBottom: 32, padding: isMobile ? '0 20px' : '0 48px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--ink3)', flexShrink: 0, marginRight: 24, whiteSpace: 'nowrap' }}>
            AS SEEN IN →
          </span>
          <div style={{ overflow: 'hidden', flex: 1, maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)' }}>
            <div style={{ display: 'flex', animation: 'marquee-scroll 22s linear infinite', width: 'max-content' }}>
              {doubled.map((pub, i) => (
                <span key={i} style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? 14 : 18, fontWeight: 600, color: 'var(--ink2)', opacity: 0.75, letterSpacing: '-0.01em', whiteSpace: 'nowrap', padding: isMobile ? '0 24px' : '0 40px' }}>
                  {pub}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div ref={ref} style={{ padding: isMobile ? '0 20px' : '0 48px' }}>
        <div style={{ maxWidth: 'var(--container)', margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: isMobile ? 20 : 24, borderTop: '1px dashed var(--line)', paddingTop: 28 }}>
          {stats.map(s => <StatItem key={s.label} stat={s} active={active} isMobile={isMobile} />)}
        </div>
      </div>

      <style>{`
        @keyframes marquee-scroll { from { transform: translateX(0) } to { transform: translateX(-50%) } }
      `}</style>
    </section>
  );
}
