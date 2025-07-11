'use client';

import { useQuery } from "@tanstack/react-query";
import { getStudentCourse } from "@/app/actions/students.actions";
import { ClassCard } from "@/components/CourseSection/classCard";
import { useUser } from "@/hooks/useUser";
import { Loader2 } from "lucide-react";
import PopUpCard from "@/components/popUpCard";
import { useEffect, useState } from "react";

export default function CoursePage() {
  const { data: user, isLoading: isUserLoading } = useUser();
  const [showDisclaimer, setShowDisclaimer] = useState(false);

   useEffect(() => {
    if (user?.id) {
      setShowDisclaimer(true); 
    }
  }, [user?.id]);

  const { data: userClasses, isLoading } = useQuery({
    queryKey: ["userCourse", user?.id],
    queryFn: () => getStudentCourse(user?.id),
    enabled: !!user,
  });

  if (isUserLoading || !user || isLoading) {
      return (
        <div className="flex items-center justify-center h-[70vh]">
          <Loader2 className="h-12 w-12 animate-spin text-[#8D6CCB]" />
          <p className="text-lg font-medium text-gray-600">Loading content...</p>
        </div>
      );
    }

  if (!userClasses || userClasses.length === 0) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <div className="text-center max-w-md mx-auto p-8 bg-white rounded-xl shadow-md">
          <h2 className="text-xl font-bold text-[#6544A3] mb-4">No Courses Found</h2>
          <p className="text-gray-600">You don&apos;t have any courses assigned yet. Please contact your administrator.</p>
        </div>
      </div>
    );
  }
    
  return (
    <>
     <PopUpCard open={showDisclaimer} setOpen={setShowDisclaimer} />
      <div className="container mx-auto p-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 bg-clip-text text-transparent inline-block">
            My Courses
          </h1>
        </div>

        
        <div className="space-y-8">
          {userClasses.map((classItem) => (
            <ClassCard
              key={classItem.classId}
              classId={classItem.classId}
              className={classItem.className}
              board={classItem.board}
              subjects={classItem.subjects}
            />
          ))}
        </div>

      </div>

    </>
  );
}
