// Design system reference — colors, typography, components, CMS legend, mobile header.

function MobileScreen() {
  // miniature mobile homepage for showing the mobile header
  return (
    <div style={{width:390, background:PULSE.paper, color:PULSE.ink, borderRadius:32, overflow:'hidden', boxShadow:'0 30px 80px -20px rgba(0,0,0,0.6)', border:`8px solid #0f0b0e`}}>
      {/* status bar */}
      <div style={{display:'flex', justifyContent:'space-between', padding:'10px 22px 4px', fontSize:12, fontWeight:600}}>
        <span>9:41</span>
        <span style={{display:'flex', gap:6}}>◉◉◉ ▮▮▮</span>
      </div>
      <Block name="mobile_nav" type="global" accent={PULSE.violet}>
        <MobileHeader/>
      </Block>
      <Block name="personalization_banner" type="dynamic" accent={PULSE.amber}>
        <div style={{padding:'12px 18px', background:`linear-gradient(90deg, ${PULSE.amber}22, ${PULSE.coral}18)`, borderBottom:`1px solid ${PULSE.line2}`, display:'flex', gap:10, alignItems:'center'}}>
          <div style={{width:30, height:30, borderRadius:99, background:PULSE.ink, color:PULSE.paper, display:'grid', placeItems:'center', fontFamily:'Space Grotesk', fontWeight:600, fontSize:12}}>AR</div>
          <div style={{flex:1, fontSize:12, lineHeight:1.3}}>
            <div>Hi Alex — <b style={{color:PULSE.coral}}>4 new roles</b> for you</div>
            <div className="mono" style={{fontSize:9, color:PULSE.ink3, letterSpacing:0.5, marginTop:2}}>SR. DESIGNER · REMOTE · LIS · BER</div>
          </div>
          {Icon.arrow(14)}
        </div>
      </Block>
      <Block name="mobile_hero" type="block" accent={PULSE.coral}>
        <div style={{padding:'28px 22px 32px', position:'relative', overflow:'hidden'}}>
          <NeonBlob color={PULSE.coral} size={280} style={{right:-100, top:-60}}/>
          <div className="mono" style={{fontSize:10, letterSpacing:1.5, color:PULSE.ink3, marginBottom:14}}>PULSE / 2026 · CAREERS</div>
          <h1 className="display" style={{margin:0, fontSize:40, fontWeight:500, lineHeight:0.95, letterSpacing:-0.025}}>
            Find Where You Belong.<br/>
            <span style={{background:`linear-gradient(95deg, ${PULSE.coral}, ${PULSE.amber})`, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', fontStyle:'italic'}}>Build What's Next.</span>
          </h1>
          <div style={{marginTop:22, display:'flex', background:PULSE.paper, borderRadius:99, border:`1px solid ${PULSE.line}`, padding:4, alignItems:'center'}}>
            <div style={{padding:'0 12px', color:PULSE.ink3}}>{Icon.search(14)}</div>
            <div style={{flex:1, fontSize:12, color:PULSE.ink3, padding:'10px 0'}}>Search roles, skills, teams</div>
            <button style={{background:PULSE.coral, border:'none', color:PULSE.ink, padding:'8px 14px', borderRadius:99, fontSize:12, fontWeight:500}}>Go</button>
          </div>
          <Btn kind="primary" size="md" arrow style={{marginTop:16, width:'100%', justifyContent:'center'}}>See 247 open roles</Btn>
        </div>
      </Block>
      <Block name="mobile_categories" type="block" accent={PULSE.mint}>
        <div style={{padding:'20px 22px', background:PULSE.paper2, display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
          {[
            {n:'Engineering', c:94, t:PULSE.coral},
            {n:'AI · Research', c:47, t:PULSE.violet},
            {n:'Data Science', c:38, t:PULSE.amber},
            {n:'Design', c:27, t:PULSE.mint},
          ].map(x=>(
            <div key={x.n} style={{background:PULSE.paper, padding:14, borderRadius:12, border:`1px solid ${PULSE.line2}`, position:'relative'}}>
              <div style={{width:6, height:6, borderRadius:99, background:x.t, marginBottom:8, boxShadow:`0 0 8px ${x.t}`}}/>
              <div style={{fontSize:13, fontWeight:600}}>{x.n}</div>
              <div className="mono" style={{fontSize:10, color:PULSE.ink3, letterSpacing:0.5, marginTop:2}}>{x.c} ROLES</div>
            </div>
          ))}
        </div>
      </Block>
    </div>
  );
}

function DesignSystem() {
  return (
    <section style={{width:1280, margin:'0 auto 120px', color:PULSE.paper}}>
      <div style={{display:'flex', alignItems:'baseline', gap:14, marginBottom:18}}>
        <div className="mono" style={{fontSize:11, letterSpacing:2, opacity:0.5}}>APPENDIX / 05</div>
        <h2 className="display" style={{margin:0, fontWeight:600, fontSize:32}}>Design system</h2>
        <div style={{opacity:0.55, fontSize:14}}>Tokens, type scale, and CMS block annotations</div>
      </div>
      <div style={{background:PULSE.paper, color:PULSE.ink, borderRadius:20, padding:48, boxShadow:'0 40px 120px -30px rgba(0,0,0,0.6)'}}>

        {/* COLORS */}
        <div style={{marginBottom:56}}>
          <div className="mono" style={{fontSize:11, letterSpacing:2, color:PULSE.ink3, marginBottom:10}}>§ 01  ·  PALETTE</div>
          <h3 className="display" style={{margin:0, fontSize:32, fontWeight:500, letterSpacing:-0.02}}>Warm cyberpunk — light base, soft neon accents</h3>
          <p style={{fontSize:14, color:PULSE.ink2, maxWidth:640, marginTop:8}}>
            A paper-white foundation over plum ink, with three warm neons (coral, amber, mint) and a violet
            utility. Avoids saturated tech-blues to keep HR-facing pages feeling warm and trustworthy.
          </p>

          <div style={{display:'grid', gridTemplateColumns:'repeat(5, 1fr)', gap:10, marginTop:28}}>
            {[
              { n:'Paper',  v:'#F4EDE1', role:'Primary surface',      fg:PULSE.ink },
              { n:'Paper 2',v:'#EDE3D2', role:'Raised surface',        fg:PULSE.ink },
              { n:'Ink',    v:'#2A1F2E', role:'Primary text · dark UI',fg:PULSE.paper },
              { n:'Ink 2',  v:'#4A3C4F', role:'Body text',             fg:PULSE.paper },
              { n:'Ink 3',  v:'#75687A', role:'Meta · labels',         fg:PULSE.paper },
            ].map(c=>(
              <div key={c.n} style={{background:c.v, color:c.fg, borderRadius:14, padding:20, aspectRatio:'1.1/1', display:'flex', flexDirection:'column', justifyContent:'space-between', border:`1px solid ${PULSE.line2}`}}>
                <div className="mono" style={{fontSize:10, letterSpacing:1, opacity:0.7}}>NEUTRAL</div>
                <div>
                  <div className="display" style={{fontSize:22, fontWeight:600}}>{c.n}</div>
                  <div className="mono" style={{fontSize:11, opacity:0.85, marginTop:2}}>{c.v}</div>
                  <div style={{fontSize:11, opacity:0.8, marginTop:6}}>{c.role}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:10, marginTop:10}}>
            {[
              { n:'Coral',  v:'#FF7A5C', role:'Primary neon · CTAs · hover glow' },
              { n:'Amber',  v:'#F4B942', role:'Secondary · highlights · banners' },
              { n:'Mint',   v:'#7FD4C1', role:'Signal positive · live dots · success' },
              { n:'Violet', v:'#9B7FD4', role:'Tertiary · utility tags · research' },
            ].map(c=>(
              <div key={c.n} style={{background:c.v, color:PULSE.ink, borderRadius:14, padding:20, display:'flex', flexDirection:'column', justifyContent:'space-between', minHeight:140, boxShadow:`0 10px 30px -10px ${c.v}88`}}>
                <div className="mono" style={{fontSize:10, letterSpacing:1, opacity:0.75}}>ACCENT · NEON</div>
                <div>
                  <div className="display" style={{fontSize:26, fontWeight:600}}>{c.n}</div>
                  <div className="mono" style={{fontSize:11, marginTop:2}}>{c.v}</div>
                  <div style={{fontSize:11, marginTop:6, opacity:0.8}}>{c.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TYPE */}
        <div style={{marginBottom:56, borderTop:`1px solid ${PULSE.line2}`, paddingTop:40}}>
          <div className="mono" style={{fontSize:11, letterSpacing:2, color:PULSE.ink3, marginBottom:10}}>§ 02  ·  TYPOGRAPHY</div>
          <h3 className="display" style={{margin:0, fontSize:32, fontWeight:500, letterSpacing:-0.02}}>Three families, warm-humanist stack</h3>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:20, marginTop:28}}>
            {[
              { f:'Space Grotesk', r:'Display · headlines', s:'Italic stylistic cut for emphasis', ex:'Build What\'s Next.', style:{fontFamily:'Space Grotesk', fontWeight:500, fontSize:42, letterSpacing:-0.02, lineHeight:1} },
              { f:'IBM Plex Sans', r:'UI · body', s:'Used for paragraphs, forms, nav', ex:'A staff engineer who cares about production.', style:{fontFamily:'IBM Plex Sans', fontWeight:400, fontSize:18, lineHeight:1.4} },
              { f:'JetBrains Mono', r:'Labels · code · meta', s:'Uppercase + tracking for micro-copy', ex:'NOW HIRING · 247 ROLES · 42 COUNTRIES', style:{fontFamily:'JetBrains Mono', fontWeight:500, fontSize:13, letterSpacing:2} },
            ].map(t=>(
              <div key={t.f} style={{padding:22, borderRadius:14, background:PULSE.paper2, border:`1px solid ${PULSE.line2}`, display:'flex', flexDirection:'column', gap:12}}>
                <div>
                  <div className="mono" style={{fontSize:10, letterSpacing:1.5, color:PULSE.ink3}}>{t.r.toUpperCase()}</div>
                  <div className="display" style={{fontSize:18, fontWeight:600, marginTop:4}}>{t.f}</div>
                  <div style={{fontSize:12, color:PULSE.ink3, marginTop:2}}>{t.s}</div>
                </div>
                <div style={{flex:1, display:'flex', alignItems:'center', ...t.style}}>{t.ex}</div>
              </div>
            ))}
          </div>

          {/* scale */}
          <div style={{marginTop:20, padding:24, background:PULSE.paper2, borderRadius:14, display:'grid', gridTemplateColumns:'repeat(6,1fr)', gap:14}}>
            {[
              {n:'Display XL', s:92, w:500, lh:0.95, use:'Hero 01'},
              {n:'Display L',  s:54, w:500, lh:1.0,  use:'Page titles'},
              {n:'Display M',  s:32, w:500, lh:1.1,  use:'Section H2'},
              {n:'Heading',    s:22, w:600, lh:1.2,  use:'Card titles · H3'},
              {n:'Body',       s:15, w:400, lh:1.6,  use:'Paragraphs'},
              {n:'Meta',       s:11, w:500, lh:1.3,  use:'Labels · mono'},
            ].map(x=>(
              <div key={x.n}>
                <div style={{fontFamily: x.n==='Meta'?'JetBrains Mono':'Space Grotesk', fontSize:x.s>40?40:x.s, fontWeight:x.w, lineHeight:x.lh, letterSpacing:x.s>30?-0.02:0}}>Aa</div>
                <div style={{fontSize:12, fontWeight:600, marginTop:10}}>{x.n}</div>
                <div className="mono" style={{fontSize:10, color:PULSE.ink3, marginTop:2, letterSpacing:0.5}}>{x.s}/{x.s*x.lh|0} · {x.w}</div>
                <div style={{fontSize:11, color:PULSE.ink2, marginTop:4}}>{x.use}</div>
              </div>
            ))}
          </div>
        </div>

        {/* COMPONENT LEGEND */}
        <div style={{marginBottom:56, borderTop:`1px solid ${PULSE.line2}`, paddingTop:40}}>
          <div className="mono" style={{fontSize:11, letterSpacing:2, color:PULSE.ink3, marginBottom:10}}>§ 03  ·  COMPONENTS</div>
          <h3 className="display" style={{margin:0, fontSize:32, fontWeight:500, letterSpacing:-0.02}}>Buttons, chips, job card hover state</h3>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:20, marginTop:24}}>
            <div style={{padding:24, background:PULSE.paper2, borderRadius:14, border:`1px solid ${PULSE.line2}`}}>
              <div className="mono" style={{fontSize:10, letterSpacing:1.5, color:PULSE.ink3, marginBottom:16}}>BUTTONS</div>
              <div style={{display:'flex', flexWrap:'wrap', gap:10}}>
                <Btn kind="primary" size="md" arrow>Primary</Btn>
                <Btn kind="coral" size="md" arrow>Coral CTA</Btn>
                <Btn kind="ghost" size="md">Ghost</Btn>
                <Btn kind="light" size="md">Light</Btn>
                <Btn kind="primary" size="sm">Small</Btn>
                <Btn kind="primary" size="lg" arrow>Large</Btn>
              </div>
              <div style={{height:1, background:PULSE.line2, margin:'22px 0'}}/>
              <div className="mono" style={{fontSize:10, letterSpacing:1.5, color:PULSE.ink3, marginBottom:14}}>CHIPS &amp; TAGS</div>
              <div style={{display:'flex', flexWrap:'wrap', gap:8}}>
                <Chip tone="coral">● High demand</Chip>
                <Chip tone="mint">New · 5h</Chip>
                <Chip tone="amber">Featured</Chip>
                <Chip tone="violet">◉ AI &amp; Research</Chip>
                <Chip tone="paper">JD-2026-0148</Chip>
                <Chip tone="ink">Live · Lisbon HQ</Chip>
              </div>
            </div>

            <div style={{padding:24, background:PULSE.paper2, borderRadius:14, border:`1px solid ${PULSE.line2}`}}>
              <div className="mono" style={{fontSize:10, letterSpacing:1.5, color:PULSE.ink3, marginBottom:16}}>JOB CARD · HOVER STATE</div>
              <div style={{background:PULSE.paper, borderRadius:14, padding:'18px 20px', boxShadow:`0 0 0 1.5px ${PULSE.coral}, 0 12px 36px -12px ${PULSE.coral}55`, position:'relative', overflow:'hidden'}}>
                <div style={{position:'absolute', left:0, top:0, bottom:0, width:3, background:PULSE.coral}}/>
                <div style={{display:'flex', gap:8, alignItems:'center'}}>
                  <Chip tone="mint">Design</Chip>
                  <span className="mono" style={{fontSize:10, color:PULSE.coral, fontWeight:700, letterSpacing:1}}>● 94% MATCH</span>
                </div>
                <div className="display" style={{fontSize:17, fontWeight:600, marginTop:8}}>Senior Product Designer, Developer Platform</div>
                <div style={{fontSize:12, color:PULSE.ink2, marginTop:6}}>Lisbon · Hybrid  ·  €110–135k</div>
              </div>
              <div className="mono" style={{fontSize:10, color:PULSE.ink3, letterSpacing:0.5, marginTop:12}}>
                RING: 1.5px CORAL · GLOW: coral/55 @ 36px  ·  LEFT ACCENT BAR: 3px SOLID
              </div>
            </div>
          </div>
        </div>

        {/* CMS LEGEND */}
        <div style={{borderTop:`1px solid ${PULSE.line2}`, paddingTop:40}}>
          <div className="mono" style={{fontSize:11, letterSpacing:2, color:PULSE.ink3, marginBottom:10}}>§ 04  ·  CMS BLOCKS · STORYBLOK</div>
          <h3 className="display" style={{margin:0, fontSize:32, fontWeight:500, letterSpacing:-0.02}}>Every section is an editable Storyblok component</h3>
          <p style={{fontSize:14, color:PULSE.ink2, maxWidth:640, marginTop:8}}>
            Toggle annotations via the <b>"Show CMS blocks"</b> switch at the top of this document. Each dashed outline
            corresponds to a single reusable component type in Storyblok. Editors can drop, reorder, and localize
            any block without developer involvement.
          </p>
          <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:12, marginTop:22}}>
            {[
              {t:'block',   c:PULSE.mint,   d:'Static marketing section'},
              {t:'dynamic', c:PULSE.amber,  d:'Personalized, API-driven'},
              {t:'global',  c:PULSE.violet, d:'Shared across all pages'},
              {t:'embed',   c:PULSE.coral,  d:'3rd-party (Maps, video)'},
            ].map(x=>(
              <div key={x.t} style={{padding:18, borderRadius:12, border:`1.5px dashed ${x.c}`, background:PULSE.paper2, position:'relative'}}>
                <div style={{display:'flex', alignItems:'center', gap:8}}>
                  <span style={{width:8, height:8, borderRadius:99, background:x.c}}/>
                  <div className="mono" style={{fontSize:11, fontWeight:600, letterSpacing:1, textTransform:'uppercase'}}>storyblok · {x.t}</div>
                </div>
                <div style={{fontSize:12, color:PULSE.ink2, marginTop:8}}>{x.d}</div>
              </div>
            ))}
          </div>

          <div style={{marginTop:22, padding:20, background:PULSE.ink, color:PULSE.paper, borderRadius:14, display:'flex', alignItems:'center', gap:20}}>
            <div className="mono" style={{fontSize:11, letterSpacing:1.5, color:PULSE.mint}}>INVENTORY</div>
            <div style={{display:'flex', gap:24, flex:1, flexWrap:'wrap'}}>
              {[
                ['hero_block','discipline_cards','brand_marquee','employee_stories'],
                ['jobs_search','filter_sidebar','job_listings','results_header'],
                ['jd_header','comp_band','jd_body','location_map','hiring_team','related_roles'],
                ['editorial_hero','hero_video','values','editorial_lifestyle','brand_cta'],
                ['global_nav','global_footer','personalization_banner'],
              ].flat().map(n=>(
                <span key={n} className="mono" style={{fontSize:10, color:PULSE.paper, opacity:0.75, letterSpacing:0.5}}>
                  · {n}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

Object.assign(window, { DesignSystem, MobileScreen });
