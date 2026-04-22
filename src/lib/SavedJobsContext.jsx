'use client';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const SavedJobsContext = createContext(null);

export function SavedJobsProvider({ children }) {
  const [savedIds, setSavedIds] = useState([]);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('pulse_saved_jobs') || '[]');
      if (Array.isArray(stored)) setSavedIds(stored);
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem('pulse_saved_jobs', JSON.stringify(savedIds));
  }, [savedIds]);

  const isSaved = useCallback((id) => savedIds.includes(id), [savedIds]);

  const toggleSave = useCallback((id) => {
    setSavedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  }, []);

  const openPanel  = useCallback(() => setIsPanelOpen(true),  []);
  const closePanel = useCallback(() => setIsPanelOpen(false), []);

  return (
    <SavedJobsContext.Provider value={{ savedIds, isSaved, toggleSave, isPanelOpen, openPanel, closePanel }}>
      {children}
    </SavedJobsContext.Provider>
  );
}

export function useSavedJobs() {
  const ctx = useContext(SavedJobsContext);
  if (!ctx) throw new Error('useSavedJobs must be used inside SavedJobsProvider');
  return ctx;
}
