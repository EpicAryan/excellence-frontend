'use client'

// import { useState } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Edit, Trash2, Plus, Check, X } from 'lucide-react';

// // Sample data - replace with actual API data
// const initialBoards = [
//   { id: '1', name: 'CBSE' },
//   { id: '2', name: 'ICSE' },
//   { id: '3', name: 'WB' },
// ];

// const initialClasses = [
//   { id: '1', name: '1', boardId: '1' },
//   { id: '2', name: '2', boardId: '1' },
//   { id: '3', name: '10', boardId: '1' },
//   { id: '4', name: '11', boardId: '2' },
// ];

// const initialSubjects = [
//   { id: '1', name: 'Mathematics', classId: '1' },
//   { id: '2', name: 'Science', classId: '1' },
//   { id: '3', name: 'English', classId: '2' },
//   { id: '4', name: 'History', classId: '3' },
// ];

// const initialChapters = [
//   { id: '1', name: 'Set', subjectId: '1' },
//   { id: '2', name: 'Atom', subjectId: '1' },
//   { id: '3', name: 'Noun', subjectId: '2' },
//   { id: '4', name: '18th Century', subjectId: '3' },
// ];

// export default function HierarchyManagement() {
//   const [boards, setBoards] = useState(initialBoards);
//   const [classes, setClasses] = useState(initialClasses);
//   const [subjects, setSubjects] = useState(initialSubjects);
//   const [chapters, setChapters] = useState(initialChapters);

//   const [selectedBoard, setSelectedBoard] = useState<string>('');
//   const [selectedClass, setSelectedClass] = useState<string>('');
//   const [selectedSubject, setSelectedSubject] = useState<string>('');

//   // Edit states
//   const [editId, setEditId] = useState<string | null>(null);
//   const [editType, setEditType] = useState<'board' | 'class' | 'subject' | 'chapter' | null>(null);
//   const [editName, setEditName] = useState('');
  
//   // Add new states
//   const [newItemName, setNewItemName] = useState('');
//   const [isAddingItem, setIsAddingItem] = useState(false);

//   // Get filtered classes by board
//   const filteredClasses = classes.filter(cls => 
//     cls.boardId === selectedBoard
//   );

//   // Get filtered subjects by class
//   const filteredSubjects = subjects.filter(subject => 
//     subject.classId === selectedClass
//   );

//   // Get filtered chapters by subject
//   const filteredChapters = chapters.filter(chapter =>
//     chapter.subjectId === selectedSubject
//   );

//   const handleDelete = (type: 'board' | 'class' | 'subject' | 'chapter', id: string) => {
//     if (type === 'board') {
//       setBoards(boards.filter(board => board.id !== id));
//       // Also remove related classes and subjects
//       const relatedClasses = classes.filter(cls => cls.boardId === id);
//       const relatedClassIds = relatedClasses.map(cls => cls.id);
//       setClasses(classes.filter(cls => cls.boardId !== id));
//       setSubjects(subjects.filter(subject => !relatedClassIds.includes(subject.classId)));
//       setChapters(chapters.filter(chapter => !subjects.filter(s => relatedClassIds.includes(s.classId)).map(s => s.id).includes(chapter.subjectId)));
//     } else if (type === 'class') {
//       setClasses(classes.filter(cls => cls.id !== id));
//       // Also remove related subjects
//       setSubjects(subjects.filter(subject => subject.classId !== id));
//       setChapters(chapters.filter(chapter => !subjects.filter(s => s.classId === id).map(s => s.id).includes(chapter.subjectId)));
//     } else if (type === 'subject') {
//       setSubjects(subjects.filter(subject => subject.id !== id));
//       setChapters(chapters.filter(chapter => chapter.subjectId !== id));
//     } else if (type === 'chapter') {
//       setChapters(chapters.filter(chapter => chapter.id !== id));
//     }
//   };

//   const startEdit = (type: 'board' | 'class' | 'subject' | 'chapter', id: string, name: string) => {
//     setEditId(id);
//     setEditType(type);
//     setEditName(name);
//   };

//   const cancelEdit = () => {
//     setEditId(null);
//     setEditType(null);
//     setEditName('');
//   };

//   const saveEdit = () => {
//     if (!editId || !editType || !editName.trim()) return;

