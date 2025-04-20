// hooks/useTopics.ts
'use client'

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchTopics, TopicsQueryParams } from '@/app/actions/topic.actions';
// import { Topic } from '@/types/notes';

interface UseTopicsOptions {
  initialFilters?: TopicsQueryParams;
  limit?: number;
}

export function useTopics(options: UseTopicsOptions = {}) {
  const [filters, setFilters] = useState<TopicsQueryParams>({
    search: '',
    boardId: '',
    classId: '',
    subjectId: '',
    page: 1,
    limit: options.limit || 10,
    ...options.initialFilters
  });

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['topics', filters],
    queryFn: () => fetchTopics(filters),
  });

  const updateSearch = (search: string) => {
    setFilters(prev => ({ ...prev, search, page: 1 }));
  };

  const updateFilters = (newFilters: Partial<TopicsQueryParams>) => {
    setFilters(prev => ({ 
      ...prev, 
      ...newFilters,
      // Reset page to 1 when changing filters, but not when explicitly changing page
      page: 'page' in newFilters ? newFilters.page : 1
    }));
  };

  const updatePage = (page: number) => {
    setFilters(prev => ({ ...prev, page }));
  };

  return {
    topics: data?.data || [],
    pagination: data?.pagination,
    isLoading,
    isError,
    filters,
    updateSearch,
    updateFilters,
    updatePage,
    refetch
  };
}
