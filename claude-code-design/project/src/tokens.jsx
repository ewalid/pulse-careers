// Shared design tokens & small visual helpers used across screens.
const PULSE = {
  paper: '#F4EDE1',
  paper2: '#EDE3D2',
  paper3: '#E4D7BF',
  ink: '#2A1F2E',
  ink2: '#4A3C4F',
  ink3: '#75687A',
  coral: '#FF7A5C',
  coralSoft: '#FFB8A5',
  amber: '#F4B942',
  mint: '#7FD4C1',
  violet: '#9B7FD4',
  line: 'rgba(42, 31, 46, 0.12)',
  line2: 'rgba(42, 31, 46, 0.06)',
};

// tiny inline SVG "PULSE" wordmark — rounded geometric
function PulseLogo({ size = 22, color }) {
  const c = color || PULSE.ink;
  return (
    <svg width={size * 4.2} height={size} viewBox="0 0 88 22" fill="none">
      <circle cx="10" cy="11" r="9" stroke={c} strokeWidth="2.2"/>
      <path d="M5 11 L8 11 L10 6 L12 16 L14 11 L17 11" stroke={PULSE.coral} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <text x="24" y="16" fill={c} fontFamily="Space Grotesk" fontWeight="700" fontSize="15" letterSpacing="0.5">PULSE</text>
    </svg>
  );
}

// Subtle topographic / grid backdrop
function GridBackdrop({ opacity = 0.4 }) {
  return (
    <svg style={{position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none', opacity}} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid-bg" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M 48 0 L 0 0 0 48" fill="none" stroke={PULSE.ink} strokeWidth="0.4" opacity="0.18"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-bg)"/>
    </svg>
  );
}

// Placeholder image block — subtly striped with mono label
function Placeholder({ w = '100%', h = 200, label = 'image', tone = 'paper', radius = 14, overlay }) {
  const tones = {
    paper: { bg: PULSE.paper2, stripe: 'rgba(42,31,46,0.05)', fg: PULSE.ink2 },
    ink:   { bg: PULSE.ink, stripe: 'rgba(244,237,225,0.05)', fg: PULSE.paper },
    coral: { bg: '#FFD6C8', stripe: 'rgba(255,122,92,0.18)', fg: PULSE.ink },
    amber: { bg: '#FBE5B4', stripe: 'rgba(244,185,66,0.3)', fg: PULSE.ink },
    mint:  { bg: '#CFEBE2', stripe: 'rgba(127,212,193,0.35)', fg: PULSE.ink },
    violet:{ bg: '#D9CDEA', stripe: 'rgba(155,127,212,0.3)', fg: PULSE.ink },
    dusk:  { bg: '#E8C9B7', stripe: 'rgba(255,122,92,0.22)', fg: PULSE.ink },
  };
  const t = tones[tone] || tones.paper;
  return (
    <div style={{
      width: w, height: h, borderRadius: radius, overflow:'hidden',
      background: `repeating-linear-gradient(135deg, ${t.bg} 0 14px, ${t.stripe} 14px 15px)`,
      position:'relative', display:'flex', alignItems:'flex-end', padding:12, color:t.fg,
      boxShadow:'inset 0 0 0 1px rgba(42,31,46,0.08)'
    }}>
      <div style={{fontFamily:'JetBrains Mono, monospace', fontSize:10, textTransform:'uppercase', letterSpacing:1, opacity:0.75}}>
        {label}
      </div>
      {overlay}
    </div>
  );
}

// CMS block annotation wrapper — toggleable via context
const CMSCtx = React.createContext({ on: false });

function Block({ name, type = 'block', children, accent, style }) {
  const { on } = React.useContext(CMSCtx);
  const color = accent || PULSE.mint;
  return (
    <div style={{position:'relative', ...style}}>
      {children}
      {on && (
        <div style={{
          position:'absolute', inset:-8, pointerEvents:'none',
          border:`1.5px dashed ${color}`, borderRadius:10, zIndex:50,
        }}>
          <div style={{
            position:'absolute', top:-11, left:8,
            background:PULSE.paper, color:PULSE.ink,
            fontFamily:'JetBrains Mono, monospace', fontSize:9, fontWeight:600,
            padding:'2px 7px', borderRadius:4, letterSpacing:0.5,
            border:`1px solid ${color}`, textTransform:'uppercase',
            display:'flex', alignItems:'center', gap:5,
          }}>
            <span style={{width:5,height:5,borderRadius:99,background:color}}/>
            storyblok · {type} · {name}
          </div>
        </div>
      )}
    </div>
  );
}

Object.assign(window, { PULSE, PulseLogo, GridBackdrop, Placeholder, CMSCtx, Block });
