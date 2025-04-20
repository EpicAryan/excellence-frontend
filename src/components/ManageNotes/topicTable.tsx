'use client'

import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Eye, Edit, Trash2 } from 'lucide-react';
import { Topic } from '@/types/notes';
import { format } from 'date-fns';
interface TopicTableProps {
  topics: Topic[];
  handleViewTopic: (topic: Topic) => void;
  handleEditTopic: (topic: Topic) => void;
  handleDeleteDialog: (topicId: string) => void;
  toggleActiveStatus: (topicId: string, isActive: boolean) => void;
  isLoading?: boolean;
  isTogglingStatus?: string | null; 
}

export function TopicTable({
  topics,
  handleViewTopic,
  handleEditTopic,
  handleDeleteDialog,
  toggleActiveStatus,
  isLoading = false,
  isTogglingStatus,
}: TopicTableProps) {

  const formatDate = (dateString: string) => {
    if(!dateString) return '';
    return format(new Date(dateString), 'MMM dd, yyyy');
  };

  return (
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
            <th className="p-3 text-center text-[#B091EA]">Status</th>
            <th className="p-3 text-center text-[#B091EA]">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#6544A3]/30">
        {isLoading ? (
            <tr className="bg-[#1E1E1E]">
              <td colSpan={8} className="p-4 text-center text-gray-400">
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#8D6CCB]"></div>
                </div>
              </td>
            </tr>
          ) : topics.length > 0 ? (
            topics.map((topic) => (
              <tr key={topic.topicId} className="bg-[#1E1E1E] hover:bg-[#3B444B]/30">
                <td className="p-3 text-white">{topic.topicName}</td>
                <td className="p-3 text-white">{topic.board}</td>
                <td className="p-3 text-white">{topic.class}</td>
                <td className="p-3 text-white">{topic.subject}</td>
                <td className="p-3 text-white">{topic.chapter}</td>
                <td className="p-3 text-gray-300">{formatDate(topic.uploadedAt)}</td>
                <td className="p-3 text-center">
                  <div className="flex items-center justify-center">
                    <Switch
                      checked={topic.isActive}
                      onCheckedChange={() => toggleActiveStatus(topic.topicId, !topic.isActive)}
                      disabled={isTogglingStatus === topic.topicId}
                      className="data-[state=checked]:bg-[#8D6CCB]"
                    />
                    {/* <span className={`ml-2 text-xs min-w-[60px] text-center ${topic.isActive ? 'text-green-400' : 'text-red-400'}`}>
                      {topic.isActive ? 'Active' : 'Inactive'}
                    </span> */}
                     <span className={`ml-2 text-xs min-w-[60px] text-center ${topic.isActive ? 'text-green-400' : 'text-red-400'}`}>
                        {isTogglingStatus === topic.topicId ? 'Updating...' : (topic.isActive ? 'Active' : 'Inactive')}
                      </span>
                    
                  </div>
                </td>
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
                      onClick={() => handleDeleteDialog(topic.topicId)}
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
              <td colSpan={8} className="p-4 text-center text-gray-400">
                No topics found. Try adjusting your filters.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
