'use client';

import { useRouter } from 'next/navigation';
import { BookOpen } from 'lucide-react';

interface SubjectProps {
  subjectId: number;
  subjectName: string;
}

interface BoardProps {
  boardId: number;
  boardName: string;
}

interface ClassCardProps {
  classId: number;
  className: string;
  board: BoardProps;
  subjects: SubjectProps[];
}

export const ClassCard = ({ classId, className, board, subjects }: ClassCardProps) => {
  const router = useRouter();

  const navigateToSubject = (subjectId: number) => {
    router.push(`/courses/${classId}/subjects/${subjectId}`);
  };

  return (
    <div className="mb-8 bg-[#1E1E1E] rounded-lg shadow-md p-6 border border-[#8D6CCB]/20">
        <div className="border-l-4 border-[#8D6CCB] pl-3 mb-4">
            <h2 className="text-xl font-bold mb-4 text-white flex items-center">
            {className} ({board.boardName})
            </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {subjects.map((subject) => (
            <div
                key={subject.subjectId}
                onClick={() => navigateToSubject(subject.subjectId)}
                className="flex items-center gap-3 p-3 bg-[#2B2B2B] 
                        rounded-md cursor-pointer hover:bg-[#6544A3]/60 
                        hover:text-white transition-all duration-300 group active:scale-105"
            >
                <div className="p-2 bg-[#8D6CCB] rounded-full group-hover:bg-white">
                <BookOpen className="h-4 w-4 text-white group-hover:text-[#8D6CCB]" />
                </div>
                <span className="font-medium text-[#A3A3A3] group-hover:text-white">
                {subject.subjectName}
                </span>
            </div>
            ))}
        </div>
    </div>

  );
};
