'use client';
import { useState } from 'react';
import { storyblokEditable } from '@storyblok/react/rsc';
import { useIsMobile } from '@/lib/useIsMobile';
import { resolveLink } from '@/lib/resolveLink';

const DEFAULT_TESTIMONIALS = [
  {
    name: 'Priya Ramanathan', role: 'Staff ML Engineer', team: 'AI & Research',
    location: 'Berlin', tenure: '3rd year', accent_color: '#FF7A5C',
    pull_quote: "I joined to ship one model. I stayed because Pulse is the first place where my mentor said 'slow down' and meant it.",
    chapters: [
      { title: 'Before Pulse',             body: 'I spent six years at a large US-based research lab. Great work, faster cycles than anywhere else, but the pace eventually pulled me out of shape. I was shipping, not thinking.' },
      { title: 'Why I joined',             body: "A friend sent me a job post with a note: 'Read the whole description, especially the last paragraph.' The last paragraph wasn't about the role. It was about the team's research principles. That did it." },
      { title: "What I didn't expect",     body: "The first time I asked for an extension on a launch, my manager didn't ask why. She asked what I needed to make the work good. I hadn't heard that before." },
      { title: "What I'm working on now",  body: "A long-horizon project on robust time-series forecasting for public health systems. It won't ship for eight more months. I've never been calmer about a deadline." },
    ],
    story_url: '/stories/priya-ramanathan',
  },
  {
    name: 'Tomás Ferreira', role: 'Senior Platform Engineer', team: 'Engineering',
    location: 'Lisbon', tenure: '2nd year', accent_color: '#7FD4C1',
    pull_quote: "The on-call pager has been silent for 40 days. That's not luck — that's a team that takes reliability as seriously as features.",
    chapters: [
      { title: 'Where I came from',       body: 'Three years at a startup that moved fast and broke everything — including the engineers. I was burning out by month 18 and I knew it.' },
      { title: 'The interview',           body: "Pulse's final round was a system design problem with no right answer. At the end, they said: 'We're not looking for a solution, we're looking for how you think.' That was new." },
      { title: 'First 90 days',          body: "I was given ownership of the alerting pipeline in week four. Not as a test — as a genuine handoff. The trust felt unusual and then it felt correct." },
      { title: 'What it feels like now', body: "I can count the times I've been paged after 7pm this year on one hand. My last team averaged twelve a month." },
    ],
    story_url: '/stories/tomas-ferreira',
  },
  {
    name: 'Sofia Andersson', role: 'Staff Product Designer', team: 'Design',
    location: 'Stockholm (Remote)', tenure: '4th year', accent_color: '#9B7FD4',
    pull_quote: "I have never worked somewhere where research is this respected. Design here starts with users, not with Figma.",
    chapters: [
      { title: 'My background',         body: "I studied industrial design, then accidentally ended up doing digital product work. I've always thought of interfaces as objects: they should have weight and feel." },
      { title: 'The pull',              body: "The job post had a line: 'We ship design systems, not screens.' I had never seen that written down before. I applied the same day." },
      { title: 'What surprised me',     body: "I killed a feature three weeks before launch because the research didn't support it. My manager's response: 'Good call. Write it up.' That was it." },
      { title: 'Four years in',         body: "I still feel like I'm learning. I'm mentoring two designers who are better than I was at their stage. That's the only metric I care about now." },
    ],
    story_url: '/stories/sofia-andersson',
  },
];

