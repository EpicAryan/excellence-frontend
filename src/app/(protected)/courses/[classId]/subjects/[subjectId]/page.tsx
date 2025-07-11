'use client';

import React, { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { getStudentCourse } from "@/app/actions/students.actions";
import { useUser } from "@/hooks/useUser";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ChapterCard from '@/components/CourseSection/chapterCard';
import { Chapter } from '@/types/studentNotes';
import TopicsDialog from '@/components/CourseSection/topicsDialog';
import { motion } from 'motion/react'

const SubjectPage = () => {
  const router = useRouter();
  const params = useParams();
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const classId = Number(params.classId);
  const subjectId = Number(params.subjectId);

  const { data: user, isLoading: isUserLoading } = useUser();
  
  const { data: userClasses, isLoading } = useQuery({
    queryKey: ["userCourse", user?.id],
    queryFn: () => getStudentCourse(user?.id),
    enabled: !!user,
  });

  if (isUserLoading || !user || isLoading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <Loader2 className="h-12 w-12 animate-spin text-[#8D6CCB]" />
        <p className="text-lg font-medium text-gray-600">Loading content...</p>
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 " style={{gridAutoFlow: 'row dense'}}>
        {currentSubject.chapters.map((chapter) => (
          <ChapterCard 
            key={chapter.chapterId}
            chapter={chapter}
            onClick={() => {
              setSelectedChapter(chapter);
              setIsDialogOpen(true);
            }}
          />
        ))}
      </div>
      {selectedChapter && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <TopicsDialog 
            isOpen={isDialogOpen}
            setIsOpen={setIsDialogOpen}
            chapter={selectedChapter}
            classId={classId}
            subjectId={subjectId}
          />
        </motion.div>
      )}
    </div>
  );
};

export default SubjectPage;
