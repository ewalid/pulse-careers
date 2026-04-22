'use client';
import { useState } from 'react';
import { storyblokEditable } from '@storyblok/react/rsc';
import { useIsMobile } from '@/lib/useIsMobile';

function toEmbedUrl(url) {
  if (!url) return null;
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
  if (yt) return `https://www.youtube.com/embed/${yt[1]}?autoplay=1&rel=0`;
  const vimeo = url.match(/vimeo\.com\/(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1`;
  return url;
}

export default function HeroVideo({ blok }) {
  const isMobile = useIsMobile();
  const [playing, setPlaying] = useState(false);

  const eyebrow = blok?.eyebrow || 'From the founders';
  const quote = blok?.quote || "We're not building a lab. We're building a place where people like working.";
  const attribution = blok?.attribution || 'Ivana Sá';
  const attributionRole = blok?.attribution_role || 'CEO & Co-Founder';
  const thumbnailSrc = blok?.thumbnail?.filename;
  const embedUrl = toEmbedUrl(blok?.video_url);
  const avatarSrc = blok?.attribution_avatar?.filename;

  const initials = attribution.split(' ').map(w => w[0]).slice(0, 2).join('');

  return (
    <section {...storyblokEditable(blok)} style={{ background: 'var(--paper2)', padding: isMobile ? '56px 20px' : '56px 48px', borderTop: '1px solid var(--line2)' }}>
      <div style={{ maxWidth: 'var(--container)', margin: '0 auto' }}>

        {/* Eyebrow */}
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 2, color: 'var(--ink3)', textTransform: 'uppercase', marginBottom: 18 }}>
          § 01  ·  {eyebrow.toUpperCase()}
        </div>

        {/* Video player */}
        <div
          style={{
            position: 'relative', borderRadius: 24, overflow: 'hidden',
            aspectRatio: '16 / 7',
            background: 'var(--ink)',
            cursor: embedUrl ? 'pointer' : 'default',
          }}
          onClick={() => embedUrl && !playing && setPlaying(true)}
        >
          {/* Thumbnail */}
          {thumbnailSrc && !playing && (
            <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${thumbnailSrc})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
          )}

          {/* Embedded video */}
          {playing && embedUrl && (
            <iframe
              src={embedUrl}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          )}

          {/* Overlay — hidden when playing */}
          {!playing && (
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(180deg, transparent 40%, rgba(26,20,24,0.75))',
              padding: isMobile ? 20 : 32,
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            }}>
              {/* Top bar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--paper)' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, opacity: 0.75 }}>▸ NOW PLAYING · CEO + HEAD OF PEOPLE</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, opacity: 0.75 }}>4K · CC · 6:42</div>
              </div>

              {/* Center play button */}
              <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)' }}>
                <div style={{
                  width: isMobile ? 64 : 88, height: isMobile ? 64 : 88,
                  borderRadius: '50%',
                  background: '#FF7A5C',
                  border: 'none',
                  display: 'grid', placeItems: 'center',
                  boxShadow: '0 0 0 8px rgba(255,122,92,0.2), 0 0 60px rgba(255,122,92,0.6)',
                }}>
                  <svg width={isMobile ? 22 : 32} height={isMobile ? 22 : 32} viewBox="0 0 24 24" fill="var(--ink)">
                    <polygon points="5 3 19 12 5 21 5 3"/>
                  </svg>
                </div>
              </div>

              {/* Bottom: quote + scrubber */}
              <div style={{ color: 'var(--paper)' }}>
                <p style={{
                  margin: '0 0 8px',
                  fontFamily: 'var(--font-display)', fontSize: isMobile ? 18 : 36,
                  fontWeight: 500, letterSpacing: '-0.015em',
                  lineHeight: 1.25, maxWidth: 700,
                }}>
                  "{quote}"
                </p>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 1, opacity: 0.7, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
                  {avatarSrc ? (
                    <img src={avatarSrc} alt={attribution} style={{ width: 24, height: 24, borderRadius: '50%', objectFit: 'cover' }} />
                  ) : null}
                  — {attribution.toUpperCase()} · {attributionRole.toUpperCase()}
                </div>

                {/* Scrubber */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ flex: 1, height: 3, background: 'rgba(244,237,225,0.2)', borderRadius: 99, position: 'relative' }}>
                    <div style={{ width: '22%', height: '100%', background: '#FF7A5C', borderRadius: 99 }} />
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, opacity: 0.75, flexShrink: 0 }}>1:28 / 6:42</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