//     if (editType === 'board') {
//       setBoards(boards.map(board => 
//         board.id === editId ? { ...board, name: editName } : board
//       ));
//     } else if (editType === 'class') {
//       setClasses(classes.map(cls => 
//         cls.id === editId ? { ...cls, name: editName } : cls
//       ));
//     } else if (editType === 'subject') {
//       setSubjects(subjects.map(subject => 
//         subject.id === editId ? { ...subject, name: editName } : subject
//       ));
//     } else if (editType === 'chapter') {
//       setChapters(chapters.map(chapter =>
//         chapter.id === editId ? { ...chapter, name: editName } : chapter
//       ));
//     }

//     cancelEdit();
//   };

//   const addNewItem = (type: 'board' | 'class' | 'subject' | 'chapter') => {
//     if (!newItemName.trim()) return;

//     const newId = Date.now().toString();

//     if (type === 'board') {
//       setBoards([...boards, { id: newId, name: newItemName }]);
//     } else if (type === 'class') {
//       if (!selectedBoard) return;
//       setClasses([...classes, { id: newId, name: newItemName, boardId: selectedBoard }]);
//     } else if (type === 'subject') {
//       if (!selectedClass) return;
//       setSubjects([...subjects, { id: newId, name: newItemName, classId: selectedClass }]);
//     } else if (type === 'chapter') {
//       if (!selectedSubject) return;
//       setChapters([...chapters, { id: newId, name: newItemName, subjectId: selectedSubject }]);
//     }

//     setNewItemName('');
//     setIsAddingItem(false);
//   };

//   return (
//     <Card className="w-full bg-[#1E1E1E] border-[#8D6CCB]/20 shadow-lg">
//       <CardHeader>
//         <CardTitle className="text-2xl font-bold text-white">Hierarchy Management</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <Tabs defaultValue="boards">
//           <TabsList className="grid w-full grid-cols-4 bg-[#3B444B]/50">
//             <TabsTrigger value="boards" className="text-white data-[state=active]:bg-[#6544A3] data-[state=active]:text-white">
//               Boards
//             </TabsTrigger>
//             <TabsTrigger value="classes" className="text-white data-[state=active]:bg-[#6544A3] data-[state=active]:text-white">
//               Classes
//             </TabsTrigger>
//             <TabsTrigger value="subjects" className="text-white data-[state=active]:bg-[#6544A3] data-[state=active]:text-white">
//               Subjects
//             </TabsTrigger>
//             <TabsTrigger value="chapters" className="text-white data-[state=active]:bg-[#6544A3] data-[state=active]:text-white">
//               Chapters
//             </TabsTrigger>
//           </TabsList>

//           {/* Boards Tab */}
//           <TabsContent value="boards">
//             <div className="space-y-4">
//               <div className="flex justify-between items-center">
//                 <h3 className="text-lg font-semibold text-white">All Boards</h3>
//                 <Button 
//                   onClick={() => setIsAddingItem(true)} 
//                   className="bg-gradient-to-r from-[#8D6CCB] to-[#9000FF] hover:from-[#9000FF] hover:to-[#8D6CCB] text-white"
//                   size="sm"
//                 >
//                   <Plus size={16} className="mr-1" /> Add Board
//                 </Button>
//               </div>

//               {isAddingItem && (
//                 <div className="flex items-center gap-2 p-2 rounded-md bg-[#3B444B]/30 border border-[#6544A3]/30">
//                   <Input
//                     value={newItemName}
//                     onChange={(e) => setNewItemName(e.target.value)}
//                     placeholder="Enter board name"
//                     className="bg-[#3B444B]/50 border-[#6544A3] text-white placeholder:text-gray-400 flex-1"
//                   />
//                   <Button 
//                     onClick={() => addNewItem('board')} 
//                     className="bg-gradient-to-r from-[#8D6CCB] to-[#9000FF]"
//                     size="icon"
//                   >
//                     <Check size={16} />
//                   </Button>
//                   <Button 
//                     onClick={() => setIsAddingItem(false)} 
//                     variant="destructive"
//                     size="icon"
//                   >
//                     <X size={16} />
//                   </Button>
//                 </div>
//               )}

