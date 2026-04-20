// Shared navigation chrome: top nav, footer, mobile header, personalization banner.

function TopNav({ active = 'Careers', compact }) {
  return (
    <div style={{
      display:'flex', alignItems:'center', justifyContent:'space-between',
      padding: compact? '18px 32px' : '22px 48px',
      borderBottom:`1px solid ${PULSE.line2}`, position:'relative', zIndex:5,
      background:'rgba(244,237,225,0.6)', backdropFilter:'blur(8px)'
    }}>
      <div style={{display:'flex', alignItems:'center', gap:40}}>
        <PulseLogo size={20} />
        <nav style={{display:'flex', gap:28, fontSize:13, color:PULSE.ink2}}>
          {['Careers','Teams','Life at Pulse','Benefits','Internships'].map(n => (
            <a key={n} href="#" style={{
              color: active===n? PULSE.ink: PULSE.ink3, textDecoration:'none',
              fontWeight: active===n? 600: 400, position:'relative', paddingBottom:4,
              borderBottom: active===n? `1.5px solid ${PULSE.coral}`:'1.5px solid transparent'
            }}>{n}</a>
          ))}
        </nav>
      </div>
      <div style={{display:'flex', alignItems:'center', gap:14, fontSize:13}}>
        <a href="#" style={{color:PULSE.ink2, textDecoration:'none'}}>Candidate login</a>
        <div style={{width:1, height:18, background:PULSE.line}}/>
        <div className="mono" style={{
          display:'flex', alignItems:'center', gap:6, fontSize:11, padding:'6px 10px',
          borderRadius:99, background:PULSE.paper3, color:PULSE.ink2
        }}>
          <span style={{width:6, height:6, borderRadius:99, background:PULSE.mint, boxShadow:`0 0 8px ${PULSE.mint}`}}/>
          247 OPEN ROLES
        </div>
        <Btn kind="primary" size="sm" arrow>Apply</Btn>
      </div>
    </div>
  );
}

function MobileHeader() {
  return (
    <div style={{
      display:'flex', alignItems:'center', justifyContent:'space-between',
      padding:'14px 18px', borderBottom:`1px solid ${PULSE.line2}`,
      background:'rgba(244,237,225,0.85)', backdropFilter:'blur(10px)'
    }}>
      <button style={{background:'transparent', border:'none', color:PULSE.ink, padding:4, cursor:'pointer'}}>
        {Icon.menu(20)}
      </button>
      <PulseLogo size={16} />
      <button style={{background:PULSE.ink, color:PULSE.paper, border:'none', padding:'7px 14px', borderRadius:99, fontSize:12, fontFamily:'inherit'}}>
        Sign in
      </button>
    </div>
  );
}

function PersonalizationBanner({ accent = PULSE.coral }) {
  return (
    <Block name="personalization_banner" type="dynamic" accent={PULSE.amber}>
      <div style={{
        display:'flex', alignItems:'center', justifyContent:'space-between',
        padding:'14px 48px', background: `linear-gradient(90deg, ${PULSE.amber}22, ${PULSE.coral}18)`,
        borderBottom:`1px solid ${PULSE.line2}`,
      }}>
        <div style={{display:'flex', alignItems:'center', gap:14}}>
          <div style={{
            width:34, height:34, borderRadius:99, background:PULSE.ink, color:PULSE.paper,
            display:'grid', placeItems:'center', fontFamily:'Space Grotesk', fontWeight:600, fontSize:13,
            boxShadow:`0 0 0 2px ${PULSE.paper}, 0 0 0 3px ${PULSE.coral}`
          }}>AR</div>
          <div>
            <div style={{fontSize:14, color:PULSE.ink}}>
              <span style={{fontWeight:600}}>Welcome back, Alex</span>
              <span style={{color:PULSE.ink3}}> — </span>
              <span style={{color:PULSE.ink}}>
                <b style={{color:PULSE.coral}}>4 new roles</b> match your profile
              </span>
            </div>
            <div className="mono" style={{fontSize:10, color:PULSE.ink3, letterSpacing:1, marginTop:2}}>
              SAVED · SR. PRODUCT DESIGNER · REMOTE · LISBON · BERLIN
            </div>
          </div>
        </div>
        <div style={{display:'flex', alignItems:'center', gap:10}}>
          <button style={{background:'transparent', border:'none', color:PULSE.ink2, fontSize:12, cursor:'pointer'}}>Not Alex?</button>
          <Btn kind="primary" size="sm" arrow>View matches</Btn>
        </div>
      </div>
    </Block>
  );
}

function Footer() {
  return (
    <Block name="global_footer" type="global" accent={PULSE.violet}>
      <div style={{
        background:PULSE.ink, color:PULSE.paper, padding:'56px 48px 32px', position:'relative', overflow:'hidden'
      }}>
        <NeonBlob color={PULSE.coral} size={500} style={{right:-150, top:-200, opacity:0.3}}/>
        <div style={{display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr', gap:40, position:'relative', zIndex:2}}>
          <div>
            <PulseLogo size={22} color={PULSE.paper} />
            <div className="display" style={{fontSize:28, fontWeight:500, marginTop:20, maxWidth:340, letterSpacing:-0.02}}>
              Building the infrastructure of everyday intelligence.
            </div>
            <div className="mono" style={{fontSize:10, letterSpacing:1.5, color:PULSE.mint, marginTop:24}}>
              ◉ NYC · LDN · LIS · BER · SGP · SF · RMT
            </div>
          </div>
          {[
            {t:'Careers', i:['Open roles','Teams','Internships','Returners','Referrals']},
            {t:'Culture',  i:['Life at Pulse','Benefits','Learning','DEI report','Parental']},
            {t:'Company',  i:['About','Research','News','Investors','Press kit']},
          ].map(col=>(
            <div key={col.t}>
              <div className="mono" style={{fontSize:10, color:PULSE.mint, letterSpacing:1.5, marginBottom:14}}>{col.t.toUpperCase()}</div>
              {col.i.map(x => <div key={x} style={{fontSize:13, margin:'8px 0', opacity:0.85}}>{x}</div>)}
            </div>
          ))}
        </div>
        <div style={{borderTop:`1px solid rgba(244,237,225,0.12)`, marginTop:42, paddingTop:20, display:'flex', justifyContent:'space-between', fontSize:11, opacity:0.55}} className="mono">
          <div>© 2026 PULSE SYSTEMS, INC.  ·  ALL RIGHTS RESERVED</div>
          <div>PRIVACY  ·  TERMS  ·  ACCESSIBILITY  ·  CANDIDATE PRIVACY</div>
        </div>
      </div>
    </Block>
  );
}

Object.assign(window, { TopNav, MobileHeader, PersonalizationBanner, Footer });
