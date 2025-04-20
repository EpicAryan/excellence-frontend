'use client'

import { useState} from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, X, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { debounce } from 'lodash';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { fetchBoards, fetchClasses } from '@/app/actions/notes.actions';
import { searchUsers, assignClasses } from '@/app/actions/user.actions';
import { UserType } from '@/types/notes';
import { toast } from 'sonner';

const SearchSection = () => {
  const [searchData, setSearchData] = useState({
    email: '',
    name: '',
  });
  const [selectedBoard, setSelectedBoard] = useState<number | null>(null);
  const [selectedClasses, setSelectedClasses] = useState<number[]>([]);
  const [emailResults, setEmailResults] = useState<UserType[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [openClasses, setOpenClasses] = useState(false);
  const [openEmailResults, setOpenEmailResults] = useState(false);

  // Fetch boards
  const { 
    data: boards = [], 
    isLoading: isLoadingBoards,
  } = useQuery({
    queryKey: ['boards'],
    queryFn: fetchBoards,
  });

  // Fetch classes for selected board
  const { 
    data: classes = [], 
    isLoading: isLoadingClasses,
  } = useQuery({
    queryKey: ['classes', selectedBoard],
    queryFn: () => selectedBoard ? fetchClasses(selectedBoard) : Promise.resolve([]),
    enabled: !!selectedBoard,
  });

  // Assign classes mutation
  const assignClassesMutation = useMutation({
    mutationFn: assignClasses,
    onSuccess: () => {
      toast.success("Assign successfully!")
      setSelectedClasses([]);
      setSelectedUser(null);
      setSearchData({ email: '', name: '' });
    },
    onError: (error: Error) => {
      toast.error(`Error: ${error.message}`);
    }
  });

  // Debounced search function
  const debouncedSearch = debounce(async (value: string) => {
    if (value.length < 3) {
      setEmailResults([]);
      return;
    }
    
    try {
      const results = await searchUsers(value);
      setEmailResults(results);
      setOpenEmailResults(results.length > 0);
    } catch (error) {
      console.error('Error searching users:', error);
    }
  }, 300);

  // Update search when email input changes
  const handleEmailChange = (value: string) => {
    setSearchData({ ...searchData, email: value });
    debouncedSearch(value);
  };

  // Select a user from search results
  const selectUser = (user: UserType) => {
    setSelectedUser(user);
    setSearchData({ email: user.email, name: user.username });
    setOpenEmailResults(false);
  };

  // Toggle class selection
  const toggleClass = (classId: number) => {
    setSelectedClasses(prev => 
      prev.includes(classId)
        ? prev.filter(id => id !== classId)
        : [...prev, classId]
    );
  };

  // Remove class from selection
  const removeClass = (classId: number) => {
    setSelectedClasses(prev => prev.filter(id => id !== classId));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedUser) {
      // Show error - user must be selected
      return;
    }
    
    if (selectedClasses.length === 0) {
      // Show error - at least one class must be selected
      return;
    }
    
    assignClassesMutation.mutate({
      userId: selectedUser.id,
      classIds: selectedClasses
    });
  };

  return (
    <Card className="w-full bg-[#1E1E1E] border-[#8D6CCB]/20">
      <CardHeader>
        <CardTitle className="text-white text-xl font-bold">Assign Class/Batch</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2 relative">
              <Label htmlFor="search-email" className="text-white text-sm">Search By Email</Label>
              <div className="relative">
                <Input 
                  id="search-email" 
                  placeholder="Email address"
                  className="bg-[#3B444B]/50 border-[#6544A3] text-white placeholder:text-gray-400"
                  value={searchData.email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  onFocus={() => emailResults.length > 0 && setOpenEmailResults(true)}
                />
                
                {/* Email search results dropdown */}
                {openEmailResults && emailResults.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-[#1E1E1E] border border-[#6544A3] rounded-md shadow-lg max-h-60 overflow-auto">
                    {emailResults.map(user => (
                      <div 
                        key={user.id} 
                        className="px-4 py-2 hover:bg-[#6544A3]/30 cursor-pointer text-white"
                        onClick={() => selectUser(user)}
                      >
                        {user.email}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="autofill-name" className="text-white text-sm">Name</Label>
              <Input 
                id="autofill-name" 
                placeholder="Student name"
                className="bg-[#3B444B]/50 border-[#6544A3] text-white placeholder:text-gray-400"
                value={searchData.name}
                onChange={(e) => setSearchData({...searchData, name: e.target.value})}
                readOnly={!!selectedUser}
              />
            </div>

            <div className="space-y-4">
              {/* Board Selection */}
              <div className="space-y-2">
                <Label className="text-white text-sm">Select Board</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between bg-[#3B444B]/50 border-[#6544A3] text-white hover:bg-[#3B444B]/70 hover:text-white"
                    >
                      {isLoadingBoards ? (
                        <div className="flex items-center">
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          <span>Loading boards...</span>
                        </div>
                      ) : selectedBoard ? (
                        boards.find(b => b.boardId === selectedBoard)?.boardName || "Select board"
                      ) : (
                        "Select board"
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0 bg-[#1E1E1E] border-[#6544A3]">
                    <Command className="bg-transparent">
                      <CommandInput placeholder="Search boards..." className="text-white" />
                      <CommandEmpty className="text-[#A3A3A3]">No boards found.</CommandEmpty>
                      <CommandGroup className="max-h-60 overflow-auto">
                        {boards.map((board) => (
                          <CommandItem
                            key={board.boardId}
                            onSelect={() => {
                              setSelectedBoard(board.boardId);
                              setSelectedClasses([]);
                            }}
                            className="text-white hover:bg-[#6544A3]/30 cursor-pointer"
                          >
                            <div className="flex items-center gap-2 w-full">
                              <div className={`
                                flex h-4 w-4 items-center justify-center rounded-sm border 
                                ${selectedBoard === board.boardId 
                                  ? 'bg-[#8D6CCB] border-[#8D6CCB]' 
                                  : 'border-[#A3A3A3]'}
                              `}>
                                {selectedBoard === board.boardId && (
                                  <Check className="h-3 w-3 text-white" />
                                )}
                              </div>
                              <span>{board.boardName}</span>
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            </div>
            {/* Classes Selection */}
            <div className="space-y-2">
              <Label htmlFor="class-select" className="text-white text-sm">Select Classes</Label>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 items-end'>
                <Popover open={openClasses} onOpenChange={setOpenClasses}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openClasses}
                      className="w-full justify-between bg-[#3B444B]/50 border-[#6544A3] text-white hover:bg-[#3B444B]/70 hover:text-white"
                      disabled={!selectedBoard}
                    >
                      {isLoadingClasses ? (
                        <div className="flex items-center">
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          <span>Loading classes...</span>
                        </div>
                      ) : selectedClasses.length > 0 ? (
                        `${selectedClasses.length} selected`
                      ) : (
                        "Select classes"
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0 bg-[#1E1E1E] border-[#6544A3]">
                    <Command className="bg-transparent">
                      <CommandInput placeholder="Search classes..." className="text-white" />
                      <CommandEmpty className="text-[#A3A3A3]">No classes found.</CommandEmpty>
                      <CommandGroup className="max-h-60 overflow-auto">
                        {classes.map((cls) => (
                          <CommandItem
                            key={cls.classId}
                            onSelect={() => toggleClass(cls.classId)}
                            className="text-white hover:bg-[#6544A3]/30 cursor-pointer"
                          >
                            <div className="flex items-center gap-2 w-full">
                              <div className={`
                                flex h-4 w-4 items-center justify-center rounded-sm border 
                                ${selectedClasses.includes(cls.classId) 
                                  ? 'bg-[#8D6CCB] border-[#8D6CCB]' 
                                  : 'border-[#A3A3A3]'}
                              `}>
                                {selectedClasses.includes(cls.classId) && (
                                  <Check className="h-3 w-3 text-white" />
                                )}
                              </div>
                              <span>{cls.className}</span>
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <Button 
                  type="submit" 
                  className="w-full md:w-auto bg-gradient-to-r from-[#8D6CCB] to-[#9000FF] hover:from-[#9000FF] hover:to-[#8D6CCB] text-white h-10 px-8"
                  disabled={!selectedUser || selectedClasses.length === 0 || assignClassesMutation.isPending}
                >
                  {assignClassesMutation.isPending ? (
                    <div className="flex items-center">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      <span>Assigning...</span>
                    </div>
                  ) : (
                    "Assign Selected"
                  )}
                </Button>
              </div>
              
              {/* Display selected classes as badges */}
              {selectedClasses.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {selectedClasses.map(classId => {
                    const cls = classes.find(c => c.classId === classId);
                    return (
                      <Badge 
                        key={classId}
                        className="bg-[#9000FF]/20 text-[#B091EA] hover:bg-[#9000FF]/30 flex items-center gap-1 px-2 py-1"
                      >
                        {cls?.className || `Class ${classId}`}
                        <button 
                          onClick={() => removeClass(classId)}
                          className="ml-1 h-4 w-4 rounded-full hover:bg-[#6544A3]/30 flex items-center justify-center"
                          type="button"
                        >
                          <X size={12} />
                        </button>
                      </Badge>
                    );
                  })}
                </div>
              )}
            </div>
      
        </form>
      </CardContent>
    </Card>
  );
}

export default SearchSection;
