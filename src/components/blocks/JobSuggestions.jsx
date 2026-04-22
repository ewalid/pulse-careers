'use client';
import { storyblokEditable } from '@storyblok/react/rsc';
import { JOBS, timeAgo } from '@/lib/ats-mock';
import { useIsMobile } from '@/lib/useIsMobile';
import { accentHeadline } from '@/lib/accentHeadline';
import { resolveLink } from '@/lib/resolveLink';
import { useSavedJobs } from '@/lib/SavedJobsContext';

const TONE_MAP = {
  coral:  { bg: '#FFD6C8', stripe: 'rgba(255,122,92,0.2)', accent: '#FF7A5C',  btn: '#FF7A5C',  btnText: '#fff' },
  amber:  { bg: '#FBE5B4', stripe: 'rgba(244,185,66,0.3)', accent: '#C9901A',  btn: '#2A1F2E',  btnText: '#F4EDE1' },
  mint:   { bg: '#CFEBE2', stripe: 'rgba(127,212,193,0.4)', accent: '#2A7A6B', btn: '#2A1F2E',  btnText: '#F4EDE1' },
  violet: { bg: '#D9CDEA', stripe: 'rgba(155,127,212,0.3)', accent: '#6B4FA8', btn: '#2A1F2E',  btnText: '#F4EDE1' },
};

// Editorial picks — job data comes from JOBS, editorial metadata is curated here
const EDITORIAL_PICKS = [
  {
    jobId: 'job-001',
    tone: 'coral',
    badge: { icon: '★', label: 'PICK OF THE WEEK', dark: false },
    status: { icon: '●', color: '#FF7A5C', label: 'TALENT TEAM PICK', detail: 'HAND-SELECTED THIS WEEK' },
    metric: { type: 'views', value: '1,240', label: 'VIEWS THIS WEEK' },
    salary: '€200–320k',
    work_mode: 'Hybrid',
  },
  {
    jobId: 'job-005',
    tone: 'amber',
    badge: null,
    status: { icon: '▲', color: '#C9901A', label: 'TRENDING', detail: 'IN DESIGN · LAST 7 DAYS' },
    metric: { type: 'trending', value: '340%', label: 'VS. LAST WEEK' },
    salary: '€95–140k',
    work_mode: 'Hybrid',
  },
  {
    jobId: 'job-006',
    tone: 'mint',
    badge: { icon: '●', label: 'CLOSING SOON', dark: true },
    status: { icon: '◉', color: '#2A7A6B', label: 'CLOSING SOON', detail: 'APPLICATIONS CLOSE FRIDAY' },
    metric: { type: 'countdown', value: '4', unit: 'days', label: 'LEFT TO APPLY' },
    salary: '€170–240k',
    work_mode: 'Remote EU',
  },
];

function BookmarkIcon({ filled }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
    </svg>
  );
}

function EditorialCard({ pick, job }) {
  const tone = TONE_MAP[pick.tone];
  const { isSaved, toggleSave } = useSavedJobs();
  const saved = isSaved(job.id);

  return (
    <div style={{
      background: '#fff',
      border: `1.5px solid ${tone.bg}`,
      borderRadius: 20,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 2px 12px rgba(42,31,46,0.06)',
    }}>
      {/* Tonal color band */}
      <div style={{
        height: 72,
        background: `repeating-linear-gradient(135deg, ${tone.bg} 0 16px, ${tone.stripe} 16px 17px)`,
        flexShrink: 0,
      }} />

      {/* Card body */}
      <div style={{ padding: '18px 20px 20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Category */}
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1.5,
          color: 'var(--ink3)', textTransform: 'uppercase', marginBottom: 10,
        }}>
          {job.job_category}
        </div>

        {/* Title */}
        <div style={{
          fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700,
          color: 'var(--ink)', lineHeight: 1.25, letterSpacing: '-0.01em', marginBottom: 6,
        }}>
          {job.title}
        </div>

        {/* Meta */}
        <div style={{
          fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--ink2)', marginBottom: 14,
        }}>
          {job.job_category} · {job.location} · {pick.work_mode}
        </div>

        {/* Bottom: salary + actions */}
        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.01em' }}>
              {pick.salary}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--ink3)', letterSpacing: 0.5, marginTop: 2, textTransform: 'uppercase' }}>
              POSTED {timeAgo(job.publication_date).toUpperCase()}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button
              onClick={() => toggleSave(job.id)}
              style={{
                width: 36, height: 36, borderRadius: 10,
                border: `1px solid ${saved ? tone.accent : 'var(--line)'}`,
                background: saved ? `${tone.bg}` : 'var(--paper)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
                color: saved ? tone.accent : 'var(--ink2)',
                transition: 'all 0.15s',
              }}
              title={saved ? 'Remove from saved' : 'Save job'}
            >
              <BookmarkIcon filled={saved} />
            </button>
            <a href={`/jobs/${job.id}`} style={{
              fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600,
              color: tone.btnText, background: tone.btn, textDecoration: 'none',
              borderRadius: 99, padding: '9px 18px',
              display: 'flex', alignItems: 'center', gap: 5,
              letterSpacing: '-0.01em',
            }}>
              View →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}


export default function JobSuggestions({ blok }) {
  const isMobile = useIsMobile();

  const headline = blok?.headline || 'Three roles worth a look.';
  const headlineAccent = blok?.headline_accent_word || 'worth a look';
  const subtitle = blok?.subtitle || 'Curated weekly by the talent team · 247 open roles in total';
  const ctaLabel = blok?.cta_label || 'All 247 roles';
  const ctaUrl = resolveLink(blok?.cta_url) || '/jobs';

  const jobsById = Object.fromEntries(JOBS.map(j => [j.id, j]));
  const picks = EDITORIAL_PICKS.map(p => ({ pick: p, job: jobsById[p.jobId] })).filter(({ job }) => !!job);

  return (
    <section
      {...storyblokEditable(blok)}
      style={{
        background: 'var(--paper)',
        borderTop: '1px solid var(--line2)',
        padding: isMobile ? '64px 20px' : '80px 48px',
      }}
    >
      <div style={{ maxWidth: 'var(--container)', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: isMobile ? 'flex-start' : 'flex-end',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? 20 : 0,
          marginBottom: 40,
        }}>
          <div>
            <h2 style={{
              margin: '0 0 10px',
              fontFamily: 'var(--font-display)', fontSize: isMobile ? 36 : 52,
              fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--ink)', lineHeight: 1.05,
            }}>
              {accentHeadline(headline, headlineAccent)}
            </h2>
            <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--ink2)' }}>
              {subtitle}
            </p>
          </div>

          {!isMobile && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
              <a href={ctaUrl} style={{
                fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600,
                color: 'var(--ink)', textDecoration: 'none',
                border: '1.5px solid var(--ink)', borderRadius: 99,
                padding: '9px 20px', whiteSpace: 'nowrap', letterSpacing: '-0.01em',
              }}>
                {ctaLabel} →
              </a>
            </div>
          )}
        </div>

        {/* Cards */}
        {isMobile ? (
          <div style={{ overflowX: 'auto', marginLeft: -20, marginRight: -20, paddingLeft: 20, paddingRight: 20 }}>
            <div style={{ display: 'flex', gap: 16, width: 'max-content', paddingBottom: 4 }}>
              {picks.map(({ pick, job }) => (
                <div key={pick.jobId} style={{ width: 300, flexShrink: 0 }}>
                  <EditorialCard pick={pick} job={job} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 20,
            alignItems: 'start',
          }}>
            {picks.map(({ pick, job }) => (
              <EditorialCard key={pick.jobId} pick={pick} job={job} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
