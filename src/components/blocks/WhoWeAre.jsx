'use client';
import { storyblokEditable } from '@storyblok/react/rsc';
import { renderRichText } from '@storyblok/react';
import { useIsMobile } from '@/lib/useIsMobile';
import { accentHeadline } from '@/lib/accentHeadline';

const STAT_ACCENTS = ['#FF7A5C', '#F4B942', '#7FD4C1', '#9B7FD4'];

const TONE_MAP = {
  coral:  { bg: '#FFD6C8', stripe: 'rgba(255,122,92,0.18)' },
  amber:  { bg: '#FBE5B4', stripe: 'rgba(244,185,66,0.3)' },
  violet: { bg: '#D9CDEA', stripe: 'rgba(155,127,212,0.3)' },
  mint:   { bg: '#CFEBE2', stripe: 'rgba(127,212,193,0.35)' },
};


function BodyContent({ body, bodyPlain }) {
  if (!body && !bodyPlain) {
    return (
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.7, color: 'var(--ink2)', margin: 0 }}>
        Founded in Lisbon in 2014, Pulse is a 2,400-person research and product company. Our software runs inside hospitals, transit networks, energy grids, and public libraries across 42 countries.
      </p>
    );
  }
  if (body && typeof body === 'object' && body.type === 'doc') {
    return (
      <div
        style={{ fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.7, color: 'var(--ink2)' }}
        dangerouslySetInnerHTML={{ __html: renderRichText(body) }}
      />
    );
  }
  return (
    <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.7, color: 'var(--ink2)', margin: 0 }}>
      {bodyPlain || body}
    </p>
  );
}

