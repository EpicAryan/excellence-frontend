'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { FileText } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {  Chapter } from '@/types/studentNotes';

interface TopicsDialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  chapter: Chapter;
  classId: number;
  subjectId: number;
}

const TopicsDialog = ({ isOpen, setIsOpen, chapter, classId, subjectId }: TopicsDialogProps) => {
  const router = useRouter();

  const handleViewPdf = (topicId: number) => {
    setIsOpen(false);
    router.push(`/courses/${classId}/subjects/${subjectId}/topics/${topicId}`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="bg-[#1E1E1E] text-white border-[#8D6CCB] overflow-y-auto max-h-[90%] md:max-h-[60%]">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center text-xl bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            {chapter.chapterName} <span className='text-xs text-gray-400'>Scroll to view more</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-4 space-y-4">
          {chapter.topics.map((topic) => (
            <div key={topic.topicId} className="flex justify-between items-center p-3 bg-[#2B2B2B] rounded-md">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-[#8D6CCB]" />
                <span>{topic.topicName}</span>
              </div>
              <Button
                onClick={() => handleViewPdf(topic.topicId)}
                disabled={!topic.isActive}
                className="bg-gradient-800 hover:bg-gradient-800/60 active:scale-105"
              >
                View PDF
              </Button>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TopicsDialog;
