'use client';
import { useState } from 'react';
import { useIsMobile } from '@/lib/useIsMobile';

const LANGUAGES = ['English', 'Portuguese', 'Spanish', 'French', 'German', 'Dutch', 'Italian', 'Other'];
const REQUIRED_FIELDS = ['fullName', 'email', 'country', 'resume', 'linkedin', 'whyPulse'];

const CHIP_COLORS = {
  'AI & Research': '#9B7FD4',
  'Engineering':   '#2A7A6B',
  'Data Science':  '#C9901A',
  'Design':        '#2A7A6B',
  'Operations':    '#C9901A',
};

function FieldLabel({ children, required }) {
  return (
    <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 500, color: 'var(--ink)', marginBottom: 7, display: 'flex', gap: 4, alignItems: 'center' }}>
      {children}
      {required && <span style={{ color: '#FF7A5C' }}>*</span>}
    </div>
  );
}

function TextInput({ placeholder, value, onChange, type = 'text' }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{
        width: '100%', padding: '11px 14px',
        fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--ink)',
        background: 'var(--paper)', border: '1.5px solid var(--line2)',
        borderRadius: 10, outline: 'none', boxSizing: 'border-box',
        transition: 'border-color 0.15s',
      }}
      onFocus={e => { e.currentTarget.style.borderColor = '#FF7A5C'; }}
      onBlur={e => { e.currentTarget.style.borderColor = 'var(--line2)'; }}
    />
  );
}

function Textarea({ placeholder, value, onChange, maxLength = 466 }) {
  return (
    <div style={{ position: 'relative' }}>
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        maxLength={maxLength}
        rows={4}
        style={{
          width: '100%', padding: '11px 14px',
          fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--ink)',
          background: 'var(--paper)', border: '1.5px solid var(--line2)',
          borderRadius: 10, outline: 'none', resize: 'vertical', boxSizing: 'border-box',
          transition: 'border-color 0.15s', lineHeight: 1.6,
        }}
        onFocus={e => { e.currentTarget.style.borderColor = '#FF7A5C'; }}
        onBlur={e => { e.currentTarget.style.borderColor = 'var(--line2)'; }}
      />
      <div style={{ position: 'absolute', bottom: 10, right: 12, fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--ink3)' }}>
        {value.length}/{maxLength}
      </div>
    </div>
  );
}

function SectionNumber({ n }) {
  return (
    <span style={{
      fontFamily: 'var(--font-mono)', fontSize: 11, color: '#FF7A5C',
      letterSpacing: 0, minWidth: 22, paddingTop: 6,
    }}>
      {String(n).padStart(2, '0')}
    </span>
  );
}

