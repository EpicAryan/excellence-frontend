'use client'

import { ChevronDown, ChevronRight, BookOpen, GraduationCap, Home, LogOut, User } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"


// Define types for our data structure
interface Course {
  title: string;
  subjects: string[];
}

interface ExpandedCoursesState {
  [key: string]: boolean;
}

// Sample user data - replace with actual user data from your authentication system
interface User {
    name: string;
    role: string;
  }
  
  const user: User = {
    name: "John Doe",
    role: "Student"
  }

// Course data structure
const courses: Course[] = [
  {
    title: "Class VII",
    subjects: ["Mathematics", "Science", "English", "Social Studies", "Hindi"]
  },
  {
    title: "Class VIII",
    subjects: ["Mathematics", "Science", "English", "Social Studies", "Hindi", "Computer Science"]
  },
  {
    title: "English Batch I",
    subjects: ["Grammar", "Literature", "Vocabulary", "Reading Comprehension", "Writing Skills"]
  },
  {
    title: "Science Batch I",
    subjects: ["Physics", "Chemistry", "Biology", "Environmental Science"]
  },
  {
    title: "Science Batch II",
    subjects: ["Physics", "Chemistry", "Biology", "Environmental Science"]
  }
]

const handleLogout = () => {
    // Add your logout logic here
    console.log("Logout clicked");
  };

const AppSidebar = () => {
    const [expandedCourses, setExpandedCourses] = useState<ExpandedCoursesState>({});

  // Toggle expansion state for a specific course
  const toggleCourse = (courseTitle: string) => {
    setExpandedCourses(prev => ({
      ...prev,
      [courseTitle]: !prev[courseTitle]
    }));
  };

  return (
    <Sidebar className="border-r border-r-[#7A51C8] h-screen flex flex-col">
      {/* Header with Logo and Home Icon */}
      <SidebarHeader className="p-4 border-b border-b-[#7A51C8]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Replace with your actual logo */}
            <div className="w-8 h-8 bg-[#7A51C8] rounded-md flex items-center justify-center text-white font-bold">
              L
            </div>
            <span className="font-semibold text-lg">LearningApp</span>
          </div>
          <Link href="/" className="p-2 rounded-full hover:bg-[#8D6CCB]">
            <Home className="h-5 w-5 text-[#7A51C8]  hover:text-white" />
          </Link>
        </div>
      </SidebarHeader>

      {/* User information section */}
      <div className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#7A51C8] flex items-center justify-center">
            <User className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="font-medium text-sm text-neutral-900">{user.name}</p>
            <p className="text-xs text-gray-700">{user.role}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <SidebarContent className="flex-grow overflow-y-auto">
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg font-semibold text-neutral-900">Courses</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {courses.map((course) => (
                <div key={course.title}>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => toggleCourse(course.title)}
                      className="w-full flex items-center justify-between text-neutral-900 font-medium hover:bg-[#8D6CCB] hover:text-white rounded-md"
                    >
                      <div className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4" />
                        <span>{course.title}</span>
                      </div>
                      {expandedCourses[course.title] ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  {/* Collapsible subject section */}
                  {expandedCourses[course.title] && (
                    <div className="ml-6 my-1">
                      {course.subjects.map((subject) => (
                        <SidebarMenuItem key={`${course.title}-${subject}`}>
                          <SidebarMenuButton asChild className="hover:bg-[#8D6CCB]">
                            <a href="#" className="flex items-center gap-2 py-1 text-neutral-700 hover:text-white rounded-md">
                              <BookOpen className="h-4 w-4" />
                              <span className="text-sm">{subject}</span>
                            </a>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer with Logout Button */}
      <SidebarFooter className=" p-2">
        <button 
          onClick={handleLogout} 
          className="w-full flex items-center justify-center border border-[#8D6CCB] bg-gray-300 gap-2 py-2 px-3 text-red-600 font-semibold  hover:bg-red-500 hover:text-gray-200 rounded-md"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </button>
      </SidebarFooter>
    </Sidebar>
  )
}
export default AppSidebar
