'use client';
import { useState } from 'react';
import { storyblokEditable } from '@storyblok/react/rsc';
import { useIsMobile } from '@/lib/useIsMobile';
import { accentHeadline } from '@/lib/accentHeadline';
import { TOTAL_JOBS } from '@/lib/ats-mock';

export default function JobsSearch({ blok, onSearch }) {
  const isMobile = useIsMobile();
  const [query, setQuery] = useState('');

  const eyebrow = blok?.eyebrow || 'CAREERS  ›  OPEN ROLES';
  const headline = blok?.headline || `${TOTAL_JOBS} open roles.`;
  const subline = blok?.subline || 'Find yours in under a minute.';
  const accentWord = blok?.headline_accent_word || '';
  const rawTags = blok?.popular_tags || 'ML Engineer\nStaff+\nRemote EMEA\nInternship\nNew grad';
  const tags = rawTags.split('\n').map(t => t.trim()).filter(Boolean);

  function handleSearch(q) {
    setQuery(q);
    onSearch?.(q);
  }

  return (
    <div
      {...storyblokEditable(blok)}
      style={{
        background: 'var(--paper2)',
        borderBottom: '1px solid var(--line2)',
        padding: isMobile ? '28px 20px' : '32px 48px',
      }}
    >
      <div style={{ maxWidth: 'var(--container)', margin: '0 auto' }}>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink3)',
          letterSpacing: 1.5, marginBottom: 16, textTransform: 'uppercase',
        }}>
          {eyebrow}
        </div>

        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'flex-end',
          justifyContent: 'space-between',
          gap: isMobile ? 24 : 40,
        }}>
          {/* Left: headline */}
          <div>
            <h1 style={{
              margin: 0,
              fontFamily: 'var(--font-display)',
              fontSize: isMobile ? 36 : 52,
              fontWeight: 600,
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              color: 'var(--ink)',
            }}>
              {accentHeadline(headline, accentWord)}
              {subline && (
                <>
                  <br />
                  <span style={{ color: 'var(--ink3)' }}>{subline}</span>
                </>
              )}
            </h1>
          </div>

          {/* Right: search */}
          <div style={{ flex: isMobile ? '1 1 auto' : '0 0 520px', width: isMobile ? '100%' : undefined }}>
            <div style={{
              display: 'flex',
              background: 'var(--paper)',
              borderRadius: 99,
              border: '1px solid var(--line)',
              padding: 5,
              alignItems: 'center',
              boxShadow: '0 6px 20px -12px rgba(42,31,46,0.15)',
            }}>
              <div style={{ padding: '0 14px', color: 'var(--ink3)', display: 'flex', alignItems: 'center' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
              </div>
              <input
                type="text"
                value={query}
                onChange={e => handleSearch(e.target.value)}
                placeholder="Search roles, teams, skills…"
                style={{
                  flex: 1, border: 'none', outline: 'none', background: 'transparent',
                  fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--ink)',
                  padding: '12px 0',
                }}
              />
              <button
                onClick={() => onSearch?.(query)}
                style={{
                  fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600,
                  color: 'var(--paper)', background: 'var(--ink)',
                  border: 'none', borderRadius: 99, padding: '9px 18px',
                  cursor: 'pointer', letterSpacing: '-0.01em', flexShrink: 0,
                }}
              >
                Search
              </button>
            </div>

            <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink3)',
                letterSpacing: 1, textTransform: 'uppercase', marginRight: 4,
              }}>
                POPULAR:
              </span>
              {tags.map(tag => (
                <button
                  key={tag}
                  onClick={() => handleSearch(tag)}
                  style={{
                    background: 'transparent', border: '1px solid var(--line)',
                    padding: '4px 11px', borderRadius: 99, fontSize: 11,
                    color: 'var(--ink2)', cursor: 'pointer',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
