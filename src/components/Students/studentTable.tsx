'use client'

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Loader2, Check, X as XIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { format } from 'date-fns';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useStudents, useTogglePermission, useRemoveBatch, useRemoveStudent } from "@/hooks/student-hooks";


const StudentTable = () => {
  const [studentToRemove, setStudentToRemove] = useState<string | null>(null);
  const [batchToRemove, setBatchToRemove] = useState<{studentId: string, batchId: string} | null>(null);

  const formatDate = (dateString: string) => {
      if(!dateString) return '';
      return format(new Date(dateString), 'MMM dd, yyyy');
    };

  // Custom hooks
  const { data: students, isLoading, error, refetch } = useStudents();
  const { mutate: togglePermission, isPending: isTogglingPermission, currentStudentId: togglingStudentId } = useTogglePermission();
  const { mutate: removeBatch, isPending: isRemovingBatch } = useRemoveBatch();
  const { mutate: removeStudentMutation, isPending: isRemovingStudent } = useRemoveStudent();

  const handlePermissionToggle = (studentId: string, currentValue: boolean) => {
    togglePermission({ studentId, hasPermission: !currentValue });
  };

  const handleRemoveBatchConfirm = (studentId: string, batchId: string) => {
    setBatchToRemove({ studentId, batchId });
  };
  
  const handleRemoveStudentConfirm = (studentId: string) => {
    setStudentToRemove(studentId);
  };

  const confirmRemoveBatch = () => {
    if (batchToRemove) {
      removeBatch(batchToRemove);
      setBatchToRemove(null); // Reset state
    }
  };
  
  const confirmRemoveStudent = () => {
    if (studentToRemove) {
      removeStudentMutation(studentToRemove);
      setStudentToRemove(null); // Reset state
    }
  };

  if (error) {
    return (
      <Card className="w-full bg-[#1E1E1E] border-[#8D6CCB]/20 mt-6">
        <CardContent className="p-6 text-center">
          <p className="text-red-400">Failed to load students. Please try again.</p>
          <Button 
            onClick={() => refetch()} 
            className="mt-4 bg-[#8D6CCB]"
          >
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full bg-[#1E1E1E] border-[#8D6CCB]/20">
      <CardHeader>
        <CardTitle className="text-white text-xl font-bold">Student Enrollment Management</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 text-[#8D6CCB] animate-spin" />
          </div>
        ) : (
          <Table className="border-collapse">
            <TableHeader>
              <TableRow className="border-b border-[#6544A3]/30 bg-[#6544A3]/60 hover:bg-[#6544A3]/80 mr-4 ">
                <TableHead className="text-[#A3A3A3] font-semibold">Student name</TableHead>
                <TableHead className="text-[#A3A3A3] font-semibold">Email</TableHead>
                <TableHead className="text-[#A3A3A3] font-semibold">Enrolled Date</TableHead>
                <TableHead className="text-[#A3A3A3] font-semibold">Permission</TableHead>
                <TableHead className="text-[#A3A3A3] font-semibold">Batches/Classes</TableHead>
                <TableHead className="text-[#A3A3A3] font-semibold text-right pr-2 md:pr-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students?.map((student) => (
                <TableRow 
                  key={student.id} 
                  className="border-b border-[#6544A3]/20 hover:bg-[#6544A3]/10"
                >
                  <TableCell className="font-medium text-white">{student.name}</TableCell>
                  <TableCell className="text-[#A3A3A3]">{student.email}</TableCell>
                  <TableCell className="text-[#A3A3A3]">
                    {formatDate(student.enrolledDate)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2 h-6">
                      <Switch
                        checked={student.hasPermission}
                        onCheckedChange={() => handlePermissionToggle(student.id, student.hasPermission)}
                        className="data-[state=checked]:bg-green-500"
                        disabled={isTogglingPermission && togglingStudentId === student.id}
                      />
                      <div className="min-w-24 inline-flex items-center h-full">
                        {isTogglingPermission && togglingStudentId === student.id ? (
                          <span className="flex items-center text-[#A3A3A3]">
                            <Loader2 size={16} className="mr-1 animate-spin" /> Updating...
                          </span>
                        ) : student.hasPermission ? (
                          <span className="flex items-center text-green-400">
                            <Check size={16} className="mr-1" /> Permitted
                          </span>
                        ) : (
                          <span className="flex items-center text-red-400">
                            <XIcon size={16} className="mr-1" /> Restricted
                          </span>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-[20rem] flex flex-wrap gap-2">
                      {student.batches.map((batch) => (
                        <Badge 
                          key={batch.id}
                          className=" flex items-center gap-1 px-2 py-1 bg-[#9000FF]/20 text-[#B091EA] hover:bg-[#9000FF]/30"
                        >
                          {batch.name} {batch.boardName && `(${batch.boardName})`}
                          <button 
                            onClick={() => handleRemoveBatchConfirm(student.id, batch.id)}
                            className="ml-1 h-4 w-4 rounded-full hover:bg-[#6544A3]/30 flex items-center justify-center active:scale-105"
                            disabled={isRemovingBatch}
                          >
                            <X size={12} />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="destructive"
                      size="sm" 
                      className="bg-red-500/20 hover:bg-red-500/30 text-red-300 active:scale-105"
                      onClick={() => handleRemoveStudentConfirm(student.id)}
                      disabled={isRemovingStudent}
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
      
      {/* Batch removal confirmation dialog */}
      <AlertDialog open={!!batchToRemove} onOpenChange={(open) => !open && setBatchToRemove(null)}>
        <AlertDialogContent className="bg-[#1E1E1E] border-[#8D6CCB]/20">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Remove Batch</AlertDialogTitle>
            <AlertDialogDescription className="text-[#A3A3A3]">
              Are you sure you want to remove this batch/class from the student?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-transparent text-white border-[#8D6CCB]/40 hover:bg-[#6544A3]/70 hover:text-white active:scale-105">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmRemoveBatch}
              className="bg-red-500/20 hover:bg-red-500/30 text-red-300 active:scale-105"
              disabled={isRemovingBatch}
            >
               {isRemovingBatch ? (
    <>
      <Loader2 className="h-4 w-4 animate-spin mr-2" />
      Removing...
    </>
  ) : (
    "Remove"
  )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Student removal confirmation dialog */}
      <AlertDialog open={!!studentToRemove} onOpenChange={(open) => !open && setStudentToRemove(null)}>
        <AlertDialogContent className="bg-[#1E1E1E] border-[#8D6CCB]/20">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Remove Student</AlertDialogTitle>
            <AlertDialogDescription className="text-[#A3A3A3]">
              Are you sure you want to remove this student? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-transparent text-white border-[#8D6CCB]/40 hover:bg-[#6544A3]/70 hover:text-white active:scale-105">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmRemoveStudent}
              className="bg-red-500/20 hover:bg-red-500/30 text-red-300 active:scale-105"
              disabled={isRemovingStudent}
            >
              {isRemovingStudent ? (
    <>
      <Loader2 className="h-4 w-4 animate-spin mr-2" />
      Removing...
    </>
  ) : (
    "Remove"
  )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}

export default StudentTable;
