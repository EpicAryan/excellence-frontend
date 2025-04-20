'use client'

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Topic } from '@/types/notes';
import { useUpdateTopic } from '@/hooks/useUpdateTopic';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

interface TopicEditDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  topic: Topic | null;
  onSave: (topic: Topic) => void;
}

export function TopicEditDialog({ 
  isOpen, 
  setIsOpen, 
  topic, 
  onSave 
}: TopicEditDialogProps) {
  const [editedTopic, setEditedTopic] = useState<Topic | null>(null);
  const { mutate: updateTopic, isPending } = useUpdateTopic();
  // Update form when topic changes
  useEffect(() => {
    if (topic) {
      setEditedTopic({
        ...topic,
      });
    }
  }, [topic]);
  
  const handleSaveEdit = () => {
    if (!editedTopic || !editedTopic.topicId) {
      toast.error("Topic information is incomplete");
      return;
    }
    // Prepare topic data for update
    const topicData: Partial<Topic> = {
      topicName: editedTopic.topicName,
    };
    
    // Call mutation
    updateTopic(
      { 
        topicId: editedTopic.topicId, 
        topicData 
      },
      {
        onSuccess: () => {
          setIsOpen(false);
          onSave(editedTopic);
        }
      }
    );
  };
  
  if (!editedTopic) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="bg-[#1E1E1E] text-white border-[#8D6CCB]">
        <DialogHeader>
          <DialogTitle className="text-[#B091EA]">Edit Topic</DialogTitle>
          <DialogDescription className="text-gray-400">
            Update the topic name.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="topicName" className="text-[#B091EA]">Topic Name</Label>
            <Input 
              id="topicName"
              value={editedTopic.topicName}
              onChange={(e) => setEditedTopic({...editedTopic, topicName: e.target.value})}
              className="bg-[#3B444B]/50 border-[#6544A3] text-white"
              disabled={isPending}
            />
          </div>   
          
          <DialogFooter className="pt-4">
            <Button 
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="border-[#6544A3] text-[#B091EA] hover:bg-[#6544A3]/70 hover:text-white active:scale-105"
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSaveEdit}
              className="bg-gradient-to-r from-[#8D6CCB] to-[#9000FF] hover:from-[#9000FF] hover:to-[#8D6CCB] text-white active:scale-105"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
