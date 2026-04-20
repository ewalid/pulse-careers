// SCREEN 03 — JOB DESCRIPTION (polished + interactive)
function JDPage() {
  const [tab, setTab] = React.useState('role');
  const [teamIdx, setTeamIdx] = React.useState(0);
  const [salary, setSalary] = React.useState(180);
  const [saved, setSaved] = React.useState(false);
  const [processStep, setProcessStep] = React.useState(2);
  const [mapZoom, setMapZoom] = React.useState(1);
  const [applyHover, setApplyHover] = React.useState(false);

  // animated progress for "application fills fast" bar
  const [applicants, setApplicants] = React.useState(180);
  React.useEffect(()=>{
    const t = setInterval(()=> setApplicants(a => a + (Math.random()<0.3?1:0)), 2200);
    return ()=> clearInterval(t);
  },[]);

  const team = [
    {n:'Priya Ramanathan', r:'Director, Reliability', role:'Hiring Manager', t:'coral', bio:'Joined Pulse from a peer lab in 2023. Rebuilding the Reliability org around long-term, memo-first engineering. Former pianist.', yrs:3, loc:'Berlin'},
    {n:'Jonas Weber',      r:'Talent Partner',         role:'Recruiter',       t:'mint',  bio:'Ten years hiring for infra and ML orgs across Europe. Will be your guide through every round. Replies within 24h.', yrs:5, loc:'Berlin'},
    {n:'Tomás Silva',      r:'Staff Engineer',         role:'Future peer',     t:'amber', bio:'Built our current eval harness (the one you\'ll replace). Excited to hand it over. Keeps bees on the weekend.', yrs:4, loc:'Lisbon'},
  ];

  const processSteps = [
    {n:'01',t:'Apply',       d:'~3 min · résumé or LinkedIn',       c:PULSE.coral,  detail:'No cover letter. Upload a résumé or paste your LinkedIn. We read every one — Jonas personally reviews within 24 hours.'},
    {n:'02',t:'Intro call',  d:'30 min · with recruiter',           c:PULSE.amber,  detail:'Relaxed conversation with Jonas about the role, your interests, comp expectations, and timing. No trick questions.'},
    {n:'03',t:'Technical',   d:'90 min · pair on a real bug',       c:PULSE.mint,   detail:'You\'ll pair with two engineers on an actual open issue from our eval harness. We want to see how you think, not how you memorize.'},
    {n:'04',t:'Team loop',   d:'4 × 45 min · remote or onsite',     c:PULSE.violet, detail:'System design, leadership, values, and a peer-to-peer chat. We pay for travel if you visit Berlin.'},
    {n:'05',t:'Offer',       d:'48 hrs · transparent comp',         c:PULSE.coral,  detail:'We send written offers within 48 hours of the loop. Comp is transparent — you\'ll see the band before signing.'},
  ];

  const skills = [
    {name:'Python', level:95, need:90},
    {name:'Distributed systems', level:85, need:80},
    {name:'ML evaluation', level:90, need:85},
    {name:'Rust / Go', level:60, need:50},
    {name:'Leadership', level:80, need:75},
  ];

  return (
    <div style={{width:1280, background:PULSE.paper, color:PULSE.ink}}>
      <Block name="global_nav" type="global" accent={PULSE.violet}><TopNav active="Careers"/></Block>

      {/* HEADER — dense, editorial, with live applicants bar */}
      <Block name="jd_header" type="block" accent={PULSE.coral}>
        <div style={{padding:'32px 48px 44px', background:PULSE.paper2, borderBottom:`1px solid ${PULSE.line2}`, position:'relative', overflow:'hidden'}}>
          <NeonBlob color={PULSE.coral} size={500} style={{right:-120, top:-200, opacity:0.55}}/>
          <NeonBlob color={PULSE.amber} size={320} style={{right:200, bottom:-150, opacity:0.35}}/>

          <div className="mono" style={{fontSize:11, color:PULSE.ink3, letterSpacing:1, marginBottom:18, position:'relative'}}>
            CAREERS  ›  AI &amp; RESEARCH  ›  <span style={{color:PULSE.ink}}>STAFF ML ENGINEER · MODEL RELIABILITY</span>
            <span style={{marginLeft:18, color:PULSE.ink3}}>·  JD-2026-0148</span>
          </div>

          <div style={{display:'grid', gridTemplateColumns:'1fr auto', gap:40, alignItems:'start', position:'relative'}}>
            <div>
              <div style={{display:'flex', gap:8, marginBottom:16, flexWrap:'wrap'}}>
                <Chip tone="violet">◉ AI &amp; Research</Chip>
                <Chip tone="coral">● High demand</Chip>
                <Chip tone="mint">Visa sponsorship</Chip>
                <Chip tone="paper">Hybrid · 3 days</Chip>
                <Chip tone="paper">Staff · L6</Chip>
              </div>
              <h1 className="display" style={{margin:0, fontSize:56, fontWeight:500, letterSpacing:-0.025, lineHeight:1, maxWidth:900}}>
                Staff Machine Learning Engineer,<br/>
                <span style={{
                  background:`linear-gradient(95deg, ${PULSE.coral}, ${PULSE.amber})`,
                  WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', fontStyle:'italic'
                }}>Model Reliability.</span>
              </h1>
              <div style={{display:'flex', gap:24, marginTop:22, fontSize:13, color:PULSE.ink2, flexWrap:'wrap'}}>
                <span style={{display:'flex', gap:7, alignItems:'center'}}>{Icon.pin(14)} Berlin · Mitte</span>
                <span style={{display:'flex', gap:7, alignItems:'center'}}>{Icon.briefcase(14)} Full-time · 14-person org</span>
                <span style={{display:'flex', gap:7, alignItems:'center'}}>{Icon.clock(14)} Posted 2d · Closes May 18</span>
                <span style={{display:'flex', gap:7, alignItems:'center'}}>{Icon.globe(14)} 42 countries rep'd on team</span>
              </div>

              {/* live applicants bar */}
              <div style={{marginTop:26, maxWidth:520, padding:14, background:PULSE.paper, borderRadius:14, border:`1px solid ${PULSE.line2}`}}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8}}>
                  <div className="mono" style={{fontSize:10, color:PULSE.ink3, letterSpacing:1, display:'flex', alignItems:'center', gap:8}}>
                    <span style={{width:6, height:6, borderRadius:99, background:PULSE.coral, boxShadow:`0 0 8px ${PULSE.coral}`, animation:'pulse-dot 1.6s ease-in-out infinite'}}/>
                    LIVE · APPLICATIONS THIS ROLE
                  </div>
                  <div style={{fontSize:12, fontWeight:600, color:PULSE.ink}}>{applicants} <span style={{color:PULSE.ink3, fontWeight:400}}>applicants</span></div>
                </div>
                <div style={{height:6, background:PULSE.paper3, borderRadius:99, overflow:'hidden', position:'relative'}}>
                  <div style={{position:'absolute', left:0, width:`${Math.min(95, applicants/3)}%`, height:'100%', background:`linear-gradient(90deg, ${PULSE.mint}, ${PULSE.amber}, ${PULSE.coral})`, borderRadius:99, transition:'width 0.6s ease'}}/>
                </div>
                <div className="mono" style={{fontSize:10, color:PULSE.ink3, letterSpacing:0.5, marginTop:6, display:'flex', justifyContent:'space-between'}}>
                  <span>2 SHORTLISTED TODAY · SHORTLIST CLOSES IN 14 DAYS</span>
                  <span style={{color:PULSE.coral, fontWeight:600}}>HIGH INTEREST</span>
                </div>
              </div>
            </div>

            <div style={{display:'flex', flexDirection:'column', gap:10, minWidth:280, position:'sticky', top:20}}>
              <Btn
                kind="coral" size="lg" arrow
                onClick={()=>{}}
                style={{
                  fontSize:15, padding:'18px 28px', justifyContent:'center',
                  boxShadow: applyHover? `0 20px 40px -12px ${PULSE.coral}dd, 0 0 0 4px ${PULSE.coral}33` : `0 12px 28px -12px ${PULSE.coral}99`,
                  transform: applyHover? 'translateY(-1px)' : 'none', transition:'all .2s'
                }}
              >
                <span onMouseEnter={()=>setApplyHover(true)} onMouseLeave={()=>setApplyHover(false)} style={{display:'contents'}}/>
                Apply in 3 minutes
              </Btn>
              <div style={{display:'flex', gap:8}}>
                <Btn kind={saved?'primary':'light'} size="md" icon={Icon.bookmark(14)} onClick={()=>setSaved(!saved)} style={{flex:1, justifyContent:'center'}}>
                  {saved?'Saved':'Save'}
                </Btn>
                <Btn kind="light" size="md" icon={Icon.heart(14)} style={{flex:1, justifyContent:'center'}}>Refer</Btn>
                <button style={{background:PULSE.paper, border:`1px solid ${PULSE.line}`, padding:'0 14px', borderRadius:99, color:PULSE.ink2, cursor:'pointer'}}>↗</button>
              </div>
              <div className="mono" style={{fontSize:10, color:PULSE.ink3, letterSpacing:0.5, textAlign:'center'}}>
                ~3 MIN · NO COVER LETTER · RESPONSE IN 24H
              </div>
            </div>
          </div>
        </div>
      </Block>

      {/* two-col body */}
      <div style={{display:'grid', gridTemplateColumns:'1fr 380px', gap:0, background:PULSE.paper}}>
        {/* MAIN */}
        <div style={{padding:'40px 40px 48px 48px', borderRight:`1px solid ${PULSE.line2}`}}>

          {/* COMP CALCULATOR — interactive */}
          <Block name="comp_calculator" type="interactive" accent={PULSE.amber}>
            <div style={{background:PULSE.ink, color:PULSE.paper, borderRadius:18, padding:28, position:'relative', overflow:'hidden', marginBottom:40}}>
              <NeonBlob color={PULSE.amber} size={400} style={{right:-150, top:-150, opacity:0.5}}/>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'start', position:'relative', marginBottom:18}}>
                <div>
                  <div className="mono" style={{fontSize:10, color:PULSE.mint, letterSpacing:1.5}}>◉ INTERACTIVE · COMP CALCULATOR</div>
                  <div className="display" style={{fontSize:22, fontWeight:600, marginTop:4, letterSpacing:-0.01}}>Model your first year</div>
                </div>
                <Chip tone="mint">Transparent comp</Chip>
              </div>

              {/* slider */}
              <div style={{position:'relative', padding:'8px 0'}}>
                <div style={{display:'flex', justifyContent:'space-between', marginBottom:10, fontSize:12, opacity:0.7}}>
                  <span className="mono">€165k</span>
                  <span className="mono" style={{color:PULSE.coral, fontWeight:700}}>BASE · €{salary}k</span>
                  <span className="mono">€195k</span>
                </div>
                <div style={{height:6, background:'rgba(244,237,225,0.15)', borderRadius:99, position:'relative', cursor:'pointer'}}>
                  <div style={{width:`${((salary-165)/30)*100}%`, height:'100%', background:`linear-gradient(90deg, ${PULSE.mint}, ${PULSE.amber}, ${PULSE.coral})`, borderRadius:99, boxShadow:`0 0 20px ${PULSE.coral}66`}}/>
                  <input
                    type="range" min={165} max={195} value={salary}
                    onChange={e=>setSalary(+e.target.value)}
                    style={{position:'absolute', inset:0, width:'100%', opacity:0, cursor:'pointer'}}
                  />
                  <div style={{position:'absolute', left:`${((salary-165)/30)*100}%`, top:'50%', transform:'translate(-50%,-50%)', width:22, height:22, borderRadius:99, background:PULSE.paper, border:`3px solid ${PULSE.coral}`, boxShadow:`0 4px 16px ${PULSE.coral}88, 0 0 0 6px ${PULSE.coral}22`}}/>
                </div>
              </div>

              {/* output grid */}
              <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:12, marginTop:24, position:'relative'}}>
                {[
                  {l:'Base',     v:`€${salary}k`,                     c:PULSE.paper},
                  {l:'Equity (mid)', v:`€${Math.round(salary*0.18)}k/yr`,  c:PULSE.mint,  sub:'0.08% · 4yr vest'},
                  {l:'Sign-on',  v:`€${Math.round(salary*0.12)}k`,     c:PULSE.amber, sub:'one-time'},
                  {l:'Target total', v:`€${salary + Math.round(salary*0.18) + Math.round(salary*0.06)}k`, c:PULSE.coral, sub:'year-1 expected', big:true},
                ].map(x=>(
                  <div key={x.l} style={{padding:14, background:'rgba(244,237,225,0.06)', borderRadius:12, border: x.big?`1.5px solid ${PULSE.coral}`:'1px solid rgba(244,237,225,0.1)'}}>
                    <div className="mono" style={{fontSize:9, color:'rgba(244,237,225,0.6)', letterSpacing:1}}>{x.l.toUpperCase()}</div>
                    <div className="display" style={{fontSize: x.big?26:20, fontWeight:600, marginTop:6, color:x.c, letterSpacing:-0.01}}>{x.v}</div>
                    {x.sub && <div className="mono" style={{fontSize:9, color:'rgba(244,237,225,0.5)', marginTop:4, letterSpacing:0.5}}>{x.sub.toUpperCase()}</div>}
                  </div>
                ))}
              </div>
              <div className="mono" style={{fontSize:10, color:'rgba(244,237,225,0.5)', letterSpacing:0.5, marginTop:16}}>
                + €3,000 learning budget · 18wk parental · 6wk sabbatical @ y4 · €1,800 home office
              </div>
            </div>
          </Block>

          {/* TABBED JD BODY */}
          <Block name="jd_body" type="richtext" accent={PULSE.mint}>
            <div style={{display:'flex', gap:2, background:PULSE.paper2, padding:4, borderRadius:99, marginBottom:24, width:'fit-content'}}>
              {[
                {k:'role',  l:'The role'},
                {k:'do',    l:'What you\'ll do'},
                {k:'look',  l:'What we\'re looking for'},
                {k:'skill', l:'Skills fit'},
              ].map(t=>(
                <button key={t.k} onClick={()=>setTab(t.k)} style={{
                  background: tab===t.k? PULSE.ink : 'transparent',
                  color: tab===t.k? PULSE.paper : PULSE.ink2,
                  border:'none', padding:'10px 18px', borderRadius:99, cursor:'pointer',
                  fontFamily:'inherit', fontSize:13, fontWeight:500, transition:'all .18s'
                }}>{t.l}</button>
              ))}
            </div>

            <div style={{fontSize:15.5, lineHeight:1.7, color:PULSE.ink2, maxWidth:760, minHeight:320}}>
              {tab==='role' && (
                <>
                  <p style={{marginTop:0}}>
                    We're building the team that keeps Pulse's 2.4-trillion-parameter foundation model honest in production.
                    As a Staff ML Engineer on Model Reliability, you'll own the tooling, telemetry, and evaluation
                    systems that let thousands of engineers ship changes without regressing user trust.
                  </p>
                  <p>
                    You'll partner closely with Research, Applied, and Safety — and report to Priya (Director, Reliability),
                    who is actively rebuilding this team around long-term thinking.
                  </p>
                  <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12, marginTop:24}}>
                    {[
                      {l:'You\'ll impact', v:'40M', s:'daily users'},
                      {l:'Team size',      v:'14',  s:'direct org'},
                      {l:'Code owners',    v:'3k+', s:'engineers rely on your tools'},
                    ].map(x=>(
                      <div key={x.l} style={{padding:16, background:PULSE.paper2, borderRadius:12}}>
                        <div className="mono" style={{fontSize:10, color:PULSE.ink3, letterSpacing:1}}>{x.l.toUpperCase()}</div>
                        <div className="display" style={{fontSize:32, fontWeight:600, color:PULSE.ink, marginTop:4, letterSpacing:-0.02}}>{x.v}</div>
                        <div style={{fontSize:12, color:PULSE.ink2, marginTop:2}}>{x.s}</div>
                      </div>
                    ))}
                  </div>
                </>
              )}
              {tab==='do' && (
                <ul style={{paddingLeft:0, margin:0, listStyle:'none'}}>
                  {[
                    ['Design',  'Next-gen continuous evaluation harness — used by every model team, every day.', PULSE.coral],
                    ['Define',  'What "reliability" means for a frontier model serving 40M users — and the dashboards that prove it.', PULSE.amber],
                    ['Mentor',  '3–5 engineers; own architecture reviews; set direction for a 14-person org.', PULSE.mint],
                    ['Collaborate', 'With Safety on red-team infrastructure and regression budgets.', PULSE.violet],
                  ].map(([v,t,c],i)=>(
                    <li key={i} style={{display:'flex', gap:16, padding:'16px 0', borderBottom:`1px solid ${PULSE.line2}`, alignItems:'start'}}>
                      <div className="display" style={{fontSize:22, fontWeight:600, color:c, minWidth:110, letterSpacing:-0.01}}>{v}</div>
                      <div style={{color:PULSE.ink, fontSize:15, flex:1}}>{t}</div>
                    </li>
                  ))}
                </ul>
              )}
              {tab==='look' && (
                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
                  {[
                    ['Must','7+ years production ML, with at least 2 at Staff+'],
                    ['Must','Led a 0→1 evaluation or telemetry system at meaningful scale'],
                    ['Must','Fluency in Python + one of Rust / Go for infra code'],
                    ['Must','Comfort operating across research ↔ product boundaries'],
                    ['Nice','Background in distributed systems or reliability engineering'],
                    ['Nice','Published work on eval, interpretability, or model behavior'],
                    ['Nice','Open source contributions to ML tooling'],
                    ['Nice','Experience hiring and growing senior engineers'],
                  ].map(([tag,text],i)=>(
                    <div key={i} style={{display:'flex', gap:10, padding:'12px 14px', background:PULSE.paper2, borderRadius:12, alignItems:'start'}}>
                      <Chip tone={tag==='Must'?'coral':'mint'} size="sm">{tag}</Chip>
                      <div style={{fontSize:13, color:PULSE.ink, lineHeight:1.4, flex:1}}>{text}</div>
                    </div>
                  ))}
                </div>
              )}
              {tab==='skill' && (
                <div>
                  <p style={{marginTop:0, maxWidth:600}}>
                    We used your uploaded CV to estimate fit across the 5 dimensions we care about for this role.
                    <b style={{color:PULSE.ink}}> You're a 92% match.</b>
                  </p>
                  <div style={{display:'flex', flexDirection:'column', gap:14, marginTop:20}}>
                    {skills.map((s,i)=>(
                      <div key={s.name}>
                        <div style={{display:'flex', justifyContent:'space-between', marginBottom:6}}>
                          <div style={{fontSize:13, fontWeight:600, color:PULSE.ink}}>{s.name}</div>
                          <div className="mono" style={{fontSize:11, color:PULSE.ink3}}>YOU {s.level} · REQ {s.need}</div>
                        </div>
                        <div style={{height:8, background:PULSE.paper2, borderRadius:99, position:'relative', overflow:'hidden'}}>
                          <div style={{position:'absolute', left:0, width:`${s.need}%`, height:'100%', background:PULSE.paper3, borderRadius:99}}/>
                          <div style={{position:'absolute', left:0, width:`${s.level}%`, height:'100%', background: s.level>=s.need? `linear-gradient(90deg, ${PULSE.mint}, ${PULSE.coral})` : PULSE.amber, borderRadius:99, boxShadow: s.level>=s.need? `0 0 12px ${PULSE.coral}66`:'none', transition:`width ${0.4+i*0.1}s ease-out`}}/>
                          <div style={{position:'absolute', left:`${s.need}%`, top:-2, bottom:-2, width:2, background:PULSE.ink, opacity:0.6}}/>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Block>

          {/* PROCESS — interactive timeline */}
          <Block name="process_timeline" type="interactive" accent={PULSE.violet} style={{marginTop:48}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'end', marginBottom:22}}>
              <h3 className="display" style={{fontSize:26, fontWeight:600, color:PULSE.ink, margin:0, letterSpacing:-0.015}}>Our hiring process</h3>
              <div className="mono" style={{fontSize:11, color:PULSE.ink3, letterSpacing:1}}>◉ TOTAL TIME · ~14 DAYS · CLICK A STEP</div>
            </div>

            <div style={{position:'relative', padding:'0 0 20px'}}>
              {/* connecting line */}
              <div style={{position:'absolute', left:'6%', right:'6%', top:18, height:2, background:PULSE.paper3, borderRadius:99}}/>
              <div style={{position:'absolute', left:'6%', top:18, height:2, width:`${(processStep/(processSteps.length-1))*88}%`, background:`linear-gradient(90deg, ${PULSE.coral}, ${PULSE.amber})`, borderRadius:99, transition:'width .4s ease'}}/>

              <div style={{display:'grid', gridTemplateColumns:`repeat(${processSteps.length},1fr)`, gap:10, position:'relative'}}>
                {processSteps.map((s,i)=>{
                  const active = i===processStep;
                  const done = i<processStep;
                  return (
                    <button key={s.n} onClick={()=>setProcessStep(i)} style={{
                      background:'transparent', border:'none', cursor:'pointer', textAlign:'left',
                      fontFamily:'inherit', color:PULSE.ink, padding:0,
                    }}>
                      <div style={{
                        width: active?42:36, height: active?42:36, borderRadius:99,
                        background: active? s.c : done? s.c : PULSE.paper3,
                        color: active||done? PULSE.ink : PULSE.ink3,
                        display:'grid', placeItems:'center',
                        fontFamily:'JetBrains Mono', fontSize: active?13:11, fontWeight:700,
                        boxShadow: active? `0 0 0 6px ${s.c}33, 0 8px 24px -4px ${s.c}99`:'none',
                        transition:'all .25s', marginTop: active?-3:0,
                      }}>
                        {done && !active? '✓' : s.n}
                      </div>
                      <div style={{fontSize:14, fontWeight:600, marginTop:14, color: active?PULSE.ink:PULSE.ink2}}>{s.t}</div>
                      <div style={{fontSize:11, color:PULSE.ink3, marginTop:3}}>{s.d}</div>
                    </button>
                  );
                })}
              </div>

              <div style={{marginTop:28, padding:'18px 22px', background:PULSE.paper2, borderRadius:14, borderLeft:`3px solid ${processSteps[processStep].c}`, display:'flex', gap:16, alignItems:'start'}}>
                <div className="mono" style={{fontSize:10, letterSpacing:1.5, color:PULSE.ink3, minWidth:90}}>STEP {processSteps[processStep].n}</div>
                <div style={{fontSize:14, color:PULSE.ink, lineHeight:1.6, flex:1}}>
                  {processSteps[processStep].detail}
                </div>
              </div>
            </div>
          </Block>

          {/* FAQ accordion */}
          <Block name="jd_faq" type="block" accent={PULSE.mint} style={{marginTop:48}}>
            <h3 className="display" style={{fontSize:26, fontWeight:600, color:PULSE.ink, margin:'0 0 18px', letterSpacing:-0.015}}>Things candidates ask</h3>
            <FAQ/>
          </Block>
        </div>

        {/* SIDEBAR */}
        <aside style={{padding:'40px 36px', background:PULSE.paper2}}>

          {/* INTERACTIVE MAP */}
          <Block name="location_map" type="embed" accent={PULSE.mint}>
            <div style={{background:PULSE.paper, borderRadius:16, overflow:'hidden', border:`1px solid ${PULSE.line2}`, boxShadow:'0 8px 28px -12px rgba(42,31,46,0.2)'}}>
              <div style={{padding:'14px 16px', borderBottom:`1px solid ${PULSE.line2}`, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <div>
                  <div className="mono" style={{fontSize:10, color:PULSE.ink3, letterSpacing:1}}>◉ LOCATION</div>
                  <div style={{fontSize:14, fontWeight:600, marginTop:2}}>Pulse Berlin · Mitte</div>
                </div>
                <Chip tone="paper">Hybrid · 3 days</Chip>
              </div>
              {/* stylized map */}
              <div style={{position:'relative', height:240, background:'#E7DCC9', overflow:'hidden', cursor:'grab'}}>
                <div style={{position:'absolute', inset:0, transform:`scale(${mapZoom})`, transformOrigin:'52% 45%', transition:'transform .4s ease'}}>
                  <svg width="100%" height="100%" viewBox="0 0 360 240" style={{display:'block'}}>
                    <defs>
                      <pattern id="map-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(42,31,46,0.06)" strokeWidth="0.5"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#map-grid)"/>
                    <path d="M-20 130 Q 80 95 160 140 T 380 120 L 380 170 Q 260 200 160 180 T -20 180 Z" fill="#B9D6D0" opacity="0.75"/>
                    {[[20,50,340,90],[40,25,80,215],[20,180,340,210],[180,0,220,240],[250,25,300,225],[0,120,360,120]].map(([x1,y1,x2,y2],i)=>(
                      <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#F4EDE1" strokeWidth="6" opacity="0.9"/>
                    ))}
                    {[...Array(14)].map((_,i)=>{
                      const x = 30+(i%5)*65, y = 30+Math.floor(i/5)*60;
                      return <rect key={i} x={x} y={y} width={45+(i*7)%15} height={28+(i*11)%18} rx="3" fill="#D7C6A8" opacity="0.7"/>
                    })}
                    {/* nearby amenities dots */}
                    <circle cx="110" cy="80" r="4" fill={PULSE.amber}/>
                    <circle cx="230" cy="60" r="4" fill={PULSE.mint}/>
                    <circle cx="260" cy="140" r="4" fill={PULSE.violet}/>
                    <circle cx="90" cy="170" r="4" fill={PULSE.mint}/>
                    <text x="8" y="232" fontFamily="IBM Plex Sans" fontSize="9" fill="#75687A">Map data · Pulse Atlas · Google</text>
                  </svg>
                </div>
                {/* pin */}
                <div style={{position:'absolute', left:'52%', top:'45%', transform:'translate(-50%,-100%)', pointerEvents:'none'}}>
                  <div style={{position:'relative'}}>
                    <div style={{
                      background:PULSE.coral, color:PULSE.ink, padding:'8px 12px', borderRadius:12,
                      fontSize:12, fontWeight:600, whiteSpace:'nowrap', boxShadow:`0 8px 20px -8px ${PULSE.coral}aa`
                    }}>
                      ◉ Pulse HQ
                    </div>
                    <div style={{position:'absolute', left:'50%', top:'100%', transform:'translateX(-50%)', width:0, height:0, borderLeft:'6px solid transparent', borderRight:'6px solid transparent', borderTop:`8px solid ${PULSE.coral}`}}/>
                  </div>
                </div>
                <div style={{position:'absolute', left:'52%', top:'45%', width:16, height:16, borderRadius:99, background:PULSE.coral, transform:'translate(-50%,-50%)', boxShadow:`0 0 0 6px ${PULSE.coral}33, 0 0 0 14px ${PULSE.coral}18`, animation:'pulse-dot 2s ease-in-out infinite'}}/>

                {/* zoom controls */}
                <div style={{position:'absolute', top:12, right:12, display:'flex', flexDirection:'column', background:PULSE.paper, borderRadius:10, overflow:'hidden', boxShadow:'0 4px 12px rgba(0,0,0,0.1)'}}>
                  <button onClick={()=>setMapZoom(z=>Math.min(2, z+0.25))} style={{width:32, height:32, background:'transparent', border:'none', borderBottom:`1px solid ${PULSE.line2}`, cursor:'pointer', fontSize:16, color:PULSE.ink}}>+</button>
                  <button onClick={()=>setMapZoom(z=>Math.max(0.75, z-0.25))} style={{width:32, height:32, background:'transparent', border:'none', cursor:'pointer', fontSize:16, color:PULSE.ink}}>−</button>
                </div>

                {/* legend */}
                <div style={{position:'absolute', bottom:12, left:12, background:PULSE.paper+'ee', backdropFilter:'blur(8px)', padding:'8px 10px', borderRadius:8, display:'flex', flexDirection:'column', gap:4}}>
                  <div className="mono" style={{fontSize:8, letterSpacing:1, color:PULSE.ink3}}>NEARBY</div>
                  {[[PULSE.amber,'Cafés · 8'],[PULSE.mint,'Parks · 3'],[PULSE.violet,'Transit · 4']].map(([c,l])=>(
                    <div key={l} style={{display:'flex', gap:6, alignItems:'center', fontSize:10, color:PULSE.ink2}}>
                      <span style={{width:6, height:6, borderRadius:99, background:c}}/>{l}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{padding:'14px 16px', borderTop:`1px solid ${PULSE.line2}`}}>
                <div style={{fontSize:13, fontWeight:600, marginBottom:4}}>Torstraße 114, 10119 Berlin</div>
                <div className="mono" style={{fontSize:10, color:PULSE.ink3, letterSpacing:0.3, marginBottom:10}}>
                  4 MIN WALK FROM ROSA-LUXEMBURG-PLATZ (U2)
                </div>
                <div style={{display:'flex', gap:6}}>
                  <button style={{flex:1, padding:'8px', background:PULSE.ink, color:PULSE.paper, border:'none', borderRadius:8, fontSize:11, cursor:'pointer', fontFamily:'inherit', fontWeight:500}}>↗ Directions</button>
                  <button style={{flex:1, padding:'8px', background:'transparent', color:PULSE.ink, border:`1px solid ${PULSE.line}`, borderRadius:8, fontSize:11, cursor:'pointer', fontFamily:'inherit', fontWeight:500}}>↗ Street view</button>
                </div>
              </div>
            </div>
          </Block>

          {/* INTERACTIVE HIRING TEAM */}
          <Block name="hiring_team" type="interactive" accent={PULSE.amber} style={{marginTop:24}}>
            <div style={{background:PULSE.paper, borderRadius:16, padding:20, border:`1px solid ${PULSE.line2}`}}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14}}>
                <div className="mono" style={{fontSize:10, color:PULSE.ink3, letterSpacing:1}}>YOUR HIRING TEAM · CLICK</div>
                <div className="mono" style={{fontSize:10, color:PULSE.ink3}}>{teamIdx+1}/{team.length}</div>
              </div>

              {/* avatars row */}
              <div style={{display:'flex', gap:8, marginBottom:16}}>
                {team.map((p,i)=>(
                  <button key={i} onClick={()=>setTeamIdx(i)} style={{
                    position:'relative', padding:0, background:'transparent',
                    border: teamIdx===i? `2px solid ${PULSE.coral}`: `2px solid transparent`,
                    borderRadius:99, cursor:'pointer', transition:'all .2s'
                  }}>
                    <div style={{padding:2}}>
                      <Placeholder w={44} h={44} tone={p.t} label="" radius={99}/>
                    </div>
                    {teamIdx===i && <div style={{position:'absolute', bottom:-2, right:-2, width:12, height:12, borderRadius:99, background:PULSE.coral, border:`2px solid ${PULSE.paper}`}}/>}
                  </button>
                ))}
              </div>

              <div style={{padding:14, background:PULSE.paper2, borderRadius:12, borderLeft:`3px solid ${PULSE.coral}`}}>
                <div style={{fontSize:14, fontWeight:600}}>{team[teamIdx].n}</div>
                <div className="mono" style={{fontSize:10, color:PULSE.ink3, letterSpacing:0.5, marginTop:2}}>
                  {team[teamIdx].r.toUpperCase()} · {team[teamIdx].loc.toUpperCase()} · {team[teamIdx].yrs}Y AT PULSE
                </div>
                <Chip tone="coral" size="sm">{team[teamIdx].role}</Chip>
                <div style={{fontSize:13, color:PULSE.ink2, lineHeight:1.5, marginTop:10}}>{team[teamIdx].bio}</div>
                <div style={{display:'flex', gap:6, marginTop:12}}>
                  <button style={{flex:1, padding:'8px', background:'transparent', color:PULSE.ink, border:`1px solid ${PULSE.line}`, borderRadius:8, fontSize:11, cursor:'pointer', fontFamily:'inherit'}}>✉ Message</button>
                  <button style={{flex:1, padding:'8px', background:'transparent', color:PULSE.ink, border:`1px solid ${PULSE.line}`, borderRadius:8, fontSize:11, cursor:'pointer', fontFamily:'inherit'}}>↗ LinkedIn</button>
                </div>
              </div>
            </div>
          </Block>

          {/* STICKY APPLY */}
          <Block name="sticky_apply" type="block" accent={PULSE.coral} style={{marginTop:24}}>
            <div style={{background:PULSE.ink, color:PULSE.paper, borderRadius:16, padding:22, position:'relative', overflow:'hidden'}}>
              <NeonBlob color={PULSE.coral} size={260} style={{right:-80, bottom:-100, opacity:0.55}}/>
              <div className="mono" style={{fontSize:10, color:PULSE.mint, letterSpacing:1.5, position:'relative'}}>READY?</div>
              <div className="display" style={{fontSize:22, fontWeight:600, marginTop:6, lineHeight:1.15, position:'relative'}}>
                One-tap apply if you're<br/>already in our system.
              </div>
              <Btn kind="coral" size="md" arrow style={{marginTop:16, position:'relative', width:'100%', justifyContent:'center'}}>Apply now</Btn>
              <div style={{display:'flex', gap:6, marginTop:10, position:'relative'}}>
                <button style={{flex:1, padding:'8px', background:'rgba(244,237,225,0.08)', color:PULSE.paper, border:`1px solid rgba(244,237,225,0.15)`, borderRadius:8, fontSize:11, cursor:'pointer', fontFamily:'inherit'}}>LinkedIn</button>
                <button style={{flex:1, padding:'8px', background:'rgba(244,237,225,0.08)', color:PULSE.paper, border:`1px solid rgba(244,237,225,0.15)`, borderRadius:8, fontSize:11, cursor:'pointer', fontFamily:'inherit'}}>Upload CV</button>
              </div>
            </div>
          </Block>
        </aside>
      </div>

      {/* RELATED */}
      <Block name="related_roles" type="block" accent={PULSE.mint}>
        <div style={{padding:'64px 48px', background:PULSE.paper2, borderTop:`1px solid ${PULSE.line2}`}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'end', marginBottom:26}}>
            <div>
              <div className="mono" style={{fontSize:11, letterSpacing:2, color:PULSE.ink3, marginBottom:8}}>§ RELATED</div>
              <h2 className="display" style={{margin:0, fontSize:32, fontWeight:500, letterSpacing:-0.02}}>
                People who looked at this also viewed
              </h2>
            </div>
            <Btn kind="ghost" size="sm" arrow>View all AI &amp; Research</Btn>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14}}>
            {[
              {t:'Senior ML Engineer, Evaluation', l:'Berlin · Hybrid', tone:'coral', m:88},
              {t:'Research Engineer, Interpretability', l:'London · Onsite', tone:'violet', m:82},
              {t:'Staff Software Engineer, Model Serving', l:'Remote (EMEA)', tone:'mint', m:79},
            ].map((r,i)=>(
              <div key={i} style={{background:PULSE.paper, borderRadius:14, padding:20, border:`1px solid ${PULSE.line2}`, cursor:'pointer', transition:'all .2s'}}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                  <Chip tone={r.tone}>AI &amp; Research</Chip>
                  <span className="mono" style={{fontSize:10, color:PULSE.coral, fontWeight:700}}>● {r.m}% MATCH</span>
                </div>
                <div className="display" style={{fontSize:17, fontWeight:600, marginTop:14, letterSpacing:-0.01, lineHeight:1.25}}>{r.t}</div>
                <div style={{display:'flex', justifyContent:'space-between', marginTop:16, fontSize:12, color:PULSE.ink2, alignItems:'center'}}>
                  <span style={{display:'flex', gap:6, alignItems:'center'}}>{Icon.pin(12)} {r.l}</span>
                  <span style={{color:PULSE.coral, fontWeight:600}}>View →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Block>

      <Footer/>

      <style>{`
        @keyframes pulse-dot { 0%,100% { opacity:1; transform:scale(1);} 50% { opacity:0.4; transform:scale(1.4);} }
      `}</style>
    </div>
  );
}

function FAQ() {
  const [open, setOpen] = React.useState(0);
  const items = [
    {q:'Is visa sponsorship available?', a:'Yes, for this role — Blue Card (EU) in Germany, relocation budget up to €12,000, and 6 weeks of corporate housing while you settle in.'},
    {q:'Can I work fully remote?', a:'This role is hybrid — 3 days/week in Berlin. The on-site days matter because you\'ll be leading architecture reviews in person. We do not offer fully-remote for this Staff role today.'},
    {q:'What does the interview prep look like?', a:'Jonas sends a prep doc after your intro call with exactly what each round covers, who you\'ll meet, and a practice problem from our eval harness you can look at beforehand.'},
    {q:'How is performance reviewed?', a:'Twice a year, written, calibrated across the org. Feedback is from peers, reports, and the people you collaborate with — not just your manager. Ratings are explicitly tied to our 5 values.'},
    {q:'Do I need a PhD?', a:'No. We care about what you\'ve built and how you think, not credentials. Roughly 40% of our research-adjacent engineers have PhDs; 60% don\'t.'},
  ];
  return (
    <div style={{display:'flex', flexDirection:'column', gap:8}}>
      {items.map((it,i)=>(
        <div key={i} style={{background:PULSE.paper2, borderRadius:12, overflow:'hidden', border:`1px solid ${PULSE.line2}`}}>
          <button onClick={()=>setOpen(open===i?-1:i)} style={{
            width:'100%', padding:'16px 20px', display:'flex', justifyContent:'space-between', alignItems:'center',
            background:'transparent', border:'none', cursor:'pointer', fontFamily:'inherit', textAlign:'left'
          }}>
            <span style={{fontSize:14, fontWeight:600, color:PULSE.ink}}>{it.q}</span>
            <span style={{
              width:26, height:26, borderRadius:99, background: open===i? PULSE.coral : PULSE.paper,
              color: open===i? PULSE.ink : PULSE.ink2, display:'grid', placeItems:'center',
              fontFamily:'JetBrains Mono', fontSize:14, fontWeight:700,
              transform: open===i? 'rotate(45deg)':'none', transition:'all .25s'
            }}>+</span>
          </button>
          {open===i && (
            <div style={{padding:'0 20px 18px', fontSize:13.5, color:PULSE.ink2, lineHeight:1.6, maxWidth:700}}>
              {it.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

Object.assign(window, { JDPage });
