
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTopicAction } from '@/app/actions/topic.actions';
import { toast } from 'sonner';

export function useDeleteTopic( onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (topicId: string) => {
      return deleteTopicAction(topicId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['topics'] });
      toast.success('Topic deleted successfully');
      onSuccessCallback?.();
    },
    onError: (error: Error) => {
      toast.error(`Error: ${error.message}`);
    }
  });
}
