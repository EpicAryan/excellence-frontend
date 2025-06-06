'use client'

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {  FileText } from 'lucide-react';
// Types
import { Topic } from '@/types/notes';
// Components
import { TopicViewDialog } from '@/components';
import { TopicEditDialog } from '@/components';
import { DeleteConfirmationDialog } from '@/components';
import { CustomPagination } from '@/components';
import { TopicTable } from '@/components';
import { SearchFilterBar } from '@/components';
import { useQuery } from '@tanstack/react-query';
import { useTopics } from '@/hooks/useTopics';
import { useDeleteTopic } from '@/hooks/useDeleteTopic'; 
import {
  fetchBoards,
  fetchClasses,
  fetchSubjects
} from '@/app/actions/notes.actions'
import { useToggleTopicStatus } from '@/hooks/useToggleTopicStatus';

export default function NotesContentManagement() {
  const { mutate: toggleStatus } = useToggleTopicStatus();
  const { mutate: deleteTopic, isPending: isDeleting } = useDeleteTopic(() => {
    setIsDeleteDialogOpen(false);
    setTopicToDelete(null);
  });
  
  const [isViewDialogOpen, setIsViewDialogOpen] = useState<boolean>(false);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [topicToDelete, setTopicToDelete] = useState<string | null>(null);

  const {
    topics,
    pagination,
    isLoading,
    filters,
    updateSearch,
    updateFilters,
    updatePage,
    refetch
  } = useTopics({
    limit: 20, 
  });
  
  const {
    data: boards = [],
    // isLoading: isLoadingBoards,
    // error: boardsError,
} = useQuery({
    queryKey: ["boards"],
    queryFn: fetchBoards,
});

const {
    data: classes = [],
    // isLoading: isLoadingClasses,
    // error: classesError,
} = useQuery({
    queryKey: ["classes", filters.boardId],
    queryFn: () => fetchClasses(Number(filters.boardId)),
    enabled: !!filters.boardId,
});

const {
    data: subjects = [],
    // isLoading: isLoadingSubjects,
    // error: subjectsError,
} = useQuery({
    queryKey: ["subjects", filters.classId],
    queryFn: () =>
        fetchSubjects(Number(filters.boardId), Number(filters.classId)),
    enabled: !!filters.classId,
});
  
  
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
  const handleSaveEdit = async () => {
    try {
      setIsEditDialogOpen(false);
      refetch();
    } catch (error) {
      console.error("Error updating topic:", error);
    }
  };
  
  // Handle delete topic dialog
  const handleDeleteDialog = (topicId: string) => {
    setTopicToDelete(topicId);
    setIsDeleteDialogOpen(true);
  };
  
  // Confirm delete topic
  const confirmDeleteTopic = async () => {
    if (!topicToDelete) return;
    deleteTopic(topicToDelete);
  };
  
  const toggleActiveStatus = async (topicId: string) => {
    const topic = topics.find((t) => t.topicId === topicId);
    if (!topic) return;
  
    try {
      await toggleStatus({ topicId, isActive: !topic.isActive });
    } catch (error) {
      console.error("Error updating topic status:", error);
    } 
  };
  

  // Reset all filters
  const resetFilters = () => {
    updateFilters({
      boardId: '',
      classId: '',
      subjectId: '',
      search: '',
      page: 1
    });
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
            className="border-[#6544A3] text-[#B091EA] hover:bg-[#6544A3]/70 hover:text-white tracking-wide active:scale-105"
          >
            Reset Filters
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search and Filter Section */}
        <SearchFilterBar
          searchTerm={filters.search || ''}
          setSearchTerm={(term) => updateSearch(term)}
          filterBoard={filters.boardId || ''}
          setFilterBoard={(boardId) => updateFilters({ boardId })}
          filterClass={filters.classId || ''}
          setFilterClass={(classId) => updateFilters({ classId })}
          filterSubject={filters.subjectId || ''}
          setFilterSubject={(subjectId) => updateFilters({ subjectId })}
          boards={boards}
          filteredClasses={classes}
          filteredSubjects={subjects}
        />
        
        {/* Topics List */}
        <div className="rounded-lg border border-[#6544A3]/30 overflow-hidden">
          <TopicTable
            topics={topics}
            handleViewTopic={handleViewTopic}
            handleEditTopic={handleEditTopic}
            handleDeleteDialog={handleDeleteDialog}
            toggleActiveStatus={toggleActiveStatus}
            isLoading={isLoading}
          />
        </div>
      </CardContent>
      
      {pagination && pagination.totalPages > 1 && (
        <div className="py-4 flex justify-center">
          <CustomPagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={updatePage}
          />
        </div>
      )}
      
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
        onSave={handleSaveEdit}
      />
      
      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
        onConfirm={confirmDeleteTopic}
        isDeleting={isDeleting}
      />
    </Card>
  );
}