export default function ApplyForm({ job }) {
  const isMobile = useIsMobile();
  const teamColor = CHIP_COLORS[job.job_category] || '#9B7FD4';

  const [form, setForm] = useState({
    fullName: '', email: '', phone: '', country: '',
    linkedin: '', portfolio: '',
    languages: [],
    whyPulse: '', hardestProblem: '',
    startDate: '', compExpectation: '', source: '',
    consent: false,
  });

  const set = (key) => (val) => setForm(f => ({ ...f, [key]: val }));

  const toggleLang = (lang) => {
    setForm(f => ({
      ...f,
      languages: f.languages.includes(lang)
        ? f.languages.filter(l => l !== lang)
        : [...f.languages, lang],
    }));
  };

  const completed = REQUIRED_FIELDS.filter(k => {
    if (k === 'resume') return false; // file upload, skip for count
    return form[k] && form[k].length > 0;
  }).length + (form.consent ? 1 : 0);
  const total = REQUIRED_FIELDS.length + 1;
  const remaining = total - completed;

  const responsibilities = (job.responsibilities || []).slice(0, 3);

  return (
    <div style={{ background: 'var(--paper)', minHeight: '100vh' }}>

      {/* Top bar */}
      <div style={{
        borderBottom: '1px solid var(--line2)',
        padding: isMobile ? '14px 20px' : '14px 48px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <a href={`/jobs/${job.id}`} style={{
          fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1.5,
          color: 'var(--ink3)', textDecoration: 'none', textTransform: 'uppercase',
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          ← Back to role
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1, color: 'var(--ink3)', textTransform: 'uppercase' }}>Progress</span>
          <div style={{ width: isMobile ? 80 : 120, height: 3, background: 'var(--line)', borderRadius: 99, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${(completed / total) * 100}%`, background: '#FF7A5C', borderRadius: 99, transition: 'width 0.3s ease' }} />
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink3)', whiteSpace: 'nowrap' }}>
            {completed}/{total} · {Math.round((completed / total) * 100)}%
          </span>
        </div>
      </div>

      {/* Title */}
      <div style={{ padding: isMobile ? '28px 20px 24px' : '36px 48px 28px', borderBottom: '1px solid var(--line2)' }}>
        <h1 style={{
          margin: 0,
          fontFamily: 'var(--font-display)', fontSize: isMobile ? 28 : 44,
          fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1, color: 'var(--ink)',
        }}>
          Apply{' '}
          <span style={{ color: '#FF7A5C' }}>· {job.title}</span>
        </h1>
      </div>

      {/* Body */}
      <div style={{
        display: isMobile ? 'block' : 'grid',
        gridTemplateColumns: '1fr 340px',
        maxWidth: 1280,
        margin: '0 auto',
        padding: isMobile ? '0' : '0 48px',
        gap: 40,
        alignItems: 'start',
      }}>

        {/* LEFT: Form */}
        <div style={{ padding: isMobile ? '24px 20px 80px' : '40px 0 80px' }}>

          {/* Autofill banner */}
          <div style={{
            border: '1.5px dashed rgba(255,122,92,0.4)', borderRadius: 14,
            padding: '16px 20px', marginBottom: 40,
            display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap',
            background: 'rgba(255,122,92,0.03)',
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: 9, background: '#FF7A5C',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontSize: 18, fontWeight: 700, flexShrink: 0,
            }}>+</div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600, color: 'var(--ink)', marginBottom: 2 }}>Autofill from résumé or LinkedIn</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--ink3)', lineHeight: 1.4 }}>We parse the file on-device, pre-fill the form, and delete the copy. You review every field before submit.</div>
            </div>
            <button type="button" style={{
              fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600,
              color: '#fff', background: '#FF7A5C', border: 'none',
              borderRadius: 10, padding: '10px 18px', cursor: 'pointer', whiteSpace: 'nowrap',
            }}>Upload résumé</button>
          </div>

          {/* Section 01: About you */}
          <div style={{ marginBottom: 48 }}>
            <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 6 }}>
              <SectionNumber n={1} />
              <div>
                <h2 style={{ margin: '0 0 4px', fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.02em' }}>About you</h2>
                <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--ink3)' }}>Quick basics. 90 seconds.</p>
              </div>
            </div>
            <div style={{ height: 1, background: 'var(--line2)', margin: '20px 0 24px' }} />
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 16 }}>
              <div>
                <FieldLabel required>Full name</FieldLabel>
                <TextInput placeholder="Ada Lovelace" value={form.fullName} onChange={set('fullName')} />
              </div>
              <div>
                <FieldLabel required>Email</FieldLabel>
                <TextInput placeholder="ada@example.com" value={form.email} onChange={set('email')} type="email" />
              </div>
              <div>
                <FieldLabel>Phone</FieldLabel>
                <TextInput placeholder="+351" value={form.phone} onChange={set('phone')} type="tel" />
              </div>
              <div>
                <FieldLabel required>Country you'd work from</FieldLabel>
                <TextInput placeholder="Lisbon, Portugal" value={form.country} onChange={set('country')} />
              </div>
            </div>
          </div>

          {/* Section 02: Résumé & links */}
          <div style={{ marginBottom: 48 }}>
            <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 6 }}>
              <SectionNumber n={2} />
              <div>
                <h2 style={{ margin: '0 0 4px', fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.02em' }}>Résumé &amp; links</h2>
                <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--ink3)' }}>One is enough. If you only have a LinkedIn, we can work with that.</p>
              </div>
            </div>
            <div style={{ height: 1, background: 'var(--line2)', margin: '20px 0 24px' }} />

            <div style={{ marginBottom: 20 }}>
              <FieldLabel required>Résumé or CV</FieldLabel>
              <label style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                border: '1.5px dashed var(--line)', borderRadius: 12, padding: '28px 20px',
                cursor: 'pointer', background: 'var(--paper2)', gap: 6,
                transition: 'border-color 0.15s, background 0.15s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#FF7A5C'; e.currentTarget.style.background = 'rgba(255,122,92,0.03)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.background = 'var(--paper2)'; }}
              >
                <input type="file" accept=".pdf,.doc,.docx" style={{ display: 'none' }} onChange={() => set('resume')('uploaded')} />
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>Upload file</span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--ink3)' }}>or drag and drop · PDF, DOCX · up to 10MB</span>
              </label>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 16, marginBottom: 20 }}>
              <div>
                <FieldLabel required>LinkedIn URL</FieldLabel>
                <TextInput placeholder="linkedin.com/in/" value={form.linkedin} onChange={set('linkedin')} />
              </div>
              <div>
                <FieldLabel>Portfolio / GitHub</FieldLabel>
                <TextInput placeholder="github.com/" value={form.portfolio} onChange={set('portfolio')} />
              </div>
            </div>

            <div>
              <FieldLabel>Languages you're fluent in</FieldLabel>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {LANGUAGES.map(lang => {
                  const active = form.languages.includes(lang);
                  return (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => toggleLang(lang)}
                      style={{
                        fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 400,
                        padding: '7px 14px', borderRadius: 99,
                        border: `1.5px solid ${active ? '#FF7A5C' : 'var(--line2)'}`,
                        background: active ? 'rgba(255,122,92,0.08)' : 'var(--paper)',
                        color: active ? '#FF7A5C' : 'var(--ink)',
                        cursor: 'pointer', transition: 'all 0.15s',
                      }}
                    >{lang}</button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Section 03: A few questions */}
          <div style={{ marginBottom: 48 }}>
            <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 6 }}>
              <SectionNumber n={3} />
              <div>
                <h2 style={{ margin: '0 0 4px', fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.02em' }}>A few questions</h2>
                <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--ink3)' }}>Short answers welcome. We read every one.</p>
              </div>
            </div>
            <div style={{ height: 1, background: 'var(--line2)', margin: '20px 0 24px' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div>
                <FieldLabel required>Why Pulse?</FieldLabel>
                <Textarea
                  placeholder="One paragraph. What drew you here specifically — no need for the essay version."
                  value={form.whyPulse}
                  onChange={set('whyPulse')}
                />
              </div>
              <div>
                <FieldLabel>Tell us about the hardest engineering problem you've solved</FieldLabel>
                <Textarea
                  placeholder="Optional but appreciated."
                  value={form.hardestProblem}
                  onChange={set('hardestProblem')}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 16 }}>
                <div>
                  <FieldLabel>Earliest start date</FieldLabel>
                  <TextInput placeholder="e.g. Jan–Sept 2025" value={form.startDate} onChange={set('startDate')} />
                </div>
                <div>
                  <FieldLabel>Comp expectations (€ total)</FieldLabel>
                  <TextInput placeholder="e.g. €180–200k" value={form.compExpectation} onChange={set('compExpectation')} />
                </div>
              </div>
              <div>
                <FieldLabel>Where did you hear about Pulse?</FieldLabel>
                <TextInput placeholder="LinkedIn, a friend, Twitter…" value={form.source} onChange={set('source')} />
              </div>
            </div>
          </div>

          {/* Consent */}
          <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer', marginBottom: 32 }}>
            <div
              onClick={() => set('consent')(!form.consent)}
              style={{
                width: 18, height: 18, borderRadius: 5, flexShrink: 0, marginTop: 1,
                border: `2px solid ${form.consent ? '#FF7A5C' : 'var(--line)'}`,
                background: form.consent ? '#FF7A5C' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.15s', cursor: 'pointer',
              }}
            >
              {form.consent && (
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              )}
            </div>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--ink3)', lineHeight: 1.55 }}>
              I consent to Pulse storing my application data for up to 12 months to evaluate this and similar roles. See our{' '}
              <a href="#" style={{ color: '#FF7A5C' }}>candidate privacy notice</a>.
            </span>
          </label>

          {/* Submit row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 20 }}>
            <button
              type="button"
              disabled={remaining > 0}
              style={{
                fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600,
                color: '#fff', background: remaining > 0 ? 'var(--line)' : '#FF7A5C',
                border: 'none', borderRadius: 10, padding: '13px 28px',
                cursor: remaining > 0 ? 'not-allowed' : 'pointer', transition: 'background 0.15s',
              }}
            >
              {remaining > 0 ? `Complete ${remaining} more to submit` : 'Submit application →'}
            </button>
            <button type="button" style={{
              fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--ink3)',
              background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline',
            }}>
              Save draft &amp; continue later
            </button>
          </div>

          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink3)', letterSpacing: 0.5 }}>
            Typical time to complete · 8–12 min
          </div>
        </div>

        {/* RIGHT: Sidebar */}
        {!isMobile && (
          <div style={{ padding: '40px 0 80px', display: 'flex', flexDirection: 'column', gap: 14 }}>

            {/* Job summary card */}
            <div style={{ background: 'var(--paper)', border: '1.5px solid var(--line2)', borderRadius: 16, padding: '20px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 2, color: 'var(--ink3)', textTransform: 'uppercase', marginBottom: 10 }}>You're applying for</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 16 }}>{job.title}</div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
                {[
                  { label: 'Team', value: job.job_category, color: teamColor },
                  { label: 'Location', value: job.location + (job.work_mode ? ` · ${job.work_mode}` : ''), color: 'var(--ink)' },
                  { label: 'Contract', value: job.contract_type, color: 'var(--ink)' },
                  { label: 'Base comp', value: job.salary, color: 'var(--ink)' },
                ].map(({ label, value, color }) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 1, color: 'var(--ink3)', textTransform: 'uppercase', flexShrink: 0 }}>{label}</span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 500, color, textAlign: 'right' }}>{value}</span>
                  </div>
                ))}
              </div>

              {responsibilities.length > 0 && (
                <>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 1.5, color: 'var(--ink3)', textTransform: 'uppercase', marginBottom: 8 }}>What you'll do</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginBottom: 12 }}>
                    {responsibilities.map((r, i) => (
                      <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                        <span style={{ color: '#FF7A5C', fontSize: 10, flexShrink: 0, marginTop: 3 }}>—</span>
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--ink2)', lineHeight: 1.4 }}>{r}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}

              <a href={`/jobs/${job.id}`} style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: '#FF7A5C', textDecoration: 'none' }}>
                See full role description →
              </a>
            </div>

            {/* How we review */}
            <div style={{ background: 'var(--paper)', border: '1.5px solid var(--line2)', borderRadius: 16, padding: '20px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 2, color: 'var(--ink3)', textTransform: 'uppercase', marginBottom: 14 }}>How we review</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { stat: '24h', desc: 'Response from your talent partner' },
                  { stat: '100%', desc: 'Applications read by a human' },
                  { stat: '3x', desc: 'Max applications per 60 days' },
                ].map(({ stat, desc }) => (
                  <div key={stat} style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: '#FF7A5C', letterSpacing: '-0.02em', minWidth: 42 }}>{stat}</span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--ink2)', lineHeight: 1.4 }}>{desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact card */}
            <div style={{ background: 'var(--paper2)', borderRadius: 16, padding: '20px', border: '1.5px solid var(--line2)' }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600, color: 'var(--ink)', marginBottom: 6 }}>Questions before applying?</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--ink3)', marginBottom: 12 }}>Email your talent partner directly.</div>
              <a href="mailto:tonas@pulse.tl" style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, color: '#FF7A5C', textDecoration: 'none' }}>
                tonas@pulse.tl
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
