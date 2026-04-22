'use client';
import { useState, useEffect, useRef } from 'react';
import { storyblokEditable } from '@storyblok/react/rsc';
import NeonBlob from '@/components/ui/NeonBlob';
import { useIsMobile } from '@/lib/useIsMobile';
import { TOTAL_JOBS, JOBS_BY_CATEGORY } from '@/lib/ats-mock';

const MOCK_QUERY = "5 years as a software engineer, looking to transition into product management or anywhere my engineering background becomes the advantage";

const DISCIPLINE_CHIPS = [
  { label: 'Eng',    count: JOBS_BY_CATEGORY['Engineering']   || 0, discipline: 'Engineering' },
  { label: 'AI',     count: JOBS_BY_CATEGORY['AI & Research'] || 0, discipline: 'AI & Research' },
  { label: 'Ops',    count: JOBS_BY_CATEGORY['Operations']    || 0, discipline: 'Operations' },
  { label: 'Data',   count: JOBS_BY_CATEGORY['Data Science']  || 0, discipline: 'Data Science' },
  { label: 'Design', count: JOBS_BY_CATEGORY['Design']        || 0, discipline: 'Design' },
];

const HEADLINE_SIZES = { sm: '52px', md: '72px', lg: '96px', xl: '120px' };
const SUBHEADLINE_SIZES = { sm: '40px', md: '52px', lg: '72px' };

const SUGGESTIONS = [
  { text: 'What roles fit an ex-biotech PM?', color: '#FF7A5C', key: 'biotech-pm' },
  { text: 'Teams hiring in Lisbon this quarter', color: '#7FD4C1', key: 'lisbon' },
  { text: 'Where will I grow fastest as IC?', color: '#F4B942', key: 'ic-growth' },
];

function WordReveal({ text, baseDelay = 0, style = {}, accentWord = '' }) {
  const words = text.split(' ');
  return (
    <span style={style}>
      {words.map((word, i) => {
        const clean = word.replace(/[.,!?]$/, '').toLowerCase();
        const isAccent = accentWord && clean === accentWord.toLowerCase();
        return (
          <span
            key={i}
            style={{
              display: 'inline-block',
              opacity: 0,
              transform: 'translateY(18px)',
              animation: `word-in 0.55s cubic-bezier(0.16,1,0.3,1) ${baseDelay + i * 75}ms forwards`,
              ...(isAccent ? { fontStyle: 'italic', color: '#FF7A5C', WebkitTextFillColor: '#FF7A5C' } : {}),
            }}
          >
            {word}{i < words.length - 1 ? '\u00a0' : ''}
          </span>
        );
      })}
    </span>
  );
}

function useTypingPlaceholder(suggestions, active) {
  const [placeholder, setPlaceholder] = useState('');
  const timerRef = useRef(null);

  useEffect(() => {
    if (!active) return;
    let idx = 0;
    let charIdx = 0;
    let deleting = false;

    const tick = () => {
      const current = suggestions[idx].text;
      if (!deleting) {
        charIdx++;
        setPlaceholder(current.slice(0, charIdx));
        if (charIdx === current.length) {
          timerRef.current = setTimeout(() => { deleting = true; tick(); }, 2200);
          return;
        }
      } else {
        charIdx--;
        setPlaceholder(current.slice(0, charIdx));
        if (charIdx === 0) {
          deleting = false;
          idx = (idx + 1) % suggestions.length;
          timerRef.current = setTimeout(tick, 500);
          return;
        }
      }
      timerRef.current = setTimeout(tick, deleting ? 28 : 60);
    };

    timerRef.current = setTimeout(tick, 1400);
    return () => clearTimeout(timerRef.current);
  }, [active]);

  return placeholder;
}

