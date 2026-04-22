'use client';
import { useState, useMemo, useEffect, useRef } from 'react';
import { storyblokEditable } from '@storyblok/react/rsc';
import { useIsMobile } from '@/lib/useIsMobile';
import { JOBS, TOTAL_JOBS, timeAgo } from '@/lib/ats-mock';
import { accentHeadline } from '@/lib/accentHeadline';
import { useSavedJobs } from '@/lib/SavedJobsContext';
import SearchAIBanner from '@/components/SearchAIBanner';
import JobCard, { TONE_COLORS } from '@/components/JobCard';
import { usePersonalization } from '@/lib/usePersonalization';
import { resetProfile } from '@/lib/userProfile';

export const MOCK_QUERY = "5 years as a software engineer, looking to transition into product management or anywhere my engineering background becomes the advantage";

const SUGGESTION_RULES = [
  {
    key: 'eng-to-pm',
    tone: 'violet',
    test: (q) => q.length > 20 && /transition|product.manag|project.manag|program.manag|TPM|moving.into|switch|pivot|leadership.role|manag.*role/i.test(q) && /engineer|eng|software|technical|coding|developer/i.test(q),
    filter: (jobs) => jobs.filter(j => /product manager|program manager|TPM|technical program|solutions engineer/i.test(j.title)).slice(0, 4),
    defaultSuggestion: {
      ai_name: 'Pulse AI',
      tone: 'violet',
      headline: 'Engineering to PM is a high-signal move — and the data backs it.',
      body: "At Pulse, 18% of PM hires in the last two years came from engineering backgrounds. That's not a coincidence — research platform PMs who can read a pull request and a user interview in the same morning are rare. Your five years of engineering gives you two things most PM candidates don't have: a working model of how hard things are to build, and credibility with the engineers you'll depend on. The roles below are the ones where that combination is a genuine competitive advantage, not just a checkbox.",
    },
  },
  {
    key: 'customer-facing',
    tone: 'violet',
    test: (q) => /\b(customer.fac|devrel|developer.rel|solutions.eng|account.man|customer.suc|facing.role|facing\s+or|cs.+looking|master.+looking|tech.+customer)\b/i.test(q)
      || (q.length > 30 && /customer|devrel|developer rel|solutions|account/i.test(q)),
    filter: (jobs) => jobs.filter(j => /solutions|developer rel|devrel|customer success|account manager/i.test(j.title)),
    defaultSuggestion: {
      ai_name: 'Pulse AI',
      tone: 'violet',
      headline: 'Your engineering depth is exactly what customer-facing teams are hiring for.',
      body: "Companies at Pulse's scale don't just want people who can present a demo — they need engineers who can debug a customer's integration live, architect a proof-of-concept on the spot, and speak peer-to-peer with a CTO. Five years of engineering and a CS master's is a rare combination in these roles. Most candidates either have the technical depth without the customer instinct, or the relationship skills without the credibility. The three roles below are the ones where your background is a genuine edge, not just a checkbox.",
    },
  },
  {
    key: 'biotech-pm',
    tone: 'coral',
    test: (q) => /\b(pm|product\s*manager|biotech|clinical|pharma|program\s*manager|tpm)\b/i.test(q),
    filter: (jobs) => jobs.filter(j => /product|program/i.test(j.title)),
    defaultSuggestion: {
      ai_name: 'Pulse AI',
      tone: 'coral',
      headline: 'Your PM experience is valuable — and transferable here.',
      body: 'Biotech PMs bring something rare to AI research: comfort with evidence gates, regulatory rigour, and stakeholder environments where scientists are the decision-makers. Those instincts translate directly to research platform and program management roles at Pulse. The three roles below are the ones where your background gives you the highest signal-to-noise ratio.',
    },
  },
  {
    key: 'lisbon',
    tone: 'mint',
    test: (q) => /\b(lisbon|quarter|this\s*quarter|hiring\s*in)\b/i.test(q),
    filter: (jobs) => jobs.filter(j => j.location === 'Lisbon, PT'),
    defaultSuggestion: {
      ai_name: 'Pulse AI',
      tone: 'mint',
      headline: 'Lisbon is our fastest-growing hub right now.',
      body: 'Three teams have open headcount in Lisbon this quarter, all with relocation packages and most with visa sponsorship. The Lisbon office runs on a hybrid model — 3 days in-office, coordinated by team — and sits 10 minutes from the city centre. Most of the founding engineering team is still here.',
    },
  },
  {
    key: 'ic-growth',
    tone: 'amber',
    test: (q) => /\b(ic|grow|fastest|individual\s*contributor|senior\s*to\s*staff|staff\s*to\s*principal|level\s*up)\b/i.test(q),
    filter: (jobs) => jobs.filter(j => ['Senior', 'Staff', 'Principal'].includes(j.seniority)),
    defaultSuggestion: {
      ai_name: 'Pulse AI',
      tone: 'amber',
      headline: 'IC growth at Pulse is about leverage, not tenure.',
      body: 'The fastest path from Senior to Staff here runs through ownership surface — how much of a system you control and how directly your work influences model quality or user experience. Based on current team structures and open headcount, these tracks offer the clearest IC runway without being pushed into management.',
    },
  },
];

