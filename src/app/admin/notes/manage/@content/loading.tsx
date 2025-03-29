import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function ContentLoading() {
  return (
    <Card className="w-full bg-[#1E1E1E] border-[#8D6CCB]/20 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-white flex items-center">
          <span className="flex items-center">
            <FileText className="mr-2 text-[#8D6CCB]" size={20} />
            Notes Content Management
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search and Filter Section Skeleton */}
        <div className="p-4 rounded-lg border border-[#6544A3]/30 bg-[#1E1E1E]/50">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {Array(4).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-10 bg-[#3B444B]/50" />
            ))}
          </div>
        </div>
        
        {/* Topics List Skeleton */}
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
                {Array(5).fill(0).map((_, i) => (
                  <tr key={i} className="bg-[#1E1E1E]">
                    <td className="p-3"><Skeleton className="h-6 w-24 bg-[#3B444B]/50" /></td>
                    <td className="p-3"><Skeleton className="h-6 w-16 bg-[#3B444B]/50" /></td>
                    <td className="p-3"><Skeleton className="h-6 w-16 bg-[#3B444B]/50" /></td>
                    <td className="p-3"><Skeleton className="h-6 w-20 bg-[#3B444B]/50" /></td>
                    <td className="p-3"><Skeleton className="h-6 w-20 bg-[#3B444B]/50" /></td>
                    <td className="p-3"><Skeleton className="h-6 w-20 bg-[#3B444B]/50" /></td>
                    <td className="p-3">
                      <div className="flex items-center justify-center space-x-2">
                        {Array(3).fill(0).map((_, j) => (
                          <Skeleton key={j} className="h-8 w-8 rounded-full bg-[#3B444B]/50" />
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