//               <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
//                 {boards.map((board) => (
//                   <div 
//                     key={board.id} 
//                     className="flex justify-between items-center p-3 rounded-md bg-[#3B444B]/30 border border-[#6544A3]/30"
//                   >
//                     {editId === board.id && editType === 'board' ? (
//                       <div className="flex items-center gap-2 flex-1">
//                         <Input
//                           value={editName}
//                           onChange={(e) => setEditName(e.target.value)}
//                           className="bg-[#3B444B]/50 border-[#6544A3] text-white"
//                         />
//                         <Button 
//                           onClick={saveEdit} 
//                           className="bg-green-600 hover:bg-green-700"
//                           size="icon"
//                         >
//                           <Check size={16} />
//                         </Button>
//                         <Button 
//                           onClick={cancelEdit} 
//                           variant="destructive"
//                           size="icon"
//                         >
//                           <X size={16} />
//                         </Button>
//                       </div>
//                     ) : (
//                       <>
//                         <span className="text-white">{board.name}</span>
//                         <div className="flex gap-2">
//                           <Button 
//                             onClick={() => startEdit('board', board.id, board.name)} 
//                             className="bg-[#6544A3] hover:bg-[#8D6CCB]"
//                             size="icon"
//                             variant="outline"
//                           >
//                             <Edit size={16} />
//                           </Button>
//                           <Button 
//                             onClick={() => handleDelete('board', board.id)} 
//                             variant="destructive"
//                             size="icon"
//                           >
//                             <Trash2 size={16} />
//                           </Button>
//                         </div>
//                       </>
//                     )}
//                   </div>
//                 ))}
//                 {boards.length === 0 && (
//                   <div className="text-center py-6 text-gray-400">
//                     No boards available. Add a new board to get started.
//                   </div>
//                 )}
//               </div>
//             </div>
//           </TabsContent>

//           {/* Classes Tab */}
//           <TabsContent value="classes">
//             <div className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="board-select" className="text-white">Select Board</Label>
//                 <Select value={selectedBoard} onValueChange={setSelectedBoard}>
//                   <SelectTrigger className="bg-[#3B444B]/50 text-white border-[#6544A3]">
//                     <SelectValue placeholder="Select a board" />
//                   </SelectTrigger>
//                   <SelectContent className="bg-[#1E1E1E] text-white border-[#6544A3]">
//                     {boards.map((board) => (
//                       <SelectItem 
//                         key={board.id} 
//                         value={board.id}
//                         className="hover:bg-[#6544A3] focus:bg-[#6544A3]"
//                       >
//                         {board.name}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               {selectedBoard && (
//                 <>
//                   <div className="flex justify-between items-center">
//                     <h3 className="text-lg font-semibold text-white">Classes for {boards.find(b => b.id === selectedBoard)?.name}</h3>
//                     <Button 
//                       onClick={() => setIsAddingItem(true)} 
//                       className="bg-gradient-to-r from-[#8D6CCB] to-[#9000FF] hover:from-[#9000FF] hover:to-[#8D6CCB] text-white"
//                       size="sm"
//                     >
//                       <Plus size={16} className="mr-1" /> Add Class
//                     </Button>
//                   </div>

//                   {isAddingItem && (
//                     <div className="flex items-center gap-2 p-2 rounded-md bg-[#3B444B]/30 border border-[#6544A3]/30">
//                       <Input
//                         value={newItemName}
//                         onChange={(e) => setNewItemName(e.target.value)}
//                         placeholder="Enter class name (e.g. 10, 11, 12)"
//                         className="bg-[#3B444B]/50 border-[#6544A3] text-white placeholder:text-gray-400 flex-1"
//                       />
//                       <Button 
//                         onClick={() => addNewItem('class')} 
//                         className="bg-gradient-to-r from-[#8D6CCB] to-[#9000FF]"
//                         size="icon"
//                       >
//                         <Check size={16} />
//                       </Button>
//                       <Button 
//                         onClick={() => setIsAddingItem(false)} 
//                         variant="destructive"
//                         size="icon"
//                       >
//                         <X size={16} />
//                       </Button>
//                     </div>
//                   )}