const ALL_DISCIPLINES = ['Engineering', 'AI & Research', 'Data Science', 'Design', 'Operations'];
const ALL_LOCATIONS = ['Lisbon, PT', 'Berlin, DE', 'Remote EU', 'Remote Global', 'London, UK', 'NYC, US'];
const ALL_SENIORITIES = ['Mid', 'Senior', 'Staff', 'Principal', 'Director'];
const ALL_EMPLOYMENT = ['Full-time', 'Contract', 'Internship'];
const SALARY_STEPS = [0, 100000, 120000, 140000, 160000, 180000];
const SALARY_LABELS = ['Any', '€100k+', '€120k+', '€140k+', '€160k+', '€180k+'];

const SALARY_FLOORS_MAP = {
  '€120–150k': 120000, '€140–170k': 140000, '€160–195k': 160000,
  '€165–195k': 165000, '€110–135k': 110000, '€180–210k': 180000,
  '£140–180k': 140000, '$130–155k': 130000, 'Competitive': 0,
};

function FilterIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  );
}

function FilterDropdown({ title, icon, chipColor, opts, selected, onToggle, onClear }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const ref = useRef(null);

  useEffect(() => {
    function onOutside(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }
    function onEsc(e) { if (e.key === 'Escape') { setOpen(false); setQuery(''); } }
    document.addEventListener('mousedown', onOutside);
    document.addEventListener('keydown', onEsc);
    return () => { document.removeEventListener('mousedown', onOutside); document.removeEventListener('keydown', onEsc); };
  }, []);

  function handleToggle(val) { onToggle(val); }

  const visibleOpts = query
    ? opts.filter(o => o.label.toLowerCase().includes(query.toLowerCase()))
    : opts;

  return (
    <div ref={ref} style={{ marginBottom: 10, position: 'relative' }}>
      {/* Trigger */}
      <button
        onClick={() => { setOpen(o => !o); setQuery(''); }}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 8,
          fontFamily: 'var(--font-body)', fontSize: 13,
          background: selected.length ? 'var(--paper)' : 'var(--paper2)',
          borderWidth: 1, borderStyle: 'solid',
          borderColor: open ? chipColor : selected.length ? `${chipColor}70` : 'var(--line)',
          borderRadius: 10, padding: '8px 12px', cursor: 'pointer',
          transition: 'border-color 0.15s, background 0.15s',
          minWidth: 0,
        }}
      >
        <span style={{ color: selected.length ? chipColor : 'var(--ink3)', display: 'flex', flexShrink: 0 }}>{icon}</span>
        <span style={{ flex: 1, color: selected.length ? 'var(--ink)' : 'var(--ink3)', textAlign: 'left', fontWeight: selected.length ? 500 : 400 }}>
          {title}
        </span>
        {selected.length > 0 && (
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700,
            background: chipColor, color: 'var(--paper)',
            borderRadius: 99, padding: '1px 6px', flexShrink: 0, marginRight: 4,
          }}>
            {selected.length}
          </span>
        )}
        <span style={{
          flexShrink: 0, color: 'var(--ink3)',
          transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s',
          display: 'flex', alignItems: 'center',
        }}>
          <ChevronDown />
        </span>
      </button>

      {/* Panel */}
      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0, zIndex: 100,
          background: 'var(--paper)', borderRadius: 12,
          borderWidth: 1, borderStyle: 'solid', borderColor: 'var(--line2)',
          boxShadow: '0 12px 36px rgba(42,31,46,0.13)',
          overflow: 'hidden',
        }}>
          {/* Search row */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8, padding: '9px 12px',
            borderBottom: '1px solid var(--line2)',
          }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              autoFocus
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={`Search ${title.toLowerCase()}...`}
              style={{
                flex: 1, border: 'none', outline: 'none', background: 'transparent',
                fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--ink)',
              }}
            />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--ink3)', letterSpacing: 0.5 }}>ESC</span>
          </div>

          {/* Options list */}
          <div style={{ maxHeight: 220, overflowY: 'auto' }}>
            {visibleOpts.map(o => {
              const checked = selected.includes(o.value);
              return (
                <label key={o.value} onClick={() => handleToggle(o.value)} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '9px 14px', cursor: 'pointer',
                  background: checked ? `${chipColor}10` : 'transparent',
                }}>
                  <span style={{
                    width: 15, height: 15, borderRadius: 4, flexShrink: 0,
                    borderWidth: 1.5, borderStyle: 'solid',
                    borderColor: checked ? chipColor : 'var(--line)',
                    background: checked ? chipColor : 'transparent',
                    display: 'grid', placeItems: 'center',
                    fontSize: 9, fontWeight: 700, color: 'var(--paper)',
                  }}>
                    {checked && '✓'}
                  </span>
                  <span style={{
                    flex: 1, fontFamily: 'var(--font-body)', fontSize: 13,
                    color: checked ? 'var(--ink)' : 'var(--ink2)',
                    fontWeight: checked ? 600 : 400,
                  }}>
                    {o.label}
                  </span>
                  {o.count != null && (
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: 10,
                      color: checked ? chipColor : 'var(--ink3)',
                      fontWeight: checked ? 700 : 400,
                    }}>
                      {o.count}
                    </span>
                  )}
                </label>
              );
            })}
          </div>

          {/* Bottom bar */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '7px 12px', background: 'var(--paper2)',
            borderTop: '1px solid var(--line2)',
          }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--ink3)', letterSpacing: 0.3 }}>
              ↑ ↓ nav &nbsp; ↵ toggle
            </span>
            {selected.length > 0 && (
              <button
                onClick={() => { onClear(); setQuery(''); }}
                style={{
                  fontFamily: 'var(--font-mono)', fontSize: 10, color: chipColor,
                  background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontWeight: 600,
                }}
              >
                Clear ({selected.length})
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function SidebarContent({ disciplines, setDisciplines, locations, setLocations, seniorities, setSeniorities, employment, setEmployment, salaryStep, setSalaryStep }) {
  const disciplineCounts = ALL_DISCIPLINES.reduce((acc, d) => ({ ...acc, [d]: JOBS.filter(j => j.job_category === d).length }), {});
  const locationCounts = ALL_LOCATIONS.reduce((acc, l) => ({ ...acc, [l]: JOBS.filter(j => j.location === l).length }), {});
  const seniorityCounts = ALL_SENIORITIES.reduce((acc, s) => ({ ...acc, [s]: JOBS.filter(j => j.seniority === s).length }), {});
  const employmentCounts = ALL_EMPLOYMENT.reduce((acc, e) => ({ ...acc, [e]: JOBS.filter(j => j.contract_type === e).length }), {});

  function toggle(arr, setArr, val) {
    setArr(prev => prev.includes(val) ? prev.filter(x => x !== val) : [...prev, val]);
  }

  return (
    <>
      <FilterDropdown
        title="Discipline"
        chipColor="#FF7A5C"
        icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>}
        opts={ALL_DISCIPLINES.map(d => ({ value: d, label: d, count: disciplineCounts[d] }))}
        selected={disciplines}
        onToggle={v => toggle(disciplines, setDisciplines, v)}
        onClear={() => setDisciplines([])}
      />
      <FilterDropdown
        title="Location"
        chipColor="#F4B942"
        icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>}
        opts={ALL_LOCATIONS.map(l => ({ value: l, label: l, count: locationCounts[l] || 0 }))}
        selected={locations}
        onToggle={v => toggle(locations, setLocations, v)}
        onClear={() => setLocations([])}
      />
      <FilterDropdown
        title="Seniority"
        chipColor="#9B7FD4"
        icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>}
        opts={ALL_SENIORITIES.map(s => ({ value: s, label: s, count: seniorityCounts[s] || 0 }))}
        selected={seniorities}
        onToggle={v => toggle(seniorities, setSeniorities, v)}
        onClear={() => setSeniorities([])}
      />
      <FilterDropdown
        title="Work type"
        chipColor="#7FD4C1"
        icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>}
        opts={ALL_EMPLOYMENT.map(e => ({ value: e, label: e, count: employmentCounts[e] || 0 }))}
        selected={employment}
        onToggle={v => toggle(employment, setEmployment, v)}
        onClear={() => setEmployment([])}
      />

      <div>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, marginBottom: 10, color: 'var(--ink)' }}>Salary floor</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink2)', marginBottom: 8 }}>
          {SALARY_LABELS[salaryStep]}
        </div>
        <div style={{ position: 'relative', height: 4, background: 'var(--paper3)', borderRadius: 99 }}>
          <div style={{
            position: 'absolute', left: 0,
            width: `${(salaryStep / (SALARY_STEPS.length - 1)) * 100}%`,
            height: '100%', borderRadius: 99,
            background: 'linear-gradient(90deg, #7FD4C1, #FF7A5C)',
          }} />
          <input
            type="range" min={0} max={SALARY_STEPS.length - 1} value={salaryStep}
            onChange={e => setSalaryStep(Number(e.target.value))}
            style={{
              position: 'absolute', inset: 0, width: '100%', opacity: 0,
              cursor: 'pointer', height: '100%', margin: 0,
            }}
          />
          <div style={{
            position: 'absolute',
            left: `${(salaryStep / (SALARY_STEPS.length - 1)) * 100}%`,
            top: '50%', transform: 'translate(-50%, -50%)',
            width: 14, height: 14, borderRadius: 99,
            background: 'var(--paper)', border: '2px solid var(--ink)',
            pointerEvents: 'none',
          }} />
        </div>
      </div>

    </>
  );
}

