'use client';
import { useEffect } from 'react';
import { trackJobView } from '@/lib/userProfile';

export default function JobViewTracker({ category }) {
  useEffect(() => { trackJobView(category); }, [category]);
  return null;
}
