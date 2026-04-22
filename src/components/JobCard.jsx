'use client';
import { timeAgo } from '@/lib/ats-mock';

export const TONE_COLORS = {
  coral: '#FF7A5C',
  mint: '#7FD4C1',
  amber: '#F4B942',
  violet: '#9B7FD4',
};

function PinIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  );
}

function BookmarkIcon({ filled }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
    </svg>
  );
}

export default function JobCard({
  job,
  bookmarked,
  onBookmark,
  showSalary = true,
  showDepartment = true,
  showLocation = true,
  allowBookmark = true,
  hovered,
  onHover,
  isMobile,
}) {
  const toneColor = TONE_COLORS[job.tone] || TONE_COLORS.coral;

  return (
    <a
      href={`/jobs/${job.id}`}
      onMouseEnter={() => onHover && onHover(job.id)}
      onMouseLeave={() => onHover && onHover(null)}
      style={{
        background: 'var(--paper)',
        borderWidth: 1, borderStyle: 'solid', borderColor: 'var(--line2)',
        borderRadius: 16, padding: isMobile ? '18px 20px' : '22px 26px',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? 14 : 24,
        alignItems: isMobile ? 'flex-start' : 'center',
        position: 'relative', overflow: 'hidden',
        textDecoration: 'none',
        boxShadow: hovered
          ? '0 12px 40px -8px rgba(42,31,46,0.14), 0 2px 8px rgba(42,31,46,0.06)'
          : '0 1px 3px rgba(42,31,46,0.04)',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'transform 0.22s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.22s ease',
        cursor: 'pointer',
      }}
    >
      <div style={{
        position: 'absolute', inset: 0,
        background: hovered ? `linear-gradient(105deg, ${toneColor}0a 0%, transparent 55%)` : 'none',
        pointerEvents: 'none', transition: 'background 0.2s',
      }} />
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0,
        width: hovered ? 4 : 3,
        background: toneColor,
        opacity: hovered ? 1 : 0.35,
        transition: 'opacity 0.2s, width 0.2s',
      }} />

      {/* Title + meta */}
      <div style={{ position: 'relative', minWidth: 0, flex: 1 }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8, flexWrap: 'wrap' }}>
          {showDepartment && (
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 0.5,
              color: toneColor, background: `${toneColor}18`,
              border: `1px solid ${toneColor}44`,
              padding: '3px 9px', borderRadius: 99,
            }}>
              {job.job_category}
            </span>
          )}
          {job.hot && (
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 10,
              color: '#FF7A5C', background: 'rgba(255,122,92,0.12)',
              border: '1px solid rgba(255,122,92,0.3)',
              padding: '3px 9px', borderRadius: 99,
            }}>
              ● High demand
            </span>
          )}
          {job.new && (
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 10,
              color: '#7FD4C1', background: 'rgba(127,212,193,0.12)',
              border: '1px solid rgba(127,212,193,0.3)',
              padding: '3px 9px', borderRadius: 99,
            }}>
              New · {timeAgo(job.publication_date)}
            </span>
          )}
          {job.match && (
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#FF7A5C', fontWeight: 700, letterSpacing: 1 }}>
              ● {job.match}% MATCH
            </span>
          )}
        </div>

        <div style={{
          fontFamily: 'var(--font-display)', fontSize: isMobile ? 18 : 20, fontWeight: 600,
          letterSpacing: '-0.01em', color: 'var(--ink)', lineHeight: 1.2, marginBottom: 10,
        }}>
          {job.title}
        </div>

        <div style={{ display: 'flex', gap: 14, fontSize: 12, color: 'var(--ink2)', fontFamily: 'var(--font-body)', flexWrap: 'wrap' }}>
          {showLocation && (
            <span style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
              <PinIcon /> {job.location}
            </span>
          )}
          <span style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
            <BriefcaseIcon /> {job.contract_type}
          </span>
          <span style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
            <ClockIcon /> Posted {timeAgo(job.publication_date)}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div style={{
        display: 'flex', alignItems: 'center',
        gap: 10,
        width: isMobile ? '100%' : undefined,
        justifyContent: isMobile ? 'space-between' : undefined,
        flexShrink: 0,
      }}>
        {showSalary && (
          <div style={{ textAlign: isMobile ? 'left' : 'right', flexShrink: 0 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink3)', letterSpacing: 1 }}>SALARY</div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600, marginTop: 2, color: 'var(--ink)' }}>
              {job.salary || 'Competitive'}
            </div>
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginLeft: isMobile ? 'auto' : 0 }}>
          {allowBookmark && (
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); onBookmark && onBookmark(job.id); }}
              style={{
                background: 'transparent',
                border: `1px solid ${bookmarked ? toneColor : 'var(--line)'}`,
                color: bookmarked ? toneColor : 'var(--ink2)',
                width: 40, height: 40, borderRadius: 99,
                display: 'grid', placeItems: 'center',
                cursor: 'pointer', flexShrink: 0, transition: 'all 0.15s',
              }}
            >
              <BookmarkIcon filled={bookmarked} />
            </button>
          )}

          <span
            style={{
              fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600,
              color: hovered ? 'var(--ink)' : 'var(--paper)',
              background: hovered ? toneColor : 'var(--ink)',
              borderRadius: 99, padding: '9px 18px',
              letterSpacing: '-0.01em',
              flexShrink: 0, transition: 'all 0.2s', whiteSpace: 'nowrap',
            }}
          >
            View →
          </span>
        </div>
      </div>
    </a>
  );
}
