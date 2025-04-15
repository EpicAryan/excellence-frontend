'use client'

import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';
import { FilterOption } from '@/types/notes';

interface SearchFilterBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterBoard: string;
  setFilterBoard: (board: string) => void;
  filterClass: string;
  setFilterClass: (cls: string) => void;
  filterSubject: string;
  setFilterSubject: (subject: string) => void;
  boards: FilterOption[];
  filteredClasses: FilterOption[];
  filteredSubjects: FilterOption[];
}

export function SearchFilterBar({
  searchTerm,
  setSearchTerm,
  filterBoard,
  setFilterBoard,
  filterClass,
  setFilterClass,
  filterSubject,
  setFilterSubject,
  boards,
  filteredClasses,
  filteredSubjects
}: SearchFilterBarProps) {
  return (
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
            <SelectItem value="all" className="hover:bg-[#6544A3] focus:bg-[#6544A3]">
              All Boards
            </SelectItem>
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
        
        <Select 
          value={filterClass} 
          onValueChange={setFilterClass}
          disabled={!filterBoard || filterBoard === "all"}
        >
          <SelectTrigger className="bg-[#3B444B]/50 text-white border-[#6544A3]">
            <Filter className="h-4 w-4 mr-2 text-[#8D6CCB]" />
            <SelectValue placeholder="Filter by Class" />
          </SelectTrigger>
          <SelectContent className="bg-[#1E1E1E] text-white border-[#6544A3]">
            <SelectItem value="all" className="hover:bg-[#6544A3] focus:bg-[#6544A3]">
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
          disabled={!filterClass || filterClass === "all"}
        >
          <SelectTrigger className="bg-[#3B444B]/50 text-white border-[#6544A3]">
            <Filter className="h-4 w-4 mr-2 text-[#8D6CCB]" />
            <SelectValue placeholder="Filter by Subject" />
          </SelectTrigger>
          <SelectContent className="bg-[#1E1E1E] text-white border-[#6544A3]">
            <SelectItem value="all" className="hover:bg-[#6544A3] focus:bg-[#6544A3]">
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
  );
}
