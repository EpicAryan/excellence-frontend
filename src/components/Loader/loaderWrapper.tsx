// components/LoaderWrapper.tsx
'use client';
import { useEffect, useState } from 'react';
import Loader from './loader';

export default function LoaderWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1500); // or wait for router events
    return () => clearTimeout(timeout);
  }, []);

  if (loading) return <Loader />;
  return <>{children}</>;
}
