'use client';
import { storyblokEditable } from '@storyblok/react/rsc';
import { useIsMobile } from '@/lib/useIsMobile';
import { resolveLink } from '@/lib/resolveLink';

const DEFAULT_PERSON = {
  name: 'Priya Ramanathan', role: 'Staff ML Engineer', team: 'AI & Research',
  location: 'Berlin', tenure: '3rd year',
  accent_color: '#FF7A5C', tone_bg: '#FFD6C8',
  pull_quote: "I joined to ship one model. I stayed because Pulse is the first place where my mentor said 'slow down' and meant it.",
  pull_quote_2: "The first time I asked for an extension on a launch, my manager didn't ask why. She asked what I needed to make the work good.",
  story_number: 'No. 042',
  chapters: [
    { title: 'Before Pulse',            body: 'I spent six years at a large US-based research lab. Great work, faster cycles than anywhere else, but the pace eventually pulled me out of shape. I was shipping, not thinking.' },
    { title: 'Why I joined',            body: "A friend sent me a job post with a note: 'Read the whole description, especially the last paragraph.' The last paragraph wasn't about the role. It was about the team's research principles. That did it." },
    { title: "What I didn't expect",    body: "The first time I asked for an extension on a launch, my manager didn't ask why. She asked what I needed to make the work good. I hadn't heard that before." },
    { title: "What I'm working on now", body: "A long-horizon project on robust time-series forecasting for public health systems. It won't ship for eight more months. I've never been calmer about a deadline." },
  ],
  open_roles_headline: '3 open roles on the AI & Research team',
  open_roles: [
    { discipline: 'AI & Research · Berlin',    title: 'Senior ML Engineer — Forecasting',         url: '#' },
    { discipline: 'AI & Research · Remote EU', title: 'Research Scientist — Causal Inference',     url: '#' },
    { discipline: 'AI & Research · Berlin',    title: 'ML Infra Engineer — Training Platform',     url: '#' },
  ],
};

