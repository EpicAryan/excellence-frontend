'use client'

import React, { useState } from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FileUpload from './fileUpload';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

// Predefined options (these would typically come from an API or configuration)
const BOARDS = ['WB', 'CBSE', 'ICSE'];
const CLASSES = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
const SUBJECTS = ['Mathematics', 'Science', 'English', 'History', 'Geography'];
const CHAPTERS = ['Chapter 1', 'Chapter 2', 'Chapter 3', 'Chapter 4', 'Chapter 5'];

const NotesUploadDashboard = () => {
  const [selectedBoard, setSelectedBoard] = useState<string>('');
  const [customBoard, setCustomBoard] = useState<string>('');
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [customClass, setCustomClass] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [customSubject, setCustomSubject] = useState<string>('');
  const [selectedChapter, setSelectedChapter] = useState<string>('');
  const [topicName, setTopicName] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);

  const handleBoardSubmit = () => {
    const board = selectedBoard || customBoard;
    if (board) {
      console.log('Board Selected:', board);
      // Additional logic for board submission
    }
  };

  const handleClassSubmit = () => {
    const classValue = selectedClass || customClass;
    if (classValue) {
      console.log('Class Selected:', classValue);
      // Additional logic for class submission
    }
  };

  const handleFinalSubmit = () => {
    const board = selectedBoard || customBoard;
    const classValue = selectedClass || customClass;
    const subject = selectedSubject || customSubject;

    if (board && classValue && subject && file) {
      const formData = new FormData();
      formData.append('board', board);
      formData.append('class', classValue);
      formData.append('subject', subject);
      formData.append('chapter', selectedChapter);
      formData.append('topicName', topicName);
      formData.append('file', file);

      console.log('Final Submission Data:', Object.fromEntries(formData));
      // Implement actual upload logic here
    }
  };

  const handleFileChange = (selectedFile: File) => {
    setFile(selectedFile);
  };

  return (
    <div className="container mx-auto min-h-screen p-8">
      <Card className="w-full bg-[#1E1E1E] border-[#8D6CCB]/20 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white">Notes Upload Dashboard</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Section 1: Board Selection */}
          <div className="p-4 rounded-lg border border-[#6544A3]/30 bg-[#1E1E1E]">
            <h2 className="text-lg font-semibold mb-4 text-white">1. Select Board</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select 
                value={selectedBoard} 
                onValueChange={setSelectedBoard}
              >
                <SelectTrigger className="bg-[#3B444B]/50 text-white border-[#6544A3]">
                  <SelectValue placeholder="Select Predefined Board" />
                </SelectTrigger>
                <SelectContent className="bg-[#1E1E1E] text-white border-[#6544A3]">
                  {BOARDS.map((board) => (
                    <SelectItem 
                      key={board} 
                      value={board}
                      className="hover:bg-[#6544A3] focus:bg-[#6544A3]"
                    >
                      {board}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input 
                placeholder="Or Enter Custom Board"
                value={customBoard}
                onChange={(e) => setCustomBoard(e.target.value)}
                className="bg-[#3B444B]/50 border-[#6544A3] text-white placeholder:text-gray-400"
              />
              <Button 
                onClick={handleBoardSubmit} 
                disabled={!selectedBoard && !customBoard}
                className="bg-gradient-to-r from-[#8D6CCB] to-[#9000FF] hover:from-[#9000FF] hover:to-[#8D6CCB] text-white"
              >
                Submit Board
              </Button>
            </div>
          </div>

          {/* Section 2: Class Selection */}
          <div className="p-4 rounded-lg border border-[#6544A3]/30 bg-[#1E1E1E]">
            <h2 className="text-lg font-semibold mb-4 text-white">2. Select Class</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select 
                value={selectedClass} 
                onValueChange={setSelectedClass}
              >
                <SelectTrigger className="bg-[#3B444B]/50 text-white border-[#6544A3]">
                  <SelectValue placeholder="Select Predefined Class" />
                </SelectTrigger>
                <SelectContent className="bg-[#1E1E1E] text-white border-[#6544A3]">
                  {CLASSES.map((classNum) => (
                    <SelectItem 
                      key={classNum} 
                      value={classNum}
                      className="hover:bg-[#6544A3] focus:bg-[#6544A3]"
                    >
                      {classNum}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input 
                placeholder="Or Enter Custom Class"
                value={customClass}
                onChange={(e) => setCustomClass(e.target.value)}
                className="bg-[#3B444B]/50 border-[#6544A3] text-white placeholder:text-gray-400"
              />
              <Select 
                value={selectedSubject} 
                onValueChange={setSelectedSubject}
              >
                <SelectTrigger className="bg-[#3B444B]/50 text-white border-[#6544A3]">
                  <SelectValue placeholder="Select Predefined Subject" />
                </SelectTrigger>
                <SelectContent className="bg-[#1E1E1E] text-white border-[#6544A3]">
                  {SUBJECTS.map((subject) => (
                    <SelectItem 
                      key={subject} 
                      value={subject}
                      className="hover:bg-[#6544A3] focus:bg-[#6544A3]"
                    >
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input 
                placeholder="Or Enter Custom Subject"
                value={customSubject}
                onChange={(e) => setCustomSubject(e.target.value)}
                className="bg-[#3B444B]/50 border-[#6544A3] text-white placeholder:text-gray-400"
              />
              <Button 
                onClick={handleClassSubmit} 
                disabled={!selectedClass && !customClass}
                className="bg-gradient-to-r from-[#8D6CCB] to-[#9000FF] hover:from-[#9000FF] hover:to-[#8D6CCB] text-white"
              >
                Submit Class
              </Button>
            </div>
          </div>

          {/* Final Upload Section */}
          <div className="p-4 rounded-lg border border-[#6544A3]/30 bg-[#1E1E1E]">
            <h2 className="text-lg font-semibold mb-4 text-white">3. Final Upload</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select 
                value={selectedBoard || customBoard ? (selectedBoard || customBoard) : ''} 
                onValueChange={setSelectedBoard}
              >
                <SelectTrigger className="bg-[#3B444B]/50 text-white border-[#6544A3]">
                  <SelectValue placeholder="Select Board" />
                </SelectTrigger>
                <SelectContent className="bg-[#1E1E1E] text-white border-[#6544A3]">
                  {BOARDS.map((board) => (
                    <SelectItem 
                      key={board} 
                      value={board}
                      className="hover:bg-[#6544A3] focus:bg-[#6544A3]"
                    >
                      {board}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select 
                value={selectedClass || customClass ? (selectedClass || customClass) : ''} 
                onValueChange={setSelectedClass}
              >
                <SelectTrigger className="bg-[#3B444B]/50 text-white border-[#6544A3]">
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent className="bg-[#1E1E1E] text-white border-[#6544A3]">
                  {CLASSES.map((classNum) => (
                    <SelectItem 
                      key={classNum} 
                      value={classNum}
                      className="hover:bg-[#6544A3] focus:bg-[#6544A3]"
                    >
                      {classNum}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select 
                value={selectedSubject || customSubject ? (selectedSubject || customSubject) : ''} 
                onValueChange={setSelectedSubject}
              >
                <SelectTrigger className="bg-[#3B444B]/50 text-white border-[#6544A3]">
                  <SelectValue placeholder="Select Subject" />
                </SelectTrigger>
                <SelectContent className="bg-[#1E1E1E] text-white border-[#6544A3]">
                  {SUBJECTS.map((subject) => (
                    <SelectItem 
                      key={subject} 
                      value={subject}
                      className="hover:bg-[#6544A3] focus:bg-[#6544A3]"
                    >
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select 
                value={selectedChapter} 
                onValueChange={setSelectedChapter}
              >
                <SelectTrigger className="bg-[#3B444B]/50 text-white border-[#6544A3]">
                  <SelectValue placeholder="Select Chapter" />
                </SelectTrigger>
                <SelectContent className="bg-[#1E1E1E] text-white border-[#6544A3]">
                  {CHAPTERS.map((chapter) => (
                    <SelectItem 
                      key={chapter} 
                      value={chapter}
                      className="hover:bg-[#6544A3] focus:bg-[#6544A3]"
                    >
                      {chapter}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Input 
                placeholder="Enter Topic Name"
                value={topicName}
                onChange={(e) => setTopicName(e.target.value)}
                className="bg-[#3B444B]/50 border-[#6544A3] text-white placeholder:text-gray-400"
              />

              <div className="col-span-1 md:col-span-2">
                <FileUpload handleFileChange={handleFileChange}/>
              </div>

              <Button 
                onClick={handleFinalSubmit} 
                disabled={!selectedBoard && !customBoard || !selectedClass && !customClass || !selectedSubject && !customSubject || !file}
                className="col-span-1 md:col-span-2 bg-gradient-to-r from-[#8D6CCB] to-[#9000FF] hover:from-[#9000FF] hover:to-[#8D6CCB] text-white h-10"
              >
                Upload Notes
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotesUploadDashboard;
