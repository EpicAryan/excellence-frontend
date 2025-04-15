'use client'

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {  FileText } from 'lucide-react';
// Types
import { Topic, FilterOption } from '@/types/notes';
// Components
import { TopicViewDialog } from '@/components';
import { TopicEditDialog } from '@/components';
import { DeleteConfirmationDialog } from '@/components';
import { CustomPagination } from '@/components';
import { TopicTable } from '@/components';
import { SearchFilterBar } from '@/components';

// Sample data - replace with actual API data
const initialTopics: Topic[] = [
  { 
    id: '1', 
    name: 'Algebraic Expressions', 
    boardId: '1', 
    board: 'CBSE',
    classId: '3', 
    class: '10',
    subjectId: '1',
    subject: 'Mathematics',
    chapter: 'Chapter 2',
    pdfUrl: '/sample.pdf',
    uploadedAt: '2025-02-15T12:00:00Z',
    isActive: true
  },
  { 
    id: '2', 
    name: 'Cell Structure', 
    boardId: '1', 
    board: 'CBSE',
    classId: '3', 
    class: '10',
    subjectId: '2',
    subject: 'Science',
    chapter: 'Chapter 1',
    pdfUrl: '/sample2.pdf',
    uploadedAt: '2025-02-17T14:30:00Z',
    isActive: false
  },
  { 
    id: '3', 
    name: 'Shakespearean Drama', 
    boardId: '2', 
    board: 'ICSE',
    classId: '4', 
    class: '11',
    subjectId: '3',
    subject: 'English',
    chapter: 'Chapter 3',
    pdfUrl: '/sample3.pdf',
    uploadedAt: '2025-03-01T09:15:00Z',
    isActive: true
  },
];

// Sample board, class, subject data (normally would come from API)
const BOARDS: FilterOption[] = [
  { id: '1', name: 'CBSE' },
  { id: '2', name: 'ICSE' },
  { id: '3', name: 'WB' },
];

const CLASSES: FilterOption[] = [
  { id: '3', name: '10', boardId: '1' },
  { id: '4', name: '11', boardId: '2' },
];

const SUBJECTS: FilterOption[] = [
  { id: '1', name: 'Mathematics', classId: '3' },
  { id: '2', name: 'Science', classId: '3' },
  { id: '3', name: 'English', classId: '4' },
];

export default function NotesContentManagement() {
  const [topics, setTopics] = useState<Topic[]>(initialTopics);
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  // Filter states
  const [filterBoard, setFilterBoard] = useState<string>('');
  const [filterClass, setFilterClass] = useState<string>('');
  const [filterSubject, setFilterSubject] = useState<string>('');
  
  // Dialog states
  const [isViewDialogOpen, setIsViewDialogOpen] = useState<boolean>(false);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [topicToDelete, setTopicToDelete] = useState<string | null>(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  // Filter classes based on selected board
  const filteredClasses = CLASSES.filter(cls => 
    !filterBoard || cls.boardId === filterBoard
  );
  
  // Filter subjects based on selected class
  const filteredSubjects = SUBJECTS.filter(subj => 
    !filterClass || subj.classId === filterClass
  );
  
  // Apply filters and search to topics
  const filteredTopics = topics.filter(topic => {
    const matchesBoard = !filterBoard || filterBoard === "all" || topic.boardId === filterBoard;
    const matchesClass = !filterClass || filterClass === "all" || topic.classId === filterClass;
    const matchesSubject = !filterSubject || filterSubject === "all" || topic.subjectId === filterSubject;
    const matchesSearch = !searchTerm || 
      topic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      topic.chapter.toLowerCase().includes(searchTerm.toLowerCase()) ||
      topic.subject.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesBoard && matchesClass && matchesSubject && matchesSearch;
  });
  
  // Get current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTopics.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredTopics.length / itemsPerPage);
  
  // Handle view topic
  const handleViewTopic = (topic: Topic) => {
    setSelectedTopic(topic);
    setIsViewDialogOpen(true);
  };
  
  // Handle edit topic
  const handleEditTopic = (topic: Topic) => {
    setSelectedTopic({...topic});
    setIsEditDialogOpen(true);
  };
  
  // Save edited topic
  const handleSaveEdit = (editedTopic: Topic) => {
    setTopics(prevTopics => 
      prevTopics.map(topic => 
        topic.id === editedTopic.id ? editedTopic : topic
      )
    );
    
    setIsEditDialogOpen(false);
    
    // In a real app, you would make an API call to update the topic
  };
  
  // Handle delete topic dialog
  const handleDeleteDialog = (topicId: string) => {
    setTopicToDelete(topicId);
    setIsDeleteDialogOpen(true);
  };
  
  // Confirm delete topic
  const confirmDeleteTopic = () => {
    if (!topicToDelete) return;
    
    setTopics(prevTopics => 
      prevTopics.filter(topic => topic.id !== topicToDelete)
    );
    
    setIsDeleteDialogOpen(false);
    setTopicToDelete(null);
    
    // In a real app, you would make an API call to delete the topic
  };
  
  const toggleActiveStatus = (topicId: string) => {
    setTopics(prevTopics =>
      prevTopics.map(topic =>
        topic.id === topicId ? { ...topic, isActive: !topic.isActive } : topic
      )
    );
    // In a real app, you would make an API call to update the status
  };

  // Reset all filters
  const resetFilters = () => {
    setFilterBoard('');
    setFilterClass('');
    setFilterSubject('');
    setSearchTerm('');
  };

  return (
    <Card className="w-full bg-[#1E1E1E] border-[#8D6CCB]/20 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-white flex items-center justify-between">
          <span className="flex items-center">
            <FileText className="mr-2 text-[#8D6CCB]" size={20} />
            Notes Content Management
          </span>
          <Button 
            variant="outline" 
            size="default"
            onClick={resetFilters}
            className="border-[#6544A3] text-[#B091EA] hover:bg-[#6544A3]/70 hover:text-white tracking-wide"
          >
            Reset Filters
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search and Filter Section */}
        <SearchFilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterBoard={filterBoard}
          setFilterBoard={setFilterBoard}
          filterClass={filterClass}
          setFilterClass={setFilterClass}
          filterSubject={filterSubject}
          setFilterSubject={setFilterSubject}
          boards={BOARDS}
          filteredClasses={filteredClasses}
          filteredSubjects={filteredSubjects}
        />
        
        {/* Topics List */}
        <div className="rounded-lg border border-[#6544A3]/30 overflow-hidden">
          <TopicTable
            topics={currentItems}
            handleViewTopic={handleViewTopic}
            handleEditTopic={handleEditTopic}
            handleDeleteDialog={handleDeleteDialog}
            toggleActiveStatus={toggleActiveStatus}
          />
          
        </div>
      </CardContent>
          {/* {filteredTopics.length > itemsPerPage && ( */}
            <div className="py-4 flex justify-center">
              <CustomPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          {/* )} */}
      
      {/* View Topic Dialog */}
      <TopicViewDialog
        isOpen={isViewDialogOpen}
        setIsOpen={setIsViewDialogOpen}
        topic={selectedTopic}
      />
      
      {/* Edit Topic Dialog */}
      <TopicEditDialog
        isOpen={isEditDialogOpen}
        setIsOpen={setIsEditDialogOpen}
        topic={selectedTopic}
        boards={BOARDS}
        classes={CLASSES}
        subjects={SUBJECTS}
        onSave={handleSaveEdit}
      />
      
      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
        onConfirm={confirmDeleteTopic}
      />
    </Card>
  );
}