export default function HeroBlock({ blok }) {
  const isMobile = useIsMobile();
  const [query, setQuery] = useState('');
  const [queryChip, setQueryChip] = useState(false);
  const [suggestionKey, setSuggestionKey] = useState('eng-to-pm');
  const [focused, setFocused] = useState(false);
  const [resumeAttached, setResumeAttached] = useState(false);
  const [linkedinConnected, setLinkedinConnected] = useState(false);
  const typewriterRef = useRef(null);
  const openRoles = TOTAL_JOBS;

  function startTypewriter() {
    clearInterval(typewriterRef.current);
    typewriterRef.current = null;
    setQueryChip(false);
    setQuery('');
    let i = 0;
    typewriterRef.current = setInterval(() => {
      i++;
      setQuery(MOCK_QUERY.slice(0, i));
      if (i >= MOCK_QUERY.length) {
        clearInterval(typewriterRef.current);
        typewriterRef.current = null;
        setTimeout(() => setQueryChip(true), 400);
      }
    }, 22);
  }

  function clearSearch() {
    clearInterval(typewriterRef.current);
    typewriterRef.current = null;
    setQuery('');
    setQueryChip(false);
  }

  useEffect(() => () => clearInterval(typewriterRef.current), []);
  const headlineSize = isMobile ? '48px' : (HEADLINE_SIZES[blok?.headline_size] || '96px');
  const subheadlineSize = isMobile ? '36px' : (SUBHEADLINE_SIZES[blok?.subheadline_size] || '72px');
  const hudLocation = blok?.hud_location || 'PULSE / 2026  ·  LIVE FROM LISBON HQ  ·  38.72°N  ·  9.14°W';

  const typedPlaceholder = useTypingPlaceholder(SUGGESTIONS, !query && !focused);
  const displayPlaceholder = query || focused
    ? 'Search roles, teams, skills…'
    : (typedPlaceholder || 'Search roles, teams, skills…');

  return (
    <section
      {...storyblokEditable(blok)}
      style={{ position: 'relative', minHeight: isMobile ? '100svh' : '760px', background: '#1a1418', overflow: 'hidden', display: 'flex', alignItems: 'center' }}
    >
      {(blok?.video_asset?.filename || blok?.video_url) && (
        <video autoPlay muted loop playsInline
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(1.05) contrast(1.02)' }}
          src={blok.video_asset?.filename || blok.video_url}
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
      <div style={{ position: 'absolute', top: 22, left: isMobile ? 20 : 48, right: isMobile ? 20 : 48, zIndex: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#F4EDE1' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: isMobile ? 9 : 11, letterSpacing: 2, opacity: 0.9, display: 'flex', alignItems: 'center', gap: 10, overflow: 'hidden' }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#FF7A5C', boxShadow: '0 0 12px #FF7A5C', flexShrink: 0, animation: 'pulse-dot 1.6s ease-in-out infinite' }} />
          {isMobile ? 'PULSE / 2026 · LISBON HQ' : hudLocation}
        </div>
        {!isMobile && (
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1.5, opacity: 0.65, display: 'flex', gap: 14 }}>
            <span>REC 00:02:14</span><span>·</span><span>4K · 24FPS</span>
          </div>
        )}
      </div>

      {/* Main content */}
      <div style={{ position: 'absolute', left: isMobile ? 20 : 48, right: isMobile ? 20 : 48, bottom: isMobile ? 40 : 72, zIndex: 3 }}>
        <div style={{ color: '#F4EDE1' }}>

          {/* Headline — word-by-word reveal */}
          <h1 style={{ margin: '0 0 28px', fontFamily: 'var(--font-display)', fontWeight: 600, lineHeight: 1.05, letterSpacing: '-0.03em', textShadow: '0 2px 40px rgba(26,20,24,0.4)' }}>
            <span style={{ display: 'block', fontSize: headlineSize, marginBottom: '0.08em', overflow: 'hidden' }}>
              <WordReveal text={blok?.headline || 'Find Where You Belong.'} baseDelay={200} accentWord={blok?.headline_accent_word} />
            </span>
            {/* Subheadline animates as one unit to preserve gradient */}
            <span style={{
              display: 'block', fontSize: subheadlineSize, fontStyle: 'italic',
              background: 'linear-gradient(95deg, #FF7A5C 0%, #F4B942 60%, #FFB8A5 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 30px rgba(255,122,92,0.35))',
              opacity: 0,
              animation: 'fade-up 0.7s cubic-bezier(0.16,1,0.3,1) 600ms forwards',
            }}>
              {blok?.subheadline || "Build What's Next."}
            </span>
          </h1>

          {/* Search bar + 247 card */}
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'stretch', gap: 16 }}>

            {/* AI Search card — 80% */}
            <div style={{ flex: isMobile ? '1 1 auto' : '0 0 80%', minWidth: 0 }}>
              <div style={{ background: 'rgba(26,20,24,0.75)', backdropFilter: 'blur(20px)', border: '1px solid rgba(244,237,225,0.12)', borderRadius: 18, padding: 20, height: '100%', boxSizing: 'border-box' }}>
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

                <div
                  tabIndex={0}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  onClick={() => {}}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      if (queryChip) window.location.href = `/jobs?ai=${suggestionKey}`;
                      else startTypewriter();
                    } else if (e.key.length === 1 || e.key === 'Backspace' || e.key === 'Delete') {
                      e.preventDefault();
                      startTypewriter();
                    }
                  }}
                  style={{ padding: '4px 0 12px', cursor: 'text', outline: 'none', minHeight: 28 }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1.5, color: 'rgba(244,237,225,0.45)', flexShrink: 0, textTransform: 'uppercase' }}>Search</span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.5, flex: 1, wordBreak: 'break-word', color: query ? '#F4EDE1' : 'rgba(244,237,225,0.35)' }}>
                      {query || displayPlaceholder}
                      {query && !queryChip && <span style={{ display: 'inline-block', width: 2, height: '1em', background: '#FF7A5C', marginLeft: 2, verticalAlign: 'text-bottom', animation: 'blink-cursor 0.9s step-end infinite' }} />}
                    </span>
                    {queryChip && (
                      <button onClick={clearSearch} style={{ background: 'none', border: 'none', color: 'rgba(244,237,225,0.45)', cursor: 'pointer', padding: '0 2px', fontSize: 20, lineHeight: 1, flexShrink: 0 }}>×</button>
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14, flexWrap: 'nowrap' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1, color: 'rgba(244,237,225,0.4)', textTransform: 'uppercase', flexShrink: 0 }}>TRY:</span>
                  {(isMobile ? SUGGESTIONS.slice(0, 2) : SUGGESTIONS).map(s => (
                    <button key={s.text} onClick={() => { clearInterval(typewriterRef.current); setQuery(s.text); setQueryChip(true); setSuggestionKey(s.key); }} style={{
                      fontFamily: 'var(--font-mono)', fontSize: 10, color: s.color,
                      background: `${s.color}18`, border: `1px solid ${s.color}44`,
                      borderRadius: '99px', padding: '5px 12px', cursor: 'pointer', whiteSpace: 'nowrap',
                      transition: 'background 0.15s', overflow: 'hidden', textOverflow: 'ellipsis',
                      maxWidth: isMobile ? '45%' : 'none',
                    }}>
                      {s.text}
                    </button>
                  ))}
                </div>

                <div style={{ height: 1, background: 'rgba(244,237,225,0.1)', margin: '0 0 14px' }} />

                <div style={{ display: 'flex', alignItems: isMobile ? 'flex-start' : 'center', justifyContent: 'space-between', gap: 8, flexDirection: isMobile ? 'column' : 'row' }}>
                  {!isMobile && (
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button
                        onClick={() => setResumeAttached(true)}
                        style={{
                          fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 0.5,
                          color: resumeAttached ? '#7FD4C1' : 'rgba(244,237,225,0.7)',
                          background: resumeAttached ? 'rgba(127,212,193,0.12)' : 'rgba(244,237,225,0.08)',
                          border: `1px solid ${resumeAttached ? 'rgba(127,212,193,0.35)' : 'rgba(244,237,225,0.12)'}`,
                          borderRadius: '99px', padding: '6px 12px', cursor: resumeAttached ? 'default' : 'pointer',
                          transition: 'all 0.2s',
                        }}
                      >
                        {resumeAttached ? '✓ résumé.pdf' : '⊗ Résumé'}
                      </button>
                      <button
                        onClick={() => setLinkedinConnected(true)}
                        style={{
                          fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 0.5,
                          color: linkedinConnected ? '#7FD4C1' : 'rgba(244,237,225,0.7)',
                          background: linkedinConnected ? 'rgba(127,212,193,0.12)' : 'rgba(244,237,225,0.08)',
                          border: `1px solid ${linkedinConnected ? 'rgba(127,212,193,0.35)' : 'rgba(244,237,225,0.12)'}`,
                          borderRadius: '99px', padding: '6px 12px', cursor: linkedinConnected ? 'default' : 'pointer',
                          display: 'flex', alignItems: 'center', gap: 5, transition: 'all 0.2s',
                        }}
                      >
                        {linkedinConnected
                          ? '✓ LinkedIn connected'
                          : (<><svg width="12" height="12" viewBox="0 0 24 24" fill="#0A66C2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>LinkedIn profile</>)}
                      </button>
                    </div>
                  )}
                  <button
                    onClick={() => {
                      if (queryChip) {
                        window.location.href = `/jobs?ai=${suggestionKey}`;
                      } else {
                        startTypewriter();
                      }
                    }}
                    style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, color: '#2A1F2E', background: 'linear-gradient(135deg, #FF7A5C, #F4B942)', border: 'none', borderRadius: '99px', padding: '9px 18px', cursor: 'pointer', letterSpacing: '-0.01em', alignSelf: isMobile ? 'flex-end' : 'auto' }}>
                    {queryChip ? 'Find my roles' : (blok?.cta_label || 'Ask Pulse')} →
                  </button>
                </div>
              </div>
            </div>

            {/* 247 open roles card */}
            {!isMobile && <div style={{ flex: '1 1 0', minWidth: 0, background: 'rgba(26,20,24,0.55)', backdropFilter: 'blur(16px)', border: '1px solid rgba(244,237,225,0.15)', borderRadius: 16, padding: '16px 18px', color: '#F4EDE1', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1.5, color: '#7FD4C1', marginBottom: 8 }}>◉ LIVE · NOW HIRING</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 12 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 48, fontWeight: 500, lineHeight: 1, letterSpacing: '-0.02em' }}>{openRoles}</span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'rgba(244,237,225,0.55)', fontWeight: 400 }}>open roles</span>
              </div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {DISCIPLINE_CHIPS.map(({ label, count, discipline }) => (
                  <a
                    key={label}
                    href={`/jobs?d=${encodeURIComponent(discipline)}`}
                    style={{
                      fontFamily: 'var(--font-mono)', fontSize: 10, padding: '4px 9px',
                      background: 'rgba(244,237,225,0.12)', borderRadius: '99px',
                      letterSpacing: 0.5, color: '#F4EDE1', textDecoration: 'none',
                      cursor: 'pointer', transition: 'background 0.15s',
                      display: 'inline-block',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(244,237,225,0.22)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(244,237,225,0.12)'; }}
                  >
                    {label} <b style={{ color: '#FF7A5C' }}>{count}</b>
                  </a>
                ))}
              </div>
            </div>}

          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(1.4)} }
        @keyframes blink-cursor { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes word-in { to { opacity:1; transform:translateY(0); } }
        @keyframes fade-up { to { opacity:1; transform:translateY(0); } }
        input::placeholder { color: rgba(244,185,66,0.35); }
      `}</style>
    </section>
  );
}
