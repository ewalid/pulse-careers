'use client';
import { useState, useEffect } from 'react';
import { getProfile, getSegment } from './userProfile';

const SEGMENT_COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

const SLUG_MAP = {
  'Engineering':   'home-engineering',
  'AI & Research': 'home-ai-research',
  'Design':        'home-design',
  'Data Science':  'home-data-science',
  'Operations':    'home-operations',
};

export function usePersonalization() {
  const [state, setState] = useState({
    isNew: true,
    isReturning: false,
    visitCount: 0,
    segment: null,
    topCategory: null,
  });

  useEffect(() => {
    const profile = getProfile();
    const segment = getSegment();

    setState({
      isNew: !profile.visitCount,
      isReturning: (profile.visitCount || 0) > 1,
      visitCount: profile.visitCount || 0,
      segment,
      topCategory: segment,
    });

    // Mirror segment to cookie for middleware access
    if (segment && SLUG_MAP[segment]) {
      document.cookie = `pulse_segment=${SLUG_MAP[segment]}; path=/; max-age=${SEGMENT_COOKIE_MAX_AGE}; SameSite=Lax`;
    }
  }, []);

  return state;
}
