'use client'
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Edit, Trash2, Eye, Filter, Search, FileText } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

// Sample data - replace with actual API data
const initialTopics = [
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
    uploadedAt: '2025-02-15T12:00:00Z'
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
    uploadedAt: '2025-02-17T14:30:00Z'
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
    uploadedAt: '2025-03-01T09:15:00Z'
  },
];

// Sample board, class, subject data (normally would come from API)
const BOARDS = [
  { id: '1', name: 'CBSE' },
  { id: '2', name: 'ICSE' },
  { id: '3', name: 'WB' },
];

const CLASSES = [
  { id: '3', name: '10', boardId: '1' },
  { id: '4', name: '11', boardId: '2' },
];

const SUBJECTS = [
  { id: '1', name: 'Mathematics', classId: '3' },
  { id: '2', name: 'Science', classId: '3' },
  { id: '3', name: 'English', classId: '4' },
];

export default function ContentManagement() {
  const [topics, setTopics] = useState(initialTopics);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter states
  const [filterBoard, setFilterBoard] = useState<string>('');
  const [filterClass, setFilterClass] = useState<string>('');
  const [filterSubject, setFilterSubject] = useState<string>('');
  
  // Dialog states
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<any>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editedTopic, setEditedTopic] = useState<any>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [topicToDelete, setTopicToDelete] = useState<string | null>(null);
  
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
    const matchesBoard = !filterBoard || topic.boardId === filterBoard;
    const matchesClass = !filterClass || topic.classId === filterClass;
    const matchesSubject = !filterSubject || topic.subjectId === filterSubject;
    const matchesSearch = !searchTerm || 
      topic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      topic.chapter.toLowerCase().includes(searchTerm.toLowerCase()) ||
      topic.subject.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesBoard && matchesClass && matchesSubject && matchesSearch;
  });
  
  // Handle view topic
  const handleViewTopic = (topic: any) => {
    setSelectedTopic(topic);
    setIsDialogOpen(true);
  };
  
  // Handle edit topic
  const handleEditTopic = (topic: any) => {
    setEditedTopic({...topic});
    setIsEditDialogOpen(true);
  };
  
  // Save edited topic
  const handleSaveEdit = () => {
    if (!editedTopic) return;
    
    setTopics(prevTopics => 
      prevTopics.map(topic => 
        topic.id === editedTopic.id ? editedTopic : topic
      )
    );
    
    setIsEditDialogOpen(false);
    setEditedTopic(null);
    
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
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
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
            size="sm"
            onClick={resetFilters}
            className="border-[#6544A3] text-[#B091EA] hover:bg-[#6544A3]/20"
          >
            Reset Filters
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search and Filter Section */}
        <div className="p-4 rounded-lg border border-[#6544A3]/30 bg-[#1E1E1E]/50">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-[#8D6CCB]" />
              <Input
                className="pl-10 bg-[#3B444B]/50 border-[#6544A3] text-white placeholder:text-gray-400"
                placeholder="Search topics, chapters..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select value={filterBoard} onValueChange={setFilterBoard}>
              <SelectTrigger className="bg-[#3B444B]/50 text-white border-[#6544A3]">
                <Filter className="h-4 w-4 mr-2 text-[#8D6CCB]" />
                <SelectValue placeholder="Filter by Board" />
              </SelectTrigger>
              <SelectContent className="bg-[#1E1E1E] text-white border-[#6544A3]">
                <SelectItem value="default" className="hover:bg-[#6544A3] focus:bg-[#6544A3]">
                  All Boards
                </SelectItem>
                {BOARDS.map((board) => (
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
            
            <Select 
              value={filterClass} 
              onValueChange={setFilterClass}
              disabled={!filterBoard}
            >
              <SelectTrigger className="bg-[#3B444B]/50 text-white border-[#6544A3]">
                <Filter className="h-4 w-4 mr-2 text-[#8D6CCB]" />
                <SelectValue placeholder="Filter by Class" />
              </SelectTrigger>
              <SelectContent className="bg-[#1E1E1E] text-white border-[#6544A3]">
                <SelectItem value="default" className="hover:bg-[#6544A3] focus:bg-[#6544A3]">
                  All Classes
                </SelectItem>
                {filteredClasses.map((classItem) => (
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
            
            <Select 
              value={filterSubject} 
              onValueChange={setFilterSubject}
              disabled={!filterClass}
            >
              <SelectTrigger className="bg-[#3B444B]/50 text-white border-[#6544A3]">
                <Filter className="h-4 w-4 mr-2 text-[#8D6CCB]" />
                <SelectValue placeholder="Filter by Subject" />
              </SelectTrigger>
              <SelectContent className="bg-[#1E1E1E] text-white border-[#6544A3]">
                <SelectItem value="default" className="hover:bg-[#6544A3] focus:bg-[#6544A3]">
                  All Subjects
                </SelectItem>
                {filteredSubjects.map((subject) => (
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
        </div>
        
        {/* Topics List */}
        <div className="rounded-lg border border-[#6544A3]/30 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#3B444B]/70">
                <tr>
                  <th className="p-3 text-left text-[#B091EA]">Topic Name</th>
                  <th className="p-3 text-left text-[#B091EA]">Board</th>
                  <th className="p-3 text-left text-[#B091EA]">Class</th>
                  <th className="p-3 text-left text-[#B091EA]">Subject</th>
                  <th className="p-3 text-left text-[#B091EA]">Chapter</th>
                  <th className="p-3 text-left text-[#B091EA]">Uploaded</th>
                  <th className="p-3 text-center text-[#B091EA]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#6544A3]/30">
                {filteredTopics.length > 0 ? (
                  filteredTopics.map((topic) => (
                    <tr key={topic.id} className="bg-[#1E1E1E] hover:bg-[#3B444B]/30">
                      <td className="p-3 text-white">{topic.name}</td>
                      <td className="p-3 text-white">{topic.board}</td>
                      <td className="p-3 text-white">Class {topic.class}</td>
                      <td className="p-3 text-white">{topic.subject}</td>
                      <td className="p-3 text-white">{topic.chapter}</td>
                      <td className="p-3 text-gray-300">{formatDate(topic.uploadedAt)}</td>
                      <td className="p-3">
                        <div className="flex items-center justify-center space-x-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleViewTopic(topic)}
                            className="text-[#8D6CCB] hover:text-[#9000FF] hover:bg-[#6544A3]/20"
                          >
                            <Eye size={18} />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleEditTopic(topic)}
                            className="text-[#8D6CCB] hover:text-[#9000FF] hover:bg-[#6544A3]/20"
                          >
                            <Edit size={18} />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDeleteDialog(topic.id)}
                            className="text-[#8D6CCB] hover:text-red-500 hover:bg-[#6544A3]/20"
                          >
                            <Trash2 size={18} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="bg-[#1E1E1E]">
                    <td colSpan={7} className="p-4 text-center text-gray-400">
                      No topics found. Try adjusting your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
      
      {/* View Topic Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-[#1E1E1E] text-white border-[#8D6CCB]">
          <DialogHeader>
            <DialogTitle className="text-[#B091EA]">Topic Details</DialogTitle>
            <DialogDescription className="text-gray-400">
              Viewing details for this topic.
            </DialogDescription>
          </DialogHeader>
          {selectedTopic && (
            <div className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-[#B091EA]">Topic Name</Label>
                  <p className="text-white">{selectedTopic.name}</p>
                </div>
                <div>
                  <Label className="text-[#B091EA]">PDF</Label>
                  <p className="text-[#8D6CCB] underline">{selectedTopic.pdfUrl}</p>
                </div>
                <div>
                  <Label className="text-[#B091EA]">Board</Label>
                  <p className="text-white">{selectedTopic.board}</p>
                </div>
                <div>
                  <Label className="text-[#B091EA]">Class</Label>
                  <p className="text-white">Class {selectedTopic.class}</p>
                </div>
                <div>
                  <Label className="text-[#B091EA]">Subject</Label>
                  <p className="text-white">{selectedTopic.subject}</p>
                </div>
                <div>
                  <Label className="text-[#B091EA]">Chapter</Label>
                  <p className="text-white">{selectedTopic.chapter}</p>
                </div>
                <div className="col-span-2">
                  <Label className="text-[#B091EA]">Uploaded</Label>
                  <p className="text-white">{formatDate(selectedTopic.uploadedAt)}</p>
                </div>
              </div>
              <div className="pt-4">
                <Button 
                  onClick={() => window.open(selectedTopic.pdfUrl, '_blank')}
                  className="w-full bg-gradient-to-r from-[#8D6CCB] to-[#9000FF] hover:from-[#9000FF] hover:to-[#8D6CCB] text-white"
                >
                  View PDF
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Edit Topic Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-[#1E1E1E] text-white border-[#8D6CCB]">
          <DialogHeader>
            <DialogTitle className="text-[#B091EA]">Edit Topic</DialogTitle>
            <DialogDescription className="text-gray-400">
              Make changes to the topic information.
            </DialogDescription>
          </DialogHeader>
          {editedTopic && (
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
                      {BOARDS.map((board) => (
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
                      {CLASSES.map((classItem) => (
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
                      {SUBJECTS.map((subject) => (
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
              
              <DialogFooter className="pt-4">
                <Button 
                  variant="outline"
                  onClick={() => setIsEditDialogOpen(false)}
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
          )}
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-[#1E1E1E] text-white border-[#8D6CCB]">
          <DialogHeader>
            <DialogTitle className="text-[#B091EA]">Confirm Deletion</DialogTitle>
            <DialogDescription className="text-gray-400">
              Are you sure you want to delete this topic? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="pt-4">
            <Button 
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              className="border-[#6544A3] text-[#B091EA] hover:bg-[#6544A3]/20"
            >
              Cancel
            </Button>
            <Button 
              onClick={confirmDeleteTopic}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
