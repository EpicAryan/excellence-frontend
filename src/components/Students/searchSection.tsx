// 'use client'

// import { useState } from 'react';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { 
//   Select, 
//   SelectContent, 
//   SelectItem, 
//   SelectTrigger, 
//   SelectValue 
// } from '@/components/ui/select';
// import { Label } from '@/components/ui/label';
// import { Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';

// const SearchSection = () => {
//   const [searchData, setSearchData] = useState({
//     email: '',
//     name: '',
//     class: ''
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Handle search
//     console.log('Search submitted:', searchData);
//   };

//   const batchOptions = [
//     { value: 'batch-1', label: 'Batch 1' },
//     { value: 'batch-2', label: 'Batch 2' },
//     { value: 'class-1', label: 'Class 1' },
//     { value: 'class-2', label: 'Class 2' }
//   ];

//   return (
//     <Card className="w-full bg-[#1E1E1E] border-[#8D6CCB]/20 mt-6">
//       <CardHeader>
//         <CardTitle className="text-white text-xl font-bold">Assign Class/Batch</CardTitle>
//       </CardHeader>
//       <CardContent className="">
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label htmlFor="search-email" className="text-white text-sm">Search By Email</Label>
//               <Input 
//                 id="search-email" 
//                 placeholder="Email address"
//                 className="bg-[#3B444B]/50 border-[#6544A3] text-white placeholder:text-gray-400"
//                 value={searchData.email}
//                 onChange={(e) => setSearchData({...searchData, email: e.target.value})}
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="autofill-name" className="text-white text-sm">Name</Label>
//               <Input 
//                 id="autofill-name" 
//                 placeholder="Student name"
//                 className="bg-[#3B444B]/50 border-[#6544A3] text-white placeholder:text-gray-400"
//                 value={searchData.name}
//                 onChange={(e) => setSearchData({...searchData, name: e.target.value})}
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
//             <div className="space-y-2">
//               <Label htmlFor="class-select" className="text-white text-sm">Select Classes/Batches</Label>
//               <Select
//                 onValueChange={(value) => setSearchData({...searchData, class: value})}
//               >
//                 <SelectTrigger 
//                   id="class-select" 
//                   className="bg-[#3B444B]/50 border-[#6544A3] text-white placeholder:text-gray-400"
//                 >
//                   <SelectValue placeholder="Class or batch access" />
//                 </SelectTrigger>
//                 <SelectContent className="bg-[#1E1E1E] border-[#6544A3]">
//                   {batchOptions.map((option) => (
//                     <SelectItem 
//                       key={option.value} 
//                       value={option.value}
//                       className="text-white hover:bg-[#6544A3]/20"
//                     >
//                       {option.label}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//             <Button 
//               type="submit" 
//               className="bg-gradient-to-r from-[#8D6CCB] to-[#9000FF] hover:from-[#9000FF] hover:to-[#8D6CCB] text-white h-10 px-8"
//             >
//               Submit
//             </Button>
//           </div>
//         </form>
//       </CardContent>
//     </Card>
//   );
// }


// export default SearchSection;

'use client'

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
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

const SearchSection = () => {
  const [searchData, setSearchData] = useState({
    email: '',
    name: '',
  });
  const [selectedBatches, setSelectedBatches] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  const batchOptions = [
    { value: 'batch-1', label: 'Batch 1' },
    { value: 'batch-2', label: 'Batch 2' },
    { value: 'class-1', label: 'Class 1' },
    { value: 'class-2', label: 'Class 2' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search with multiple selected batches
    console.log('Search submitted:', {
      ...searchData,
      selectedBatches
    });
  };

  const toggleBatch = (value: string) => {
    setSelectedBatches(prev => 
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  const removeBatch = (value: string) => {
    setSelectedBatches(prev => prev.filter(item => item !== value));
  };

  return (
    <Card className="w-full bg-[#1E1E1E] border-[#8D6CCB]/20">
      <CardHeader>
        <CardTitle className="text-white text-xl font-bold">Assign Class/Batch</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search-email" className="text-white text-sm">Search By Email</Label>
              <Input 
                id="search-email" 
                placeholder="Email address"
                className="bg-[#3B444B]/50 border-[#6544A3] text-white placeholder:text-gray-400"
                value={searchData.email}
                onChange={(e) => setSearchData({...searchData, email: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="autofill-name" className="text-white text-sm">Name</Label>
              <Input 
                id="autofill-name" 
                placeholder="Student name"
                className="bg-[#3B444B]/50 border-[#6544A3] text-white placeholder:text-gray-400"
                value={searchData.name}
                onChange={(e) => setSearchData({...searchData, name: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="class-select" className="text-white text-sm">Select Classes/Batches</Label>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 items-end'>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-full justify-between bg-[#3B444B]/50 border-[#6544A3] text-white hover:bg-[#3B444B]/70 hover:text-white"
                    >
                      {selectedBatches.length > 0 
                        ? `${selectedBatches.length} selected` 
                        : "Select classes or batches"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0 bg-[#1E1E1E] border-[#6544A3]">
                    <Command className="bg-transparent">
                      <CommandInput placeholder="Search classes or batches..." className="text-white" />
                      <CommandEmpty className="text-[#A3A3A3]">No class/batch found.</CommandEmpty>
                      <CommandGroup className="max-h-60 overflow-auto">
                        {batchOptions.map((option) => (
                          <CommandItem
                            key={option.value}
                            onSelect={() => toggleBatch(option.value)}
                            className="text-white hover:bg-[#6544A3]/30 cursor-pointer"
                          >
                            <div className="flex items-center gap-2 w-full">
                              <div className={`
                                flex h-4 w-4 items-center justify-center rounded-sm border 
                                ${selectedBatches.includes(option.value) 
                                  ? 'bg-[#8D6CCB] border-[#8D6CCB]' 
                                  : 'border-[#A3A3A3]'}
                              `}>
                                {selectedBatches.includes(option.value) && (
                                  <Check className="h-3 w-3 text-white" />
                                )}
                              </div>
                              <span>{option.label}</span>
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
            >
              Assign Selected
            </Button>
              </div>
              
              {/* Display selected batches as badges */}
              {selectedBatches.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {selectedBatches.map(batchId => {
                    const batch = batchOptions.find(o => o.value === batchId);
                    return (
                      <Badge 
                        key={batchId}
                        className={`
                          flex items-center gap-1 px-2 py-1
                          ${batchId.startsWith('batch') 
                            ? 'bg-[#9000FF]/20 text-[#B091EA] hover:bg-[#9000FF]/30' 
                            : 'bg-[#8BA0B1]/20 text-[#8BA0B1] hover:bg-[#8BA0B1]/30'
                          }
                        `}
                      >
                        {batch?.label}
                        <button 
                          onClick={() => removeBatch(batchId)}
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
            
           
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default SearchSection;
