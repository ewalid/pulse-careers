const KEY = 'pulse_profile';

export function getProfile() {
  if (typeof window === 'undefined') return {};
  try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch { return {}; }
}

export function updateProfile(patch) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(KEY, JSON.stringify({ ...getProfile(), ...patch }));
}

export function trackJobView(category) {
  if (!category) return;
  const p = getProfile();
  const cats = { ...(p.viewedCategories || {}) };
  cats[category] = (cats[category] || 0) + 1;
  updateProfile({ viewedCategories: cats });
}

export function incrementVisitCount() {
  const p = getProfile();
  updateProfile({ visitCount: (p.visitCount || 0) + 1, lastVisit: Date.now() });
}

export function getSegment() {
  const { viewedCategories = {} } = getProfile();
  const entries = Object.entries(viewedCategories);
  if (!entries.length) return null;
  return entries.sort(([, a], [, b]) => b - a)[0][0];
}

export function resetProfile() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(KEY);
  document.cookie = 'pulse_segment=; path=/; max-age=0';
}
