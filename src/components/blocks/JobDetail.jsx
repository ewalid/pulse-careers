'use client';
import { useState, useEffect, useRef } from 'react';
import { JOBS, timeAgo } from '@/lib/ats-mock';
import { useIsMobile } from '@/lib/useIsMobile';
import { useSavedJobs } from '@/lib/SavedJobsContext';

const TONE_MAP = {
  coral:  { bg: '#FFD6C8', accent: '#FF7A5C', light: 'rgba(255,122,92,0.08)' },
  amber:  { bg: '#FBE5B4', accent: '#C9901A', light: 'rgba(244,185,66,0.1)' },
  mint:   { bg: '#CFEBE2', accent: '#2A7A6B', light: 'rgba(127,212,193,0.1)' },
  violet: { bg: '#D9CDEA', accent: '#6B4FA8', light: 'rgba(155,127,212,0.1)' },
};

const CHIP_COLORS = {
  'AI & Research': { bg: '#D9CDEA', color: '#6B4FA8' },
  'Engineering':   { bg: '#CFEBE2', color: '#2A7A6B' },
  'Data Science':  { bg: '#FBE5B4', color: '#C9901A' },
  'Design':        { bg: '#CFEBE2', color: '#2A7A6B' },
  'Operations':    { bg: '#FBE5B4', color: '#C9901A' },
};

const PROCESS_STEPS = [
  { label: 'Apply',      duration: '3 min',   color: '#FF7A5C', detail: 'No cover letter. Upload a résumé or paste your LinkedIn. We read every one — your talent partner responds within 24 hours.' },
  { label: 'Intro call', duration: '30 min',  color: '#C9901A', detail: 'A casual call with your talent partner. We\'ll cover your background, what excites you about this role, and answer your questions.' },
  { label: 'Technical',  duration: '90 min',  color: '#2A7A6B', detail: 'A real problem relevant to the role — no whiteboard puzzles. You can use any tools you normally use. We send a prep guide 48 hours before.' },
  { label: 'Team loop',  duration: '4 × 45m', color: '#6B4FA8', detail: 'You\'ll meet 4 people: your future manager, a peer, a cross-functional partner, and a senior leader. Each session has a clear focus.' },
  { label: 'Offer',      duration: '48 hrs',  color: '#FF7A5C', detail: 'If it\'s a fit, you\'ll receive a written offer within 48 hours of your final interview, with full comp breakdown and start date options.' },
];

const DEFAULT_FAQS = [
  { question: 'Do you sponsor visas?', answer: 'Yes — we sponsor EU Blue Cards, work permits, and family reunification visas for most engineering and research roles. Our People Ops team handles the full process and provides an immigration lawyer at no cost to you.' },
  { question: 'How does hybrid work?', answer: 'Hybrid means 3 days in-office per week for most roles, coordinated with your team. Remote roles are fully async-first with one all-hands per quarter in Lisbon or Berlin. We never spring surprise return-to-office mandates.' },
  { question: 'How should I prepare for the technical interview?', answer: 'Your talent partner will send a prep guide 48 hours before. We focus on real problems relevant to the role — no trick questions or whiteboard puzzles. Bring whatever tools you use day-to-day.' },
  { question: 'How often are performance reviews?', answer: 'Twice a year — April and October. Reviews are peer-calibrated and tied to our public levelling framework. Promotions can happen off-cycle for exceptional impact.' },
  { question: 'Is a PhD required?', answer: 'No. About 40% of our Research team hold PhDs; 60% don\'t. We care about your work and thinking, not credentials. All roles list a PhD as "nice to have" at most.' },
];

const DEFAULT_TEAM = [
  { name: 'Priya Ramanathan', role: 'Director, AI Reliability', location: 'Berlin, DE', years: '3 years at Pulse', bio: 'Joined Pulse in 2023 from DeepMind. Priya leads the reliability charter across all foundation model teams and reviews every senior hire personally.', accent_color: 'coral', linkedin_url: '#' },
  { name: 'Jonas Weber', role: 'Talent Partner', location: 'Berlin, DE', years: '5 years at Pulse', bio: 'Jonas has placed 140+ engineers and researchers at Pulse. He\'ll be your first contact and your advocate through the whole process.', accent_color: 'mint', linkedin_url: '#' },
  { name: 'Tomás Silva', role: 'Staff Engineer', location: 'Lisbon, PT', years: '4 years at Pulse', bio: 'Built the evaluation harness that now runs 12,000 checks per model release. Tomás will lead your technical interview.', accent_color: 'amber', linkedin_url: '#' },
];

