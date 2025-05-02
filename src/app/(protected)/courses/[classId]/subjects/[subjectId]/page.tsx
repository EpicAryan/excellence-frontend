'use client';

import React from 'react';
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { getStudentCourse } from "@/app/actions/students.actions";
import { useUser } from "@/hooks/useUser";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ChapterCard from '@/components/CourseSection/chapterCard';

const SubjectPage = () => {
  const router = useRouter();
  const params = useParams();
  const classId = Number(params.classId);
  const subjectId = Number(params.subjectId);

  const { data: user } = useUser();
  
  const { data: userClasses, isLoading } = useQuery({
    queryKey: ["userCourse", user?.id],
    queryFn: () => getStudentCourse(user?.id),
    enabled: !!user,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-[#8D6CCB]" />
          <p className="text-lg font-medium text-gray-600">Loading subject content...</p>
        </div>
      </div>
    );
  }

  // Find the current class and subject
  const currentClass = userClasses?.find(c => c.classId === classId);
  const currentSubject = currentClass?.subjects.find(s => s.subjectId === subjectId);

  if (!currentClass || !currentSubject) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <div className="text-center max-w-md mx-auto p-8 bg-white rounded-xl shadow-md">
          <h2 className="text-xl font-bold text-[#6544A3] mb-4">Subject Not Found</h2>
          <p className="text-gray-600">We couldn&apos;t find the requested subject. Please go back to your courses.</p>
          <Button 
            onClick={() => router.push('/courses')}
            className="mt-4 bg-[#6544A3] hover:bg-[#8D6CCB]"
          >
            Go to Courses
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center mb-8">
        <button 
          onClick={() => router.push('/courses')}
          className="mr-4 p-2 rounded-full bg-[#2B2B2B] hover:bg-[#6544A3]/60 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-white" />
        </button>
        <h1 className="flex-1 text-3xl font-bold mb-8 text-center bg-gradient-to-r from-gradient-800 via-purple-500 to-pink-800 bg-clip-text text-transparent inline-block">
          {currentClass.className} ({currentClass.board.boardName}) / {currentSubject.subjectName}
        </h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentSubject.chapters.map((chapter) => (
          <ChapterCard 
            key={chapter.chapterId}
            chapter={chapter}
            classId={classId}
            subjectId={subjectId}
          />
        ))}
      </div>
    </div>
  );
};

export default SubjectPage;