export default function JobList({ blok }) {
  const isMobile = useIsMobile();
  const { isReturning, topCategory } = usePersonalization();

  const showSalary = blok?.show_salary !== false;
  const showDepartment = blok?.show_department !== false;
  const showLocation = blok?.show_location !== false;
  const allowBookmark = blok?.allow_bookmark !== false;
  const itemsPerPage = Number(blok?.items_per_page) || 8;

  const headline = blok?.headline || `${TOTAL_JOBS} open roles.`;
  const subline = blok?.subline || 'Find yours in under a minute.';
  const accentWord = blok?.headline_accent_word || '';
  const eyebrow = blok?.eyebrow || 'CAREERS  ›  OPEN ROLES';
  const rawTags = blok?.popular_tags || 'ML Engineer\nStaff+\nRemote EMEA\nInternship\nNew grad';
  const popularTags = rawTags.split('\n').map(t => t.trim()).filter(Boolean);

  const [search, setSearch] = useState('');
  const [heroSuggestionKey, setHeroSuggestionKey] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ai = params.get('ai');
    const d = params.get('d');
    const e = params.get('e');
    if (ai) setHeroSuggestionKey(ai);
    if (d) setDisciplines(d.split(',').filter(Boolean));
    if (e) setEmployment(e.split(',').filter(Boolean));
  }, []);

  const [disciplines, setDisciplines] = useState([]);
  const [locations, setLocations] = useState([]);
  const [seniorities, setSeniorities] = useState([]);
  const [employment, setEmployment] = useState([]);
  const [salaryStep, setSalaryStep] = useState(0);
  const [sortBy, setSortBy] = useState('newest');
  const [page, setPage] = useState(1);
  const { isSaved, toggleSave } = useSavedJobs();
  const [hoveredId, setHoveredId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (search) params.set('q', search); else params.delete('q');
    if (disciplines.length) params.set('d', disciplines.join(',')); else params.delete('d');
    if (locations.length) params.set('l', locations.join(',')); else params.delete('l');
    const qs = params.toString();
    window.history.replaceState(null, '', qs ? `?${qs}` : window.location.pathname);
    window.dispatchEvent(new CustomEvent('pulsefilters', { detail: { disciplines, locations } }));
  }, [search, disciplines, locations]);

  const salaryFloor = SALARY_STEPS[salaryStep];

  // Detect if the current search matches a known AI suggestion pattern
  const matchedRule = useMemo(() => {
    if (heroSuggestionKey) return SUGGESTION_RULES.find(r => r.key === heroSuggestionKey) || null;
    if (!search) return null;
    return SUGGESTION_RULES.find(r => r.test(search)) || null;
  }, [search, heroSuggestionKey]);

  // Resolve the AI suggestion: prefer CMS-authored version, fall back to default
  const matchedSuggestion = useMemo(() => {
    if (!matchedRule) return null;
    const cmsSuggestions = blok?.ai_suggestions || [];
    const cms = cmsSuggestions.find(s => {
      const key = s.suggestion_key || s.content?.suggestion_key || '';
      return key === matchedRule.key;
    });
    if (cms) return { ...matchedRule.defaultSuggestion, ...cms, ...cms.content };
    return matchedRule.defaultSuggestion;
  }, [matchedRule, blok]);

  const filtered = useMemo(() => {
    let jobs = JOBS;

    if (matchedRule && (search || heroSuggestionKey)) {
      // AI suggestion mode: use smart filter, ignore normal text search
      jobs = matchedRule.filter(jobs);
    } else if (search) {
      const q = search.toLowerCase();
      jobs = jobs.filter(j => j.title.toLowerCase().includes(q) || j.job_category.toLowerCase().includes(q));
    }

    if (disciplines.length) jobs = jobs.filter(j => disciplines.includes(j.job_category));
    if (locations.length) jobs = jobs.filter(j => locations.includes(j.location));
    if (seniorities.length) jobs = jobs.filter(j => seniorities.includes(j.seniority));
    if (employment.length) jobs = jobs.filter(j => employment.includes(j.contract_type));
    if (salaryFloor > 0) jobs = jobs.filter(j => (SALARY_FLOORS_MAP[j.salary] ?? 0) >= salaryFloor);

    if (sortBy === 'newest') return [...jobs].sort((a, b) => new Date(b.publication_date) - new Date(a.publication_date));
    if (sortBy === 'match') return [...jobs].sort((a, b) => (b.match || 0) - (a.match || 0));
    return jobs;
  }, [search, matchedRule, heroSuggestionKey, disciplines, locations, seniorities, employment, salaryFloor, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const currentPage = Math.min(page, totalPages);
  const pageJobs = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const activeFilterCount = disciplines.length + locations.length + seniorities.length + employment.length + (salaryStep > 0 ? 1 : 0);

  const pinnedJobs = useMemo(() => {
    if (!isReturning || !topCategory || heroSuggestionKey || search || disciplines.length || employment.length) return [];
    return JOBS.filter(j => j.job_category === topCategory).slice(0, 3);
  }, [isReturning, topCategory, heroSuggestionKey, search, disciplines, employment]);

  const activeChips = [
    ...disciplines.map(v => ({ label: v, category: 'DISCIPLINE', color: '#FF7A5C', onRemove: () => { setDisciplines(p => p.filter(x => x !== v)); setPage(1); } })),
    ...locations.map(v => ({ label: v, category: 'LOCATION', color: '#F4B942', onRemove: () => { setLocations(p => p.filter(x => x !== v)); setPage(1); } })),
    ...seniorities.map(v => ({ label: v, category: 'SENIORITY', color: '#9B7FD4', onRemove: () => { setSeniorities(p => p.filter(x => x !== v)); setPage(1); } })),
    ...employment.map(v => ({ label: v, category: 'WORK TYPE', color: '#7FD4C1', onRemove: () => { setEmployment(p => p.filter(x => x !== v)); setPage(1); } })),
    ...(salaryStep > 0 ? [{ label: SALARY_LABELS[salaryStep], category: 'SALARY', color: '#9B7FD4', onRemove: () => { setSalaryStep(0); setPage(1); } }] : []),
  ];

  function handleSearch(q) {
    setSearch(q);
    setHeroSuggestionKey(null);
    setPage(1);
  }

  function handlePageChange(p) {
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const sidebarNode = (
    <SidebarContent
      disciplines={disciplines} setDisciplines={setDisciplines}
      locations={locations} setLocations={setLocations}
      seniorities={seniorities} setSeniorities={setSeniorities}
      employment={employment} setEmployment={setEmployment}
      salaryStep={salaryStep} setSalaryStep={setSalaryStep}
    />
  );

  return (
    <section {...storyblokEditable(blok)} style={{ background: 'var(--paper)' }}>

      {/* Search strip */}
      <div style={{
        background: 'var(--paper2)',
        borderBottom: '1px solid var(--line2)',
        padding: isMobile ? '28px 20px' : '32px 48px',
      }}>
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
              {subline && <><br /><span style={{ color: 'var(--ink3)' }}>{subline}</span></>}
            </h1>

            <div style={{ flex: isMobile ? '1 1 auto' : '0 0 520px', width: isMobile ? '100%' : undefined }}>
              <div style={{
                display: 'flex', background: 'var(--paper)', borderRadius: 99,
                border: '1px solid var(--line)', padding: 5, alignItems: 'center',
                boxShadow: '0 6px 20px -12px rgba(42,31,46,0.15)',
              }}>
                <div style={{ padding: '0 14px', color: 'var(--ink3)', display: 'flex', alignItems: 'center' }}>
                  <SearchIcon />
                </div>
                <input
                  type="text"
                  value={search}
                  placeholder="Search roles, teams, skills…"
                  onChange={e => handleSearch(e.target.value)}
                  style={{
                    flex: 1, border: 'none', outline: 'none', background: 'transparent',
                    fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--ink)', padding: '12px 0',
                  }}
                />
                <button
                  style={{
                    fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600,
                    color: 'var(--paper)', background: 'var(--ink)',
                    border: 'none', borderRadius: 99, padding: '9px 18px',
                    cursor: 'pointer', flexShrink: 0,
                  }}
                >
                  Search
                </button>
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink3)', letterSpacing: 1, textTransform: 'uppercase', marginRight: 4 }}>
                  POPULAR:
                </span>
                {popularTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => handleSearch(tag)}
                    style={{
                      background: 'transparent', border: '1px solid var(--line)',
                      padding: '4px 11px', borderRadius: 99, fontSize: 11,
                      color: 'var(--ink2)', cursor: 'pointer', fontFamily: 'var(--font-body)',
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

      {/* Main layout: sidebar + results */}
      <div style={{ maxWidth: 'var(--container)', margin: '0 auto', display: 'flex' }}>

        {/* Desktop sidebar */}
        {!isMobile && (
          <aside style={{
            width: 280, flexShrink: 0,
            borderRight: '1px solid var(--line2)',
            alignSelf: 'flex-start',
            position: 'sticky',
            top: 0,
          }}><div style={{ padding: '32px 28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
              <FilterIcon />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 1.5, color: 'var(--ink)', textTransform: 'uppercase' }}>
                FILTERS
              </span>
              {activeFilterCount > 0 && (
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: 10, background: '#FF7A5C',
                  color: 'var(--ink)', padding: '2px 7px', borderRadius: 99, marginLeft: 'auto',
                }}>
                  {activeFilterCount}
                </span>
              )}
            </div>
            {sidebarNode}
          </div></aside>
        )}

        {/* Results */}
        <div style={{ flex: 1, minWidth: 0, padding: isMobile ? '24px 20px 48px' : '28px 48px 64px' }}>

          {isMobile && (
            <div style={{ marginBottom: 16 }}>
              <button
                onClick={() => setSidebarOpen(o => !o)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 1,
                  color: 'var(--ink)', background: 'var(--paper2)',
                  border: '1px solid var(--line)', borderRadius: 99,
                  padding: '8px 16px', cursor: 'pointer', textTransform: 'uppercase',
                }}
              >
                <FilterIcon />
                Filters{activeFilterCount > 0 ? ` (${activeFilterCount})` : ''}
              </button>
              {sidebarOpen && (
                <div style={{ marginTop: 12, padding: 20, background: 'var(--paper2)', borderRadius: 16, border: '1px solid var(--line2)' }}>
                  {sidebarNode}
                </div>
              )}
            </div>
          )}

          {/* AI suggestion banner */}
          {matchedSuggestion && (
            <SearchAIBanner query={search} suggestion={matchedSuggestion} />
          )}

          {/* Results header */}
          <div style={{ paddingBottom: 20, borderBottom: '1px solid var(--line2)', marginBottom: 22 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 8 }}>
              <div>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600, color: 'var(--ink)' }}>
                  {filtered.length} {filtered.length === 1 ? 'role' : 'roles'}
                </span>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--ink3)', marginTop: 3 }}>
                  {activeChips.length > 0
                    ? `Filtered from ${JOBS.length} · showing ${sortBy === 'newest' ? 'newest first' : 'best match first'}`
                    : `${JOBS.length} total roles · showing ${sortBy === 'newest' ? 'newest first' : 'best match first'}`
                  }
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink3)', letterSpacing: 1 }}>SORT</span>
                <select
                  value={sortBy}
                  onChange={e => { setSortBy(e.target.value); setPage(1); }}
                  style={{
                    fontFamily: 'var(--font-body)', fontSize: 13, padding: '8px 14px',
                    borderRadius: 99, borderWidth: 1, borderStyle: 'solid', borderColor: 'var(--line)',
                    background: 'var(--paper)', color: 'var(--ink)', cursor: 'pointer',
                    appearance: 'none', paddingRight: 32,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2375687A' stroke-width='2.5'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center',
                  }}
                >
                  <option value="newest">Newest</option>
                  <option value="match">Best match</option>
                </select>
              </div>
            </div>

            {activeChips.length > 0 && (
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center', marginTop: 10 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink3)', letterSpacing: 1, marginRight: 4, whiteSpace: 'nowrap' }}>
                  ACTIVE · {activeChips.length}
                </span>
                {activeChips.map((chip, i) => (
                  <span key={i} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    background: `${chip.color}18`,
                    borderWidth: 1, borderStyle: 'solid', borderColor: `${chip.color}40`,
                    borderRadius: 99, padding: '4px 6px 4px 10px',
                  }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: chip.color, letterSpacing: 0.8, whiteSpace: 'nowrap' }}>
                      {chip.category}
                    </span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600, color: 'var(--ink)', whiteSpace: 'nowrap' }}>
                      {chip.label}
                    </span>
                    <button
                      onClick={chip.onRemove}
                      style={{
                        background: `${chip.color}25`, border: 'none', cursor: 'pointer',
                        color: 'var(--ink)', width: 16, height: 16, borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 12, lineHeight: 1, padding: 0, flexShrink: 0,
                      }}
                    >
                      ×
                    </button>
                  </span>
                ))}
                <button
                  onClick={() => { setDisciplines([]); setLocations([]); setSeniorities([]); setEmployment([]); setSalaryStep(0); setSearch(''); setPage(1); }}
                  style={{
                    fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--ink3)',
                    background: 'none', border: 'none', cursor: 'pointer', padding: '4px 6px',
                    textDecoration: 'underline', textUnderlineOffset: 2,
                  }}
                >
                  Clear all
                </button>
              </div>
            )}
          </div>

          {/* Picked for you — personalized pinned row */}
          {pinnedJobs.length > 0 && (
            <div style={{ background: 'var(--paper2)', border: '1px solid var(--line2)', borderRadius: 16, padding: '20px 20px 16px', marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1.5, color: '#7FD4C1', textTransform: 'uppercase' }}>
                  ◉ Based on your browsing · {topCategory}
                </span>
                <button
                  onClick={() => { resetProfile(); window.location.reload(); }}
                  style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1, color: 'var(--ink3)', background: 'none', border: '1px solid var(--line2)', borderRadius: 99, padding: '3px 10px', cursor: 'pointer' }}
                >
                  ✕ Reset
                </button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {pinnedJobs.map(job => (
                  <JobCard
                    key={job.id}
                    job={job}
                    bookmarked={isSaved(job.id)}
                    onBookmark={toggleSave}
                    showSalary={showSalary}
                    showDepartment={showDepartment}
                    showLocation={showLocation}
                    allowBookmark={allowBookmark}
                    hovered={hoveredId === job.id}
                    onHover={setHoveredId}
                    isMobile={isMobile}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Job cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {pageJobs.length === 0 ? (
              <div style={{ padding: '64px 0', textAlign: 'center', fontFamily: 'var(--font-body)', fontSize: 16, color: 'var(--ink3)' }}>
                No roles match your filters.{' '}
                <button
                  onClick={() => { setSearch(''); setDisciplines([]); setLocations([]); setSeniorities([]); setEmployment([]); setSalaryStep(0); }}
                  style={{ color: '#FF7A5C', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit' }}
                >
                  Clear filters
                </button>
              </div>
            ) : pageJobs.map(job => (
              <JobCard
                key={job.id}
                job={job}
                bookmarked={isSaved(job.id)}
                onBookmark={toggleSave}
                showSalary={showSalary}
                showDepartment={showDepartment}
                showLocation={showLocation}
                allowBookmark={allowBookmark}
                hovered={hoveredId === job.id}
                onHover={setHoveredId}
                isMobile={isMobile}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 32, gap: 8, flexWrap: 'wrap' }}>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                style={{
                  background: 'var(--paper)', border: '1px solid var(--line)',
                  width: 36, height: 36, borderRadius: 99,
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                  opacity: currentPage === 1 ? 0.4 : 1, color: 'var(--ink)',
                  display: 'grid', placeItems: 'center',
                }}
              >
                ←
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                <button
                  key={n}
                  onClick={() => handlePageChange(n)}
                  style={{
                    background: n === currentPage ? 'var(--ink)' : 'transparent',
                    color: n === currentPage ? 'var(--paper)' : 'var(--ink2)',
                    border: n === currentPage ? 'none' : '1px solid var(--line)',
                    width: 36, height: 36, borderRadius: 99,
                    fontFamily: 'var(--font-body)', fontSize: 13, cursor: 'pointer',
                  }}
                >
                  {n}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                style={{
                  background: 'var(--paper)', border: '1px solid var(--line)',
                  width: 36, height: 36, borderRadius: 99,
                  cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                  opacity: currentPage === totalPages ? 0.4 : 1, color: 'var(--ink)',
                  display: 'grid', placeItems: 'center',
                }}
              >
                →
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