//                   <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
//                     {filteredClasses.map((cls) => (
//                       <div 
//                         key={cls.id} 
//                         className="flex justify-between items-center p-3 rounded-md bg-[#3B444B]/30 border border-[#6544A3]/30"
//                       >
//                         {editId === cls.id && editType === 'class' ? (
//                           <div className="flex items-center gap-2 flex-1">
//                             <Input
//                               value={editName}
//                               onChange={(e) => setEditName(e.target.value)}
//                               className="bg-[#3B444B]/50 border-[#6544A3] text-white"
//                             />
//                             <Button 
//                               onClick={saveEdit} 
//                               className="bg-green-600 hover:bg-green-700"
//                               size="icon"
//                             >
//                               <Check size={16} />
//                             </Button>
//                             <Button 
//                               onClick={cancelEdit} 
//                               variant="destructive"
//                               size="icon"
//                             >
//                               <X size={16} />
//                             </Button>
//                           </div>
//                         ) : (
//                           <>
//                             <span className="text-white">Class {cls.name}</span>
//                             <div className="flex gap-2">
//                               <Button 
//                                 onClick={() => startEdit('class', cls.id, cls.name)} 
//                                 className="bg-[#6544A3] hover:bg-[#8D6CCB]"
//                                 size="icon"
//                                 variant="outline"
//                               >
//                                 <Edit size={16} />
//                               </Button>
//                               <Button 
//                                 onClick={() => handleDelete('class', cls.id)} 
//                                 variant="destructive"
//                                 size="icon"
//                               >
//                                 <Trash2 size={16} />
//                               </Button>
//                             </div>
//                           </>
//                         )}
//                       </div>
//                     ))}
//                     {filteredClasses.length === 0 && (
//                       <div className="text-center py-6 text-gray-400">
//                         No classes available for this board. Add a new class to get started.
//                       </div>
//                     )}
//                   </div>
//                 </>
//               )}

//               {!selectedBoard && (
//                 <div className="text-center py-6 text-gray-400">
//                   Please select a board to view or add classes.
//                 </div>
//               )}
//             </div>
//           </TabsContent>

//           {/* Subjects Tab */}
//           <TabsContent value="subjects">
//             <div className="space-y-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="board-select-subjects" className="text-white">Select Board</Label>
//                   <Select value={selectedBoard} onValueChange={(value) => {
//                     setSelectedBoard(value);
//                     setSelectedClass('');
//                   }}>
//                     <SelectTrigger className="bg-[#3B444B]/50 text-white border-[#6544A3]">
//                       <SelectValue placeholder="Select a board" />
//                     </SelectTrigger>
//                     <SelectContent className="bg-[#1E1E1E] text-white border-[#6544A3]">
//                       {boards.map((board) => (
//                         <SelectItem 
//                           key={board.id} 
//                           value={board.id}
//                           className="hover:bg-[#6544A3] focus:bg-[#6544A3]"
//                         >
//                           {board.name}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 {selectedBoard && (
//                   <div className="space-y-2">
//                     <Label htmlFor="class-select" className="text-white">Select Class</Label>
//                     <Select value={selectedClass} onValueChange={setSelectedClass}>
//                       <SelectTrigger className="bg-[#3B444B]/50 text-white border-[#6544A3]">
//                         <SelectValue placeholder="Select a class" />
//                       </SelectTrigger>
//                       <SelectContent className="bg-[#1E1E1E] text-white border-[#6544A3]">
//                         {filteredClasses.map((cls) => (
//                           <SelectItem 
//                             key={cls.id} 
//                             value={cls.id}
//                             className="hover:bg-[#6544A3] focus:bg-[#6544A3]"
//                           >
//                             Class {cls.name}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </div>
//                 )}
//               </div>

//               {selectedClass && (
//                 <>
//                   <div className="flex justify-between items-center">
//                     <h3 className="text-lg font-semibold text-white">
//                       Subjects for {boards.find(b => b.id === selectedBoard)?.name} - 
//                       Class {classes.find(c => c.id === selectedClass)?.name}
//                     </h3>
//                     <Button 
//                       onClick={() => setIsAddingItem(true)} 
//                       className="bg-gradient-to-r from-[#8D6CCB] to-[#9000FF] hover:from-[#9000FF] hover:to-[#8D6CCB] text-white"
//                       size="sm"
//                     >
//                       <Plus size={16} className="mr-1" /> Add Subject
//                     </Button>
//                   </div>

//                   {isAddingItem && (
//                     <div className="flex items-center gap-2 p-2 rounded-md bg-[#3B444B]/30 border border-[#6544A3]/30">
//                       <Input
//                         value={newItemName}
//                         onChange={(e) => setNewItemName(e.target.value)}
//                         placeholder="Enter subject name"
//                         className="bg-[#3B444B]/50 border-[#6544A3] text-white placeholder:text-gray-400 flex-1"
//                       />
//                       <Button 
//                         onClick={() => addNewItem('subject')} 
//                         className="bg-gradient-to-r from-[#8D6CCB] to-[#9000FF]"
//                         size="icon"
//                       >
//                         <Check size={16} />
//                       </Button>
//                       <Button 
//                         onClick={() => setIsAddingItem(false)} 
//                         variant="destructive"
//                         size="icon"
//                       >
//                         <X size={16} />
//                       </Button>
//                     </div>
//                   )}

