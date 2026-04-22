'use client';
import { useState } from 'react';
import { storyblokEditable } from '@storyblok/react/rsc';
import { useIsMobile } from '@/lib/useIsMobile';
import { resolveLink } from '@/lib/resolveLink';
import { JOBS, JOBS_BY_CATEGORY } from '@/lib/ats-mock';
import { useSavedJobs } from '@/lib/SavedJobsContext';
import JobCard from '@/components/JobCard';

const TONES = {
  coral:  { accent: '#FF7A5C', bgTint: '#FFD6C8' },
  amber:  { accent: '#F4B942', bgTint: '#FBE5B4' },
  mint:   { accent: '#7FD4C1', bgTint: '#CFEBE2' },
  violet: { accent: '#9B7FD4', bgTint: '#D9CDEA' },
};

const DEFAULT_DATA = {
  name: 'Engineering',
  tagline: 'We build tools that other engineers rely on.',
  tone: 'coral',
  stat_1_k: 'Engineers',     stat_1_v: '420',
  stat_2_k: 'Open roles',    stat_2_v: String(JOBS_BY_CATEGORY['Engineering'] || 0),
  stat_3_k: 'Locations',     stat_3_v: '7',
  stat_4_k: 'Services shipped', stat_4_v: '1,240',
  mission_1: 'Pulse Engineering is the load-bearing wall of the company. We build the platforms, pipelines, and primitives that every other team depends on to move fast without breaking the people using our product.',
  mission_2: "We don't chase novelty. We pick boring technology on purpose — then we make it sing. Postgres before graph DBs. HTTP before message buses. Kubernetes only where it earns its keep.",
  mission_3: "We write for the engineer who'll maintain this in 2029. That's usually also us.",
  pull_quote_text: "The day I realized my 2am page count went from twelve a month to zero, I knew we'd built something real.",
  pull_quote_author: 'Wen-Li Chen',
  lead_name: 'Wen-Li Chen', lead_role: 'VP Engineering', lead_tenure: 'Joined 2017',
  lead_bio: 'Previously staff eng at Stripe and MongoDB. Believes the best infra is the kind nobody has to think about.',
  prev_slug: 'design',        prev_name: 'Design',
  next_slug: 'ai-research',   next_name: 'AI & Research',
};

const DEFAULT_WORK_STREAMS = [
  { label: 'Infrastructure', desc: 'Multi-region Kubernetes, 99.99% platform SLO, full IaC via Terraform + Pulumi. Disaster recovery runs monthly — not quarterly.', tech: 'Go · Terraform · Kubernetes · Postgres' },
  { label: 'ML Platform',    desc: 'The training + serving layer behind every ML model at Pulse. From a notebook to prod in under 30 minutes, with automatic rollback.', tech: 'Python · Ray · Triton · Kubernetes · S3' },
  { label: 'iOS & Web',      desc: 'The client apps 40M people use daily. Shared design system, deterministic rendering, 60fps budget enforced in CI.', tech: 'Swift · TypeScript · React · Turbopack' },
  { label: 'Security',       desc: 'Zero-trust internally, quarterly red-team exercises, full audit trail for every production access. SOC2 Type II + ISO 27001.', tech: 'Go · eBPF · OpenFGA · HashiCorp Vault' },
];

const DEFAULT_RITUALS = [
  { k: 'Weekly build log',          v: 'Every team demos. 3 minutes. Worst slide first.' },
  { k: 'No meetings before 10:30',  v: 'Mornings belong to deep work.' },
  { k: 'RFC before PR',             v: 'Every major change starts as a 1-page doc.' },
  { k: 'On-call is paid',           v: '€600/week bonus. Rotated monthly. Never solo.' },
];

