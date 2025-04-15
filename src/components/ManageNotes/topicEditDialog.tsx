'use client'

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Topic, FilterOption } from '@/types/notes';

interface TopicEditDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  topic: Topic | null;
  boards: FilterOption[];
  classes: FilterOption[];
  subjects: FilterOption[];
  onSave: (topic: Topic) => void;
}

export function TopicEditDialog({ 
  isOpen, 
  setIsOpen, 
  topic, 
  boards, 
  classes, 
  subjects,
  onSave 
}: TopicEditDialogProps) {
  const [editedTopic, setEditedTopic] = useState<Topic | null>(null);
  
  // Update form when topic changes
  useEffect(() => {
    if (topic) {
      setEditedTopic({
        ...topic,
        boardId: topic.boardId || "0",
        classId: topic.classId || "0",
        subjectId: topic.subjectId || "0",
      });
    }
  }, [topic]);
  
  const handleSaveEdit = () => {
    if (!editedTopic) return;
    onSave(editedTopic);
  };
  
  if (!editedTopic) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="bg-[#1E1E1E] text-white border-[#8D6CCB]">
        <DialogHeader>
          <DialogTitle className="text-[#B091EA]">Edit Topic</DialogTitle>
          <DialogDescription className="text-gray-400">
            Make changes to the topic information.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="topicName" className="text-[#B091EA]">Topic Name</Label>
            <Input 
              id="topicName"
              value={editedTopic.name}
              onChange={(e) => setEditedTopic({...editedTopic, name: e.target.value})}
              className="bg-[#3B444B]/50 border-[#6544A3] text-white"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="board" className="text-[#B091EA]">Board</Label>
              <Select 
                value={editedTopic.boardId}
                onValueChange={(value) => setEditedTopic({...editedTopic, boardId: value})}
              >
                <SelectTrigger id="board" className="bg-[#3B444B]/50 text-white border-[#6544A3]">
                  <SelectValue placeholder="Select Board" />
                </SelectTrigger>
                <SelectContent className="bg-[#1E1E1E] text-white border-[#6544A3]">
                  {boards.map((board) => (
                    <SelectItem 
                      key={board.id} 
                      value={board.id} 
                      className="hover:bg-[#6544A3] focus:bg-[#6544A3]"
                    >
                      {board.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="class" className="text-[#B091EA]">Class</Label>
              <Select 
                value={editedTopic.classId}
                onValueChange={(value) => setEditedTopic({...editedTopic, classId: value})}
              >
                <SelectTrigger id="class" className="bg-[#3B444B]/50 text-white border-[#6544A3]">
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent className="bg-[#1E1E1E] text-white border-[#6544A3]">
                  {classes.map((classItem) => (
                    <SelectItem 
                      key={classItem.id} 
                      value={classItem.id}
                      className="hover:bg-[#6544A3] focus:bg-[#6544A3]"
                    >
                      Class {classItem.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subject" className="text-[#B091EA]">Subject</Label>
              <Select 
                value={editedTopic.subjectId}
                onValueChange={(value) => setEditedTopic({...editedTopic, subjectId: value})}
              >
                <SelectTrigger id="subject" className="bg-[#3B444B]/50 text-white border-[#6544A3]">
                  <SelectValue placeholder="Select Subject" />
                </SelectTrigger>
                <SelectContent className="bg-[#1E1E1E] text-white border-[#6544A3]">
                  {subjects.map((subject) => (
                    <SelectItem 
                      key={subject.id} 
                      value={subject.id} 
                      className="hover:bg-[#6544A3] focus:bg-[#6544A3]"
                    >
                      {subject.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="chapter" className="text-[#B091EA]">Chapter</Label>
              <Input 
                id="chapter"
                value={editedTopic.chapter}
                onChange={(e) => setEditedTopic({...editedTopic, chapter: e.target.value})}
                className="bg-[#3B444B]/50 border-[#6544A3] text-white"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="activeStatus" className="text-[#B091EA] flex items-center">
              Active Status
              <div className="ml-auto">
                <Switch
                  id="activeStatus"
                  checked={editedTopic.isActive}
                  onCheckedChange={(checked) => setEditedTopic({...editedTopic, isActive: checked})}
                  className="data-[state=checked]:bg-[#8D6CCB]"
                />
              </div>
            </Label>
            <p className="text-gray-400 text-xs">
              Toggle to set this topic as active or inactive.
            </p>
          </div>
          
          <DialogFooter className="pt-4">
            <Button 
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="border-[#6544A3] text-[#B091EA] hover:bg-[#6544A3]/20"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSaveEdit}
              className="bg-gradient-to-r from-[#8D6CCB] to-[#9000FF] hover:from-[#9000FF] hover:to-[#8D6CCB] text-white"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
