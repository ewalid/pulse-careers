// SCREEN 01 — HOMEPAGE
function Homepage() {
  return (
    <div style={{width:1280, background:PULSE.paper, color:PULSE.ink, position:'relative'}}>
      <Block name="global_nav" type="global" accent={PULSE.violet}>
        <TopNav active="Careers" />
      </Block>
      <PersonalizationBanner/>

      {/* HERO — CINEMATIC VIDEO */}
      <Block name="hero_block" type="block" accent={PULSE.coral}>
        <div style={{position:'relative', height:760, overflow:'hidden', background:'#1a1418'}}>
          {/* video layer */}
          <video
            autoPlay muted loop playsInline
            src={window.__resources?.heroVideo || "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_171521_25968ba2-b594-4b32-aab7-f6b69398a6fa.mp4"}
            style={{position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', filter:'saturate(1.05) contrast(1.02)'}}
          />
          {/* warm gradient wash — keep it light/optimistic, not dark */}
          <div style={{position:'absolute', inset:0, background:`
            linear-gradient(180deg, rgba(244,237,225,0.15) 0%, rgba(26,20,24,0.0) 25%, rgba(26,20,24,0.15) 55%, rgba(26,20,24,0.75) 100%),
            linear-gradient(95deg, rgba(42,31,46,0.55) 0%, rgba(42,31,46,0.15) 45%, rgba(244,185,66,0.18) 100%)
          `}}/>
          {/* subtle scanline texture */}
          <div style={{position:'absolute', inset:0, opacity:0.18, backgroundImage:`repeating-linear-gradient(0deg, transparent 0 2px, rgba(244,237,225,0.12) 2px 3px)`, pointerEvents:'none', mixBlendMode:'overlay'}}/>
          {/* soft vignette */}
          <NeonBlob color={PULSE.coral} size={700} style={{right:-200, top:-200, opacity:0.5, mixBlendMode:'screen'}}/>
          <NeonBlob color={PULSE.amber} size={500} style={{left:-150, bottom:-100, opacity:0.55, mixBlendMode:'screen'}}/>

          {/* HUD: top strip */}
          <div style={{position:'absolute', top:22, left:48, right:48, display:'flex', justifyContent:'space-between', alignItems:'center', color:PULSE.paper, zIndex:3}}>
            <div className="mono" style={{fontSize:11, letterSpacing:2, opacity:0.9, display:'flex', alignItems:'center', gap:10}}>
              <span style={{width:7, height:7, borderRadius:99, background:PULSE.coral, boxShadow:`0 0 12px ${PULSE.coral}`, animation:'pulse-dot 1.6s ease-in-out infinite'}}/>
              PULSE / 2026  ·  LIVE FROM LISBON HQ  ·  38.72°N  ·  9.14°W
            </div>
            <div className="mono" style={{fontSize:10, letterSpacing:1.5, opacity:0.65, display:'flex', gap:14}}>
              <span>REC 00:02:14</span>
              <span>·</span>
              <span>4K · 24FPS</span>
            </div>
          </div>

          {/* main hero text */}
          <div style={{position:'absolute', left:48, right:48, bottom:80, zIndex:3, color:PULSE.paper}}>
            <div style={{maxWidth:1040}}>
              <h1 className="display" style={{
                margin:0, fontSize:120, fontWeight:500, lineHeight:0.92, letterSpacing:-0.04,
                textShadow:'0 2px 40px rgba(26,20,24,0.4)'
              }}>
                Find Where You Belong.<br/>
                <span style={{
                  background:`linear-gradient(95deg, ${PULSE.coral} 0%, ${PULSE.amber} 60%, ${PULSE.coralSoft} 100%)`,
                  WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
                  fontStyle:'italic', fontWeight:500,
                  filter:`drop-shadow(0 0 30px ${PULSE.coral}55)`
                }}>Build What's Next.</span>
              </h1>
              <p style={{maxWidth:560, fontSize:18, lineHeight:1.5, color:'rgba(244,237,225,0.85)', margin:'26px 0 34px'}}>
                Pulse is a 2,400-person research &amp; product company building the quiet infrastructure
                behind modern life. We hire humans who care.
              </p>
              {/* search + CTA row */}
              <div style={{display:'flex', gap:14, alignItems:'center', flexWrap:'wrap'}}>
                <div style={{
                  display:'flex', background:'rgba(244,237,225,0.96)', borderRadius:99,
                  padding:6, alignItems:'center', width:560,
                  boxShadow:'0 20px 60px -20px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,122,92,0.4)',
                  backdropFilter:'blur(12px)'
                }}>
                  <div style={{padding:'0 16px', color:PULSE.ink3}}>{Icon.search(16)}</div>
                  <input placeholder="Search roles, teams, skills — e.g. &ldquo;ML reliability&rdquo;" style={{
                    flex:1, border:'none', outline:'none', background:'transparent', fontSize:14,
                    color:PULSE.ink, padding:'14px 0', fontFamily:'inherit'
                  }}/>
                  <div className="mono" style={{fontSize:10, color:PULSE.ink3, padding:'0 12px', letterSpacing:1}}>
                    <Kbd>⌘</Kbd> <Kbd>K</Kbd>
                  </div>
                  <Btn kind="coral" size="md">Search</Btn>
                </div>
                <Btn kind="light" size="lg" icon={Icon.play(14)} style={{background:'rgba(244,237,225,0.12)', color:PULSE.paper, border:`1px solid rgba(244,237,225,0.3)`, backdropFilter:'blur(12px)'}}>
                  Life at Pulse · 2:14
                </Btn>
              </div>
            </div>
          </div>

          {/* HUD: bottom-right live stats card */}
          <div style={{position:'absolute', right:48, top:88, zIndex:3, display:'flex', flexDirection:'column', gap:10, width:280}}>
            <div style={{
              background:'rgba(26,20,24,0.55)', backdropFilter:'blur(16px)', color:PULSE.paper,
              padding:'16px 18px', borderRadius:16, border:`1px solid rgba(244,237,225,0.15)`,
            }}>
              <div className="mono" style={{fontSize:10, letterSpacing:1.5, color:PULSE.mint}}>◉ LIVE · NOW HIRING</div>
              <div className="display" style={{fontSize:48, fontWeight:500, marginTop:6, letterSpacing:-0.02, lineHeight:1}}>
                247 <span style={{fontSize:16, color:'rgba(244,237,225,0.55)', fontWeight:400}}>open roles</span>
              </div>
              <div style={{display:'flex', gap:8, marginTop:12, flexWrap:'wrap'}}>
                {[['Eng',94],['AI',47],['Ops',41],['Data',38],['Design',27]].map(([n,c])=>(
                  <div key={n} className="mono" style={{fontSize:10, padding:'4px 9px', background:'rgba(244,237,225,0.12)', borderRadius:99, letterSpacing:0.5}}>
                    {n} <b style={{color:PULSE.coral}}>{c}</b>
                  </div>
                ))}
              </div>
            </div>
            <div style={{
              background:'rgba(244,237,225,0.95)', backdropFilter:'blur(16px)', color:PULSE.ink,
              padding:'14px 16px', borderRadius:16, display:'flex', gap:12, alignItems:'center',
              boxShadow:'0 12px 40px -12px rgba(0,0,0,0.3)'
            }}>
              <div style={{width:38, height:38, borderRadius:12, background:PULSE.coral, display:'grid', placeItems:'center', flexShrink:0}}>
                {Icon.sparkle(16, PULSE.ink)}
              </div>
              <div style={{flex:1, minWidth:0}}>
                <div className="mono" style={{fontSize:9, color:PULSE.ink3, letterSpacing:1}}>FEATURED ↗</div>
                <div style={{fontSize:12, fontWeight:600, marginTop:2, lineHeight:1.25}}>Principal Research Engineer, Model Reliability</div>
              </div>
            </div>
            <div style={{
              background:'rgba(26,20,24,0.55)', backdropFilter:'blur(16px)', color:PULSE.paper,
              padding:'12px 16px', borderRadius:16, border:`1px solid rgba(244,237,225,0.15)`,
              display:'flex', justifyContent:'space-between', alignItems:'center'
            }}>
              <div>
                <div className="mono" style={{fontSize:10, opacity:0.55, letterSpacing:1}}>AVG. TENURE</div>
                <div className="display" style={{fontSize:22, fontWeight:600, marginTop:2}}>4.8 <span style={{fontSize:11, opacity:0.55, fontWeight:400}}>yrs</span></div>
              </div>
              <div style={{height:40, width:1, background:'rgba(244,237,225,0.15)'}}/>
              <div>
                <div className="mono" style={{fontSize:10, opacity:0.55, letterSpacing:1}}>GLASSDOOR</div>
                <div className="display" style={{fontSize:22, fontWeight:600, marginTop:2, color:PULSE.amber}}>★ 4.7</div>
              </div>
            </div>
          </div>

          {/* bottom scroll hint */}
          <div style={{position:'absolute', left:'50%', bottom:18, transform:'translateX(-50%)', color:PULSE.paper, opacity:0.6, zIndex:3, display:'flex', flexDirection:'column', alignItems:'center', gap:6}}>
            <div className="mono" style={{fontSize:10, letterSpacing:2}}>SCROLL TO EXPLORE</div>
            <div style={{width:18, height:28, borderRadius:99, border:`1.5px solid rgba(244,237,225,0.5)`, display:'grid', placeItems:'start center', padding:'4px 0'}}>
              <div style={{width:2, height:6, background:PULSE.paper, borderRadius:99, animation:'scroll-hint 1.8s ease-in-out infinite'}}/>
            </div>
          </div>

          <style>{`
            @keyframes pulse-dot { 0%,100% { opacity:1; transform:scale(1);} 50% { opacity:0.4; transform:scale(1.4);} }
            @keyframes scroll-hint { 0% { transform:translateY(0); opacity:1;} 80% { transform:translateY(10px); opacity:0;} 100% { transform:translateY(0); opacity:0;} }
          `}</style>
        </div>
      </Block>

      {/* JOB CATEGORIES */}
      <Block name="discipline_cards" type="block" accent={PULSE.mint}>
        <div style={{padding:'72px 48px', background:PULSE.paper2, borderTop:`1px solid ${PULSE.line2}`}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'end', marginBottom:40}}>
            <div>
              <div className="mono" style={{fontSize:11, letterSpacing:2, color:PULSE.ink3, marginBottom:10}}>§ 01  ·  DISCIPLINES</div>
              <h2 className="display" style={{margin:0, fontSize:44, fontWeight:500, letterSpacing:-0.02, maxWidth:620}}>
                Every craft has a home here.
              </h2>
            </div>
            <Btn kind="ghost" size="md" arrow>All 247 roles</Btn>
          </div>

          <div style={{display:'grid', gridTemplateColumns:'repeat(5, 1fr)', gap:14}}>
            {[
              { name:'Engineering', count:94, tone:'coral', accent:PULSE.coral, note:'Infra · ML · Platform · iOS' },
              { name:'Data Science', count:38, tone:'amber', accent:PULSE.amber, note:'Analytics · Research · Causal' },
              { name:'AI & Research', count:47, tone:'violet', accent:PULSE.violet, note:'Models · Safety · Applied' },
              { name:'Operations', count:41, tone:'mint', accent:PULSE.mint, note:'Supply · People · Finance · Legal' },
              { name:'Design', count:27, tone:'dusk', accent:PULSE.coralSoft, note:'Product · Brand · Motion · Research' },
            ].map((c, i) => (
              <div key={c.name} style={{
                background:PULSE.paper, borderRadius:16, border:`1px solid ${PULSE.line2}`,
                overflow:'hidden', display:'flex', flexDirection:'column',
                transition:'transform .2s', cursor:'pointer', position:'relative'
              }}>
                <div style={{height:140, position:'relative'}}>
                  <Placeholder h={140} tone={c.tone} label={`${c.name.toLowerCase()} · editorial`} radius={0}/>
                  <div style={{position:'absolute', top:12, right:12, background:PULSE.paper, borderRadius:99, padding:'5px 10px', fontSize:11, fontWeight:600}}>
                    {c.count} roles
                  </div>
                </div>
                <div style={{padding:'18px 20px 22px'}}>
                  <div className="display" style={{fontSize:20, fontWeight:600, letterSpacing:-0.01}}>{c.name}</div>
                  <div className="mono" style={{fontSize:10, color:PULSE.ink3, marginTop:6, letterSpacing:0.5}}>{c.note}</div>
                  <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:18}}>
                    <span style={{fontSize:12, color:PULSE.ink2}}>Explore →</span>
                    <div style={{width:8, height:8, borderRadius:99, background:c.accent, boxShadow:`0 0 10px ${c.accent}`}}/>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Block>

      {/* EMPLOYER BRAND STRIP */}
      <Block name="brand_marquee" type="block" accent={PULSE.violet}>
        <div style={{padding:'36px 48px', borderTop:`1px solid ${PULSE.line}`, borderBottom:`1px solid ${PULSE.line}`, background:PULSE.paper, overflow:'hidden'}}>
          <div style={{display:'flex', alignItems:'center', gap:48, justifyContent:'space-between'}}>
            <div className="mono" style={{fontSize:10, letterSpacing:2, color:PULSE.ink3, whiteSpace:'nowrap'}}>
              AS SEEN IN →
            </div>
            {['WIRED','FAST COMPANY','MIT TECH REVIEW','BLOOMBERG','THE VERGE','SIFTED','FT','MONOCLE'].map(n=>(
              <div key={n} className="display" style={{fontSize:18, fontWeight:600, color:PULSE.ink2, opacity:0.75, letterSpacing:-0.01}}>
                {n}
              </div>
            ))}
          </div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:24, marginTop:36, borderTop:`1px dashed ${PULSE.line}`, paddingTop:28}}>
            {[
              { n:'★ 4.7', l:'Glassdoor overall', s:'top 1% of scale-ups' },
              { n:'96%',   l:'Recommend to a friend', s:'up from 91% · 2024' },
              { n:'42',    l:'Countries represented', s:'across 7 offices' },
              { n:'18wk',  l:'Paid parental leave', s:'all caregivers, equal' },
            ].map(x=>(
              <div key={x.l} style={{display:'flex', alignItems:'baseline', gap:14}}>
                <div className="display" style={{fontSize:40, fontWeight:600, letterSpacing:-0.02, color:PULSE.ink}}>{x.n}</div>
                <div>
                  <div style={{fontSize:12, fontWeight:600, color:PULSE.ink}}>{x.l}</div>
                  <div className="mono" style={{fontSize:10, color:PULSE.ink3, letterSpacing:0.5, marginTop:2}}>{x.s}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Block>

      {/* TESTIMONIALS */}
      <Block name="employee_stories" type="block" accent={PULSE.coral}>
        <div style={{padding:'80px 48px', background:PULSE.paper, position:'relative'}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'end', marginBottom:40}}>
            <div>
              <div className="mono" style={{fontSize:11, letterSpacing:2, color:PULSE.ink3, marginBottom:10}}>§ 02  ·  VOICES</div>
              <h2 className="display" style={{margin:0, fontSize:44, fontWeight:500, letterSpacing:-0.02, maxWidth:680}}>
                Stories from people who <span style={{fontStyle:'italic', color:PULSE.coral}}>stayed</span>.
              </h2>
            </div>
            <div style={{display:'flex', gap:8}}>
              <Btn kind="light" size="sm">←</Btn>
              <Btn kind="light" size="sm">→</Btn>
            </div>
          </div>

          <div style={{display:'grid', gridTemplateColumns:'1.2fr 1fr 1fr', gap:18}}>
            {[
              { q:'I joined to ship one model. I stayed because Pulse is the first place where my mentor said "slow down" and meant it.',
                n:'Priya Ramanathan', r:'Staff ML Engineer · Berlin', y:'3rd year', tone:'coral', feature:true, accent:PULSE.coral },
              { q:'Pulse is the only place where design reviews start with "what do users feel?" — not "what does the dashboard say?"',
                n:'Marcos Oliveira', r:'Principal Designer · Lisbon', y:'5th year', tone:'mint', accent:PULSE.mint },
              { q:'I came back after my kid was born. Pulse held the role for 14 months. That\'s not a perk, that\'s a posture.',
                n:'Zahra Idris', r:'VP of Ops · Remote (Nairobi)', y:'7th year', tone:'amber', accent:PULSE.amber },
            ].map((t, i) => (
              <div key={i} style={{
                background: t.feature? PULSE.ink : PULSE.paper2, color: t.feature? PULSE.paper : PULSE.ink,
                borderRadius:18, padding:28, border:`1px solid ${t.feature?'transparent':PULSE.line2}`,
                display:'flex', flexDirection:'column', gap:20, position:'relative', overflow:'hidden'
              }}>
                {t.feature && <NeonBlob color={t.accent} size={300} style={{right:-80, top:-80, opacity:0.4}}/>}
                <div className="display" style={{fontSize: t.feature?66:46, lineHeight:0.7, color:t.accent, opacity:0.9, marginBottom:-10, position:'relative'}}>&ldquo;</div>
                <div className="display" style={{fontSize: t.feature?22:17, fontWeight:500, lineHeight:1.35, letterSpacing:-0.01, position:'relative', flex:1}}>
                  {t.q}
                </div>
                <div style={{display:'flex', alignItems:'center', gap:12, paddingTop:16, borderTop:`1px solid ${t.feature?'rgba(244,237,225,0.15)':PULSE.line2}`, position:'relative'}}>
                  <Placeholder w={44} h={44} tone={t.tone} label="" radius={99}/>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13, fontWeight:600}}>{t.n}</div>
                    <div className="mono" style={{fontSize:10, opacity:0.65, letterSpacing:0.5, marginTop:2}}>{t.r}</div>
                  </div>
                  <Chip tone={t.feature?'coral':'paper'}>{t.y}</Chip>
                </div>
              </div>
            ))}
          </div>

          {/* stats strip under testimonials */}
          <div style={{marginTop:36, padding:20, background:PULSE.paper2, borderRadius:14, display:'flex', alignItems:'center', justifyContent:'space-between'}}>
            <div className="mono" style={{fontSize:11, letterSpacing:1.5, color:PULSE.ink2}}>
              READ 42 MORE STORIES — VIDEO, AUDIO, WRITTEN
            </div>
            <Btn kind="primary" size="sm" arrow>Pulse Stories</Btn>
          </div>
        </div>
      </Block>

      <Footer/>
    </div>
  );
}

Object.assign(window, { Homepage });
