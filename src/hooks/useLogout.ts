import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { logoutAction } from '@/app/actions/auth.actions'; // adjust import path if needed

export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: logoutAction,
    onSuccess: (data) => {
      console.log('Logout response:', data);
      if (data.success) {
        deleteCookie('accessToken');
        deleteCookie('sessionId');
        queryClient.removeQueries({ queryKey: ['user'] });
        toast.success('User logged out successfully!');
        setTimeout(() => {
          router.push('/auth/login');
        }, 100);
      } else {
        toast.error(data.message || 'Logout failed');
      }
    },
    onError: (err) => {
      toast.error(`Error: ${err.message || 'Something went wrong'}`);
    }
  });
};