function HudCard({ blok, isMobile, tone }) {
  const hasVideo = !!(blok?.video_asset?.filename || blok?.video_url);
  const hasImage = !!blok?.image_asset?.filename;
  const videoSrc = blok?.video_asset?.filename || blok?.video_url;
  const mediaCaption = blok?.media_caption || 'Lisbon HQ · Team';

  return (
    <div style={{
      position: 'relative',
      borderRadius: 18,
      overflow: 'hidden',
      height: isMobile ? 260 : 440,
      background: '#0d0a10',
      boxShadow: '0 32px 80px -16px rgba(42,31,46,0.25)',
      border: '1px solid rgba(255,255,255,0.07)',
    }}>
      {hasVideo ? (
        <video autoPlay muted loop playsInline src={videoSrc}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }}
        />
      ) : hasImage ? (
        <img src={blok.image_asset.filename} alt=""
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }}
        />
      ) : (
        <div style={{
          position: 'absolute', inset: 0,
          background: `repeating-linear-gradient(135deg, ${tone.bg}28 0 16px, ${tone.stripe} 16px 17px)`,
        }} />
      )}

      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(13,10,16,0.5) 0%, rgba(13,10,16,0.1) 40%, rgba(13,10,16,0.8) 100%)' }} />

      <div style={{ position: 'absolute', inset: 0, padding: 18, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        {/* Top HUD bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 1.5, color: 'rgba(244,237,225,0.7)', textTransform: 'uppercase' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF7A5C', boxShadow: '0 0 8px #FF7A5C', flexShrink: 0 }} />
            {blok?.hud_title || 'PULSE · BUILD LOG'}
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 1, color: 'rgba(244,237,225,0.4)' }}>
            REC 00s
          </span>
        </div>

        {/* Mid telemetry (desktop only) */}
        {!isMobile && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5, alignSelf: 'flex-end' }}>
            {[
              { k: 'SYS', v: 'ONLINE' },
              { k: 'UPTIME', v: '99.97%' },
              { k: 'CORE', v: 'ACTIVE' },
            ].map(r => (
              <div key={r.k} style={{ display: 'flex', gap: 10, fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 1 }}>
                <span style={{ color: 'rgba(244,237,225,0.35)', width: 48 }}>{r.k}</span>
                <span style={{ color: '#7FD4C1' }}>{r.v}</span>
              </div>
            ))}
          </div>
        )}

        {/* Bottom caption bar */}
        <div style={{
          background: 'rgba(13,10,16,0.88)',
          backdropFilter: 'blur(12px)',
          borderRadius: 10,
          padding: '10px 14px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF7A5C', flexShrink: 0 }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1, color: 'rgba(244,237,225,0.85)', textTransform: 'uppercase' }}>
              {mediaCaption}
            </span>
          </div>
          {blok?.media_cta_label && (
            <a href={blok?.media_cta_url || '#'} style={{
              fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 1,
              color: 'rgba(244,237,225,0.55)', textDecoration: 'none',
              background: 'rgba(244,237,225,0.08)', borderRadius: 99,
              padding: '3px 10px', border: '1px solid rgba(244,237,225,0.15)',
            }}>
              {blok.media_cta_label} ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function WhoWeAre({ blok }) {
  const isMobile = useIsMobile();

  const imageTone = blok?.image_tone || 'coral';
  const tone = TONE_MAP[imageTone] || TONE_MAP.coral;
  const mediaRight = blok?.media_position !== 'left';
  const eyebrow = blok?.eyebrow || 'Who We Are';
  const accentWord = blok?.headline_accent_word || 'quiet';
  const headline = blok?.headline || 'We build the quiet infrastructure behind modern life.';

  const stats = [
    { value: blok?.stat_1_value || '2,400', label: blok?.stat_1_label || 'People · 42 countries', sub: blok?.stat_1_sub || '24% YoY growth' },
    { value: blok?.stat_2_value || '2014',  label: blok?.stat_2_label || 'Founded in Lisbon',      sub: blok?.stat_2_sub || 'Series D · profitable' },
    { value: blok?.stat_3_value || '€340M', label: blok?.stat_3_label || 'Revenue · 2025',          sub: blok?.stat_3_sub || '63% public sector' },
    { value: blok?.stat_4_value || '7',     label: blok?.stat_4_label || 'Offices worldwide',        sub: blok?.stat_4_sub || 'Lisbon · Berlin · NYC +4' },
  ];

  const editorial = (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 2,
        textTransform: 'uppercase', color: 'var(--ink3)', marginBottom: 20,
      }}>
        {eyebrow}
      </div>

      <h2 style={{
        margin: '0 0 24px',
        fontFamily: 'var(--font-display)', fontSize: isMobile ? 40 : 62,
        fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--ink)',
        lineHeight: 1.05,
      }}>
        {accentHeadline(headline, accentWord)}
      </h2>

      <div style={{ maxWidth: 520, marginBottom: 36 }}>
        <BodyContent body={blok?.body} bodyPlain={blok?.body_plain} />
      </div>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        {(blok?.cta_label || !blok?.cta_url) && (
          <a href={blok?.cta_url || '#'} style={{
            display: 'inline-flex', alignSelf: 'flex-start',
            fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600,
            color: 'var(--paper)', background: 'var(--ink)', textDecoration: 'none',
            borderRadius: 99, padding: '12px 24px', letterSpacing: '-0.01em',
          }}>
            {blok?.cta_label || 'About Pulse'} →
          </a>
        )}
        {(blok?.cta_2_label || !blok?.cta_2_url) && (
          <a href={blok?.cta_2_url || '#'} style={{
            display: 'inline-flex', alignSelf: 'flex-start',
            fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 500,
            color: 'var(--ink)', background: 'transparent', textDecoration: 'none',
            border: '1.5px solid var(--ink)', borderRadius: 99,
            padding: '12px 24px', letterSpacing: '-0.01em',
          }}>
            {blok?.cta_2_label || 'Our mission'}
          </a>
        )}
      </div>
    </div>
  );

  return (
    <section
      {...storyblokEditable(blok)}
      style={{
        background: 'var(--paper)',
        borderTop: '1px solid var(--line2)',
        padding: isMobile ? '64px 20px 0' : '80px 48px 0',
      }}
    >
      <div style={{ maxWidth: 'var(--container)', margin: '0 auto' }}>
        {/* 2-col editorial + media */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? 40 : 80,
          alignItems: 'center',
          paddingBottom: isMobile ? 48 : 72,
        }}>
          {isMobile ? (
            <>{editorial}<HudCard blok={blok} isMobile={isMobile} tone={tone} /></>
          ) : mediaRight ? (
            <>{editorial}<HudCard blok={blok} isMobile={isMobile} tone={tone} /></>
          ) : (
            <><HudCard blok={blok} isMobile={isMobile} tone={tone} />{editorial}</>
          )}
        </div>

        {/* Stats strip — full width below grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
          borderTop: '1px solid var(--line)',
        }}>
          {stats.map((stat, i) => (
            <div key={i} style={{
              padding: isMobile ? '28px 16px' : '32px 28px',
              borderRight: (isMobile ? i % 2 !== 1 : i < 3) ? '1px solid var(--line)' : 'none',
              borderBottom: isMobile && i < 2 ? '1px solid var(--line)' : 'none',
            }}>
              <div style={{ width: 28, height: 2.5, background: STAT_ACCENTS[i], borderRadius: 99, marginBottom: 18 }} />
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: isMobile ? 34 : 44,
                fontWeight: 700, letterSpacing: '-0.04em', color: 'var(--ink)', lineHeight: 1,
                marginBottom: 8,
              }}>
                {stat.value}
              </div>
              <div style={{
                fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600,
                color: 'var(--ink)', marginBottom: 4, lineHeight: 1.4,
              }}>
                {stat.label}
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink3)',
                letterSpacing: 0.3, lineHeight: 1.4,
              }}>
                {stat.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
