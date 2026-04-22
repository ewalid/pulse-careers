'use client';
import { useEffect } from 'react';
import { useSavedJobs } from '@/lib/SavedJobsContext';
import { JOBS, timeAgo } from '@/lib/ats-mock';
import { useIsMobile } from '@/lib/useIsMobile';

const CATEGORY_TONE = {
  'AI & Research': { bg: '#D9CDEA', stripe: 'rgba(155,127,212,0.25)', accent: '#9B7FD4' },
  'Engineering':   { bg: '#FFD6C8', stripe: 'rgba(255,122,92,0.2)',   accent: '#FF7A5C' },
  'Design':        { bg: '#CFEBE2', stripe: 'rgba(127,212,193,0.35)', accent: '#2A7A6B' },
  'Data Science':  { bg: '#FBE5B4', stripe: 'rgba(244,185,66,0.3)',   accent: '#C9901A' },
  'Operations':    { bg: '#CFEBE2', stripe: 'rgba(127,212,193,0.35)', accent: '#2A7A6B' },
};
const DEFAULT_TONE = { bg: '#FFD6C8', stripe: 'rgba(255,122,92,0.2)', accent: '#FF7A5C' };

function XIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  );
}

function BookmarkFilledIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
    </svg>
  );
}

function SavedJobCard({ job }) {
  const { toggleSave } = useSavedJobs();
  const tone = CATEGORY_TONE[job.job_category] || DEFAULT_TONE;

  return (
    <div style={{
      background: '#fff',
      border: `1.5px solid ${tone.bg}`,
      borderRadius: 16,
      overflow: 'hidden',
      flexShrink: 0,
    }}>
      {/* Tonal stripe */}
      <div style={{
        height: 40,
        background: `repeating-linear-gradient(135deg, ${tone.bg} 0 12px, ${tone.stripe} 12px 13px)`,
      }} />

      {/* Body */}
      <div style={{ padding: '14px 16px 16px' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 1.5, color: 'var(--ink3)', textTransform: 'uppercase', marginBottom: 6 }}>
          {job.job_category}
        </div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, color: 'var(--ink)', lineHeight: 1.25, letterSpacing: '-0.01em', marginBottom: 4 }}>
          {job.title}
        </div>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--ink2)', marginBottom: 12 }}>
          {job.location} · {job.work_mode || job.contract_type}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.01em' }}>
              {job.salary}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--ink3)', letterSpacing: 0.5, marginTop: 2, textTransform: 'uppercase' }}>
              {timeAgo(job.publication_date).toUpperCase()}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button
              onClick={() => toggleSave(job.id)}
              title="Remove from saved"
              style={{
                width: 32, height: 32, borderRadius: 8, cursor: 'pointer',
                border: `1px solid ${tone.accent}`,
                background: `${tone.bg}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: tone.accent, transition: 'opacity 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              <BookmarkFilledIcon />
            </button>
            <a
              href={`/jobs/${job.id}`}
              style={{
                fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600,
                color: '#fff', background: 'var(--ink)', textDecoration: 'none',
                borderRadius: 99, padding: '7px 14px',
                display: 'flex', alignItems: 'center', gap: 4,
                letterSpacing: '-0.01em', whiteSpace: 'nowrap',
              }}
            >
              View →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SavedJobsPanel() {
  const { savedIds, isPanelOpen, closePanel } = useSavedJobs();
  const isMobile = useIsMobile();

  const jobsById = Object.fromEntries(JOBS.map(j => [j.id, j]));
  const savedJobs = savedIds.map(id => jobsById[id]).filter(Boolean);

  // Close on Escape
  useEffect(() => {
    if (!isPanelOpen) return;
    const handler = (e) => { if (e.key === 'Escape') closePanel(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isPanelOpen, closePanel]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isPanelOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isPanelOpen]);

  const panelWidth = isMobile ? '100vw' : 420;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closePanel}
        style={{
          position: 'fixed', inset: 0, zIndex: 199,
          background: 'rgba(42,31,46,0.45)',
          backdropFilter: 'blur(3px)',
          opacity: isPanelOpen ? 1 : 0,
          pointerEvents: isPanelOpen ? 'auto' : 'none',
          transition: 'opacity 0.25s ease',
        }}
      />

      {/* Panel */}
      <div
        style={{
          position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 200,
          width: panelWidth,
          background: 'var(--paper)',
          borderLeft: '1px solid var(--line2)',
          display: 'flex', flexDirection: 'column',
          transform: isPanelOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s cubic-bezier(0.32,0,0.17,1)',
          boxShadow: isPanelOpen ? '-12px 0 48px rgba(42,31,46,0.12)' : 'none',
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '20px 24px', borderBottom: '1px solid var(--line2)', flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.02em' }}>
              Saved jobs
            </span>
            {savedJobs.length > 0 && (
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 600,
                background: '#FF7A5C', color: '#fff', borderRadius: 99,
                padding: '2px 8px', letterSpacing: 0.5,
              }}>
                {savedJobs.length}
              </span>
            )}
          </div>
          <button
            onClick={closePanel}
            style={{
              width: 32, height: 32, borderRadius: 8, cursor: 'pointer',
              border: '1px solid var(--line2)', background: 'var(--paper2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--ink3)', transition: 'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--line)'; e.currentTarget.style.color = 'var(--ink)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--paper2)'; e.currentTarget.style.color = 'var(--ink3)'; }}
            aria-label="Close saved jobs"
          >
            <XIcon />
          </button>
        </div>

        {/* Job list */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {savedJobs.length === 0 ? (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, paddingTop: 60, textAlign: 'center' }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--line)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
              </svg>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.02em' }}>
                No saved jobs yet
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--ink3)', maxWidth: 240, lineHeight: 1.5 }}>
                Bookmark roles as you browse and they'll appear here.
              </div>
              <a
                href="/jobs"
                onClick={closePanel}
                style={{
                  marginTop: 8, fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600,
                  color: '#fff', background: 'var(--ink)', textDecoration: 'none',
                  borderRadius: 99, padding: '10px 22px', letterSpacing: '-0.01em',
                }}
              >
                Browse all roles →
              </a>
            </div>
          ) : (
            savedJobs.map(job => <SavedJobCard key={job.id} job={job} />)
          )}
        </div>

        {/* Footer */}
        {savedJobs.length > 0 && (
          <div style={{ padding: '16px 24px', borderTop: '1px solid var(--line2)', flexShrink: 0 }}>
            <a
              href="/jobs"
              onClick={closePanel}
              style={{
                display: 'block', textAlign: 'center',
                fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600,
                color: 'var(--ink)', textDecoration: 'none',
                border: '1.5px solid var(--ink)', borderRadius: 99, padding: '10px 0',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--ink)'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--ink)'; }}
            >
              Browse all roles →
            </a>
          </div>
        )}
      </div>
    </>
  );
}