export default function TestimonyDetail({ blok }) {
  const isMobile = useIsMobile();

  const name          = blok?.name            || DEFAULT_PERSON.name;
  const role          = blok?.role            || DEFAULT_PERSON.role;
  const team          = blok?.team            || DEFAULT_PERSON.team;
  const location      = blok?.location        || DEFAULT_PERSON.location;
  const tenure        = blok?.tenure          || DEFAULT_PERSON.tenure;
  const accent        = blok?.accent_color    || DEFAULT_PERSON.accent_color;
  const toneBg        = blok?.tone_bg         || DEFAULT_PERSON.tone_bg;
  const pullQuote     = blok?.pull_quote      || DEFAULT_PERSON.pull_quote;
  const pullQuote2    = blok?.pull_quote_2    || DEFAULT_PERSON.pull_quote_2;
  const storyNumber   = blok?.story_number    || DEFAULT_PERSON.story_number;
  const openRolesHeadline = blok?.open_roles_headline || DEFAULT_PERSON.open_roles_headline;
  const chapters      = blok?.chapters?.length    ? blok.chapters    : DEFAULT_PERSON.chapters;
  const openRoles     = blok?.open_roles?.length  ? blok.open_roles  : DEFAULT_PERSON.open_roles;

  const initials = name.split(' ').map(w => w[0]).slice(0, 2).join('');
  const firstName = name.split(' ')[0];

  return (
    <div {...storyblokEditable(blok)}>
      {/* Hero */}
      <section style={{ backgroundColor: 'var(--paper)', padding: isMobile ? '48px 20px 64px' : '80px 48px 96px', borderBottom: '1px solid var(--line2)' }}>
        <div style={{ maxWidth: 'var(--container)', margin: '0 auto' }}>
          <a href="/our-story" style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 2, color: 'var(--ink3)', textTransform: 'uppercase', textDecoration: 'none', marginBottom: 28, display: 'inline-block' }}>
            ← ALL STORIES
          </a>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--ink3)', marginBottom: 14 }}>
            Pulse Stories · {storyNumber}
          </div>
          <h1 style={{
            margin: '0 0 36px',
            fontFamily: 'var(--font-display)',
            fontSize: isMobile ? 36 : 60,
            fontWeight: 600, letterSpacing: '-0.03em',
            color: 'var(--ink)', lineHeight: 1.05, maxWidth: 900,
            fontStyle: 'italic',
          }}>
            "{pullQuote}"
          </h1>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 32 : 60, alignItems: 'center' }}>
            {/* Person card */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <div style={{
                width: 84, height: 84, borderRadius: '50%',
                backgroundColor: toneBg, flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 600, color: 'var(--ink)',
                border: `2px solid ${accent}`,
              }}>
                {initials}
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.01em', marginBottom: 4 }}>{name}</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--ink2)', marginBottom: 2 }}>{role} · {team}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink3)', letterSpacing: 0.5 }}>{location.toUpperCase()} · {tenure.toUpperCase()}</div>
              </div>
            </div>

            {/* Meta */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, borderLeft: isMobile ? 'none' : '1px solid var(--line)', paddingLeft: isMobile ? 0 : 36 }}>
              {[{ k: 'FORMAT', v: 'Written' }, { k: 'LENGTH', v: '7 min read' }, { k: 'POSTED', v: 'Mar 2026' }].map(r => (
                <div key={r.k}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 1.5, color: 'var(--ink3)', marginBottom: 6 }}>{r.k}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>{r.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section style={{ backgroundColor: 'var(--paper)', padding: isMobile ? '48px 20px 72px' : '80px 48px 120px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          {chapters.map((ch, i) => {
            const chTitle = ch.title || ch.content?.title || '';
            const chBody  = ch.body  || ch.content?.body  || '';
            return (
              <div key={ch._uid || i} {...storyblokEditable(ch)} style={{ marginBottom: 56 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 2, color: accent, marginBottom: 14, textTransform: 'uppercase' }}>
                  {String(i + 1).padStart(2, '0')} · {chTitle}
                </div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: isMobile ? 17 : 19, lineHeight: 1.7, color: 'var(--ink)', margin: 0 }}>{chBody}</p>
              </div>
            );
          })}

          {/* Mid-page pull quote */}
          <div style={{ padding: isMobile ? '32px 20px' : '40px 44px', backgroundColor: 'var(--ink)', color: 'var(--paper)', borderRadius: 18, margin: '48px 0', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', right: -80, top: -80, width: 280, height: 280, borderRadius: '50%', background: `radial-gradient(circle, ${accent}40 0%, transparent 70%)`, filter: 'blur(8px)' }} />
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 80, lineHeight: 0.6, color: accent, marginBottom: 8 }}>&ldquo;</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? 22 : 28, fontWeight: 500, lineHeight: 1.35, letterSpacing: '-0.01em', position: 'relative' }}>
              {pullQuote2}
            </div>
          </div>
        </div>
      </section>

      {/* Open roles */}
      <section style={{ backgroundColor: 'var(--paper2)', padding: isMobile ? '48px 20px' : '72px 48px', borderTop: '1px solid var(--line2)' }}>
        <div style={{ maxWidth: 'var(--container)', margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 2, color: 'var(--ink3)', textTransform: 'uppercase', marginBottom: 12 }}>
            Work with {firstName}
          </div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? 28 : 36, fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--ink)', marginBottom: 28, lineHeight: 1.1 }}>
            <em style={{ color: accent, fontStyle: 'italic' }}>{openRolesHeadline}</em>
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 16 }}>
            {openRoles.map((r, i) => {
              const rDiscipline = r.discipline || r.content?.discipline || '';
              const rTitle      = r.title      || r.content?.title      || '';
              const rUrl        = resolveLink(r.url || r.content?.url) || '#';
              return (
                <a
                  key={r._uid || i}
                  {...storyblokEditable(r)}
                  href={rUrl}
                  style={{ backgroundColor: 'var(--paper)', borderRadius: 14, padding: 20, border: '1px solid var(--line2)', textDecoration: 'none', display: 'block' }}
                >
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink3)', letterSpacing: 1, marginBottom: 8 }}>{rDiscipline}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.3, marginBottom: 14 }}>{rTitle}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: accent, fontWeight: 600 }}>View role →</div>
                </a>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
