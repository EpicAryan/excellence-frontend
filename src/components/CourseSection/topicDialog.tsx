// import React from 'react';
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";

// // Type for Topic
// interface Topic {
//   id: number;
//   name: string;
//   pdfUrl: string;
// }

// // Interface for Dialog Props
// interface TopicDialogProps {
//   topics: Topic[];
//   selectedSubject: string;
//   isOpen: boolean;
//   onOpenChange: (open: boolean) => void;
// }

// const TopicDialog: React.FC<TopicDialogProps> = ({ 
//   topics, 
//   selectedSubject, 
//   isOpen, 
//   onOpenChange 
// }) => {
//   return (
//     <Dialog open={isOpen} onOpenChange={onOpenChange}>
//       <DialogContent className="sm:max-w-[600px]">
//         <DialogHeader>
//           <DialogTitle>{selectedSubject} Topics</DialogTitle>
//         </DialogHeader>
//         <div className="grid gap-4 py-4">
//           {topics.map((topic) => (
//             <div 
//               key={topic.id} 
//               className="flex items-center justify-between border-b pb-2 last:border-b-0"
//             >
//               <span className="text-sm font-medium">{topic.name}</span>
//               <Button 
//                 variant="outline" 
//                 size="sm"
//                 onClick={() => window.open(topic.pdfUrl, '_blank')}
//               >
//                 View PDF
//               </Button>
//             </div>
//           ))}
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default TopicDialog;


import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

// Type for Topic
interface Topic {
  id: number;
  name: string;
  pdfUrl: string;
}

// Interface for Dialog Props
interface TopicDialogProps {
  topics: Topic[];
  selectedSubject: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const TopicDialog: React.FC<TopicDialogProps> = ({
  topics,
  selectedSubject,
  isOpen,
  onOpenChange
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[650px] bg-gray-900 rounded-lg shadow-xl p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-200">
            {selectedSubject} Topics
          </DialogTitle>
        </DialogHeader>
        <motion.div 
          className="grid gap-4 py-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {topics.map((topic) => (
            <motion.div
              key={topic.id}
              className="flex items-center justify-between p-3 rounded-lg bg-gray-800 hover:shadow-md transition-shadow"
              whileHover={{ scale: 1.02 }}
            >
              <span className="text-lg font-medium text-gray-100">
                {topic.name}
              </span>
              <Button
                variant="default"
                size="sm"
                className="bg-[#7B30E2] hover:bg-gradient-800 text-white px-4 py-1 rounded-md transition-all"
                onClick={() => window.open(topic.pdfUrl, '_blank')}
              >
                View PDF
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default TopicDialog;
