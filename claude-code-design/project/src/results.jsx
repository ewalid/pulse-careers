// SCREEN 02 — JOB RESULTS
function ResultsPage() {
  const jobs = [
    { t:'Staff Machine Learning Engineer, Model Reliability', d:'AI & Research', l:'Berlin · Hybrid', s:'€165–195k', hot:true, new:false, posted:'2d', tone:'coral' },
    { t:'Senior Product Designer, Developer Platform',        d:'Design',       l:'Lisbon · Hybrid', s:'€110–135k', hot:false, new:true, posted:'5h', tone:'mint', match:94 },
    { t:'Principal Data Scientist, Causal Inference',         d:'Data Science', l:'Remote (EMEA)',   s:'€140–170k', hot:false, new:false, posted:'1w', tone:'amber' },
    { t:'AI Safety Researcher',                                d:'AI & Research',l:'London · Onsite', s:'£140–180k', hot:true, new:false, posted:'3d', tone:'violet' },
    { t:'Senior Backend Engineer, Energy Platform',            d:'Engineering',  l:'Singapore',       s:'SGD 180–220k', hot:false, new:true, posted:'1d', tone:'coral' },
    { t:'Head of People, EMEA',                                d:'Operations',   l:'Lisbon · Hybrid', s:'€180–210k', hot:false, new:false, posted:'2w', tone:'mint' },
    { t:'iOS Engineer, Consumer App',                          d:'Engineering',  l:'Remote (Global)', s:'Competitive', hot:false, new:false, posted:'4d', tone:'amber' },
  ];

  return (
    <div style={{width:1280, background:PULSE.paper, color:PULSE.ink}}>
      <Block name="global_nav" type="global" accent={PULSE.violet}><TopNav active="Careers"/></Block>

      {/* search strip */}
      <Block name="jobs_search" type="block" accent={PULSE.coral}>
        <div style={{padding:'32px 48px', background:PULSE.paper2, borderBottom:`1px solid ${PULSE.line2}`}}>
          <div className="mono" style={{fontSize:11, color:PULSE.ink3, letterSpacing:1.5, marginBottom:12}}>
            CAREERS  ›  OPEN ROLES
          </div>
          <div style={{display:'flex', alignItems:'end', gap:40, justifyContent:'space-between'}}>
            <div>
              <h1 className="display" style={{margin:0, fontSize:52, fontWeight:500, letterSpacing:-0.02}}>
                247 open roles.<br/>
                <span style={{color:PULSE.ink3}}>Find yours in under a minute.</span>
              </h1>
            </div>
            <div style={{flex:'0 0 520px'}}>
              <div style={{display:'flex', background:PULSE.paper, borderRadius:99, border:`1px solid ${PULSE.line}`, padding:5, alignItems:'center', boxShadow:'0 6px 20px -12px rgba(42,31,46,0.15)'}}>
                <div style={{padding:'0 14px', color:PULSE.ink3}}>{Icon.search(16)}</div>
                <input defaultValue="machine learning" style={{flex:1, border:'none', outline:'none', background:'transparent', fontSize:14, padding:'12px 0', fontFamily:'inherit'}}/>
                <Btn kind="primary" size="sm">Search</Btn>
              </div>
              <div style={{display:'flex', gap:8, marginTop:12, flexWrap:'wrap'}}>
                <span className="mono" style={{fontSize:10, color:PULSE.ink3, letterSpacing:1, alignSelf:'center', marginRight:4}}>POPULAR:</span>
                {['ML Engineer','Staff+','Remote EMEA','Returnship','New grad'].map(x=>(
                  <button key={x} style={{background:'transparent', border:`1px solid ${PULSE.line}`, padding:'4px 11px', borderRadius:99, fontSize:11, color:PULSE.ink2, cursor:'pointer', fontFamily:'inherit'}}>
                    {x}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Block>

      <div style={{display:'grid', gridTemplateColumns:'280px 1fr', gap:0}}>
        {/* FILTER SIDEBAR */}
        <Block name="filter_sidebar" type="block" accent={PULSE.amber} style={{borderRight:`1px solid ${PULSE.line2}`}}>
          <aside style={{padding:'32px 28px', background:PULSE.paper, minHeight:900}}>
            <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:24}}>
              {Icon.filter(16, PULSE.ink)}
              <div className="mono" style={{fontSize:11, letterSpacing:1.5}}>FILTERS</div>
              <span className="mono" style={{fontSize:10, background:PULSE.coral, color:PULSE.ink, padding:'2px 7px', borderRadius:99, marginLeft:'auto'}}>3</span>
            </div>

            {[
              { t:'Discipline', opts:[
                {n:'Engineering',c:94,on:true},
                {n:'AI & Research',c:47,on:true},
                {n:'Data Science',c:38},
                {n:'Design',c:27},
                {n:'Operations',c:41},
              ]},
              { t:'Location', opts:[
                {n:'Remote — Global',c:58, on:true},
                {n:'Lisbon',c:42},
                {n:'Berlin',c:38},
                {n:'London',c:31},
                {n:'Singapore',c:18},
                {n:'+ 4 more'},
              ]},
              { t:'Seniority', opts:[
                {n:'Entry / New grad',c:22},
                {n:'Mid',c:64},
                {n:'Senior',c:92},
                {n:'Staff / Principal',c:48},
                {n:'Leadership',c:21},
              ]},
              { t:'Employment', opts:[
                {n:'Full-time',c:231},
                {n:'Contract',c:9},
                {n:'Internship',c:7},
              ]},
            ].map(group=>(
              <div key={group.t} style={{paddingBottom:22, marginBottom:22, borderBottom:`1px solid ${PULSE.line2}`}}>
                <div style={{fontSize:13, fontWeight:600, marginBottom:12}}>{group.t}</div>
                {group.opts.map(o=>(
                  <label key={o.n} style={{display:'flex', alignItems:'center', gap:10, padding:'5px 0', cursor:'pointer', fontSize:13}}>
                    <span style={{
                      width:15, height:15, borderRadius:4, border:`1.5px solid ${o.on?PULSE.coral:PULSE.line}`,
                      background: o.on? PULSE.coral : 'transparent', display:'grid', placeItems:'center',
                      color: PULSE.ink, fontSize:10, fontWeight:700
                    }}>{o.on && '✓'}</span>
                    <span style={{flex:1, color:o.on?PULSE.ink:PULSE.ink2}}>{o.n}</span>
                    {o.c != null && <span className="mono" style={{fontSize:10, color:PULSE.ink3}}>{o.c}</span>}
                  </label>
                ))}
              </div>
            ))}

            <div style={{fontSize:13, fontWeight:600, marginBottom:10}}>Salary floor</div>
            <div className="mono" style={{fontSize:11, color:PULSE.ink2, marginBottom:8}}>€ 120,000 +</div>
            <div style={{height:4, background:PULSE.paper3, borderRadius:99, position:'relative'}}>
              <div style={{position:'absolute', left:0, width:'55%', height:'100%', borderRadius:99, background:`linear-gradient(90deg, ${PULSE.mint}, ${PULSE.coral})`}}/>
              <div style={{position:'absolute', left:'55%', top:'50%', transform:'translate(-50%,-50%)', width:14, height:14, borderRadius:99, background:PULSE.paper, border:`2px solid ${PULSE.ink}`}}/>
            </div>

            <div style={{marginTop:28, padding:16, background:PULSE.paper2, borderRadius:12}}>
              <div className="mono" style={{fontSize:10, letterSpacing:1, color:PULSE.ink3}}>SAVED SEARCH</div>
              <div style={{fontSize:13, fontWeight:600, marginTop:4, lineHeight:1.3}}>Get emailed when new ML roles open in EMEA</div>
              <Btn kind="coral" size="sm" style={{marginTop:12}}>Save alert</Btn>
            </div>
          </aside>
        </Block>

        {/* RESULTS */}
        <div style={{padding:'28px 48px 64px', background:PULSE.paper}}>
          <Block name="results_header" type="block" accent={PULSE.coral}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'0 0 20px', borderBottom:`1px solid ${PULSE.line2}`, marginBottom:22}}>
              <div>
                <span className="display" style={{fontSize:22, fontWeight:600}}>141 matches</span>
                <span className="mono" style={{fontSize:11, color:PULSE.ink3, marginLeft:14, letterSpacing:0.5}}>
                  ENGINEERING + AI · REMOTE-OK · €120k+
                </span>
              </div>
              <div style={{display:'flex', gap:10, alignItems:'center'}}>
                <span className="mono" style={{fontSize:11, color:PULSE.ink3, letterSpacing:1}}>SORT</span>
                <select style={{fontFamily:'inherit', fontSize:12, padding:'6px 10px', borderRadius:99, border:`1px solid ${PULSE.line}`, background:PULSE.paper, color:PULSE.ink}}>
                  <option>Best match</option>
                  <option>Newest</option>
                  <option>Salary ↓</option>
                </select>
                <div style={{display:'flex', background:PULSE.paper2, borderRadius:99, padding:3, gap:2}}>
                  <button style={{background:PULSE.ink, color:PULSE.paper, border:'none', padding:'6px 8px', borderRadius:99, cursor:'pointer', display:'flex'}}>{Icon.menu(14, PULSE.paper)}</button>
                  <button style={{background:'transparent', color:PULSE.ink2, border:'none', padding:'6px 8px', borderRadius:99, cursor:'pointer', display:'flex'}}>{Icon.grid(14)}</button>
                </div>
              </div>
            </div>
          </Block>

          <Block name="job_listings" type="dynamic_list" accent={PULSE.mint}>
            <div style={{display:'flex', flexDirection:'column', gap:12}}>
              {jobs.map((j, i)=>{
                const hovered = i === 1; // simulate hover-state on the "match" card
                return (
                  <div key={i} style={{
                    background:PULSE.paper, border:`1px solid ${hovered? 'transparent' : PULSE.line2}`,
                    borderRadius:16, padding:'22px 26px', display:'grid',
                    gridTemplateColumns:'1fr auto auto auto', gap:24, alignItems:'center',
                    position:'relative', overflow:'hidden',
                    boxShadow: hovered? `0 0 0 1.5px ${PULSE.coral}, 0 12px 36px -12px ${PULSE.coral}55` : 'none',
                    transition:'all .2s',
                  }}>
                    {hovered && <div style={{position:'absolute', inset:0, background:`linear-gradient(90deg, ${PULSE.coral}08, transparent 40%)`, pointerEvents:'none'}}/>}
                    {/* accent bar */}
                    <div style={{position:'absolute', left:0, top:0, bottom:0, width:3, background: {coral:PULSE.coral,mint:PULSE.mint,amber:PULSE.amber,violet:PULSE.violet}[j.tone]||PULSE.coral, opacity:hovered?1:0.25}}/>

                    <div style={{position:'relative'}}>
                      <div style={{display:'flex', gap:8, alignItems:'center', marginBottom:6}}>
                        <Chip tone={j.tone==='violet'?'violet':'paper'}>{j.d}</Chip>
                        {j.hot && <Chip tone="coral">● High demand</Chip>}
                        {j.new && <Chip tone="mint">New · {j.posted}</Chip>}
                        {j.match && <span className="mono" style={{fontSize:10, color:PULSE.coral, fontWeight:700, letterSpacing:1}}>● {j.match}% MATCH</span>}
                      </div>
                      <div className="display" style={{fontSize:20, fontWeight:600, letterSpacing:-0.01}}>{j.t}</div>
                      <div style={{display:'flex', gap:18, marginTop:8, fontSize:12, color:PULSE.ink2}}>
                        <span style={{display:'flex', gap:6, alignItems:'center'}}>{Icon.pin(13)} {j.l}</span>
                        <span style={{display:'flex', gap:6, alignItems:'center'}}>{Icon.briefcase(13)} Full-time</span>
                        <span style={{display:'flex', gap:6, alignItems:'center'}}>{Icon.clock(13)} Posted {j.posted} ago</span>
                      </div>
                    </div>

                    <div style={{textAlign:'right'}}>
                      <div className="mono" style={{fontSize:10, color:PULSE.ink3, letterSpacing:1}}>SALARY</div>
                      <div style={{fontSize:14, fontWeight:600, marginTop:2}}>{j.s}</div>
                    </div>

                    <button style={{background:'transparent', border:`1px solid ${PULSE.line}`, width:40, height:40, borderRadius:99, display:'grid', placeItems:'center', cursor:'pointer', color:PULSE.ink2}}>
                      {Icon.bookmark(15)}
                    </button>

                    <Btn kind={hovered?'coral':'primary'} size="sm" arrow>View</Btn>
                  </div>
                );
              })}
            </div>
          </Block>

          <div style={{display:'flex', justifyContent:'center', marginTop:32, gap:8}}>
            <button style={{background:PULSE.paper, border:`1px solid ${PULSE.line}`, width:36, height:36, borderRadius:99}}>←</button>
            {[1,2,3,4,5].map(n=>(
              <button key={n} style={{
                background:n===1?PULSE.ink:'transparent', color:n===1?PULSE.paper:PULSE.ink2,
                border:n===1?'none':`1px solid ${PULSE.line}`, width:36, height:36, borderRadius:99,
                fontFamily:'inherit', fontSize:13, cursor:'pointer'
              }}>{n}</button>
            ))}
            <span style={{alignSelf:'center', color:PULSE.ink3, fontSize:13, padding:'0 6px'}}>…</span>
            <button style={{background:'transparent', border:`1px solid ${PULSE.line}`, width:36, height:36, borderRadius:99}}>12</button>
            <button style={{background:PULSE.paper, border:`1px solid ${PULSE.line}`, width:36, height:36, borderRadius:99}}>→</button>
          </div>
        </div>
      </div>

      <Footer/>
    </div>
  );
}

Object.assign(window, { ResultsPage });
