'use client'

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Topic } from '@/types/notes';
import { format } from 'date-fns';

interface TopicViewDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  topic: Topic | null;
}

export function TopicViewDialog({ isOpen, setIsOpen, topic }: TopicViewDialogProps) {

   const formatDate = (dateString: string) => {
      if(!dateString) return '';
      return format(new Date(dateString), 'MMM dd, yyyy');
    };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="bg-[#1E1E1E] text-white border-[#8D6CCB]">
        <DialogHeader>
          <DialogTitle className="text-[#B091EA]">Topic Details</DialogTitle>
          <DialogDescription className="text-gray-400">
            Viewing details for this topic.
          </DialogDescription>
        </DialogHeader>
        {topic && (
          <div className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-[#B091EA]">Topic Name</Label>
                <p className="text-white">{topic.topicName}</p>
              </div>
              {/* <div>
                <Label className="text-[#B091EA]">PDF</Label>
                <p className="text-[#8D6CCB] underline text-wrap">{topic.pdfUrl}</p>
              </div> */}
              <div>
                <Label className="text-[#B091EA]">Board</Label>
                <p className="text-white">{topic.board}</p>
              </div>
              <div>
                <Label className="text-[#B091EA]">Class</Label>
                <p className="text-white">{topic.class}</p>
              </div>
              <div>
                <Label className="text-[#B091EA]">Subject</Label>
                <p className="text-white">{topic.subject}</p>
              </div>
              <div>
                <Label className="text-[#B091EA]">Chapter</Label>
                <p className="text-white">{topic.chapter}</p>
              </div>
              <div className="">
                <Label className="text-[#B091EA]">Uploaded</Label>
                <p className="text-white">{formatDate(topic.uploadedAt)}</p>
              </div>
              <div className="col-span-2">
                <Label className="text-[#B091EA]">Status</Label>
                <p className="text-white flex items-center">
                  {topic.isActive ? (
                    <>
                      <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                      Active
                    </>
                  ) : (
                    <>
                      <span className="h-2 w-2 rounded-full bg-red-500 mr-2"></span>
                      Inactive
                    </>
                  )}
                </p>
              </div>
            </div>
            <div className="pt-4">
              <Button 
                onClick={() => window.open(topic.pdfUrl, '_blank')}
                className="w-full bg-gradient-to-r from-[#8D6CCB] to-[#9000FF] hover:from-[#9000FF] hover:to-[#8D6CCB] text-white"
              >
                View PDF
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
