'use client';

import { BookOpen } from 'lucide-react';
import { Chapter } from '@/types/studentNotes'

interface ChapterCardProps {
  chapter: Chapter;
  onClick: () => void;
}

export const ChapterCard = ({ chapter, onClick }: ChapterCardProps) => {

  return (
    <>
      <div
        onClick={onClick}
        className="flex items-center gap-3 p-4 bg-[#1E1E1E] border border-[#8D6CCB]/20
                rounded-lg cursor-pointer hover:bg-[#6544A3]/60 
                hover:text-white transition-all duration-300 group active:scale-110"
      >
        <div className="p-3 bg-[#8D6CCB] rounded-full group-hover:bg-white">
          <BookOpen className="h-5 w-5 text-white group-hover:text-[#8D6CCB]" />
        </div>
        <div>
          <span className="font-medium text-white group-hover:text-white block">
            {chapter.chapterName}
          </span>
          <span className="text-sm text-[#A3A3A3] group-hover:text-white/80">
            {chapter.topics.length} topics available
          </span>
        </div>
      </div>
    </>
  );
};

export default ChapterCard;
