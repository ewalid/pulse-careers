'use client';
import { storyblokEditable } from '@storyblok/react/rsc';
import { useIsMobile } from '@/lib/useIsMobile';
import { resolveLink } from '@/lib/resolveLink';

const TONES = {
  coral:  { bg: '#FFD6C8', accent: '#FF7A5C' },
  amber:  { bg: '#FBE5B4', accent: '#F4B942' },
  mint:   { bg: '#CFEBE2', accent: '#7FD4C1' },
  violet: { bg: '#D9CDEA', accent: '#9B7FD4' },
};

const DEFAULT_TEAMS = [
  { slug: 'engineering',  name: 'Engineering',   open_count: 94, tone: 'coral',  tagline: 'We build tools that other engineers rely on.',     disciplines: 'Infra · Platform · ML · iOS · Web · Security',      headcount: 420, summary: 'The load-bearing wall. Platforms, pipelines, primitives — the infra every other team runs on.' },
  { slug: 'ai-research',  name: 'AI & Research', open_count: 47, tone: 'violet', tagline: 'Long-horizon research, applied responsibly.',       disciplines: 'Foundational Models · Applied AI · Safety · Evals', headcount: 180, summary: 'Picks problems that take years, and sees them through. Safety and capabilities at 1:1 headcount.' },
  { slug: 'design',       name: 'Design',        open_count: 27, tone: 'coral',  tagline: 'Design reviews start with how users feel.',         disciplines: 'Product · Brand · Motion · Research · Content',     headcount: 88,  summary: 'Ships systems, not screens. Motion specs, not JPEGs. Craft as product strategy.' },
  { slug: 'data-science', name: 'Data Science',  open_count: 38, tone: 'amber',  tagline: 'Analytics that change decisions, not dashboards.',  disciplines: 'Analytics · Experimentation · Causal · BI',          headcount: 120, summary: "Every analysis changes a decision. If it doesn't, we don't build it." },
  { slug: 'operations',   name: 'Operations',    open_count: 41, tone: 'mint',   tagline: 'The quiet scaffolding. We hold the company.',       disciplines: 'People · Finance · Legal · Supply · Procurement',   headcount: 210, summary: 'People, Finance, Legal, Supply, IT, Procurement. Not a back office — the forward-planning function.' },
];

function TeamCard({ team, index, total, isMobile }) {
  const slug      = team.slug         || team.content?.slug       || `team-${index}`;
  const name      = team.name         || team.content?.name       || 'Team';
  const count     = team.open_count   || team.content?.open_count || 0;
  const toneKey   = team.tone         || team.content?.tone       || 'coral';
  const tagline   = team.tagline      || team.content?.tagline    || '';
  const summary   = team.summary      || team.content?.summary    || '';
  const disciplines = team.disciplines || team.content?.disciplines || '';
  const headcount = team.headcount    || team.content?.headcount  || 0;
  const href      = resolveLink(team.team_url) || `/teams/${slug}`;
  const tone      = TONES[toneKey] || TONES.coral;
  const isFeatured = index === 0;

  return (
    <a
      {...storyblokEditable(team)}
      href={href}
      style={{
        gridColumn: !isMobile && isFeatured ? '1 / -1' : 'auto',
        position: 'relative', overflow: 'hidden',
        borderRadius: 20, border: '1px solid var(--line2)',
        backgroundColor: 'var(--paper)',
        padding: isMobile ? 28 : (isFeatured ? 48 : 36),
        display: 'flex', flexDirection: 'column',
        minHeight: isFeatured ? 360 : 320,
        transition: 'transform 220ms ease, border-color 220ms ease, box-shadow 220ms ease',
        textDecoration: 'none',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.borderColor = tone.accent + '88';
        e.currentTarget.style.boxShadow = `0 24px 48px -24px ${tone.accent}44`;
        const arrow = e.currentTarget.querySelector('[data-arrow]');
        if (arrow) arrow.style.transform = 'translateX(6px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = 'var(--line2)';
        e.currentTarget.style.boxShadow = 'none';
        const arrow = e.currentTarget.querySelector('[data-arrow]');
        if (arrow) arrow.style.transform = 'translateX(0)';
      }}
    >
      {/* Tinted blob */}
      <div style={{ position: 'absolute', top: -80, right: -80, width: 320, height: 320, borderRadius: '50%', background: `radial-gradient(circle, ${tone.bg} 0%, transparent 65%)`, opacity: 0.7, filter: 'blur(20px)', pointerEvents: 'none' }} />
      {/* Stripe */}
      <div style={{ position: 'absolute', inset: 0, background: `repeating-linear-gradient(135deg, transparent 0 18px, ${tone.accent}0A 18px 19px)`, opacity: 0.5, pointerEvents: 'none' }} />

      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 24 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 2, color: 'var(--ink3)', textTransform: 'uppercase' }}>
            Team · {String(index + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: tone.accent, fontWeight: 600, letterSpacing: 1 }}>
            ● {count} OPEN
          </div>
        </div>

        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: isFeatured && !isMobile ? 80 : (isMobile ? 40 : 52),
          fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--ink)', lineHeight: 1, margin: '0 0 16px',
        }}>
          {name}
        </h2>

        <p style={{ fontFamily: 'var(--font-display)', fontSize: isFeatured && !isMobile ? 22 : 18, fontStyle: 'italic', color: 'var(--ink2)', margin: '0 0 20px', lineHeight: 1.35, maxWidth: 520 }}>
          {tagline}
        </p>

        <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--ink2)', lineHeight: 1.55, margin: '0 0 auto', maxWidth: 540 }}>
          {summary}
        </p>

        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'center', marginTop: 28, paddingTop: 20, borderTop: `1px solid ${tone.accent}22` }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1, color: 'var(--ink3)', marginBottom: 2 }}>HEADCOUNT</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600, color: 'var(--ink)' }}>{headcount}</div>
          </div>
          <div style={{ width: 1, alignSelf: 'stretch', background: 'var(--line2)' }} />
          <div style={{ flex: 1, minWidth: 180 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1, color: 'var(--ink3)', marginBottom: 2 }}>DISCIPLINES</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink2)', lineHeight: 1.4 }}>{disciplines}</div>
          </div>
          <div data-arrow style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, color: tone.accent, whiteSpace: 'nowrap', transition: 'transform 200ms ease' }}>
            Explore {name} →
          </div>
        </div>
      </div>
    </a>
  );
}

export default function TeamsGrid({ blok }) {
  const isMobile = useIsMobile();
  const teams = blok?.teams?.length ? blok.teams : DEFAULT_TEAMS;

  return (
    <section
      {...storyblokEditable(blok)}
      style={{ background: 'var(--paper)', padding: isMobile ? '48px 20px 96px' : '80px 48px 140px' }}
    >
      <div style={{
        maxWidth: 'var(--container)', margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
        gap: 20,
      }}>
        {teams.map((team, i) => (
          <TeamCard key={team._uid || team.slug || i} team={team} index={i} total={teams.length} isMobile={isMobile} />
        ))}
      </div>
    </section>
  );
}
