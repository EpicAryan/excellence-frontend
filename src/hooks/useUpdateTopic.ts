// hooks/useUpdateTopic.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTopicAction } from '@/app/actions/topic.actions';
import { Topic } from '@/types/notes';
import { toast } from 'sonner';

export function useUpdateTopic() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ topicId, topicData }: { topicId: string, topicData: Partial<Topic> }) => {
      return updateTopicAction(topicId, topicData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['topics'] });
      toast.success('Topic updated successfully');
    },
    onError: (error: Error) => {
      toast.error(`Error: ${error.message}`);
    }
  });
}