const DEFAULT_SHIPS = [
  { year: '2026', title: 'Pulse Compute v3',                  desc: 'Rewrote the scheduler in Rust. Cut p99 latency 43% while tripling throughput.' },
  { year: '2025', title: 'Zero-downtime schema migrations',   desc: 'Every table change ships without a maintenance window. Even the scary ones.' },
  { year: '2025', title: 'Unified observability stack',       desc: 'One query language across logs, metrics, and traces. Debugger went from hours to minutes.' },
  { year: '2024', title: 'SOC2 Type II in 9 months',          desc: 'From zero to audit-complete without hiring a compliance firm. The playbook is open-sourced.' },
];

const DEFAULT_VOICES = [
  { name: 'Priya Ramanathan', role: 'Staff ML Engineer',       tenure: '3rd year', quote: "First place where 'slow down' was a compliment." },
  { name: 'Tomás Ferreira',   role: 'Senior Platform Engineer', tenure: '2nd year', quote: 'The on-call pager has been silent for 40 days. Not by accident.' },
  { name: 'Amaya Osei',       role: 'Security Engineer',        tenure: '1st year', quote: 'They let me rewrite the auth layer in month two. It held.' },
];

const DEFAULT_JOBS = [
  { title: 'Staff ML Engineer — Model Reliability', loc: 'Berlin',    type: 'Full-time · Hybrid',  salary: '€165–195k', tags: 'ML Platform, Rust' },
  { title: 'Senior Platform Engineer',              loc: 'Lisbon',    type: 'Full-time · Hybrid',  salary: '€110–140k', tags: 'Kubernetes, Go' },
  { title: 'iOS Engineer — Design Systems',         loc: 'Remote EU', type: 'Full-time · Remote',  salary: '€95–125k',  tags: 'Swift, SwiftUI' },
  { title: 'Security Engineer — Zero Trust',        loc: 'Berlin',    type: 'Full-time · Hybrid',  salary: '€120–155k', tags: 'eBPF, OpenFGA' },
  { title: 'Staff Database Engineer',               loc: 'Remote EU', type: 'Full-time · Remote',  salary: '€155–185k', tags: 'Postgres, Go' },
];

// Map team names to job_category values in ats-mock
const TEAM_TO_CATEGORY = {
  'Engineering':   'Engineering',
  'AI & Research': 'AI & Research',
  'AI Research':   'AI & Research',
  'Design':        'Design',
  'Data Science':  'Data Science',
  'Operations':    'Operations',
};

