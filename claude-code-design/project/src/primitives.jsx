// Buttons, chips, tags, icons — small reusable bits.

function Chip({ children, tone = 'ink', soft, size='sm' }) {
  const tones = {
    ink: { bg: PULSE.ink, fg: PULSE.paper },
    coral: { bg: PULSE.coral, fg: PULSE.ink },
    amber: { bg: PULSE.amber, fg: PULSE.ink },
    mint: { bg: PULSE.mint, fg: PULSE.ink },
    violet: { bg: PULSE.violet, fg: PULSE.paper },
    paper: { bg: 'transparent', fg: PULSE.ink, border:`1px solid ${PULSE.line}` },
  };
  const t = tones[tone];
  const soften = soft ? { background: t.bg + '22', color: PULSE.ink } : {};
  return (
    <span className="mono" style={{
      display:'inline-flex', alignItems:'center', gap:6,
      fontSize: size==='sm'?10:11, fontWeight:600, letterSpacing:1, textTransform:'uppercase',
      padding: size==='sm'?'4px 9px':'6px 11px', borderRadius:99,
      background:t.bg, color:t.fg, border:t.border||'none',
      ...soften,
    }}>{children}</span>
  );
}

function Btn({ children, kind='primary', size='md', icon, arrow, onClick, style }) {
  const sizes = {
    sm:{ pad:'8px 14px', fs:12 },
    md:{ pad:'13px 22px', fs:13 },
    lg:{ pad:'17px 28px', fs:14 },
  };
  const s = sizes[size];
  const styles = {
    primary: { bg:PULSE.ink, fg:PULSE.paper, border:'none' },
    coral:   { bg:PULSE.coral, fg:PULSE.ink, border:'none' },
    ghost:   { bg:'transparent', fg:PULSE.ink, border:`1px solid ${PULSE.ink}` },
    light:   { bg:PULSE.paper, fg:PULSE.ink, border:`1px solid ${PULSE.line}` },
  }[kind];
  return (
    <button onClick={onClick} style={{
      display:'inline-flex', alignItems:'center', gap:10,
      background:styles.bg, color:styles.fg, border:styles.border,
      padding:s.pad, borderRadius:99, cursor:'pointer',
      fontFamily:'IBM Plex Sans', fontSize:s.fs, fontWeight:500, letterSpacing:-0.1,
      ...style
    }}>
      {icon}
      <span>{children}</span>
      {arrow && <span style={{fontSize:s.fs+2, lineHeight:1, marginLeft:2}}>→</span>}
    </button>
  );
}

function Kbd({ children }) {
  return (
    <span className="mono" style={{
      fontSize:10, fontWeight:600, padding:'2px 6px', borderRadius:5,
      background:PULSE.paper3, color:PULSE.ink, border:`1px solid ${PULSE.line}`,
    }}>{children}</span>
  );
}

// decorative: soft neon ring/blur
function NeonBlob({ color, size=300, style }) {
  return (
    <div style={{
      position:'absolute', width:size, height:size, borderRadius:'50%',
      background:`radial-gradient(circle, ${color}66 0%, ${color}00 65%)`,
      filter:'blur(8px)', pointerEvents:'none', ...style
    }}/>
  );
}

// Minimalist iconography (line-based, 1.6 stroke) — kept abstract
const Icon = {
  search: (s=16,c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c||'currentColor'} strokeWidth="1.7" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>,
  arrow:  (s=16,c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c||'currentColor'} strokeWidth="1.7" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>,
  pin:    (s=16,c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c||'currentColor'} strokeWidth="1.7"><path d="M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>,
  clock:  (s=16,c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c||'currentColor'} strokeWidth="1.7" strokeLinecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>,
  briefcase:(s=16,c)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c||'currentColor'} strokeWidth="1.7"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
  play:   (s=18,c) => <svg width={s} height={s} viewBox="0 0 24 24" fill={c||'currentColor'}><path d="M8 5v14l11-7z"/></svg>,
  sparkle:(s=16,c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c||'currentColor'} strokeWidth="1.7" strokeLinecap="round"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/></svg>,
  filter: (s=16,c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c||'currentColor'} strokeWidth="1.7" strokeLinecap="round"><path d="M3 5h18M6 12h12M10 19h4"/></svg>,
  bookmark:(s=16,c)=> <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c||'currentColor'} strokeWidth="1.7" strokeLinejoin="round"><path d="M6 3h12v18l-6-4-6 4V3z"/></svg>,
  grid:   (s=16,c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c||'currentColor'} strokeWidth="1.7"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>,
  menu:   (s=18,c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c||'currentColor'} strokeWidth="1.8" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>,
  plus:   (s=14,c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c||'currentColor'} strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>,
  heart:  (s=16,c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c||'currentColor'} strokeWidth="1.7"><path d="M12 21s-7-4.5-9-9.5a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 5-9 9.5-9 9.5z"/></svg>,
  globe:  (s=16,c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c||'currentColor'} strokeWidth="1.6"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/></svg>,
};

// Screen frame — a labeled window that hosts a screen mockup
function ScreenFrame({ label, index, width=1280, children, mobile, subtitle, note }) {
  return (
    <section data-screen-label={label} style={{margin:'0 auto 120px', position:'relative', width: mobile? 420: width+40}}>
      <div style={{display:'flex', alignItems:'baseline', gap:14, marginBottom:18, color:PULSE.paper}}>
        <div className="mono" style={{fontSize:11, letterSpacing:2, opacity:0.5}}>SCREEN / {String(index).padStart(2,'0')}</div>
        <h2 className="display" style={{margin:0, fontWeight:600, fontSize:32, color:PULSE.paper}}>{label}</h2>
        {subtitle && <div style={{opacity:0.55, fontSize:14, color:PULSE.paper}}>{subtitle}</div>}
      </div>
      <div style={{
        background: PULSE.paper, borderRadius: mobile?40:20, overflow:'hidden',
        boxShadow:'0 40px 120px -30px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)',
        position:'relative',
      }}>
        {children}
      </div>
      {note && <div className="mono" style={{marginTop:14, fontSize:11, color:PULSE.paper, opacity:0.45, letterSpacing:1}}>// {note}</div>}
    </section>
  );
}

Object.assign(window, { Chip, Btn, Kbd, NeonBlob, Icon, ScreenFrame });
