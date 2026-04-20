// Top-level app: scrollable canvas with a controls bar (CMS toggle), all four screens + mobile + design system.

function Controls({ cms, setCms }) {
  return (
    <div style={{
      position:'sticky', top:16, zIndex:100, display:'flex', justifyContent:'center',
      pointerEvents:'none', marginBottom:-50
    }}>
      <div style={{
        pointerEvents:'auto', display:'flex', alignItems:'center', gap:14,
        background:'rgba(26,20,24,0.85)', backdropFilter:'blur(12px)',
        color:PULSE.paper, padding:'10px 14px', borderRadius:99,
        border:`1px solid rgba(244,237,225,0.12)`,
        boxShadow:'0 20px 60px -20px rgba(0,0,0,0.6)',
      }}>
        <PulseLogo size={16} color={PULSE.paper}/>
        <div style={{width:1, height:16, background:'rgba(244,237,225,0.2)'}}/>
        <div className="mono" style={{fontSize:10, letterSpacing:1.5, opacity:0.75}}>CAREERS SITE · V1.0 · APR 2026</div>
        <div style={{width:1, height:16, background:'rgba(244,237,225,0.2)'}}/>
        <button
          onClick={()=>setCms(!cms)}
          style={{
            display:'flex', alignItems:'center', gap:8,
            background: cms? PULSE.mint : 'transparent',
            color: cms? PULSE.ink : PULSE.paper,
            border: cms? 'none' : `1px solid rgba(244,237,225,0.25)`,
            padding:'6px 12px', borderRadius:99, fontFamily:'inherit', fontSize:11, fontWeight:600, cursor:'pointer', letterSpacing:0.3,
          }}>
          <span style={{
            width:28, height:14, background: cms?PULSE.ink:'rgba(244,237,225,0.2)', borderRadius:99, position:'relative', transition:'all .2s'
          }}>
            <span style={{position:'absolute', top:2, left: cms?16:2, width:10, height:10, borderRadius:99, background: cms?PULSE.mint:PULSE.paper, transition:'all .2s'}}/>
          </span>
          Show CMS blocks
        </button>
      </div>
    </div>
  );
}

function CanvasTitle() {
  return (
    <header style={{padding:'72px 48px 56px', color:PULSE.paper, maxWidth:1320, margin:'0 auto'}}>
      <div style={{display:'flex', alignItems:'center', gap:14, marginBottom:28}}>
        <PulseLogo size={22} color={PULSE.paper}/>
        <div style={{width:1, height:22, background:'rgba(244,237,225,0.2)'}}/>
        <div className="mono" style={{fontSize:11, letterSpacing:2, opacity:0.6}}>CAREERS SITE · PORTFOLIO PRESENTATION</div>
      </div>
      <h1 className="display" style={{margin:0, fontSize:80, fontWeight:500, letterSpacing:-0.035, lineHeight:0.95, maxWidth:1100}}>
        Pulse — a warm-cyberpunk careers experience<br/>
        <span style={{color:'rgba(244,237,225,0.45)'}}>built for Storyblok, designed for humans.</span>
      </h1>
      <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:20, marginTop:48, maxWidth:1100}}>
        {[
          {l:'SCREENS', v:'4 hi-fi + 1 mobile', s:'Home · Results · JD · Brand'},
          {l:'SYSTEM',  v:'Paper · Ink · 3 neons', s:'Warm, approachable futurism'},
          {l:'CMS',     v:'Storyblok-ready', s:'Every block annotated'},
          {l:'AUDIENCE',v:'HR · Recruiters', s:'Trust > spectacle'},
        ].map(x=>(
          <div key={x.l}>
            <div className="mono" style={{fontSize:10, letterSpacing:1.5, opacity:0.5}}>{x.l}</div>
            <div className="display" style={{fontSize:22, fontWeight:500, marginTop:8}}>{x.v}</div>
            <div style={{fontSize:12, opacity:0.6, marginTop:4}}>{x.s}</div>
          </div>
        ))}
      </div>
    </header>
  );
}

function App() {
  const [cms, setCms] = React.useState(false);
  return (
    <CMSCtx.Provider value={{on: cms}}>
      <Controls cms={cms} setCms={setCms}/>
      <CanvasTitle/>
      <main style={{padding:'0 20px 80px'}}>
        <ScreenFrame label="01 Homepage" index={1} subtitle="Hero · categories · brand strip · stories" note="Desktop · 1280w · warm paper base with soft neon accents">
          <Homepage/>
        </ScreenFrame>

        <ScreenFrame label="02 Job Results" index={2} subtitle="Filter sidebar · job cards with neon hover · saved-alert" note="Hover state simulated on row 2 (94% match)">
          <ResultsPage/>
        </ScreenFrame>

        <ScreenFrame label="03 Job Description" index={3} subtitle="Full JD · comp band · map · hiring team · related roles" note="Stylized Maps module stands in for embedded Google Maps iframe">
          <JDPage/>
        </ScreenFrame>

        <ScreenFrame label="04 Employer Brand — Life at Pulse" index={4} subtitle="Editorial · values · lifestyle imagery · video embed zone" note="Masthead-style layout; every section is a CMS block">
          <BrandPage/>
        </ScreenFrame>

        <ScreenFrame label="05 Mobile Header (responsive check)" index={5} mobile subtitle="Homepage, tightened for mobile — nav, banner, hero, categories" note="Condensed top nav · tap-targets ≥ 44px · banner persists">
          <MobileScreen/>
        </ScreenFrame>

        <DesignSystem/>
      </main>
      <footer style={{color:PULSE.paper, opacity:0.4, textAlign:'center', padding:'40px 20px 60px', fontFamily:'JetBrains Mono', fontSize:11, letterSpacing:1.5}}>
        — END · PULSE CAREERS · PORTFOLIO PIECE · NOT A REAL COMPANY —
      </footer>
    </CMSCtx.Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
