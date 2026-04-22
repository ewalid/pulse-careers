'use client';
import { useState } from 'react';
import { storyblokEditable } from '@storyblok/react/rsc';
import { useIsMobile } from '@/lib/useIsMobile';

export default function HeroVideo({ blok }) {
  const isMobile = useIsMobile();
  const [playing, setPlaying] = useState(false);

  const eyebrow = blok?.eyebrow || 'From the founders';
  const quote = blok?.quote || "We're not building a lab. We're building a place where people like working.";
  const attribution = blok?.attribution || 'Ivana Sá';
  const attributionRole = blok?.attribution_role || 'CEO & Co-Founder';
  const thumbnailSrc = blok?.thumbnail?.filename;
  const videoUrl = blok?.video_url;
  const avatarSrc = blok?.attribution_avatar?.filename;

  const initials = attribution.split(' ').map(w => w[0]).slice(0, 2).join('');

  return (
    <section {...storyblokEditable(blok)} style={{ background: 'var(--ink)', padding: isMobile ? '56px 20px' : '80px 48px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: 'var(--container)', margin: '0 auto' }}>

        {/* Eyebrow */}
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2.5, color: '#7FD4C1', textTransform: 'uppercase', marginBottom: 40, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 24, height: 1, background: '#7FD4C1' }} />
          {eyebrow}
        </div>

        {/* Video player */}
        <div style={{
          position: 'relative', borderRadius: 20, overflow: 'hidden',
          aspectRatio: '16/9',
          background: '#1a1218',
          cursor: 'pointer',
          maxWidth: 960,
          margin: '0 auto',
        }}
          onClick={() => videoUrl && setPlaying(p => !p)}
        >
          {/* Thumbnail / poster */}
          {thumbnailSrc && !playing && (
            <img
              src={thumbnailSrc}
              alt=""
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            />
          )}

          {/* Fallback grid texture when no thumbnail */}
          {!thumbnailSrc && (
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }} />
          )}

          {/* Embedded video iframe */}
          {playing && videoUrl && (
            <iframe
              src={videoUrl}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          )}

          {/* Overlays — hidden when video is playing */}
          {!playing && (
            <>
              {/* Dark gradient */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(42,31,46,0.85) 0%, transparent 60%)' }} />

              {/* Ambient glow */}
              <div style={{ position: 'absolute', top: '20%', left: '30%', width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(255,122,92,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

              {/* Play button */}
              <div style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                width: isMobile ? 56 : 72, height: isMobile ? 56 : 72,
                borderRadius: '50%',
                background: '#FF7A5C',
                boxShadow: '0 0 40px rgba(255,122,92,0.5)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                zIndex: 2,
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff">
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
              </div>

              {/* Quote overlay */}
              <div style={{
                position: 'absolute', bottom: isMobile ? 40 : 60, left: isMobile ? 20 : 48, right: isMobile ? 20 : 48,
                zIndex: 2,
              }}>
                <p style={{
                  margin: '0 0 12px',
                  fontFamily: 'var(--font-display)', fontSize: isMobile ? 18 : 26,
                  fontWeight: 600, letterSpacing: '-0.02em',
                  color: 'var(--paper)', lineHeight: 1.35,
                }}>
                  "{quote}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  {avatarSrc ? (
                    <img src={avatarSrc} alt={attribution} style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                  ) : (
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#FF7A5C', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 700, color: '#fff', flexShrink: 0 }}>
                      {initials}
                    </div>
                  )}
                  <div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, color: 'var(--paper)' }}>{attribution}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'rgba(255,255,255,0.45)', letterSpacing: 1, textTransform: 'uppercase' }}>{attributionRole}</div>
                  </div>
                </div>
              </div>

              {/* Scrubber */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: isMobile ? '0 20px 16px' : '0 32px 20px', zIndex: 2 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'rgba(255,255,255,0.4)', letterSpacing: 0.5, flexShrink: 0 }}>0:00</span>
                  <div style={{ flex: 1, height: 3, background: 'rgba(255,255,255,0.15)', borderRadius: 99, overflow: 'hidden' }}>
                    <div style={{ width: '0%', height: '100%', background: 'linear-gradient(90deg, #F4B942, #FF7A5C)', borderRadius: 99 }} />
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'rgba(255,255,255,0.4)', letterSpacing: 0.5, flexShrink: 0 }}>—:——</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
