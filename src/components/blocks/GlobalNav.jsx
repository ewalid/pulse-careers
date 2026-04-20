'use client';
import { storyblokEditable } from '@storyblok/react/rsc';
import PulseLogo from '@/components/ui/PulseLogo';

const DEFAULT_NAV_ITEMS = [
  { label: 'Careers', url: '#' },
  { label: 'Teams', url: '#' },
  { label: 'Life at Pulse', url: '#' },
  { label: 'Benefits', url: '#' },
  { label: 'Internships', url: '#' },
];

export default function GlobalNav({ blok }) {
  const navItems = blok?.nav_items?.length > 0 ? blok.nav_items : DEFAULT_NAV_ITEMS;
  const openRoles = blok?.open_roles_count || '247';
  const ctaLabel = blok?.cta_label || 'Apply';
  const ctaUrl = blok?.cta_url || '#';
  const loginLabel = blok?.login_label || 'Candidate login';
  const loginUrl = blok?.login_url || '#';

  return (
    <header
      {...(blok ? storyblokEditable(blok) : {})}
      style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(244,237,225,0.88)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderBottom: '1px solid var(--line2)',
      }}
    >
      <div style={{
        maxWidth: 'var(--container)', margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 48px',
      }}>
        {/* Left: Logo + nav links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
          <PulseLogo size={18} />
          <nav style={{ display: 'flex', gap: 28 }}>
            {navItems.map((item, i) => (
              <a
                key={item._uid || i}
                href={item.url || item.link_url || '#'}
                style={{
                  fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--ink3)',
                  textDecoration: 'none', fontWeight: 400,
                  paddingBottom: 3, borderBottom: '1.5px solid transparent',
                  transition: 'color 0.15s, border-color 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--ink)'; e.currentTarget.style.borderBottomColor = 'var(--coral)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--ink3)'; e.currentTarget.style.borderBottomColor = 'transparent'; }}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Right: login + counter + CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <a
            href={loginUrl}
            style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--ink2)', textDecoration: 'none' }}
          >
            {loginLabel}
          </a>
          <div style={{ width: 1, height: 18, background: 'var(--line)', flexShrink: 0 }} />
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            fontFamily: 'var(--font-mono)', fontSize: 10, padding: '6px 11px',
            borderRadius: 99, background: 'var(--paper3)', color: 'var(--ink2)',
            letterSpacing: 0.5, whiteSpace: 'nowrap',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: 99, background: 'var(--mint)', boxShadow: '0 0 8px var(--mint)', flexShrink: 0 }} />
            {openRoles} OPEN ROLES
          </div>
          <a
            href={ctaUrl}
            style={{
              fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600,
              color: 'var(--paper)', background: 'var(--ink)', textDecoration: 'none',
              padding: '8px 16px', borderRadius: 99,
              display: 'inline-flex', alignItems: 'center', gap: 6,
              letterSpacing: '-0.01em', whiteSpace: 'nowrap',
            }}
          >
            {ctaLabel} →
          </a>
        </div>
      </div>
    </header>
  );
}