//                   <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
//                     {filteredSubjects.map((subject) => (
//                       <div 
//                         key={subject.id} 
//                         className="flex justify-between items-center p-3 rounded-md bg-[#3B444B]/30 border border-[#6544A3]/30"
//                       >
//                         {editId === subject.id && editType === 'subject' ? (
//                           <div className="flex items-center gap-2 flex-1">
//                             <Input
//                               value={editName}
//                               onChange={(e) => setEditName(e.target.value)}
//                               className="bg-[#3B444B]/50 border-[#6544A3] text-white"
//                             />
//                             <Button 
//                               onClick={saveEdit} 
//                               className="bg-green-600 hover:bg-green-700"
//                               size="icon"
//                             >
//                               <Check size={16} />
//                             </Button>
//                             <Button 
//                               onClick={cancelEdit} 
//                               variant="destructive"
//                               size="icon"
//                             >
//                               <X size={16} />
//                             </Button>
//                           </div>
//                         ) : (
//                           <>
//                             <span className="text-white">{subject.name}</span>
//                             <div className="flex gap-2">
//                               <Button 
//                                 onClick={() => startEdit('subject', subject.id, subject.name)} 
//                                 className="bg-[#6544A3] hover:bg-[#8D6CCB]"
//                                 size="icon"
//                                 variant="outline"
//                               >
//                                 <Edit size={16} />
//                               </Button>
//                               <Button 
//                                 onClick={() => handleDelete('subject', subject.id)} 
//                                 variant="destructive"
//                                 size="icon"
//                               >
//                                 <Trash2 size={16} />
//                               </Button>
//                             </div>
//                           </>
//                         )}
//                       </div>
//                     ))}
//                     {filteredSubjects.length === 0 && (
//                       <div className="text-center py-6 text-gray-400">
//                         No subjects available for this class. Add a new subject to get started.
//                       </div>
//                     )}
//                   </div>
//                 </>
//               )}

//               {!selectedClass && (
//                 <div className="text-center py-6 text-gray-400">
//                   Please select a board and class to view or add subjects.
//                 </div>
//               )}
//             </div>
//           </TabsContent>

//                {/* Chapters Tab */}
//                <TabsContent value="chapters">
//             <div className="space-y-4">
//               <div className="grid grid-cols-3 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="board-select-chapters" className="text-white">Select Board</Label>
//                   <Select value={selectedBoard} onValueChange={(value) => {
//                     setSelectedBoard(value);
//                     setSelectedClass('');
//                     setSelectedSubject('');
//                   }}>
//                     <SelectTrigger className="bg-[#3B444B]/50 text-white border-[#6544A3]">
//                       <SelectValue placeholder="Select a board" />
//                     </SelectTrigger>
//                     <SelectContent className="bg-[#1E1E1E] text-white border-[#6544A3]">
//                       {boards.map((board) => (
//                         <SelectItem
//                           key={board.id}
//                           value={board.id}
//                           className="hover:bg-[#6544A3] focus:bg-[#6544A3]"
//                         >
//                           {board.name}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 {selectedBoard && (
//                   <div className="space-y-2">
//                     <Label htmlFor="class-select-chapters" className="text-white">Select Class</Label>
//                     <Select value={selectedClass} onValueChange={(value) => {
//                       setSelectedClass(value);
//                       setSelectedSubject('');
//                     }}>
//                       <SelectTrigger className="bg-[#3B444B]/50 text-white border-[#6544A3]">
//                         <SelectValue placeholder="Select a class" />
//                       </SelectTrigger>
//                       <SelectContent className="bg-[#1E1E1E] text-white border-[#6544A3]">
//                         {filteredClasses.map((cls) => (
//                           <SelectItem
//                             key={cls.id}
//                             value={cls.id}
//                             className="hover:bg-[#6544A3] focus:bg-[#6544A3]"
//                           >
//                             Class {cls.name}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </div>
//                 )}

//                 {selectedClass && (
//                   <div className="space-y-2">
//                     <Label htmlFor="subject-select-chapters" className="text-white">Select Subject</Label>
//                     <Select value={selectedSubject} onValueChange={setSelectedSubject}>
//                       <SelectTrigger className="bg-[#3B444B]/50 text-white border-[#6544A3]">
//                         <SelectValue placeholder="Select a subject" />
//                       </SelectTrigger>
//                       <SelectContent className="bg-[#1E1E1E] text-white border-[#6544A3]">
//                         {filteredSubjects.map((subject) => (
//                           <SelectItem
//                             key={subject.id}
//                             value={subject.id}
//                             className="hover:bg-[#6544A3] focus:bg-[#6544A3]"
//                           >
//                             {subject.name}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </div>
//                 )}
//               </div>

