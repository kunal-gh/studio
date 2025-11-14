'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  Photograph, 
  Testimonial, 
  getPhotographs, 
  getTestimonials,
  initializeLocalData 
} from './local-data';

interface DataContextValue {
  photographs: Photograph[];
  testimonials: Testimonial[];
  isLoading: boolean;
}

const DataContext = createContext<DataContextValue | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [photographs, setPhotographs] = useState<Photograph[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize data on mount
    initializeLocalData();
    setPhotographs(getPhotographs());
    setTestimonials(getTestimonials());
    setIsLoading(false);
  }, []);

  return (
    <DataContext.Provider value={{ photographs, testimonials, isLoading }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
}

// Helper hooks for specific data
export function usePhotographs(category?: string) {
  const { photographs, isLoading } = useData();
  const filtered = category 
    ? photographs.filter(p => p.category === category)
    : photographs;
  return { data: filtered, isLoading };
}

export function useTestimonials() {
  const { testimonials, isLoading } = useData();
  return { data: testimonials, isLoading };
}