function parseSalaryRange(salaryStr) {
  const nums = salaryStr.match(/\d+/g);
  if (!nums || nums.length < 2) return { min: 100, max: 200, mid: 150 };
  const min = parseInt(nums[0]);
  const max = parseInt(nums[1]);
  return { min, max, mid: Math.round((min + max) / 2) };
}

function BookmarkIcon({ filled }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
    </svg>
  );
}

function RevealSection({ children, scrollRoot }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }
      },
      { root: scrollRoot?.current ?? null, threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [scrollRoot]);

  return (
    <div ref={ref} style={{ opacity: 0, transform: 'translateY(24px)', transition: 'opacity 0.5s ease, transform 0.5s ease' }}>
      {children}
    </div>
  );
}

function SectionHeader({ label, accent }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
      <div style={{ width: 3, height: 22, borderRadius: 99, background: accent, flexShrink: 0 }} />
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: 'var(--ink3)', textTransform: 'uppercase' }}>{label}</span>
      <div style={{ flex: 1, height: 1, background: 'var(--line2)' }} />
    </div>
  );
}

export default function JobDetail({ job, blok }) {
  const isMobile = useIsMobile();
  const tone = TONE_MAP[job.tone] || TONE_MAP.coral;
  const chipColor = CHIP_COLORS[job.job_category] || CHIP_COLORS['Engineering'];
  const salaryRange = parseSalaryRange(job.salary);
  const leftColRef = useRef(null);

  const [salary, setSalary] = useState(salaryRange.mid);
  const { isSaved, toggleSave } = useSavedJobs();
  const saved = isSaved(job.id);
  const [processStep, setProcessStep] = useState(0);
  const [teamIdx, setTeamIdx] = useState(0);
  const [applicants, setApplicants] = useState(174);
  const [openFaq, setOpenFaq] = useState(0);
  const [applyHover, setApplyHover] = useState(false);

  // Pre-fill job alerts with this job's category + location
  useEffect(() => {
    const t = setTimeout(() => {
      window.dispatchEvent(new CustomEvent('pulsefilters', {
        detail: { disciplines: [job.job_category], locations: [job.location] },
      }));
    }, 300);
    return () => clearTimeout(t);
  }, [job.job_category, job.location]);

  // Animate applicant counter
  useEffect(() => {
    const t = setInterval(() => setApplicants(n => n + 1), 9000);
    return () => clearInterval(t);
  }, []);

  const faqItems = blok?.faq_items?.length ? blok.faq_items : DEFAULT_FAQS;
  const teamMembers = blok?.hiring_team?.length ? blok.hiring_team : DEFAULT_TEAM;
  const benefitsText = blok?.benefits_text || '€3,000 learning · 18wk parental leave · 6wk sabbatical @ y4 · €1,800 home office';
  const officeAddress = blok?.office_address || job.location;
  const officeTransit = blok?.office_transit || '';
  const showCompCalc = blok?.show_comp_calculator !== false;

  const relatedJobs = JOBS.filter(j => j.job_category === job.job_category && j.id !== job.id).slice(0, 3);
  const equity = Math.round(salary * 0.18);
  const signOn = Math.round(salary * 0.12);
  const total = salary + equity + signOn;

  const titleParts = job.title.split(', ');

  // Nav height is ~54px, breadcrumb bar is ~45px
  const splitHeight = isMobile ? 'auto' : 'calc(100vh - 54px)';

  return (
    <div style={{ background: 'var(--paper)', display: isMobile ? 'block' : 'flex', flexDirection: 'column', height: isMobile ? 'auto' : 'calc(100vh - 54px)', overflow: isMobile ? 'visible' : 'hidden' }}>

      {/* Two-column split */}
      <div style={{
        display: isMobile ? 'block' : 'grid',
        gridTemplateColumns: '1fr 340px',
        flex: 1,
        overflow: isMobile ? 'visible' : 'hidden',
        height: isMobile ? 'auto' : '100%',
      }}>

        {/* ── LEFT COLUMN ── */}
        <div ref={leftColRef} style={{
          overflowY: isMobile ? 'visible' : 'auto',
          padding: isMobile ? '24px 20px 64px' : '36px 52px 80px',
        }}>

          {/* Apply card — mobile only, shown above JD */}
          {isMobile && (
            <div style={{ background: 'var(--ink)', borderRadius: 18, padding: '22px 20px', position: 'relative', overflow: 'hidden', marginBottom: 28 }}>
              <div style={{ position: 'absolute', bottom: -30, right: -30, width: 110, height: 110, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,122,92,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: '#7FD4C1', marginBottom: 3, textTransform: 'uppercase' }}>Ready?</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 600, color: 'var(--paper)', letterSpacing: '-0.02em', marginBottom: 6 }}>Apply in<br />3 minutes.</div>
              <p style={{ margin: '0 0 16px', fontFamily: 'var(--font-body)', fontSize: 12, color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>No cover letter. Upload a résumé or paste LinkedIn. We respond within 24 hours.</p>
              <a href={`/jobs/${job.id}/apply`} style={{ width: '100%', padding: '12px', fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600, color: '#fff', background: '#FF7A5C', border: 'none', borderRadius: 10, cursor: 'pointer', marginBottom: 8, display: 'block', textAlign: 'center', textDecoration: 'none' }}>Apply now →</a>
              <div style={{ display: 'flex', gap: 7 }}>
                <button type="button" onClick={() => toggleSave(job.id)} style={{ flex: 1, padding: '8px', fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 500, color: saved ? '#FF7A5C' : 'rgba(255,255,255,0.45)', background: 'rgba(255,255,255,0.07)', border: `1px solid ${saved ? 'rgba(255,122,92,0.4)' : 'rgba(255,255,255,0.1)'}`, borderRadius: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                  <BookmarkIcon filled={saved} /> {saved ? 'Saved' : 'Save'}
                </button>
                <button type="button" style={{ flex: 1, padding: '8px', fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.45)', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                  <ShareIcon /> Share
                </button>
              </div>
            </div>
          )}

          {/* Breadcrumb */}
          <div style={{ marginBottom: 28 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1.5, color: 'var(--ink3)', textTransform: 'uppercase' }}>
              <a href="/jobs" style={{ color: 'var(--ink3)', textDecoration: 'none' }}>Careers</a>
              {' › '}
              <a href={`/jobs?d=${encodeURIComponent(job.job_category)}`} style={{ color: 'var(--ink3)', textDecoration: 'none' }}>{job.job_category}</a>
              {' › '}
              <span style={{ color: 'var(--ink2)' }}>{job.title}</span>
            </span>
          </div>

          {/* JD Header */}
          <div style={{ paddingBottom: 36, borderBottom: '1px solid var(--line2)', marginBottom: 36 }}>
            <h1 style={{
              margin: '0 0 18px',
              fontFamily: 'var(--font-display)',
              fontSize: isMobile ? 34 : 48,
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1.07,
              color: 'var(--ink)',
            }}>
              {titleParts.length > 1 ? (
                <>{titleParts[0]},<br /><span style={{ color: tone.accent }}>{titleParts.slice(1).join(', ')}</span></>
              ) : job.title}
            </h1>

            {/* Chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 18 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1, padding: '4px 10px', borderRadius: 99, background: chipColor.bg, color: chipColor.color, textTransform: 'uppercase' }}>{job.job_category}</span>
              {job.hot && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1, padding: '4px 10px', borderRadius: 99, background: '#FFD6C8', color: '#FF7A5C', textTransform: 'uppercase' }}>● High demand</span>}
              {job.visa_sponsorship && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1, padding: '4px 10px', borderRadius: 99, background: '#CFEBE2', color: '#2A7A6B', textTransform: 'uppercase' }}>✓ Visa sponsorship</span>}
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1, padding: '4px 10px', borderRadius: 99, background: 'var(--paper2)', color: 'var(--ink2)', border: '1px solid var(--line2)', textTransform: 'uppercase' }}>{job.work_mode}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1, padding: '4px 10px', borderRadius: 99, background: 'var(--paper2)', color: 'var(--ink2)', border: '1px solid var(--line2)', textTransform: 'uppercase' }}>{job.seniority_level || job.seniority}</span>
            </div>

            {/* Meta row */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18, marginBottom: 24 }}>
              {[
                { icon: '◎', text: job.location },
                { icon: '◻', text: `${job.contract_type} · ${job.org_size || ''}` },
                { icon: '◷', text: `Posted ${timeAgo(job.publication_date)}` },
                { icon: '◈', text: '42 countries represented' },
              ].map(({ icon, text }) => (
                <span key={text} style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--ink2)', display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span style={{ color: tone.accent, fontSize: 10 }}>{icon}</span> {text}
                </span>
              ))}
            </div>

          </div>

          {/* Combined: Comp Calculator + Applicants + Impact */}
          {showCompCalc && !isMobile && (
            <RevealSection scrollRoot={leftColRef}>
              <div style={{ background: 'var(--ink)', borderRadius: 16, padding: isMobile ? '18px' : '20px 28px', marginBottom: 36, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: 'radial-gradient(circle, rgba(244,185,66,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />
                <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 20 : 0, alignItems: isMobile ? 'stretch' : 'center' }}>

                  {/* Comp section */}
                  <div style={{ flex: '2 1 0', paddingRight: isMobile ? 0 : 28 }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 2, color: '#7FD4C1', marginBottom: 8, textTransform: 'uppercase' }}>Comp calculator</div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 10 }}>
                      <span style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, color: 'var(--paper)', letterSpacing: '-0.02em' }}>€{salary}k</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'rgba(255,255,255,0.3)' }}>base</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'rgba(255,255,255,0.2)', margin: '0 2px' }}>→</span>
                      <span style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, color: '#FF7A5C', letterSpacing: '-0.02em' }}>€{total}k</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'rgba(255,255,255,0.3)' }}>total</span>
                    </div>
                    <div style={{ position: 'relative', height: 20, display: 'flex', alignItems: 'center', marginBottom: 4 }}>
                      <div style={{ position: 'absolute', left: 0, right: 0, height: 3, borderRadius: 99, background: `linear-gradient(90deg, #7FD4C1 0%, #F4B942 ${((salary - salaryRange.min) / (salaryRange.max - salaryRange.min)) * 100}%, rgba(255,255,255,0.1) ${((salary - salaryRange.min) / (salaryRange.max - salaryRange.min)) * 100}%)` }} />
                      <input type="range" min={salaryRange.min} max={salaryRange.max} value={salary} onChange={e => setSalary(Number(e.target.value))} style={{ position: 'relative', width: '100%', appearance: 'none', background: 'transparent', cursor: 'pointer', zIndex: 1 }} />
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      {[
                        { label: 'Equity', value: `€${equity}k`, color: '#7FD4C1' },
                        { label: 'Sign-on', value: `€${signOn}k`, color: '#F4B942' },
                      ].map(({ label, value, color }) => (
                        <div key={label} style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 7, padding: '5px 10px', display: 'flex', gap: 5, alignItems: 'baseline' }}>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>{label}</span>
                          <span style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, color, letterSpacing: '-0.01em' }}>{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {!isMobile && <div style={{ width: 1, alignSelf: 'stretch', background: 'rgba(255,255,255,0.08)', marginRight: 28, flexShrink: 0 }} />}
                  {isMobile && <div style={{ height: 1, background: 'rgba(255,255,255,0.08)' }} />}

                  {/* Applicants section */}
                  <div style={{ flex: '1 1 0', paddingRight: isMobile ? 0 : 28 }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 2, color: '#7FD4C1', marginBottom: 8, textTransform: 'uppercase' }}>Applicants</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 8 }}>
                      <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#FF7A5C', flexShrink: 0, animation: 'pulseAnim 2s infinite' }} />
                      <span style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, color: 'var(--paper)', letterSpacing: '-0.02em' }}>{applicants}</span>
                    </div>
                    <div style={{ height: 3, background: 'rgba(255,255,255,0.1)', borderRadius: 99, overflow: 'hidden', marginBottom: 6 }}>
                      <div style={{ height: '100%', width: '62%', background: 'linear-gradient(90deg, #7FD4C1, #F4B942, #FF7A5C)' }} />
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'rgba(255,255,255,0.35)', letterSpacing: 0.5 }}>2 shortlisted today · 14 days left</div>
                  </div>

                  {!isMobile && <div style={{ width: 1, alignSelf: 'stretch', background: 'rgba(255,255,255,0.08)', marginRight: 28, flexShrink: 0 }} />}
                  {isMobile && <div style={{ height: 1, background: 'rgba(255,255,255,0.08)' }} />}

                  {/* Impact section */}
                  <div style={{ flex: '1 1 0' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 2, color: '#7FD4C1', marginBottom: 8, textTransform: 'uppercase' }}>You'll impact</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 700, color: '#F4B942', letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 6 }}>40M</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'rgba(255,255,255,0.35)', letterSpacing: 0.5 }}>DAILY ACTIVE USERS</div>
                  </div>
                </div>
                <div style={{ marginTop: 16, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.06)', fontFamily: 'var(--font-mono)', fontSize: 9, color: 'rgba(255,255,255,0.18)', letterSpacing: 0.3 }}>{benefitsText}</div>
              </div>
            </RevealSection>
          )}

          {/* Section: The Role */}
          <RevealSection scrollRoot={leftColRef}>
            <div style={{ marginBottom: 40 }}>
              <SectionHeader label="The role" accent={tone.accent} />
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 17, lineHeight: 1.85, color: 'var(--ink2)', margin: 0 }}>
                {job.job_description}
              </p>
            </div>
          </RevealSection>

          {/* Section: What you'll do */}
          <RevealSection scrollRoot={leftColRef}>
            <div style={{ marginBottom: 40 }}>
              <SectionHeader label="What you'll do" accent={tone.accent} />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {(job.responsibilities || []).map((r, i) => (
                  <div key={i} style={{
                    display: 'flex', gap: isMobile ? 16 : 28, alignItems: 'flex-start',
                    padding: '22px 0',
                    borderTop: i > 0 ? '1px solid var(--line2)' : 'none',
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: 13, color: tone.accent,
                      letterSpacing: '-0.01em', flexShrink: 0, minWidth: 28, paddingTop: 2,
                    }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 17, color: 'var(--ink)', lineHeight: 1.6 }}>{r}</span>
                  </div>
                ))}
              </div>
            </div>
          </RevealSection>

          {/* Section: We're looking for */}
          <RevealSection scrollRoot={leftColRef}>
            <div style={{ marginBottom: 40 }}>
              <SectionHeader label="What we're looking for" accent={tone.accent} />
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 32 : 48 }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1.5, color: '#FF7A5C', textTransform: 'uppercase', marginBottom: 20 }}>Must have</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    {(job.must_haves || []).map((r, i) => (
                      <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                        <span style={{ color: '#FF7A5C', fontSize: 16, flexShrink: 0, marginTop: 2, fontWeight: 700 }}>✓</span>
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: 'var(--ink)', lineHeight: 1.55 }}>{r}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1.5, color: '#2A7A6B', textTransform: 'uppercase', marginBottom: 20 }}>Nice to have</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    {(job.nice_to_haves || []).map((r, i) => (
                      <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 3 }}>
                          <circle cx="8" cy="8" r="6.5" stroke="#7FD4C1" strokeWidth="1.5"/>
                        </svg>
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: 'var(--ink)', lineHeight: 1.55 }}>{r}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </RevealSection>

          {/* Process Timeline */}
          <RevealSection scrollRoot={leftColRef}>
            <div style={{ marginBottom: 48, paddingBottom: 40, borderBottom: '1px solid var(--line2)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24, flexWrap: 'wrap', gap: 6 }}>
                <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--ink)' }}>Hiring process</h2>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 1.5, color: 'var(--ink3)', textTransform: 'uppercase' }}>~14 days total · click a step</span>
              </div>

              {/* Step bubbles */}
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10, overflowX: isMobile ? 'auto' : 'visible' }}>
                {PROCESS_STEPS.map((step, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', flex: i < PROCESS_STEPS.length - 1 ? 1 : 'none' }}>
                    <button
                      type="button"
                      onClick={() => setProcessStep(processStep === i ? 0 : i)}
                      style={{
                        width: processStep === i ? 46 : 38,
                        height: processStep === i ? 46 : 38,
                        borderRadius: '50%',
                        border: `2px solid ${i < processStep ? step.color : processStep === i ? step.color : 'var(--line)'}`,
                        background: i < processStep ? step.color : processStep === i ? step.color : 'var(--paper2)',
                        color: i <= processStep ? '#fff' : 'var(--ink2)',
                        cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'all 0.18s',
                        flexShrink: 0,
                        fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700,
                        boxShadow: processStep === i ? `0 4px 14px ${step.color}40` : 'none',
                      }}
                      title={`${step.label} · ${step.duration}`}
                    >
                      {i < processStep ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      ) : (
                        String(i + 1).padStart(2, '0')
                      )}
                    </button>
                    {i < PROCESS_STEPS.length - 1 && (
                      <div style={{ flex: 1, height: 2, background: i < processStep ? tone.accent : 'var(--line)', minWidth: isMobile ? 12 : 0, transition: 'background 0.2s' }} />
                    )}
                  </div>
                ))}
              </div>

              {/* Step labels */}
              <div style={{ display: 'grid', gridTemplateColumns: `repeat(${PROCESS_STEPS.length}, 1fr)`, gap: 4, marginBottom: 16 }}>
                {PROCESS_STEPS.map((step, i) => (
                  <button
                    type="button"
                    key={i}
                    onClick={() => setProcessStep(processStep === i ? 0 : i)}
                    style={{
                      textAlign: i === 0 ? 'left' : i === PROCESS_STEPS.length - 1 ? 'right' : 'center',
                      background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                    }}
                  >
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: isMobile ? 10 : 11, fontWeight: 600, color: processStep === i ? step.color : 'var(--ink2)', marginBottom: 2, transition: 'color 0.15s' }}>
                      {step.label}
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: 'var(--ink3)', letterSpacing: 0.5 }}>{step.duration}</div>
                  </button>
                ))}
              </div>

              {/* Detail card */}
              <div style={{
                padding: '14px 18px', borderRadius: 10,
                background: 'var(--paper2)', border: '1px solid var(--line2)',
                borderLeft: `3px solid ${PROCESS_STEPS[processStep]?.color || tone.accent}`,
                transition: 'border-color 0.2s',
              }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 1, color: PROCESS_STEPS[processStep]?.color, textTransform: 'uppercase', marginBottom: 6 }}>
                  Step {(processStep ?? 0) + 1} · {PROCESS_STEPS[processStep]?.label}
                </div>
                <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--ink2)', lineHeight: 1.65 }}>
                  {PROCESS_STEPS[processStep]?.detail}
                </p>
              </div>
            </div>
          </RevealSection>

          {/* FAQ */}
          <RevealSection scrollRoot={leftColRef}>
            <div style={{ marginBottom: 48 }}>
              <h2 style={{ margin: '0 0 20px', fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--ink)' }}>Common questions</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {faqItems.map((item, i) => {
                  const q = item.question || item.content?.question;
                  const a = item.answer || item.content?.answer;
                  return (
                    <div key={i} style={{
                      borderRadius: 10, overflow: 'hidden',
                      border: openFaq === i ? `1px solid ${tone.accent}35` : '1px solid var(--line2)',
                      background: openFaq === i ? tone.light : 'transparent',
                    }}>
                      <button
                        type="button"
                        onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                        style={{ width: '100%', textAlign: 'left', padding: '13px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, background: 'transparent', border: 'none', cursor: 'pointer' }}
                      >
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{q}</span>
                        <span style={{ width: 20, height: 20, borderRadius: '50%', border: '1.5px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transform: openFaq === i ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s', color: 'var(--ink2)', fontSize: 14 }}>+</span>
                      </button>
                      {openFaq === i && (
                        <div style={{ padding: '0 16px 13px' }}>
                          <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--ink2)', lineHeight: 1.65 }}>{a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </RevealSection>

          {/* Related Roles */}
          {relatedJobs.length > 0 && (
            <RevealSection scrollRoot={leftColRef}>
              <div>
                <div style={{ marginBottom: 18 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 2, color: 'var(--ink3)', textTransform: 'uppercase', marginBottom: 4 }}>§ Related</div>
                  <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--ink)' }}>Also worth a look</h2>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : `repeat(${Math.min(relatedJobs.length, 3)}, 1fr)`, gap: 14 }}>
                  {relatedJobs.map(rj => {
                    const rTone = TONE_MAP[rj.tone] || TONE_MAP.coral;
                    const rChip = CHIP_COLORS[rj.job_category] || CHIP_COLORS['Engineering'];
                    return (
                      <a key={rj.id} href={`/jobs/${rj.id}`} style={{ textDecoration: 'none', display: 'block' }}>
                        <div
                          style={{ padding: '16px', borderRadius: 12, border: '1.5px solid var(--line2)', background: 'var(--paper)', transition: 'box-shadow 0.15s, transform 0.15s' }}
                          onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 8px 24px -4px ${rTone.accent}25`; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                          onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none'; }}
                        >
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, padding: '3px 8px', borderRadius: 6, background: rChip.bg, color: rChip.color, textTransform: 'uppercase', marginBottom: 8, display: 'inline-block' }}>{rj.job_category}</span>
                          <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 600, color: 'var(--ink)', marginBottom: 4, lineHeight: 1.3 }}>{rj.title}</div>
                          <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--ink3)', marginBottom: 10 }}>{rj.location}</div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 600, color: rTone.accent }}>{rj.salary}</span>
                            <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: rTone.accent }}>View →</span>
                          </div>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            </RevealSection>
          )}
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div style={{
          overflowY: isMobile ? 'visible' : 'auto',
          borderLeft: isMobile ? 'none' : '1px solid var(--line2)',
          padding: isMobile ? '0 20px 64px' : '24px 20px',
          display: 'flex', flexDirection: 'column', gap: 14,
          background: 'var(--paper)',
        }}>

          {/* Apply Card — desktop only (mobile version is above JD in left column) */}
          {!isMobile && <div style={{ background: 'var(--ink)', borderRadius: 18, padding: '22px 20px', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
            <div style={{ position: 'absolute', bottom: -30, right: -30, width: 110, height: 110, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,122,92,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: '#7FD4C1', marginBottom: 3, textTransform: 'uppercase' }}>Ready?</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 600, color: 'var(--paper)', letterSpacing: '-0.02em', marginBottom: 6 }}>Apply in<br />3 minutes.</div>
            <p style={{ margin: '0 0 16px', fontFamily: 'var(--font-body)', fontSize: 12, color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>No cover letter. Upload a résumé or paste LinkedIn. We respond within 24 hours.</p>
            <a
              href={`/jobs/${job.id}/apply`}
              onMouseEnter={() => setApplyHover(true)}
              onMouseLeave={() => setApplyHover(false)}
              style={{ width: '100%', padding: '12px', fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600, color: '#fff', background: applyHover ? '#ff6040' : '#FF7A5C', border: 'none', borderRadius: 10, cursor: 'pointer', transition: 'background 0.15s', marginBottom: 8, display: 'block', textAlign: 'center', textDecoration: 'none' }}
            >Apply now →</a>
            <div style={{ display: 'flex', gap: 7 }}>
              <button type="button" onClick={() => toggleSave(job.id)} style={{ flex: 1, padding: '8px', fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 500, color: saved ? '#FF7A5C' : 'rgba(255,255,255,0.45)', background: 'rgba(255,255,255,0.07)', border: `1px solid ${saved ? 'rgba(255,122,92,0.4)' : 'rgba(255,255,255,0.1)'}`, borderRadius: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                <BookmarkIcon filled={saved} /> {saved ? 'Saved' : 'Save'}
              </button>
              <button type="button" style={{ flex: 1, padding: '8px', fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.45)', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                <ShareIcon /> Share
              </button>
            </div>
            <div style={{ marginTop: 12, fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: 1, color: 'rgba(255,255,255,0.2)', textAlign: 'center', textTransform: 'uppercase' }}>~3 min · No cover letter · Response in 24h</div>
          </div>}

          {/* Location Card */}
          <div style={{ borderRadius: 14, border: '1px solid var(--line2)', overflow: 'hidden', background: 'var(--paper)', flexShrink: 0 }}>
            <div style={{ height: 140, background: '#F4EDE1', position: 'relative', overflow: 'hidden' }}>
              <svg width="100%" height="100%" viewBox="0 0 340 140" xmlns="http://www.w3.org/2000/svg">
                {[0,40,80,120,160,200,240,280,320].map(x => <line key={`v${x}`} x1={x} y1={0} x2={x} y2={140} stroke="#E8DFD3" strokeWidth="1"/>)}
                {[0,40,80,120].map(y => <line key={`h${y}`} x1={0} y1={y} x2={340} y2={y} stroke="#E8DFD3" strokeWidth="1"/>)}
                <ellipse cx="280" cy="120" rx="80" ry="50" fill="#C9DCE8" opacity="0.55"/>
                <rect x="25" y="28" width="55" height="36" rx="4" fill="#DDD3C7"/>
                <rect x="100" y="46" width="70" height="28" rx="4" fill="#D5C9BD"/>
                <rect x="185" y="18" width="45" height="55" rx="4" fill="#DDD3C7"/>
                <rect x="44" y="82" width="36" height="44" rx="4" fill="#D5C9BD"/>
                <rect x="130" y="88" width="55" height="32" rx="4" fill="#DDD3C7"/>
                <circle cx="170" cy="70" r="16" fill="rgba(255,122,92,0.15)"/>
                <circle cx="170" cy="70" r="9" fill="#FF7A5C"/>
                <circle cx="170" cy="70" r="3.5" fill="#fff"/>
              </svg>
              <div style={{ position: 'absolute', top: '38%', left: '50%', transform: 'translate(-50%, -100%)', background: 'var(--ink)', color: 'var(--paper)', fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: 1, padding: '3px 7px', borderRadius: 5, whiteSpace: 'nowrap', textTransform: 'uppercase' }}>Pulse HQ</div>
            </div>
            <div style={{ padding: '12px 14px' }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 2 }}>{officeAddress}</div>
              {officeTransit && <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--ink3)', letterSpacing: 0.5, marginBottom: 8 }}>{officeTransit}</div>}
              <div style={{ display: 'flex', gap: 7, marginTop: 8 }}>
                {['Directions', 'Street view'].map(label => (
                  <button key={label} type="button" style={{ flex: 1, padding: '7px', fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 500, color: 'var(--ink2)', background: 'var(--paper2)', border: '1px solid var(--line2)', borderRadius: 7, cursor: 'pointer' }}>{label}</button>
                ))}
              </div>
            </div>
          </div>

          {/* Hiring Team Card */}
          <div style={{ borderRadius: 14, border: '1px solid var(--line2)', padding: '16px', background: 'var(--paper)', flexShrink: 0 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 1.5, color: 'var(--ink3)', textTransform: 'uppercase', marginBottom: 12 }}>Your hiring team</div>
            <div style={{ display: 'flex', gap: 7, marginBottom: 14 }}>
              {teamMembers.map((m, i) => {
                const mTone = TONE_MAP[m.accent_color] || TONE_MAP.coral;
                const initials = (m.name || '').split(' ').map(w => w[0]).slice(0, 2).join('');
                return (
                  <button key={i} type="button" onClick={() => setTeamIdx(i)} style={{ width: 40, height: 40, borderRadius: '50%', background: mTone.bg, border: `2px solid ${teamIdx === i ? mTone.accent : 'transparent'}`, fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, color: mTone.accent, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'border-color 0.15s' }}>{initials}</button>
                );
              })}
            </div>
            {teamMembers[teamIdx] && (() => {
              const m = teamMembers[teamIdx];
              const mTone = TONE_MAP[m.accent_color] || TONE_MAP.coral;
              return (
                <div style={{ padding: '11px 13px', borderRadius: 9, background: 'var(--paper2)', borderLeft: `3px solid ${mTone.accent}`, border: '1px solid var(--line2)' }}>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 2 }}>{m.name}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--ink3)', letterSpacing: 0.5, marginBottom: 7, textTransform: 'uppercase' }}>{m.role} · {m.years}</div>
                  <p style={{ margin: '0 0 10px', fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--ink2)', lineHeight: 1.55 }}>{m.bio}</p>
                  <div style={{ display: 'flex', gap: 7 }}>
                    <button type="button" style={{ flex: 1, padding: '7px', fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 500, color: '#fff', background: mTone.accent, border: `1px solid ${mTone.accent}`, borderRadius: 7, cursor: 'pointer', textAlign: 'center' }}>Message</button>
                    <a href={m.linkedin_url && m.linkedin_url !== '#' ? m.linkedin_url : undefined} onClick={e => { if (!m.linkedin_url || m.linkedin_url === '#') e.preventDefault(); }} style={{ flex: 1, padding: '7px', fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 500, color: 'var(--ink2)', background: 'var(--paper)', border: '1px solid var(--line2)', borderRadius: 7, cursor: 'pointer', textAlign: 'center', textDecoration: 'none', display: 'block' }}>LinkedIn</a>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </div>

      <style>{`
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 18px; height: 18px; border-radius: 50%; background: var(--paper); border: 2px solid #7FD4C1; box-shadow: 0 2px 6px rgba(42,31,46,0.2); cursor: pointer; }
        input[type=range]::-moz-range-thumb { width: 18px; height: 18px; border-radius: 50%; background: var(--paper); border: 2px solid #7FD4C1; box-shadow: 0 2px 6px rgba(42,31,46,0.2); cursor: pointer; }
        @keyframes pulseAnim { 0%, 100% { box-shadow: 0 0 0 3px rgba(255,122,92,0.25); } 50% { box-shadow: 0 0 0 6px rgba(255,122,92,0.08); } }
      `}</style>
    </div>
  );
}
