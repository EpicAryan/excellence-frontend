import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getStudents, 
  toggleStudentPermission, 
  removeBatchFromStudent, 
  removeStudent 
} from "@/app/actions/students.actions";
import { toast } from "sonner";
import { Student } from "@/types/notes";

interface MutationContext {
  previousStudents?: Student[];
}

// Custom hook for fetching students
export function useStudents() {
  return useQuery<Student[], Error>({
    queryKey: ['students'],
    queryFn: getStudents,
    staleTime: 0,
  });
}

// Custom hook for toggling student permission
export function useTogglePermission() {
  const queryClient = useQueryClient();
  const [currentStudentId, setCurrentStudentId] = useState<string | null>(null);

  const mutation = useMutation<
    void, 
    Error, 
    { studentId: string; hasPermission: boolean },
    MutationContext
  >({
    mutationFn: ({ studentId, hasPermission }) => {
      setCurrentStudentId(studentId);
      return toggleStudentPermission(studentId, hasPermission);
    },
    onMutate: async ({ studentId, hasPermission }) => {
      await queryClient.cancelQueries({ queryKey: ['students'] });
    
      const previousStudents = queryClient.getQueryData<Student[]>(['students']);
      
      queryClient.setQueryData<Student[]>(['students'], (old) => {
        return old?.map((student) => 
          student.id === studentId ? { ...student, hasPermission } : student
        );
      });
      
      return { previousStudents };
    },
    onSuccess: (_, { hasPermission }) => {
      toast.success(`Permission ${hasPermission ? 'granted' : 'restricted'} successfully`);
    },
    onError: (err, _, context) => {
      if (context?.previousStudents) {
        queryClient.setQueryData(['students'], context.previousStudents);
      }
      toast.error("Failed to update permission");
    },
    onSettled: () => {
      setCurrentStudentId(null);
      // queryClient.invalidateQueries({ queryKey: ['students'] });
    },
  });

  return {
    ...mutation,
    currentStudentId
  };
}

// Custom hook for removing batch from student
export function useRemoveBatch() {
  const queryClient = useQueryClient();

  return useMutation<
    void, 
    Error, 
    { studentId: string; batchId: string },
    MutationContext
  >({
    mutationFn: ({ studentId, batchId }) => {
      return removeBatchFromStudent(studentId, batchId);
    },
    onMutate: async ({ studentId, batchId }) => {
      await queryClient.cancelQueries({ queryKey: ['students'] });
      
      const previousStudents = queryClient.getQueryData<Student[]>(['students']);
      
      queryClient.setQueryData<Student[]>(['students'], (old) => {
        return old?.map((student) => {
          if (student.id === studentId) {
            return {
              ...student,
              batches: student.batches.filter((batch) => batch.id !== batchId)
            };
          }
          return student;
        });
      });
      
      return { previousStudents };
    },
    onSuccess: () => {
      toast.success("Batch removed successfully");
    },
    onError: (err, _, context) => {
      if (context?.previousStudents) {
        queryClient.setQueryData(['students'], context.previousStudents);
      }
      toast.error("Failed to remove batch");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
    },
  });
}

// Custom hook for removing student
export function useRemoveStudent() {
  const queryClient = useQueryClient();

  return useMutation<
    void, 
    Error, 
    string,
    MutationContext
  >({
    mutationFn: (studentId: string) => {
      return removeStudent(studentId);
    },
    onMutate: async (studentId) => {
      await queryClient.cancelQueries({ queryKey: ['students'] });
      
      const previousStudents = queryClient.getQueryData<Student[]>(['students']);
      
      queryClient.setQueryData<Student[]>(['students'], (old) => {
        return old?.filter((student) => student.id !== studentId);
      });
      
      return { previousStudents };
    },
    onSuccess: () => {
      toast.success("Student removed successfully");
    },
    onError: (err, _, context) => {
      if (context?.previousStudents) {
        queryClient.setQueryData(['students'], context.previousStudents);
      }
      toast.error("Failed to remove student");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
    },
  });
}