export default function TeamDetail({ blok }) {
  const isMobile = useIsMobile();
  const { isSaved, toggleSave } = useSavedJobs();
  const [hoveredId, setHoveredId] = useState(null);

  const name     = blok?.name    || DEFAULT_DATA.name;
  const tagline  = blok?.tagline || DEFAULT_DATA.tagline;
  const toneKey  = blok?.tone    || DEFAULT_DATA.tone;
  const tone     = TONES[toneKey] || TONES.coral;
  const accent   = blok?.accent_color || tone.accent;
  const bgTint   = tone.bgTint;

  const stats = [
    { k: blok?.stat_1_k || DEFAULT_DATA.stat_1_k, v: blok?.stat_1_v || DEFAULT_DATA.stat_1_v },
    { k: blok?.stat_2_k || DEFAULT_DATA.stat_2_k, v: blok?.stat_2_v || DEFAULT_DATA.stat_2_v },
    { k: blok?.stat_3_k || DEFAULT_DATA.stat_3_k, v: blok?.stat_3_v || DEFAULT_DATA.stat_3_v },
    { k: blok?.stat_4_k || DEFAULT_DATA.stat_4_k, v: blok?.stat_4_v || DEFAULT_DATA.stat_4_v },
  ];

  const mission = [
    blok?.mission_1 || DEFAULT_DATA.mission_1,
    blok?.mission_2 || DEFAULT_DATA.mission_2,
    blok?.mission_3 || DEFAULT_DATA.mission_3,
  ].filter(Boolean);

  const pullQuoteText   = blok?.pull_quote_text   || DEFAULT_DATA.pull_quote_text;
  const pullQuoteAuthor = blok?.pull_quote_author || DEFAULT_DATA.pull_quote_author;

  const workStreams = blok?.work_streams?.length ? blok.work_streams : DEFAULT_WORK_STREAMS;
  const rituals    = blok?.rituals?.length       ? blok.rituals      : DEFAULT_RITUALS;
  const ships      = blok?.ships?.length         ? blok.ships        : DEFAULT_SHIPS;
  const voices     = blok?.voices?.length        ? blok.voices       : DEFAULT_VOICES;

  // Use real ATS jobs filtered by this team's category
  const category = TEAM_TO_CATEGORY[name] || name;
  const teamJobs = JOBS.filter(j => j.job_category === category).slice(0, 5);

  const leadName   = blok?.lead_name   || DEFAULT_DATA.lead_name;
  const leadRole   = blok?.lead_role   || DEFAULT_DATA.lead_role;
  const leadTenure = blok?.lead_tenure || DEFAULT_DATA.lead_tenure;
  const leadBio    = blok?.lead_bio    || DEFAULT_DATA.lead_bio;
  const leadAvatarSrc = blok?.lead_avatar?.filename;
  const leadInitials  = leadName.split(' ').map(n => n[0]).join('').slice(0, 2);

  const prevSlug = blok?.prev_slug || DEFAULT_DATA.prev_slug;
  const prevName = blok?.prev_name || DEFAULT_DATA.prev_name;
  const nextSlug = blok?.next_slug || DEFAULT_DATA.next_slug;
  const nextName = blok?.next_name || DEFAULT_DATA.next_name;

  const openCount = stats[1].v;

  return (
    <div {...storyblokEditable(blok)}>

      {/* ==================== HERO ==================== */}
      <section style={{ position: 'relative', backgroundColor: 'var(--paper)', padding: isMobile ? '56px 20px 72px' : '96px 48px 120px', overflow: 'hidden', borderBottom: '1px solid var(--line2)' }}>
        <div style={{ position: 'absolute', top: -100, right: -120, width: 640, height: 640, borderRadius: '50%', background: `radial-gradient(circle, ${bgTint} 0%, transparent 68%)`, opacity: 0.75, filter: 'blur(30px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, background: `repeating-linear-gradient(135deg, transparent 0 24px, ${accent}08 24px 25px)`, opacity: 0.6, pointerEvents: 'none' }} />

        <div style={{ maxWidth: 'var(--container)', margin: '0 auto', position: 'relative' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 2, color: 'var(--ink3)', textTransform: 'uppercase', marginBottom: 28, display: 'flex', gap: 12, alignItems: 'center' }}>
            <a href="/teams" style={{ color: 'var(--ink3)', textDecoration: 'none' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--ink)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--ink3)'}>Teams</a>
            <span style={{ opacity: 0.4 }}>/</span>
            <span style={{ color: accent }}>{name}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: 24, flexWrap: 'wrap', marginBottom: 8 }}>
            <h1 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: isMobile ? 60 : 140, fontWeight: 600, letterSpacing: '-0.04em', color: 'var(--ink)', lineHeight: 0.95 }}>
              {name}
            </h1>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: accent, fontWeight: 600, letterSpacing: 1 }}>● {openCount} OPEN</span>
          </div>

          <p style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? 22 : 32, fontStyle: 'italic', color: 'var(--ink2)', margin: '24px 0 56px', maxWidth: 780, lineHeight: 1.3 }}>
            {tagline}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: 2, background: 'var(--line2)', border: '1px solid var(--line2)', borderRadius: 12, overflow: 'hidden' }}>
            {stats.map((s, i) => (
              <div key={i} style={{ backgroundColor: 'var(--paper)', padding: isMobile ? '20px 18px' : '28px 24px' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? 32 : 44, fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--ink)', lineHeight: 1 }}>{s.v}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1.5, color: 'var(--ink3)', textTransform: 'uppercase', marginTop: 10 }}>{s.k}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== MISSION ==================== */}
      <section style={{ backgroundColor: 'var(--paper2)', padding: isMobile ? '72px 20px' : '120px 48px', borderBottom: '1px solid var(--line2)' }}>
        <div style={{ maxWidth: 'var(--container)', margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '200px 1fr', gap: isMobile ? 24 : 80 }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 2, color: 'var(--ink3)', textTransform: 'uppercase', marginBottom: 10 }}>§ 01</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? 20 : 24, fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.02em' }}>Mission</div>
          </div>
          <div>
            {mission.map((p, i) => (
              <p key={i} style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? 22 : 28, color: 'var(--ink)', lineHeight: 1.35, margin: '0 0 22px', fontWeight: 400, letterSpacing: '-0.01em' }}>
                {p}
              </p>
            ))}
            <figure style={{ margin: '56px 0 0', padding: '32px 36px', backgroundColor: 'var(--paper)', borderLeft: `4px solid ${accent}`, borderRadius: '0 14px 14px 0' }}>
              <blockquote style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? 22 : 28, fontStyle: 'italic', color: 'var(--ink)', lineHeight: 1.3, margin: 0, letterSpacing: '-0.01em' }}>
                "{pullQuoteText}"
              </blockquote>
              <figcaption style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 1.5, color: 'var(--ink3)', textTransform: 'uppercase', marginTop: 20 }}>
                — {pullQuoteAuthor}
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ==================== WORK STREAMS ==================== */}
      <section style={{ backgroundColor: 'var(--paper)', padding: isMobile ? '72px 20px' : '120px 48px' }}>
        <div style={{ maxWidth: 'var(--container)', margin: '0 auto' }}>
          <div style={{ marginBottom: 48 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 2, color: 'var(--ink3)', textTransform: 'uppercase', marginBottom: 10 }}>§ 02 · What we work on</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? 36 : 56, fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--ink)', lineHeight: 1.05, margin: 0, maxWidth: 820 }}>
              Four streams. All shipping.
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: 2, background: 'var(--line2)', border: '1px solid var(--line2)', borderRadius: 14, overflow: 'hidden' }}>
            {workStreams.map((w, i) => {
              const label = w.label || w.content?.label || '';
              const desc  = w.desc  || w.content?.desc  || '';
              const tech  = w.tech  || w.content?.tech  || '';
              return (
                <div key={w._uid || i} style={{ backgroundColor: 'var(--paper)', padding: isMobile ? '28px 24px' : '40px 36px', minHeight: 240, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: accent, fontWeight: 600 }}>{String(i + 1).padStart(2, '0')}</span>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.02em' }}>{label}</span>
                  </div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.55, color: 'var(--ink2)', margin: '0 0 auto', flex: 1 }}>{desc}</p>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 0.5, color: 'var(--ink3)', marginTop: 24, paddingTop: 18, borderTop: '1px solid var(--line2)' }}>{tech}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== HOW WE WORK + LEAD ==================== */}
      <section style={{ backgroundColor: bgTint, padding: isMobile ? '72px 20px' : '120px 48px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: `repeating-linear-gradient(135deg, transparent 0 20px, ${accent}10 20px 21px)`, opacity: 0.5, pointerEvents: 'none' }} />
        <div style={{ maxWidth: 'var(--container)', margin: '0 auto', position: 'relative', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 40 : 64 }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 2, color: 'var(--ink2)', textTransform: 'uppercase', marginBottom: 10, opacity: 0.7 }}>§ 03 · How we work</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? 32 : 44, fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--ink)', lineHeight: 1.05, margin: '0 0 36px' }}>
              Four rituals.
            </h2>
            {rituals.map((r, i) => {
              const rK = r.k || r.content?.k || '';
              const rV = r.v || r.content?.v || '';
              return (
                <div key={r._uid || i} style={{ padding: '22px 0', borderTop: `1px solid ${accent}${i === 0 ? '44' : '22'}` }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? 18 : 20, fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.01em', marginBottom: 6 }}>{rK}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--ink2)', lineHeight: 1.5 }}>{rV}</div>
                </div>
              );
            })}
          </div>

          <div style={{ backgroundColor: 'var(--paper)', borderRadius: 18, padding: isMobile ? 28 : 36, border: '1px solid var(--line2)', alignSelf: 'start', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: `${accent}22`, filter: 'blur(20px)' }} />
            <div style={{ position: 'relative' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: 'var(--ink3)', textTransform: 'uppercase', marginBottom: 24 }}>Team lead</div>
              {leadAvatarSrc ? (
                <img src={leadAvatarSrc} alt={leadName} style={{ width: 108, height: 108, borderRadius: '50%', objectFit: 'cover', marginBottom: 24 }} />
              ) : (
                <div style={{ width: 108, height: 108, borderRadius: '50%', background: `linear-gradient(135deg, ${accent} 0%, ${accent}44 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 44, fontWeight: 700, color: 'var(--paper)', marginBottom: 24, letterSpacing: '-0.04em' }}>
                  {leadInitials}
                </div>
              )}
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 4 }}>{leadName}</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--ink2)', marginBottom: 4 }}>{leadRole}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink3)', marginBottom: 20 }}>{leadTenure}</div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.55, color: 'var(--ink)', margin: 0 }}>{leadBio}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== RECENT SHIPS ==================== */}
      <section style={{ backgroundColor: 'var(--paper)', padding: isMobile ? '72px 20px' : '120px 48px', borderBottom: '1px solid var(--line2)' }}>
        <div style={{ maxWidth: 'var(--container)', margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 2, color: 'var(--ink3)', textTransform: 'uppercase', marginBottom: 10 }}>§ 04 · Recent work</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? 36 : 56, fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--ink)', lineHeight: 1.05, margin: '0 0 48px' }}>
            What we <em style={{ color: accent, fontStyle: 'italic', fontWeight: 600 }}>shipped</em>.
          </h2>
          <div style={{ borderTop: '1px solid var(--line)' }}>
            {ships.map((s, i) => {
              const sYear  = s.year  || s.content?.year  || '';
              const sTitle = s.title || s.content?.title || '';
              const sDesc  = s.desc  || s.content?.desc  || '';
              return (
                <div key={s._uid || i} style={{ display: 'grid', gridTemplateColumns: isMobile ? '60px 1fr' : '120px 1fr 2fr', gap: isMobile ? 20 : 40, padding: isMobile ? '28px 0' : '36px 0', borderBottom: '1px solid var(--line)', alignItems: 'baseline' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--ink3)', letterSpacing: 0.5 }}>{sYear}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? 20 : 26, fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.02em', lineHeight: 1.2 }}>{sTitle}</div>
                  {!isMobile && <div style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--ink2)', lineHeight: 1.55 }}>{sDesc}</div>}
                  {isMobile && <div style={{ gridColumn: '1 / -1', fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--ink2)', lineHeight: 1.55, marginTop: 6 }}>{sDesc}</div>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== VOICES ==================== */}
      <section style={{ backgroundColor: 'var(--paper2)', padding: isMobile ? '72px 20px' : '120px 48px' }}>
        <div style={{ maxWidth: 'var(--container)', margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 2, color: 'var(--ink3)', textTransform: 'uppercase', marginBottom: 10 }}>§ 05 · Voices</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? 36 : 56, fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--ink)', lineHeight: 1.05, margin: '0 0 48px' }}>
            Meet {voices.length} of the team.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 20 }}>
            {voices.map((v, i) => {
              const vName   = v.name   || v.content?.name   || '';
              const vRole   = v.role   || v.content?.role   || '';
              const vTenure = v.tenure || v.content?.tenure || '';
              const vQuote  = v.quote  || v.content?.quote  || '';
              const vInit   = vName.split(' ').map(n => n[0]).join('').slice(0, 2);
              const vAvatarSrc = v.avatar?.filename || v.content?.avatar?.filename;
              return (
                <div key={v._uid || i}
                  style={{ backgroundColor: 'var(--paper)', borderRadius: 16, padding: 28, border: '1px solid var(--line2)', display: 'flex', flexDirection: 'column', minHeight: 260, transition: 'transform 200ms ease, border-color 200ms ease' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = accent + '66'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--line2)'; }}
                >
                  {vAvatarSrc ? (
                    <img src={vAvatarSrc} alt={vName} style={{ width: 60, height: 60, borderRadius: '50%', objectFit: 'cover', marginBottom: 20 }} />
                  ) : (
                    <div style={{ width: 60, height: 60, borderRadius: '50%', background: `linear-gradient(135deg, ${accent} 0%, ${accent}55 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--paper)', marginBottom: 20, letterSpacing: '-0.03em' }}>
                      {vInit}
                    </div>
                  )}
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontStyle: 'italic', color: 'var(--ink)', lineHeight: 1.35, margin: '0 0 auto', letterSpacing: '-0.01em', flex: 1 }}>"{vQuote}"</p>
                  <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--line2)' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.01em' }}>{vName}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink3)', letterSpacing: 0.5, marginTop: 4 }}>{vRole} · {vTenure}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== OPEN ROLES ==================== */}
      <section style={{ backgroundColor: 'var(--paper)', padding: isMobile ? '72px 20px' : '120px 48px', borderTop: '1px solid var(--line2)' }}>
        <div style={{ maxWidth: 'var(--container)', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, marginBottom: 40, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 2, color: 'var(--ink3)', textTransform: 'uppercase', marginBottom: 10 }}>§ 06 · Open roles</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? 36 : 56, fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--ink)', lineHeight: 1.05, margin: 0 }}>
                {teamJobs.length} open in {name}.
              </h2>
            </div>
            <a href={`/jobs?d=${encodeURIComponent(category)}`}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600, color: 'var(--paper)', backgroundColor: 'var(--ink)', padding: '14px 24px', borderRadius: 99, letterSpacing: '-0.01em', textDecoration: 'none', transition: 'transform 200ms ease' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateX(2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateX(0)'}
            >
              See all {name} roles →
            </a>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {teamJobs.map(job => (
              <JobCard
                key={job.id}
                job={job}
                bookmarked={isSaved(job.id)}
                onBookmark={toggleSave}
                showSalary
                showDepartment={false}
                showLocation
                allowBookmark
                hovered={hoveredId === job.id}
                onHover={setHoveredId}
                isMobile={isMobile}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ==================== UP NEXT ==================== */}
      <section style={{ backgroundColor: 'var(--ink)', color: 'var(--paper)', padding: isMobile ? '56px 20px' : '80px 48px' }}>
        <div style={{ maxWidth: 'var(--container)', margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 12 }}>
          <a href={`/teams/${prevSlug}`}
            style={{ padding: isMobile ? 28 : 36, borderRadius: 14, background: 'rgba(244,237,225,0.05)', border: '1px solid rgba(244,237,225,0.1)', display: 'flex', flexDirection: 'column', gap: 12, transition: 'background 200ms ease', textDecoration: 'none' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(244,237,225,0.1)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(244,237,225,0.05)'}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 2, color: 'rgba(244,237,225,0.5)', textTransform: 'uppercase' }}>← Previous team</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? 32 : 44, fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--paper)' }}>{prevName}</div>
          </a>
          <a href={`/teams/${nextSlug}`}
            style={{ padding: isMobile ? 28 : 36, borderRadius: 14, background: 'rgba(244,237,225,0.05)', border: '1px solid rgba(244,237,225,0.1)', display: 'flex', flexDirection: 'column', gap: 12, textAlign: 'right', transition: 'background 200ms ease', textDecoration: 'none' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(244,237,225,0.1)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(244,237,225,0.05)'}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 2, color: 'rgba(244,237,225,0.5)', textTransform: 'uppercase' }}>Next team →</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? 32 : 44, fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--paper)' }}>{nextName}</div>
          </a>
        </div>
      </section>

    </div>
  );
}
