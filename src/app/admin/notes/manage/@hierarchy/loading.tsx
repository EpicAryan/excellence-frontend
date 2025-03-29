import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function HierarchyLoading() {
  return (
    <Card className="w-full bg-[#1E1E1E] border-[#8D6CCB]/20 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-white">Hierarchy Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Skeleton className="h-6 w-32 bg-[#3B444B]" />
            <Skeleton className="h-9 w-28 bg-[#3B444B]" />
          </div>
          
          <div className="space-y-2">
            {Array(5).fill(0).map((_, i) => (
              <div key={i} className="flex justify-between items-center p-3 rounded-md bg-[#3B444B]/30 border border-[#6544A3]/30">
                <Skeleton className="h-5 w-32 bg-[#3B444B]" />
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-8 bg-[#3B444B]" />
                  <Skeleton className="h-8 w-8 bg-[#3B444B]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
