'use client';
import { useState } from 'react';
import { storyblokEditable } from '@storyblok/react/rsc';
import PulseLogo from '@/components/ui/PulseLogo';
import { useIsMobile } from '@/lib/useIsMobile';
import { resolveLink } from '@/lib/resolveLink';
import { useSavedJobs } from '@/lib/SavedJobsContext';

const DEFAULT_NAV_ITEMS = [
  { label: 'Careers', url: '#' },
  { label: 'Teams', url: '#' },
  { label: 'Life at Pulse', url: '#' },
  { label: 'Benefits', url: '#' },
  { label: 'Internships', url: '#' },
];

export default function GlobalNav({ blok }) {
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);
  const { savedIds, openPanel } = useSavedJobs();
  const navItems = blok?.nav_items?.length > 0 ? blok.nav_items : DEFAULT_NAV_ITEMS;
  const openRoles = blok?.open_roles_count || '247';
  const jobsUrl = resolveLink(blok?.jobs_url) || '/jobs';

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
        padding: isMobile ? '14px 20px' : '16px 48px',
      }}>
        {/* Logo */}
        <PulseLogo size={26} />

        {isMobile ? (
          /* Mobile: hamburger */
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button
              onClick={() => setMenuOpen(o => !o)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: 'var(--font-body)', fontSize: 22, color: 'var(--ink)',
                lineHeight: 1, padding: '4px',
              }}
              aria-label="Toggle menu"
            >
              {menuOpen ? '✕' : '≡'}
            </button>
          </div>
        ) : (
          /* Desktop: full nav */
          <>
            <nav style={{ display: 'flex', gap: 28 }}>
              {navItems.map((item, i) => (
                <a
                  key={item._uid || i}
                  href={resolveLink(item.url) || resolveLink(item.link_url) || '#'}
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

            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              {/* Globe — language selector (UI only) */}
              <button
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'var(--ink3)', display: 'flex', alignItems: 'center',
                  padding: 4, borderRadius: 6,
                  transition: 'color 0.15s',
                }}
                aria-label="Select language"
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--ink)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--ink3)'; }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
              </button>

              {/* Saved jobs */}
              <button
                onClick={openPanel}
                style={{
                  display: 'flex', alignItems: 'center', gap: 5,
                  fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--ink2)',
                  background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                  transition: 'color 0.15s', position: 'relative',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--ink)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--ink2)'; }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                </svg>
                Saved jobs
                {savedIds.length > 0 && (
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 600,
                    background: '#FF7A5C', color: '#fff', borderRadius: 99,
                    padding: '1px 5px', letterSpacing: 0.5, lineHeight: 1.6,
                  }}>
                    {savedIds.length}
                  </span>
                )}
              </button>

              <div style={{ width: 1, height: 18, background: 'var(--line)', flexShrink: 0 }} />

              {/* Open roles — links to job listing */}
              <a
                href={jobsUrl}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  fontFamily: 'var(--font-mono)', fontSize: 10, padding: '6px 11px',
                  borderRadius: 99, background: 'var(--paper3)', color: 'var(--ink2)',
                  letterSpacing: 0.5, whiteSpace: 'nowrap', textDecoration: 'none',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--line)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--paper3)'; }}
              >
                <span style={{ width: 6, height: 6, borderRadius: 99, background: 'var(--mint)', boxShadow: '0 0 8px var(--mint)', flexShrink: 0 }} />
                {openRoles} OPEN ROLES
              </a>
            </div>
          </>
        )}
      </div>

      {/* Mobile dropdown menu */}
      {isMobile && menuOpen && (
        <div style={{
          background: 'rgba(244,237,225,0.97)',
          backdropFilter: 'blur(14px)',
          borderTop: '1px solid var(--line2)',
          padding: '20px 20px 28px',
        }}>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {navItems.map((item, i) => (
              <a
                key={item._uid || i}
                href={resolveLink(item.url) || resolveLink(item.link_url) || '#'}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: 'var(--font-body)', fontSize: 16, color: 'var(--ink)',
                  textDecoration: 'none', fontWeight: 400,
                  padding: '12px 0',
                  borderBottom: '1px solid var(--line2)',
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <button
            onClick={() => { setMenuOpen(false); openPanel(); }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 16,
              fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--ink2)',
              background: 'none', border: 'none', cursor: 'pointer', padding: 0,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
            </svg>
            Saved jobs
            {savedIds.length > 0 && (
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 600,
                background: '#FF7A5C', color: '#fff', borderRadius: 99,
                padding: '1px 5px', letterSpacing: 0.5,
              }}>
                {savedIds.length}
              </span>
            )}
          </button>
        </div>
      )}
    </header>
  );
}
