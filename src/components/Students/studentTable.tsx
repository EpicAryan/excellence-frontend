'use client'

import { useState, useEffect } from 'react';
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
import { X, Loader2 } from "lucide-react";

type Student = {
  id: string;
  name: string;
  email: string;
  enrolledDate: string;
  batches: Array<{
    id: string;
    name: string;
    type: 'batch' | 'class';
  }>;
};

const StudentTable = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Sample data
        const data: Student[] = [
          {
            id: '1',
            name: 'John Doe',
            email: 'john@example.com',
            enrolledDate: '2023-01-15',
            batches: [
              { id: 'b1', name: 'Batch 1', type: 'batch' },
              { id: 'c2', name: 'Class 2', type: 'class' }
            ]
          },
          {
            id: '2',
            name: 'Jane Smith',
            email: 'jane@example.com',
            enrolledDate: '2023-02-20',
            batches: [
              { id: 'b1', name: 'Batch 1', type: 'batch' }
            ]
          },
          {
            id: '3',
            name: 'Alex Johnson',
            email: 'alex@example.com',
            enrolledDate: '2023-03-05',
            batches: [
              { id: 'c1', name: 'Class 1', type: 'class' }
            ]
          }
        ];
        
        setStudents(data);
      } catch (err) {
        setError('Failed to load students. Please try again.');
        console.error('Error fetching students:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleRemoveBatch = (studentId: string, batchId: string) => {
    setStudents(students.map(student => {
      if (student.id === studentId) {
        return {
          ...student,
          batches: student.batches.filter(batch => batch.id !== batchId)
        };
      }
      return student;
    }));
  };

  const handleRemoveStudent = (studentId: string) => {
    setStudents(students.filter(student => student.id !== studentId));
  };

  if (error) {
    return (
      <Card className="w-full bg-[#1E1E1E] border-[#8D6CCB]/20 mt-6">
        <CardContent className="p-6 text-center">
          <p className="text-red-400">{error}</p>
          <Button 
            onClick={() => window.location.reload()} 
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
              <TableRow className="border-b border-[#6544A3]/30 bg-[#6544A3]/30 hover:bg-[#6544A3]/50">
                <TableHead className="text-[#A3A3A3] font-semibold">Student name</TableHead>
                <TableHead className="text-[#A3A3A3] font-semibold">Email</TableHead>
                <TableHead className="text-[#A3A3A3] font-semibold">Enrolled Date</TableHead>
                <TableHead className="text-[#A3A3A3] font-semibold">Batches/classes</TableHead>
                <TableHead className="text-[#A3A3A3] font-semibold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow 
                  key={student.id} 
                  className="border-b border-[#6544A3]/20 hover:bg-[#6544A3]/10"
                >
                  <TableCell className="font-medium text-white">{student.name}</TableCell>
                  <TableCell className="text-[#A3A3A3]">{student.email}</TableCell>
                  <TableCell className="text-[#A3A3A3]">
                    {new Date(student.enrolledDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-2">
                      {student.batches.map((batch) => (
                        <Badge 
                          key={batch.id}
                          className={`
                            flex items-center gap-1 px-2 py-1 
                            ${batch.type === 'batch' 
                              ? 'bg-[#9000FF]/20 text-[#B091EA] hover:bg-[#9000FF]/30' 
                              : 'bg-[#8BA0B1]/20 text-[#8BA0B1] hover:bg-[#8BA0B1]/30'
                            }
                          `}
                        >
                          {batch.name}
                          <button 
                            onClick={() => handleRemoveBatch(student.id, batch.id)}
                            className="ml-1 h-4 w-4 rounded-full hover:bg-[#6544A3]/30 flex items-center justify-center"
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
                      className="bg-red-500/20 hover:bg-red-500/30 text-red-300"
                      onClick={() => handleRemoveStudent(student.id)}
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
    </Card>
  );
}


export default StudentTable;
