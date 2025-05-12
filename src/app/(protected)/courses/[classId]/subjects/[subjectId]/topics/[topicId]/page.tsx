'use client';

import React, { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { getStudentCourse } from '@/app/actions/students.actions';
import { useUser } from '@/hooks/useUser';
import { Button } from '@/components/ui/button';
import { PDFViewer } from '@/components';

const PDFViewerPage = () => {
  const router = useRouter();
  const params = useParams();
  const classId = Number(params.classId);
  const subjectId = Number(params.subjectId);
  const topicId = Number(params.topicId);

  const { data: user, isLoading: isUserLoading } = useUser();
  
  const { data: userClasses, isLoading } = useQuery({
    queryKey: ["userCourse", user?.id],
    queryFn: () => getStudentCourse(user?.id),
    enabled: !!user,
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === 'PrintScreen' ||
        (e.ctrlKey && e.key.toLowerCase() === 'p')
      ) {
        e.preventDefault();
        document.body.style.filter = 'blur(10px)';
        alert('Screenshot blocked temporarily');
        setTimeout(() => {
          document.body.style.filter = '';
        }, 3000);
        return false;
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        document.body.style.filter = 'blur(10px)';
      } else {
        document.body.style.filter = '';
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);



  // Find the PDF URL from the fetched data
  const currentClass = userClasses?.find(c => c.classId === classId);
  const currentSubject = currentClass?.subjects.find(s => s.subjectId === subjectId);
  const currentChapter = currentSubject?.chapters.find(ch => 
    ch.topics.some(t => t.topicId === topicId)
  );
  const currentTopic = currentChapter?.topics.find(t => t.topicId === topicId);

  if (isUserLoading || !user || isLoading) {
      return (
        <div className="flex items-center justify-center h-[70vh]">
          <Loader2 className="h-12 w-12 animate-spin text-[#8D6CCB]" />
          <p className="text-lg font-medium text-gray-600">Loading content...</p>
        </div>
      );
    }

  if (!currentTopic || !currentTopic.pdfUrl) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <div className="text-center max-w-md mx-auto p-8 bg-white rounded-xl shadow-md">
          <h2 className="text-xl font-bold text-[#6544A3] mb-4">PDF Not Found</h2>
          <p className="text-gray-600">We couldn&apos;t find the requested PDF. Please go back to subjects.</p>
          <Button 
            onClick={() => router.push(`/courses/${classId}/subjects/${subjectId}`)}
            className="mt-4 bg-[#6544A3] hover:bg-[#8D6CCB]"
          >
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <PDFViewer 
      pdfUrl={currentTopic.pdfUrl}
      title={currentTopic.topicName}
      onBack={() => router.push(`/courses/${classId}/subjects/${subjectId}`)}
    />
  );
};

export default PDFViewerPage;
