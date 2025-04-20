'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleTopicStatusAction } from '@/app/actions/topic.actions';
import { toast } from 'sonner';

export const useToggleTopicStatus = () =>{
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async ({ topicId, isActive}: {topicId: string, isActive: boolean}) => {
            return toggleTopicStatusAction(topicId, isActive);
        },
        onSuccess: (_, variables) => {
            toast.success('Topic status updated!');
            queryClient.invalidateQueries({ queryKey: ['topics'] });
            return variables.topicId;
        },
        onError: (error: unknown) => {
            toast.error('Failed to update topic status');
            console.error(error);
        },
    
    });
    return {
        mutate: mutation.mutate,
        isLoading: mutation.isPending,
    };
}
