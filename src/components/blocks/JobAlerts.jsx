'use client';
import { useState, useRef, useEffect } from 'react';
import { storyblokEditable } from '@storyblok/react/rsc';
import { useIsMobile } from '@/lib/useIsMobile';
import { accentHeadline } from '@/lib/accentHeadline';

const CATEGORIES = ['Engineering', 'Data Science', 'AI & Research', 'Operations', 'Design'];
const LOCATIONS = ['Remote EU', 'Lisbon', 'Berlin', 'NYC', 'London', 'Singapore', 'Remote Global'];
const AVATAR_COLORS = ['#FF7A5C', '#F4B942', '#7FD4C1', '#9B7FD4'];

function isValidEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function ChevronDown() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M6 9l6 6 6-6"/>
    </svg>
  );
}

function MultiSelectDropdown({ label, options, selected, onToggle, accent = '#FF7A5C' }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const summary = selected.length === 0
    ? label
    : selected.length === 1
      ? selected[0]
      : `${selected.length} selected`;

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%',
          background: 'rgba(244,237,225,0.06)',
          border: `1px solid ${selected.length > 0 ? accent + '55' : 'rgba(244,237,225,0.12)'}`,
          borderRadius: 14, padding: '12px 18px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          cursor: 'pointer',
          color: selected.length > 0 ? '#F4EDE1' : 'rgba(244,237,225,0.4)',
          fontFamily: 'var(--font-body)', fontSize: 14,
          transition: 'border-color 0.15s',
        }}
      >
        <span>{summary}</span>
        <span style={{ color: 'rgba(244,237,225,0.4)', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s', display: 'flex' }}>
          <ChevronDown />
        </span>
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 6px)', left: 0, right: 0,
          background: '#2A1F2E',
          border: '1px solid rgba(244,237,225,0.15)',
          borderRadius: 14, overflow: 'hidden',
          zIndex: 100,
          boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
          maxHeight: 240, overflowY: 'auto',
        }}>
          {options.map((opt, i) => {
            const active = selected.includes(opt);
            return (
              <button
                key={opt}
                type="button"
                onClick={() => onToggle(opt)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 16px',
                  background: active ? `${accent}18` : 'transparent',
                  border: 'none',
                  borderBottom: i < options.length - 1 ? '1px solid rgba(244,237,225,0.06)' : 'none',
                  cursor: 'pointer', textAlign: 'left',
                  transition: 'background 0.1s',
                }}
              >
                <div style={{
                  width: 16, height: 16, borderRadius: 5, flexShrink: 0,
                  border: `1.5px solid ${active ? accent : 'rgba(244,237,225,0.25)'}`,
                  background: active ? accent : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.1s',
                }}>
                  {active && (
                    <svg width="9" height="9" viewBox="0 0 12 12" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M2 6l3 3 5-5"/>
                    </svg>
                  )}
                </div>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: active ? '#F4EDE1' : 'rgba(244,237,225,0.6)' }}>
                  {opt}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Selected chips */}
      {selected.length > 0 && (
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 10 }}>
          {selected.map(s => (
            <span key={s} style={{
              fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 0.3,
              padding: '4px 10px', borderRadius: 99,
              background: `${accent}22`, border: `1px solid ${accent}44`,
              color: '#F4EDE1',
              display: 'flex', alignItems: 'center', gap: 5,
            }}>
              {s}
              <button
                type="button"
                onClick={() => onToggle(s)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'rgba(244,237,225,0.5)', fontSize: 14, lineHeight: 1,
                  padding: 0, display: 'flex', alignItems: 'center',
                }}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function JobAlerts({ blok }) {
  const isMobile = useIsMobile();
  const [email, setEmail] = useState('');
  const [selectedCats, setSelectedCats] = useState([]);
  const [selectedLocs, setSelectedLocs] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const valid = isValidEmail(email) && selectedCats.length > 0 && selectedLocs.length > 0;

  const toggleCat = (c) => setSelectedCats(p => p.includes(c) ? p.filter(x => x !== c) : [...p, c]);
  const toggleLoc = (l) => setSelectedLocs(p => p.includes(l) ? p.filter(x => x !== l) : [...p, l]);

  const inputStyle = {
    width: '100%', background: 'transparent', border: 'none', outline: 'none',
    fontFamily: 'var(--font-body)', fontSize: 16, fontWeight: 500, color: '#F4EDE1',
    flex: 1,
  };

  const fieldBox = {
    background: 'rgba(244,237,225,0.06)', border: '1px solid rgba(244,237,225,0.12)',
    borderRadius: 14, padding: '14px 18px',
    display: 'flex', alignItems: 'center', gap: 12,
  };

  return (
    <section
      {...storyblokEditable(blok)}
      style={{ position: 'relative', background: '#16121a', overflow: 'hidden', padding: isMobile ? '64px 20px' : '100px 48px' }}
    >
      {/* Background blobs — always visible */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', bottom: '-10%', left: '-8%', width: isMobile ? 360 : 600, height: isMobile ? 360 : 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,122,92,0.35) 0%, transparent 65%)', filter: 'blur(80px)' }} />
        <div style={{ position: 'absolute', top: '-20%', right: '-8%', width: isMobile ? 240 : 400, height: isMobile ? 240 : 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(155,127,212,0.28) 0%, transparent 65%)', filter: 'blur(60px)' }} />
        <div style={{ position: 'absolute', top: '35%', left: '30%', width: isMobile ? 180 : 300, height: isMobile ? 180 : 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(244,185,66,0.22) 0%, transparent 65%)', filter: 'blur(70px)' }} />
      </div>

      <div style={{ maxWidth: 'var(--container)', margin: '0 auto', position: 'relative', zIndex: 2, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.1fr', gap: isMobile ? 48 : 80, alignItems: 'center' }}>

        {/* Left — editorial */}
        <div style={{ color: '#F4EDE1' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 3, color: '#FF7A5C', marginBottom: 24, textTransform: 'uppercase' }}>
            <span
              className="pulse-dot"
              style={{ width: 7, height: 7, borderRadius: 99, background: '#FF7A5C', boxShadow: '0 0 12px #FF7A5C', animation: 'pulse-dot-ring 1.6s ease-in-out infinite', flexShrink: 0 }}
            />
            {blok?.eyebrow || 'Job Alerts'}
          </div>

          <h2 style={{ margin: '0 0 24px', fontFamily: 'var(--font-display)', fontWeight: 600, lineHeight: 1.05, letterSpacing: '-0.03em' }}>
            <span style={{ display: 'block', fontSize: isMobile ? 56 : 80, color: '#F4EDE1' }}>
              {accentHeadline(blok?.headline || 'The role finds', blok?.headline_accent_word)}
            </span>
            <span style={{ display: 'block', fontSize: isMobile ? 56 : 80, fontStyle: 'italic', background: 'linear-gradient(95deg, #FF7A5C, #F4B942)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {blok?.headline_emphasis || 'you.'}
            </span>
          </h2>

          <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.65, color: 'rgba(244,237,225,0.7)', maxWidth: 420, margin: '0 0 36px' }}>
            {blok?.body_text || "Tell us what matters. We'll ping you the moment a role opens that actually fits — no weekly digest spam, no expired listings."}
          </p>

          {/* Trust badges */}
          <div style={{ display: 'flex', gap: isMobile ? 18 : 32, marginBottom: 40, flexWrap: 'wrap' }}>
            {[
              { dot: '#7FD4C1', label: 'No spam', sub: 'One email per match' },
              { dot: '#F4B942', label: 'Unsubscribe anytime', sub: 'One-click, always' },
              { dot: '#FF7A5C', label: 'GDPR compliant', sub: 'EU-hosted data' },
            ].map(b => (
              <div key={b.label}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 4 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: b.dot, boxShadow: `0 0 8px ${b.dot}`, flexShrink: 0 }} />
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, color: '#F4EDE1' }}>{b.label}</span>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(244,237,225,0.45)', letterSpacing: 0.5, paddingLeft: 15 }}>{b.sub}</div>
              </div>
            ))}
          </div>

          {/* Subscriber count */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ display: 'flex' }}>
              {AVATAR_COLORS.map((c, i) => (
                <div key={i} style={{ width: 32, height: 32, borderRadius: '50%', background: c, border: '2px solid #16121a', marginLeft: i === 0 ? 0 : -10 }} />
              ))}
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600, color: '#FF7A5C' }}>
                {blok?.subscribers_count || '12,400+'} <span style={{ color: '#F4EDE1' }}>people subscribed</span>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(244,237,225,0.45)', letterSpacing: 1, marginTop: 3 }}>
                AVG TIME-TO-MATCH: 8 DAYS
              </div>
            </div>
          </div>
        </div>

        {/* Right — form card with conic glow ring (desktop only) */}
        <div style={{ position: 'relative' }}>
          {/* Conic-gradient glow ring — desktop only, sibling rendered first */}
          {!isMobile && (
            <div
              className="ai-ring-glow"
              style={{
                position: 'absolute',
                inset: -3,
                borderRadius: 24,
                background: `conic-gradient(from 0deg, #E8805F, #E8B14B, #7A5BA8, #8BB996, #E8805F)`,
                opacity: 0.55,
                filter: 'blur(14px)',
                animation: 'ai-ring 10s linear infinite',
                pointerEvents: 'none',
              }}
            />
          )}

          {/* Card — renders on top */}
          <div style={{
            position: 'relative',
            background: 'rgba(42,31,46,0.9)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            borderRadius: 22,
            padding: isMobile ? 24 : '40px 42px',
            border: '1px solid rgba(244,237,225,0.12)',
            boxShadow: '0 40px 100px -20px rgba(0,0,0,0.8), inset 0 1px 0 rgba(244,237,225,0.08)',
          }}>

            {/* Card header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
              <div style={{ width: 52, height: 52, borderRadius: 16, background: 'linear-gradient(135deg, #FF7A5C, #F4B942)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2A1F2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600, color: '#F4EDE1', letterSpacing: '-0.02em' }}>Create a job alert</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(244,237,225,0.45)', letterSpacing: 1.5, marginTop: 4 }}>TAKES 20 SECONDS</div>
              </div>
            </div>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 0', color: '#F4EDE1' }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>✓</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 600, marginBottom: 8 }}>You're in.</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'rgba(244,237,225,0.6)' }}>We'll email you at {email} when a match appears.</div>
              </div>
            ) : (
              <>
                {/* Email field */}
                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1.5, color: 'rgba(244,237,225,0.45)', marginBottom: 10 }}>① YOUR EMAIL</div>
                  <div style={{ ...fieldBox, borderColor: isValidEmail(email) ? 'rgba(127,212,193,0.4)' : 'rgba(244,237,225,0.12)' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF7A5C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                      <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                    </svg>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      style={{ ...inputStyle }}
                    />
                    {isValidEmail(email) && (
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#7FD4C1', letterSpacing: 1, display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0 }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#7FD4C1' }} />
                        VALID
                      </span>
                    )}
                  </div>
                </div>

                {/* Job category — multi-select chips */}
                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1.5, color: 'rgba(244,237,225,0.45)', marginBottom: 12 }}>
                    ② JOB CATEGORY
                    {selectedCats.length > 0 && (
                      <span style={{ marginLeft: 8, color: '#FF7A5C' }}>{selectedCats.length} selected</span>
                    )}
                  </div>
                  <MultiSelectDropdown label="Select categories…" options={CATEGORIES} selected={selectedCats} onToggle={toggleCat} accent="#FF7A5C" />
                </div>

                {/* Location — multi-select chips */}
                <div style={{ marginBottom: 28 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1.5, color: 'rgba(244,237,225,0.45)', marginBottom: 12 }}>
                    ③ LOCATION
                    {selectedLocs.length > 0 && (
                      <span style={{ marginLeft: 8, color: '#F4B942' }}>{selectedLocs.length} selected</span>
                    )}
                  </div>
                  <MultiSelectDropdown label="Select locations…" options={LOCATIONS} selected={selectedLocs} onToggle={toggleLoc} accent="#F4B942" />
                </div>

                {/* CTA */}
                <button
                  onClick={() => valid && setSubmitted(true)}
                  style={{
                    width: '100%', padding: '18px', borderRadius: 14, border: 'none', cursor: valid ? 'pointer' : 'not-allowed',
                    background: valid ? 'linear-gradient(135deg, #FF7A5C 0%, #F4B942 100%)' : 'rgba(244,237,225,0.1)',
                    fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600, letterSpacing: '-0.01em',
                    color: valid ? '#2A1F2E' : 'rgba(244,237,225,0.3)',
                    transition: 'all 0.2s', marginBottom: 14,
                  }}
                  onMouseEnter={e => { if (valid) e.currentTarget.style.transform = 'scale(1.01)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
                >
                  {blok?.cta_label || 'Start my alert'} →
                </button>

                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(244,237,225,0.35)', textAlign: 'center', letterSpacing: 0.3, margin: 0 }}>
                  By subscribing, you accept our{' '}
                  <a href="#" style={{ color: 'rgba(244,237,225,0.55)', textDecorationLine: 'underline' }}>privacy policy</a>
                  {' '}· we'll never share your email
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes ai-ring {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulse-dot-ring {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(232,128,95,0.6), 0 0 12px #E8805F;
          }
          50% {
            transform: scale(1.15);
            box-shadow: 0 0 0 3px rgba(42,31,46,0.9), 0 0 24px #E8805F;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .ai-ring-glow, .pulse-dot { animation: none !important; }
        }
        input[type=email]::placeholder { color: rgba(244,237,225,0.25); }
      `}</style>
    </section>
  );
}
