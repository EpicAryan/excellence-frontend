'use client';

import { useQuery } from '@tanstack/react-query';
import { getUserAction } from '@/app/actions/user.actions';
import { UserType } from '@/types/notes';

export function useUser() {
  return useQuery<UserType | null>({
    queryKey: ['user'],
    queryFn: async () => await getUserAction(),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}
