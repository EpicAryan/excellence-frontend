"use client";

import {
    ChevronDown,
    ChevronRight,
    BookOpen,
    GraduationCap,
    Home,
    LogOut,
    User,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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
} from "@/components/ui/sidebar";
import { useUser } from "@/hooks/useUser";
import { useLogout } from "@/hooks/useLogout";
import { useQuery } from "@tanstack/react-query";
import { getStudentCourse } from "@/app/actions/students.actions";

interface ExpandedState {
    classes: Record<number, boolean>;
    subjects: Record<number, boolean>;
}

const AppSidebar = () => {
    const { data: user, isLoading: isUserLoading } = useUser();
    const router = useRouter();
    const { mutate: logout, isPending } = useLogout();

    const { data: userClasses, isLoading: isClassesLoading } = useQuery({
        queryKey: ["userCourse", user?.id],
        queryFn: () => getStudentCourse(user?.id),
        enabled: !!user,
    });

    const [expanded, setExpanded] = useState<ExpandedState>({
        classes: {},
        subjects: {},
    });

    useEffect(() => {
        if (userClasses && !isClassesLoading) {
            const initialExpanded: ExpandedState = {
                classes: {},
                subjects: {},
            };

            userClasses.forEach((classItem) => {
                initialExpanded.classes[classItem.classId] = true;

                classItem.subjects.forEach((subject) => {
                    initialExpanded.subjects[subject.subjectId] = true;
                });
            });

            setExpanded(initialExpanded);
        }
    }, [userClasses, isClassesLoading]);

    const handleLogout = () => {
        logout();
    };

    // Toggle expansion functions
    const toggleClass = (classId: number) => {
        setExpanded((prev) => ({
            ...prev,
            classes: {
                ...prev.classes,
                [classId]: !prev.classes[classId],
            },
        }));
    };

    // Navigation functions
    const navigateToSubject = (classId: number, subjectId: number) => {
        router.push(`/courses/${classId}/subjects/${subjectId}`);
    };

    return (
        <Sidebar className="border-r border-r-[#7A51C8] h-screen flex flex-col">
            <SidebarHeader className="p-4 border-b border-b-[#7A51C8]">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-[#7A51C8] rounded-md flex items-center justify-center text-sm text-white font-bold">
                            E
                        </div>
                        <span className="font-bold text-sm">
                            Excellence Pathshala
                        </span>
                    </div>
                    <Link
                        href="/"
                        className="p-2 rounded-full hover:bg-[#8D6CCB]"
                    >
                        <Home className="h-5 w-5 text-[#7A51C8] hover:text-white" />
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
                        {isUserLoading ? (
                            <p className="font-medium text-sm text-neutral-900">
                                Loading...
                            </p>
                        ) : user ? (
                            <>
                                <p className="font-semibold text-sm text-neutral-900">
                                    {user.username.toUpperCase()}
                                </p>
                                <p className="text-xs font-medium text-gray-700">
                                    STUDENT
                                </p>
                            </>
                        ) : (
                            <>
                                <p className="font-medium text-sm text-neutral-900">
                                    Guest
                                </p>
                                <p className="text-xs text-gray-700">
                                    Not logged in
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <SidebarContent className="flex-grow overflow-y-auto">
                <SidebarGroup>
                    <SidebarGroupLabel className="text-lg font-semibold text-neutral-900 mb-2">
                        Courses
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {isClassesLoading ? (
                                <div className="p-3 text-center text-sm text-gray-500">
                                    Loading classes...
                                </div>
                            ) : userClasses && userClasses.length > 0 ? (
                                userClasses.map((classItem) => (
                                    <div key={classItem.classId}>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton
                                                onClick={() =>
                                                    toggleClass(
                                                        classItem.classId
                                                    )
                                                }
                                                size={'lg'}
                                                className="w-full flex items-center justify-between text-neutral-900 font-medium hover:bg-[#8D6CCB] hover:text-white rounded-md active:bg-[#8D6CCB] active:text-white active:scale-95"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <GraduationCap className="h-4 w-4" />
                                                    <span>
                                                        {classItem.className} (
                                                        {
                                                            classItem.board
                                                                .boardName
                                                        }
                                                        )
                                                    </span>
                                                </div>
                                                {expanded.classes[
                                                    classItem.classId
                                                ] ? (
                                                    <ChevronDown className="h-4 w-4" />
                                                ) : (
                                                    <ChevronRight className="h-4 w-4" />
                                                )}
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>

                                        {/* Subjects under class */}
                                        {expanded.classes[
                                            classItem.classId
                                        ] && (
                                            <div className="ml-4 mr-2 ">
                                                {classItem.subjects.map(
                                                    (subject) => (
                                                        <div
                                                            key={subject.subjectId}
                                                            onClick={() => navigateToSubject(classItem.classId, subject.subjectId)}
                                                            className="flex items-center gap-2 w-full text-neutral-900 font-medium hover:bg-[#8D6CCB] hover:text-white rounded-md pl-2 py-1 active:scale-95"
                                                        >
                                                            <BookOpen className="h-4 w-4" />
                                                            <span className="">
                                                                {
                                                                    subject.subjectName
                                                                }
                                                            </span>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className="p-3 text-center text-sm text-gray-500">
                                    No classes assigned
                                </div>
                            )}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            {/* Footer with Logout Button */}
            <SidebarFooter className="p-2">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center border border-[#8D6CCB] bg-gray-300 gap-2 py-2 px-3 text-red-600 font-semibold hover:bg-red-500 hover:text-gray-200 rounded-md"
                    disabled={isPending}
                >
                    <LogOut className="h-4 w-4" />
                    <span>{isPending ? "Logging out..." : "Logout"}</span>
                </button>
            </SidebarFooter>
        </Sidebar>
    );
};

export default AppSidebar;
