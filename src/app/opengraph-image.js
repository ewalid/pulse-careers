import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Pulse Careers — Find where you belong.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          background: '#2A1F2E',
          padding: '72px 80px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Background accent blobs */}
        <div style={{
          position: 'absolute', top: -120, right: -120,
          width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,122,92,0.35) 0%, transparent 70%)',
          display: 'flex',
        }} />
        <div style={{
          position: 'absolute', bottom: -80, left: -80,
          width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(244,185,66,0.25) 0%, transparent 70%)',
          display: 'flex',
        }} />

        {/* Logo mark + wordmark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 12,
            background: '#2A1F2E',
            border: '2px solid rgba(244,237,225,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {/* Pulse waveform icon */}
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="10" stroke="#F4EDE1" strokeWidth="2"/>
              <path d="M9 16 L12.5 16 L15 10 L18 22 L20.5 16 L24 16"
                stroke="#FF7A5C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span style={{ fontSize: 28, fontWeight: 600, color: '#F4EDE1', letterSpacing: '-0.02em' }}>
            Pulse
          </span>
        </div>

        {/* Main headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{
            fontSize: 72, fontWeight: 700, color: '#F4EDE1',
            letterSpacing: '-0.04em', lineHeight: 1, display: 'flex', flexWrap: 'wrap',
          }}>
            Find where you{' '}
            <span style={{ color: '#FF7A5C', fontStyle: 'italic', marginLeft: 16 }}>belong.</span>
          </div>
          <div style={{ fontSize: 24, color: 'rgba(244,237,225,0.55)', fontWeight: 400, letterSpacing: '-0.01em' }}>
            247 open roles · Lisbon, Berlin, NYC & remote
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%',
        }}>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Engineering', 'AI & Research', 'Design', 'Operations', 'Data Science'].map(d => (
              <span key={d} style={{
                fontSize: 13, color: 'rgba(244,237,225,0.4)',
                fontWeight: 400, letterSpacing: '0.02em', textTransform: 'uppercase',
                display: 'flex',
              }}>
                {d}
              </span>
            ))}
          </div>
          <span style={{
            fontSize: 13, color: 'rgba(244,237,225,0.35)',
            letterSpacing: '0.05em', textTransform: 'uppercase', display: 'flex',
          }}>
            careers.pulse.com
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
