'use client';
import { useState, useEffect } from 'react';

const TONE_MAP = {
  coral:  { bg: '#FFF3EF', border: 'rgba(255,122,92,0.25)', dot: '#FF7A5C', text: '#FF7A5C' },
  mint:   { bg: '#EFF8F5', border: 'rgba(42,122,107,0.2)',  dot: '#2A7A6B', text: '#2A7A6B' },
  amber:  { bg: '#FEF8EC', border: 'rgba(244,185,66,0.3)',  dot: '#C9901A', text: '#C9901A' },
  violet: { bg: '#F3F0F8', border: 'rgba(107,79,168,0.2)',  dot: '#6B4FA8', text: '#6B4FA8' },
};

function SparkleIcon({ color }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.4 2.4-7.4L2 9.4h7.6z"/>
    </svg>
  );
}

function TypingDots({ color }) {
  return (
    <span style={{ display: 'inline-flex', gap: 3, alignItems: 'center', marginLeft: 4 }}>
      {[0, 1, 2].map(i => (
        <span key={i} style={{
          width: 4, height: 4, borderRadius: '50%', background: color,
          animation: `ai-dot 1.2s ease-in-out ${i * 0.2}s infinite`,
          display: 'inline-block',
        }} />
      ))}
    </span>
  );
}

export default function SearchAIBanner({ query, suggestion }) {
  const [visible, setVisible] = useState(false);
  const [showBody, setShowBody] = useState(false);

  const toneKey = suggestion?.tone || 'coral';
  const tone = TONE_MAP[toneKey] || TONE_MAP.coral;
  const aiName = suggestion?.ai_name || suggestion?.content?.ai_name || 'Pulse AI';
  const headline = suggestion?.headline || suggestion?.content?.headline || '';
  const body = suggestion?.body || suggestion?.content?.body || '';

  useEffect(() => {
    setVisible(false);
    setShowBody(false);
    const t1 = setTimeout(() => setVisible(true), 80);
    const t2 = setTimeout(() => setShowBody(true), 600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [query]);

  if (!headline) return null;

  return (
    <div style={{
        background: tone.bg,
        border: `1.5px solid ${tone.border}`,
        borderRadius: 16,
        padding: '18px 22px',
        marginBottom: 28,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(-8px)',
        transition: 'opacity 0.35s ease, transform 0.35s ease',
      }}>
        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <div style={{
            width: 26, height: 26, borderRadius: 8,
            background: tone.dot, display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <SparkleIcon color="#fff" />
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1.5, color: tone.text, textTransform: 'uppercase', fontWeight: 600 }}>
            {aiName}
          </span>
          <div style={{ flex: 1, height: 1, background: tone.border }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--ink3)', letterSpacing: 0.5, textTransform: 'uppercase' }}>
            Responding to: "{query}"
          </span>
        </div>

        {/* Headline */}
        <p style={{
          margin: '0 0 6px',
          fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 600,
          color: 'var(--ink)', letterSpacing: '-0.01em', lineHeight: 1.4,
        }}>
          {headline}
        </p>

        {/* Body */}
        {!showBody ? (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--ink3)' }}>Finding the right roles</span>
            <TypingDots color={tone.dot} />
          </div>
        ) : (
          <p style={{
            margin: 0,
            fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--ink2)',
            lineHeight: 1.65,
            animation: 'ai-body-in 0.4s ease',
          }}>
            {body}
          </p>
        )}
    </div>
  );
}