export default function TestimonialsSelector({ blok }) {
  const isMobile = useIsMobile();
  const [active, setActive] = useState(0);

  const headline      = blok?.headline || 'Three people. Three reasons they stayed.';
  const testimonials  = blok?.testimonials?.length ? blok.testimonials : DEFAULT_TESTIMONIALS;
  const current       = testimonials[active] || testimonials[0];

  const name        = current.name         || current.content?.name         || '';
  const role        = current.role         || current.content?.role         || '';
  const team        = current.team         || current.content?.team         || '';
  const location    = current.location     || current.content?.location     || '';
  const tenure      = current.tenure       || current.content?.tenure       || '';
  const accent      = current.accent_color || current.content?.accent_color || '#FF7A5C';
  const pullQuote   = current.pull_quote   || current.content?.pull_quote   || '';
  const chapters    = current.chapters     || current.content?.chapters     || [];
  const storyUrl    = resolveLink(current.story_url || current.content?.story_url) || '#';
  const initials    = name.split(' ').map(w => w[0]).slice(0, 2).join('');

  return (
    <section
      {...storyblokEditable(blok)}
      style={{ backgroundColor: 'var(--paper2)', borderTop: '1px solid var(--line2)', padding: isMobile ? '64px 20px' : '96px 48px' }}
    >
      <div style={{ maxWidth: 'var(--container)', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 2, color: 'var(--ink3)', textTransform: 'uppercase', marginBottom: 12 }}>§ Stories</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? 32 : 48, fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--ink)', lineHeight: 1.05, margin: 0 }}>
            {headline}
          </h2>
        </div>

        {/* Selector chips */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 40 }}>
          {testimonials.map((t, i) => {
            const tName   = t.name         || t.content?.name         || `Person ${i + 1}`;
            const tAccent = t.accent_color || t.content?.accent_color || '#FF7A5C';
            const tInit   = tName.split(' ').map(w => w[0]).slice(0, 2).join('');
            const isActive = i === active;
            return (
              <button
                key={t._uid || i}
                onClick={() => setActive(i)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 18px', borderRadius: 99, cursor: 'pointer',
                  border: isActive ? `2px solid ${tAccent}` : '2px solid var(--line2)',
                  backgroundColor: isActive ? `${tAccent}18` : 'var(--paper)',
                  transition: 'border-color 150ms ease, background 150ms ease',
                  fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600,
                  color: isActive ? 'var(--ink)' : 'var(--ink3)',
                }}
              >
                <div style={{
                  width: 28, height: 28, borderRadius: '50%',
                  backgroundColor: tAccent,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 700, color: '#fff', flexShrink: 0,
                }}>
                  {tInit}
                </div>
                {tName}
              </button>
            );
          })}
        </div>

        {/* Content panel */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1.4fr',
          gap: isMobile ? 32 : 64,
          backgroundColor: 'var(--paper)', borderRadius: 20,
          border: '1px solid var(--line2)', padding: isMobile ? 28 : 48,
        }}>
          {/* Left — person + quote */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Avatar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{
                width: 56, height: 56, borderRadius: '50%',
                backgroundColor: accent, flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: '#fff',
                border: `2px solid ${accent}`,
              }}>
                {initials}
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.01em' }}>{name}</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--ink2)' }}>{role} · {team}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink3)', letterSpacing: 0.5, marginTop: 2 }}>{location.toUpperCase()} · {tenure.toUpperCase()}</div>
              </div>
            </div>

            {/* Pull quote */}
            <blockquote style={{ margin: 0, padding: '20px 24px', borderLeft: `4px solid ${accent}`, borderRadius: '0 12px 12px 0', backgroundColor: `${accent}0D` }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? 16 : 18, fontStyle: 'italic', color: 'var(--ink)', lineHeight: 1.4, margin: 0, letterSpacing: '-0.01em' }}>
                "{pullQuote}"
              </p>
            </blockquote>

            {/* Read more link */}
            <a href={storyUrl} style={{
              display: 'inline-flex', alignItems: 'center', gap: 6, alignSelf: 'flex-start',
              fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600,
              color: accent, textDecoration: 'none',
              borderBottom: `1px solid ${accent}44`,
              transition: 'border-color 150ms ease',
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = accent}
              onMouseLeave={e => e.currentTarget.style.borderColor = `${accent}44`}
            >
              Read full story →
            </a>
          </div>

          {/* Right — chapters */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            {chapters.map((ch, i) => {
              const chTitle = ch.title || ch.content?.title || '';
              const chBody  = ch.body  || ch.content?.body  || '';
              return (
                <div key={ch._uid || i}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: accent, marginBottom: 8, textTransform: 'uppercase' }}>
                    {String(i + 1).padStart(2, '0')} · {chTitle}
                  </div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.65, color: 'var(--ink2)', margin: 0 }}>
                    {chBody}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
