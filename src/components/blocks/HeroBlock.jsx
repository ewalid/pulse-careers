'use client';
import { useState } from 'react';
import { storyblokEditable } from '@storyblok/react/rsc';
import NeonBlob from '@/components/ui/NeonBlob';

const DISCIPLINE_CHIPS = [
  { label: 'Eng', count: 94 },
  { label: 'AI', count: 47 },
  { label: 'Ops', count: 41 },
  { label: 'Data', count: 38 },
  { label: 'Design', count: 27 },
];

const HEADLINE_SIZES = { sm: '52px', md: '72px', lg: '96px', xl: '120px' };
const SUBHEADLINE_SIZES = { sm: '40px', md: '52px', lg: '72px' };

const SUGGESTIONS = [
  'What roles fit a ex-biotech PM?',
  'Teams hiring in Lisbon this quarter',
  'Where will I grow fastest as IC?',
];

export default function HeroBlock({ blok }) {
  const [query, setQuery] = useState('');
  const openRoles = blok?.stats_open_roles || 247;
  const headlineSize = HEADLINE_SIZES[blok?.headline_size] || '96px';
  const subheadlineSize = SUBHEADLINE_SIZES[blok?.subheadline_size] || '96px';
  const hudLocation = blok?.hud_location || 'PULSE / 2026  ·  LIVE FROM LISBON HQ  ·  38.72°N  ·  9.14°W';
  const featuredTitle = blok?.featured_job_title || 'Principal Research Engineer, Model Reliability';
  const featuredUrl = blok?.featured_job_url || '#';

  return (
    <section
      {...storyblokEditable(blok)}
      style={{ position: 'relative', height: '760px', background: '#1a1418', overflow: 'hidden', display: 'flex', alignItems: 'center' }}
    >
      {blok?.video_url && (
        <video autoPlay muted loop playsInline
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(1.05) contrast(1.02)' }}
          src={blok.video_url}
        />
      )}

      <div style={{ position: 'absolute', inset: 0, background: `
        linear-gradient(180deg, rgba(244,237,225,0.15) 0%, rgba(26,20,24,0.0) 25%, rgba(26,20,24,0.15) 55%, rgba(26,20,24,0.75) 100%),
        linear-gradient(95deg, rgba(42,31,46,0.55) 0%, rgba(42,31,46,0.15) 45%, rgba(244,185,66,0.18) 100%)
      `}} />
      <div style={{ position: 'absolute', inset: 0, opacity: 0.18, backgroundImage: 'repeating-linear-gradient(0deg, transparent 0 2px, rgba(244,237,225,0.12) 2px 3px)', pointerEvents: 'none', mixBlendMode: 'overlay' }} />

      <NeonBlob color="#FF7A5C" size={700} top={-200} right={-200} opacity={0.5} mixBlend="screen" />
      <NeonBlob color="#F4B942" size={500} bottom={-100} left={-150} opacity={0.55} mixBlend="screen" />

      {/* HUD top */}
      <div style={{ position: 'absolute', top: 22, left: 48, right: 48, zIndex: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#F4EDE1' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 2, opacity: 0.9, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#FF7A5C', boxShadow: '0 0 12px #FF7A5C', flexShrink: 0, animation: 'pulse-dot 1.6s ease-in-out infinite' }} />
          {hudLocation}
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1.5, opacity: 0.65, display: 'flex', gap: 14 }}>
          <span>REC 00:02:14</span><span>·</span><span>4K · 24FPS</span>
        </div>
      </div>

      {/* Main content */}
      <div style={{ position: 'absolute', left: 48, right: 48, bottom: 80, zIndex: 3, display: 'flex', alignItems: 'flex-end', gap: 48 }}>
        {/* Left */}
        <div style={{ flex: '1 1 0', minWidth: 0, color: '#F4EDE1' }}>
          <div style={{ maxWidth: 1040 }}>
            <h1 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 500, lineHeight: 0.92, letterSpacing: '-0.04em', textShadow: '0 2px 40px rgba(26,20,24,0.4)' }}>
              <span style={{ display: 'block', fontSize: headlineSize, marginBottom: '0.08em' }}>
                {blok?.headline || 'Find Where You Belong.'}
              </span>
              <span style={{ display: 'block', fontSize: subheadlineSize, fontStyle: 'italic', background: 'linear-gradient(95deg, #FF7A5C 0%, #F4B942 60%, #FFB8A5 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', filter: 'drop-shadow(0 0 30px rgba(255,122,92,0.35))' }}>
                {blok?.subheadline || "Build What's Next."}
              </span>
            </h1>

            <p style={{ maxWidth: 560, fontSize: 18, lineHeight: 1.5, color: 'rgba(244,237,225,0.85)', margin: '26px 0 24px', fontFamily: 'var(--font-body)' }}>
              Pulse is a 2,400-person research &amp; product company building the quiet infrastructure behind modern life. We hire humans who care.
            </p>

            {/* AI Search card */}
            <div style={{ maxWidth: 600 }}>
              <div style={{ background: 'rgba(26,20,24,0.75)', backdropFilter: 'blur(20px)', border: '1px solid rgba(244,237,225,0.12)', borderRadius: 18, padding: 20 }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 28, height: 28, borderRadius: 8, flexShrink: 0, background: 'linear-gradient(135deg, #FF7A5C, #9B7FD4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ color: '#fff', fontSize: 16, lineHeight: 1 }}>+</span>
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1.5, color: 'rgba(244,237,225,0.7)', textTransform: 'uppercase' }}>
                      Ask Pulse · AI-Assisted Job Search
                    </span>
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1, color: '#7FD4C1', display: 'flex', alignItems: 'center', gap: 5 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#7FD4C1', display: 'inline-block' }} />
                    READY
                  </span>
                </div>

                {/* Input */}
                <input
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder='Search roles, teams, skills — e.g. "ML reliability"'
                  style={{ width: '100%', background: 'transparent', border: 'none', outline: 'none', fontFamily: 'var(--font-body)', fontSize: 16, color: '#F4EDE1', lineHeight: 1.5, padding: '4px 0 12px', boxSizing: 'border-box' }}
                />

                {/* Suggestion chips */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1, color: 'rgba(244,237,225,0.35)', textTransform: 'uppercase', flexShrink: 0 }}>TRY:</span>
                  {SUGGESTIONS.map(s => (
                    <button key={s} onClick={() => setQuery(s)} style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(244,237,225,0.55)', background: 'rgba(244,237,225,0.06)', border: '1px solid rgba(244,237,225,0.1)', borderRadius: '99px', padding: '4px 10px', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                      {s}
                    </button>
                  ))}
                </div>

                {/* Divider */}
                <div style={{ height: 1, background: 'rgba(244,237,225,0.1)', margin: '0 0 14px' }} />

                {/* Actions */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 0.5, color: 'rgba(244,237,225,0.7)', background: 'rgba(244,237,225,0.08)', border: '1px solid rgba(244,237,225,0.12)', borderRadius: '99px', padding: '6px 12px', cursor: 'pointer' }}>
                      ⊗ Attach résumé
                    </button>
                    <button style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 0.5, color: 'rgba(244,237,225,0.7)', background: 'rgba(244,237,225,0.08)', border: '1px solid rgba(244,237,225,0.12)', borderRadius: '99px', padding: '6px 12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5 }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="#0A66C2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                      Attach LinkedIn profile
                    </button>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 600, color: 'rgba(244,237,225,0.5)', background: 'rgba(244,237,225,0.08)', border: '1px solid rgba(244,237,225,0.15)', padding: '3px 7px', borderRadius: 5 }}>⌘</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 600, color: 'rgba(244,237,225,0.5)', background: 'rgba(244,237,225,0.08)', border: '1px solid rgba(244,237,224,0.15)', padding: '3px 7px', borderRadius: 5 }}>↵</span>
                    <button style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, color: '#2A1F2E', background: 'linear-gradient(135deg, #FF7A5C, #F4B942)', border: 'none', borderRadius: '99px', padding: '9px 18px', cursor: 'pointer', letterSpacing: '-0.01em' }}>
                      {blok?.cta_label || 'Ask Pulse'} →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: 3-card stack */}
        <div style={{ flexShrink: 0, width: 280, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {/* Card 1 */}
          <div style={{ background: 'rgba(26,20,24,0.55)', backdropFilter: 'blur(16px)', border: '1px solid rgba(244,237,225,0.15)', borderRadius: 16, padding: '16px 18px', color: '#F4EDE1' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1.5, color: '#7FD4C1', marginBottom: 6 }}>◉ LIVE · NOW HIRING</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 12 }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 48, fontWeight: 500, lineHeight: 1, letterSpacing: '-0.02em' }}>{openRoles}</span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: 'rgba(244,237,225,0.55)', fontWeight: 400 }}>open roles</span>
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {DISCIPLINE_CHIPS.map(({ label, count }) => (
                <div key={label} style={{ fontFamily: 'var(--font-mono)', fontSize: 10, padding: '4px 9px', background: 'rgba(244,237,225,0.12)', borderRadius: '99px', letterSpacing: 0.5, color: '#F4EDE1' }}>
                  {label} <b style={{ color: '#FF7A5C' }}>{count}</b>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2 */}
          <a href={featuredUrl} style={{ background: 'rgba(244,237,225,0.95)', backdropFilter: 'blur(16px)', borderRadius: 16, padding: '14px 16px', display: 'flex', gap: 12, alignItems: 'center', boxShadow: '0 12px 40px -12px rgba(0,0,0,0.3)', textDecoration: 'none', color: '#2A1F2E', cursor: featuredUrl !== '#' ? 'pointer' : 'default' }}>
            <div style={{ width: 38, height: 38, borderRadius: 12, background: '#FF7A5C', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2A1F2E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
              </svg>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#75687A', letterSpacing: 1, marginBottom: 3 }}>FEATURED ↗</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600, lineHeight: 1.25, color: '#2A1F2E' }}>{featuredTitle}</div>
            </div>
          </a>

          {/* Card 3 */}
          <div style={{ background: 'rgba(26,20,24,0.55)', backdropFilter: 'blur(16px)', border: '1px solid rgba(244,237,225,0.15)', borderRadius: 16, padding: '12px 16px', color: '#F4EDE1', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, opacity: 0.55, letterSpacing: 1, marginBottom: 4 }}>AVG. TENURE</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600, lineHeight: 1 }}>4.8 <span style={{ fontSize: 11, opacity: 0.55, fontWeight: 400 }}>yrs</span></div>
            </div>
            <div style={{ height: 40, width: 1, background: 'rgba(244,237,225,0.15)' }} />
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, opacity: 0.55, letterSpacing: 1, marginBottom: 4 }}>GLASSDOOR</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600, lineHeight: 1, color: '#F4B942' }}>★ 4.7</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{ position: 'absolute', left: '50%', bottom: 18, transform: 'translateX(-50%)', color: '#F4EDE1', opacity: 0.6, zIndex: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2 }}>SCROLL TO EXPLORE</div>
        <div style={{ width: 18, height: 28, borderRadius: 99, border: '1.5px solid rgba(244,237,225,0.5)', display: 'grid', placeItems: 'start center', padding: '4px 0' }}>
          <div style={{ width: 2, height: 6, background: '#F4EDE1', borderRadius: 99, animation: 'scroll-hint 1.8s ease-in-out infinite' }} />
        </div>
      </div>

      <style>{`
        @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(1.4)} }
        @keyframes scroll-hint { 0%{transform:translateY(0);opacity:1} 80%{transform:translateY(10px);opacity:0} 100%{transform:translateY(0);opacity:0} }
        input::placeholder { color: rgba(244,185,66,0.35); }
      `}</style>
    </section>
  );
}