//               {selectedSubject && (
//                 <>
//                   <div className="flex justify-between items-center">
//                     <h3 className="text-lg font-semibold text-white">
//                       Chapters for {boards.find(b => b.id === selectedBoard)?.name} -
//                       Class {classes.find(c => c.id === selectedClass)?.name} -
//                       {subjects.find(s => s.id === selectedSubject)?.name}
//                     </h3>
//                     <Button
//                       onClick={() => setIsAddingItem(true)}
//                       className="bg-gradient-to-r from-[#8D6CCB] to-[#9000FF] hover:from-[#9000FF] hover:to-[#8D6CCB] text-white"
//                       size="sm"
//                     >
//                       <Plus size={16} className="mr-1" /> Add Chapter
//                     </Button>
//                   </div>

//                   {isAddingItem && (
//                     <div className="flex items-center gap-2 p-2 rounded-md bg-[#3B444B]/30 border border-[#6544A3]/30">
//                       <Input
//                         value={newItemName}
//                         onChange={(e) => setNewItemName(e.target.value)}
//                         placeholder="Enter chapter name"
//                         className="bg-[#3B444B]/50 border-[#6544A3] text-white placeholder:text-gray-400 flex-1"
//                       />
//                       <Button
//                         onClick={() => addNewItem('chapter')}
//                         className="bg-gradient-to-r from-[#8D6CCB] to-[#9000FF]"
//                         size="icon"
//                       >
//                         <Check size={16} />
//                       </Button>
//                       <Button
//                         onClick={() => setIsAddingItem(false)}
//                         variant="destructive"
//                         size="icon"
//                       >
//                         <X size={16} />
//                       </Button>
//                     </div>
//                   )}

//                   <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
//                     {filteredChapters.map((chapter) => (
//                       <div
//                         key={chapter.id}
//                         className="flex justify-between items-center p-3 rounded-md bg-[#3B444B]/30 border border-[#6544A3]/30"
//                       >
//                         {editId === chapter.id && editType === 'chapter' ? (
//                           <div className="flex items-center gap-2 flex-1">
//                             <Input
//                               value={editName}
//                               onChange={(e) => setEditName(e.target.value)}
//                               className="bg-[#3B444B]/50 border-[#6544A3] text-white"
//                             />
//                             <Button
//                               onClick={saveEdit}
//                               className="bg-green-600 hover:bg-green-700"
//                               size="icon"
//                             >
//                               <Check size={16} />
//                             </Button>
//                             <Button
//                               onClick={cancelEdit}
//                               variant="destructive"
//                               size="icon"
//                             >
//                               <X size={16} />
//                             </Button>
//                           </div>
//                         ) : (
//                           <>
//                             <span className="text-white">{chapter.name}</span>
//                             <div className="flex gap-2">
//                               <Button
//                                 onClick={() => startEdit('chapter', chapter.id, chapter.name)}
//                                 className="bg-[#6544A3] hover:bg-[#8D6CCB]"
//                                 size="icon"
//                                 variant="outline"
//                               >
//                                 <Edit size={16} />
//                               </Button>
//                               <Button
//                                 onClick={() => handleDelete('chapter', chapter.id)}
//                                 variant="destructive"
//                                 size="icon"
//                               >
//                                 <Trash2 size={16} />
//                               </Button>
//                             </div>
//                           </>
//                         )}
//                       </div>
//                     ))}
//                     {filteredChapters.length === 0 && (
//                       <div className="text-center py-6 text-gray-400">
//                         No chapters available for this subject. Add a new chapter to get started.
//                       </div>
//                     )}
//                   </div>
//                 </>
//               )}

//               {!selectedSubject && (
//                 <div className="text-center py-6 text-gray-400">
//                   Please select a board, class, and subject to view or add chapters.
//                 </div>
//               )}
//             </div>
//           </TabsContent>
//         </Tabs>
//       </CardContent>
//     </Card>
//   );
// }

import { HierarchyManagement } from "@/components"

import React from 'react'

const HierarchyManagementPage = () => {
  return (
    <div>
      <HierarchyManagement/>
    </div>
  )
}

export default HierarchyManagementPage
