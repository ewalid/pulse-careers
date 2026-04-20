// SCREEN 04 — EMPLOYER BRAND / LIFE AT PULSE
function BrandPage() {
  return (
    <div style={{width:1280, background:PULSE.paper, color:PULSE.ink}}>
      <Block name="global_nav" type="global" accent={PULSE.violet}><TopNav active="Life at Pulse"/></Block>

      {/* EDITORIAL HERO */}
      <Block name="editorial_hero" type="block" accent={PULSE.coral}>
        <div style={{padding:'56px 48px 32px', position:'relative', overflow:'hidden', background:PULSE.paper}}>
          <NeonBlob color={PULSE.amber} size={500} style={{right:-100, top:-150, opacity:0.5}}/>
          <div style={{display:'grid', gridTemplateColumns:'auto 1fr', gap:40, alignItems:'end', position:'relative'}}>
            <div className="mono" style={{fontSize:11, letterSpacing:2, color:PULSE.ink3, writingMode:'vertical-rl', transform:'rotate(180deg)', alignSelf:'stretch'}}>
              ISSUE 14  ·  SPRING 2026  ·  LIFE AT PULSE
            </div>
            <div>
              <h1 className="display" style={{margin:0, fontSize:140, fontWeight:500, lineHeight:0.85, letterSpacing:-0.045}}>
                Warm <span style={{fontStyle:'italic', color:PULSE.coral}}>machines</span>,<br/>
                careful <span style={{fontStyle:'italic', color:PULSE.amber}}>humans</span>.
              </h1>
              <div style={{display:'flex', gap:48, marginTop:32, maxWidth:880, justifyContent:'space-between'}}>
                <p style={{fontSize:16, lineHeight:1.55, color:PULSE.ink2, maxWidth:420, margin:0}}>
                  Pulse is 2,400 people across seven cities, building the infrastructure
                  behind models you'll use every day without noticing. This is a field guide to
                  what it's like inside.
                </p>
                <div style={{display:'flex', flexDirection:'column', gap:8, minWidth:200}}>
                  <Chip tone="paper">8 min read</Chip>
                  <Chip tone="paper">Last updated · Mar 2026</Chip>
                  <Chip tone="paper">Written by the team</Chip>
                </div>
              </div>
            </div>
          </div>

          {/* Editorial image grid */}
          <div style={{display:'grid', gridTemplateColumns:'2fr 1fr 1fr', gridTemplateRows:'240px 180px', gap:12, marginTop:40}}>
            <div style={{gridRow:'1 / 3'}}>
              <Placeholder h="100%" tone="dusk" label="editorial · team portrait · golden hour" radius={18}
                overlay={
                  <div style={{position:'absolute', top:16, left:16, background:PULSE.paper+'ee', padding:'6px 11px', borderRadius:99, fontSize:11, display:'flex', alignItems:'center', gap:8}}>
                    <div style={{width:6, height:6, borderRadius:99, background:PULSE.coral}}/>
                    <span className="mono" style={{letterSpacing:1}}>LISBON · Q1 OFFSITE</span>
                  </div>
                }
              />
            </div>
            <Placeholder h={240} tone="amber" label="studio · model room" radius={18}/>
            <Placeholder h={240} tone="mint" label="rooftop · berlin" radius={18}/>
            <Placeholder h={180} tone="violet" label="research library" radius={18}/>
            <Placeholder h={180} tone="coral" label="community kitchen" radius={18}/>
          </div>
        </div>
      </Block>

      {/* VIDEO EMBED */}
      <Block name="hero_video" type="embed" accent={PULSE.violet}>
        <div style={{padding:'56px 48px', background:PULSE.paper2, borderTop:`1px solid ${PULSE.line2}`}}>
          <div className="mono" style={{fontSize:11, letterSpacing:2, color:PULSE.ink3, marginBottom:18}}>§ 01  ·  FROM THE FOUNDERS</div>
          <div style={{position:'relative', borderRadius:24, overflow:'hidden', background:PULSE.ink, aspectRatio:'16 / 7'}}>
            <Placeholder h="100%" tone="ink" label="" radius={0}
              overlay={
                <div style={{position:'absolute', inset:0, background:`linear-gradient(180deg, transparent 40%, rgba(26,20,24,0.75))`, padding:32, display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
                  <div style={{display:'flex', justifyContent:'space-between', color:PULSE.paper}}>
                    <div className="mono" style={{fontSize:10, letterSpacing:2, opacity:0.75}}>▸ NOW PLAYING · CEO + HEAD OF PEOPLE</div>
                    <div className="mono" style={{fontSize:10, letterSpacing:2, opacity:0.75}}>4K · CC · 6:42</div>
                  </div>
                  {/* center play */}
                  <div style={{position:'absolute', left:'50%', top:'50%', transform:'translate(-50%,-50%)', display:'flex', alignItems:'center', gap:16}}>
                    <button style={{
                      width:88, height:88, borderRadius:99, background:PULSE.coral, border:'none',
                      display:'grid', placeItems:'center', cursor:'pointer', color:PULSE.ink,
                      boxShadow:`0 0 0 8px rgba(255,122,92,0.2), 0 0 60px ${PULSE.coral}99`
                    }}>
                      {Icon.play(32, PULSE.ink)}
                    </button>
                  </div>
                  <div style={{color:PULSE.paper}}>
                    <div className="display" style={{fontSize:36, fontWeight:500, maxWidth:700, letterSpacing:-0.015}}>
                      "We're not building a lab. We're building a place where people like working."
                    </div>
                    <div className="mono" style={{fontSize:11, letterSpacing:1, opacity:0.7, marginTop:12}}>
                      — IVANA SÁ · CEO &amp; CO-FOUNDER, PULSE
                    </div>
                    {/* scrubber */}
                    <div style={{display:'flex', alignItems:'center', gap:12, marginTop:20}}>
                      <div style={{flex:1, height:3, background:'rgba(244,237,225,0.2)', borderRadius:99, position:'relative'}}>
                        <div style={{width:'22%', height:'100%', background:PULSE.coral, borderRadius:99}}/>
                      </div>
                      <div className="mono" style={{fontSize:10, color:PULSE.paper, opacity:0.75}}>1:28 / 6:42</div>
                    </div>
                  </div>
                </div>
              }
            />
          </div>
        </div>
      </Block>

      {/* VALUES */}
      <Block name="values" type="block" accent={PULSE.mint}>
        <div style={{padding:'88px 48px', background:PULSE.paper}}>
          <div style={{display:'grid', gridTemplateColumns:'1fr 2fr', gap:60, marginBottom:44}}>
            <div>
              <div className="mono" style={{fontSize:11, letterSpacing:2, color:PULSE.ink3, marginBottom:10}}>§ 02  ·  HOW WE WORK</div>
              <h2 className="display" style={{margin:0, fontSize:48, fontWeight:500, letterSpacing:-0.02, lineHeight:1.02}}>
                Five values.<br/>Written down.<br/>Actually used.
              </h2>
            </div>
            <p style={{alignSelf:'end', fontSize:16, lineHeight:1.6, color:PULSE.ink2, margin:0, maxWidth:520}}>
              These aren't posters. We quote them in promo cases, compensation conversations, and
              performance reviews. If you join, you'll be assessed on them — and so will your manager.
            </p>
          </div>

          <div style={{display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:14}}>
            {[
              { n:'01', t:'Slow is smooth.',     d:'We cut fewer corners than our competitors. We ship more because of it.',  c:PULSE.coral,  tone:'coral' },
              { n:'02', t:'Show your working.',  d:'Memos over meetings. Write it down; disagree on paper; decide.',          c:PULSE.amber,  tone:'amber' },
              { n:'03', t:'Users, then users.',  d:'The person on the other end of the screen is the only audience that matters.', c:PULSE.mint,   tone:'mint' },
              { n:'04', t:'Warm, not soft.',      d:'Kindness is the baseline. Candor is the craft. We practice both.',         c:PULSE.violet, tone:'violet' },
              { n:'05', t:'Play the long game.',  d:'Compound interest is our favorite physics. Tenure is our favorite metric.', c:PULSE.coralSoft, tone:'dusk' },
            ].map(v=>(
              <div key={v.n} style={{background:PULSE.paper2, borderRadius:16, padding:24, position:'relative', overflow:'hidden'}}>
                <div style={{position:'absolute', top:0, left:0, right:0, height:4, background:v.c}}/>
                <div className="mono" style={{fontSize:11, color:PULSE.ink3, letterSpacing:1, marginBottom:34}}>VALUE / {v.n}</div>
                <div className="display" style={{fontSize:22, fontWeight:600, letterSpacing:-0.015, lineHeight:1.15}}>{v.t}</div>
                <div style={{fontSize:13, color:PULSE.ink2, marginTop:10, lineHeight:1.5}}>{v.d}</div>
              </div>
            ))}
          </div>
        </div>
      </Block>

      {/* LIFESTYLE + PULL QUOTE */}
      <Block name="editorial_lifestyle" type="block" accent={PULSE.coral}>
        <div style={{padding:'72px 48px', background:PULSE.paper2, borderTop:`1px solid ${PULSE.line2}`}}>
          <div style={{display:'grid', gridTemplateColumns:'1.4fr 1fr', gap:32, alignItems:'stretch'}}>
            <Placeholder h={460} tone="coral" label="feature · lisbon studio · sunset" radius={22}
              overlay={
                <div style={{position:'absolute', bottom:20, left:20, right:20, background:PULSE.paper+'dd', backdropFilter:'blur(10px)', padding:'14px 18px', borderRadius:12, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                  <div style={{fontSize:13, fontWeight:600}}>The Lisbon studio · 240 people · open since 2023</div>
                  <Chip tone="paper">↗ Tour</Chip>
                </div>
              }
            />
            <div style={{background:PULSE.ink, color:PULSE.paper, borderRadius:22, padding:40, display:'flex', flexDirection:'column', justifyContent:'space-between', position:'relative', overflow:'hidden'}}>
              <NeonBlob color={PULSE.coral} size={320} style={{right:-100, top:-80, opacity:0.4}}/>
              <div className="mono" style={{fontSize:11, letterSpacing:2, color:PULSE.mint, position:'relative'}}>PULL QUOTE</div>
              <div className="display" style={{fontSize:32, fontWeight:500, lineHeight:1.2, letterSpacing:-0.015, position:'relative'}}>
                &ldquo;The thing no one tells you about Pulse is how <span style={{color:PULSE.amber, fontStyle:'italic'}}>unhurried</span> it feels.
                People take real lunch. Real vacations. Real parental leave. It's the most adult workplace I've been in.&rdquo;
              </div>
              <div style={{display:'flex', alignItems:'center', gap:12, position:'relative'}}>
                <Placeholder w={44} h={44} tone="amber" label="" radius={99}/>
                <div>
                  <div style={{fontSize:13, fontWeight:600}}>Hana Okafor</div>
                  <div className="mono" style={{fontSize:10, opacity:0.65, letterSpacing:0.5, marginTop:2}}>STAFF ENGINEER · 6TH YEAR · SINGAPORE</div>
                </div>
              </div>
            </div>
          </div>

          {/* secondary grid */}
          <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:12, marginTop:22}}>
            {[
              { tone:'mint', l:'hackathon · quarterly', cap:'Hack Week XIX · "Small tools"' },
              { tone:'violet', l:'learning budget · €3,000/yr', cap:'In use: 94% of team' },
              { tone:'amber', l:'parental leave · 18 weeks', cap:'Equal across caregivers' },
              { tone:'coral', l:'sabbatical · 6 weeks @ year 4', cap:'Paid. Full stop.' },
            ].map((x,i)=>(
              <Placeholder key={i} h={180} tone={x.tone} label={x.l} radius={14}
                overlay={
                  <div style={{position:'absolute', inset:0, padding:14, display:'flex', flexDirection:'column', justifyContent:'flex-end', background:'linear-gradient(180deg, transparent 40%, rgba(42,31,46,0.5))'}}>
                    <div className="mono" style={{fontSize:10, letterSpacing:1, color:PULSE.paper, opacity:0.9}}>{x.cap}</div>
                  </div>
                }
              />
            ))}
          </div>
        </div>
      </Block>

      {/* CTA */}
      <Block name="brand_cta" type="block" accent={PULSE.amber}>
        <div style={{padding:'80px 48px', background:PULSE.paper, textAlign:'center', position:'relative', overflow:'hidden'}}>
          <NeonBlob color={PULSE.coral} size={400} style={{left:'20%', top:0, opacity:0.35}}/>
          <NeonBlob color={PULSE.mint} size={400} style={{right:'15%', bottom:-100, opacity:0.4}}/>
          <div className="mono" style={{fontSize:11, letterSpacing:2, color:PULSE.ink3, marginBottom:14, position:'relative'}}>§ JOIN US</div>
          <h2 className="display" style={{margin:'0 auto', fontSize:72, fontWeight:500, letterSpacing:-0.03, maxWidth:980, lineHeight:0.98, position:'relative'}}>
            If any of this sounds <span style={{fontStyle:'italic', color:PULSE.coral}}>like home</span>,<br/>
            let's talk.
          </h2>
          <div style={{display:'flex', gap:12, justifyContent:'center', marginTop:34, position:'relative'}}>
            <Btn kind="primary" size="lg" arrow>Browse 247 roles</Btn>
            <Btn kind="ghost" size="lg">Join talent network</Btn>
          </div>
        </div>
      </Block>

      <Footer/>
    </div>
  );
}

Object.assign(window, { BrandPage });
